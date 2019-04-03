<template>
    <Form :model="reader" :label-width="100">

        <!--<FormItem label="数据库连接地址">-->
            <!--<Input v-model="reader.parameter.connection[0].jdbcUrl[0]" placeholder="Mysql数据库连接地址 例:127.0.0.1:3306/test"-->
                   <!--v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
        <FormItem label="数据库连接">
            <Select v-model="reader.parameter.dataSource" style="width:200px" v-on:on-change="sendData2Parent">
                <Option v-for="item in dataSources" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <Row>
            <Col span="12">
                <FormItem label="字段数据库">
                    <Select
                            v-model="hdfsDB"
                            filterable
                            remote
                            clearable
                            :remote-method="getHdfsDBs"
                            :loading="hdfsDB_Loading">
                        <Option v-for="(option, index) in hdfsDBs" :value="option.value" :key="index">{{ option.label }}
                        </Option>
                    </Select>
                </FormItem>
            </Col>
            <Col span="12">
                <FormItem label="字段表">
                    <Select
                            v-model="hdfsTable"
                            filterable
                            remote
                            :remote-method="getHdfsTables"
                            :loading="hdfsTable_Loading"
                            @on-change="getSql"
                            clearable>
                        <Option v-for="(option, index) in hdfsTables" :value="option.value" :key="index">
                            {{option.label}}
                        </Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <FormItem label="读取数据SQL">
            <Input v-model="reader.parameter.connection[0].querySql[0]" type="textarea" placeholder="读取数据的sql语句"
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
        <!--<FormItem label="用户名">-->
            <!--<Input v-model="reader.parameter.username" placeholder="用户名" v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
        <!--<FormItem label="密码">-->
            <!--<Input type="password" v-model="reader.parameter.password" placeholder="密码"-->
                   <!--v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
    </Form>
</template>
<script>
    export default {
        props: ["readerData"],
        data() {
            return {
                hdfsDB: "",
                dataSources: [],
                hdfsTable: "",
                tables: "",
                hdfsDB_Loading: false,
                hdfsTable_Loading: false,
                hdfsDBs: [],
                hdfsTables: [],
                tableShcame: [],
                reader: {
                    name: "mysqlreader",
                    parameter: {
                        username: "root",
                        password: "root",
                        connection: [
                            {
                                querySql: [
                                    "select db_id,on_line_flag from db_info where db_id < 10;"
                                ],
                                jdbcUrl: [
                                    "jdbc:mysql://bad_ip:3306/database"
                                ]
                            }
                        ]
                    }
                },
            }
        },
        created: function () {
            //加载父组件的传值
            if (this.readerData.name&&this.readerData.name==="mysqlreader") {
                this.reader = this.readerData;
                // this.formItem=this.readerData
            }
            this.getDataSources();
        },
        methods: {
            sendData2Parent: function () {
                this.$emit('receiveReaderData', this.reader)
                // this.$emit('receiveReaderData',this.formItem)
            },
            getDataSources(){
                const that = this;
                    this.$axios.post(this.$global.whtcServerPath + '/datax/get/datasource', {type:0}, this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.dataSources = response.data;
                        } else {
                            that.error()
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("获取数据源信息失败")
                    });
            },
            getHdfsDBs(query) {
                if (query !== '') {
                    this.hdfsDB_Loading = true;
                    const that = this;
                    //防止多次刷新
                    if (this.tableShcame.length === 0) {
                        this.$axios.get(this.$global.whtcServerPath + '/hive/schema', {}, this.$axiosConfig.axios_config)
                            .then(function (response) {
                                response = response.data;
                                if (response.status === 200) {
                                    that.tableShcame = response.data;
                                    that.hdfsDB_Loading = false;
                                    that.hdfsDBs = that.tableShcame.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                                } else {
                                    that.error()
                                }
                            })
                            .catch(function (error) {
                                that.$Message.error("获取数据库信息失败")
                            });
                    } else {
                        this.hdfsDB_Loading = false;
                        let dbs = [...that.tableShcame.values()];
                        that.hdfsDBs = dbs.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }
                } else {
                    this.hdfsDBs = [];
                }
            },
            getHdfsTables(query) {
                if (query !== '') {
                    this.hdfsTable_Loading = true;
                    setTimeout(() => {
                        if (this.tableShcame.length === 0) {
                            this.$Message.error("请先选择数据库！！")
                            return;
                        }
                        this.hdfsTable_Loading = false;
                        //取出其中的一个数据库中的表
                        const tables = this.tableShcame.filter(item => item.value === this.hdfsDB)[0].children;
                        this.hdfsTables = tables.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.hdfsTables = [];
                }
            },
            getSql(tblId) {
                //根据tblId获取sql
                const that = this;
                this.$axios.get(this.$global.whtcServerPath + '/hive/' + tblId + '/querySql', {}, this.$axiosConfig.axios_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.reader.parameter.connection[0].querySql = [response.data];
                            that.sendData2Parent();
                        } else {
                            that.$Message.error("自动生成sql失败！请自行拼装！")
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("自动生成sql失败！请自行拼装！")
                    });
            }
        }
    }
</script>
