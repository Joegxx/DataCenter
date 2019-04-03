<template>
    <Form :model="formItem" :label-width="100">
        <!--<FormItem label="数据库连接地址">-->
            <!--<Input v-model="formItem.parameter.connection[0].jdbcUrl" placeholder="Mysql数据库连接地址,例:127.0.0.1:3306/test"-->
                   <!--v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
        <FormItem label="数据源连接">
            <Select v-model="formItem.parameter.dataSource" style="width:200px" v-on:on-change="sendData2Parent">
                <Option v-for="item in dataSources" :value="item.name" :key="item.name">{{ item.name }}</Option>
            </Select>
        </FormItem>
        <FormItem label="数据写入前SQL">
            <Input v-model="formItem.parameter.preSql[0]" placeholder="写入数据到目的表前，会先执行这里的标准语句"
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="数据写入后SQL">
            <Input v-model="formItem.parameter.postSql[0]" placeholder="写入数据到目的表后，会执行这里的标准语句"
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="数据写入模式">
            <Select v-model="formItem.parameter.writeMode" v-on:on-change="sendData2Parent">
                <Option v-for="item in modes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="表名">
            <Input v-model="formItem.parameter.connection[0].table[0]" placeholder="表名"
                   v-on:on-change="sendData2Parent"/>
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
                            @on-change="getColumn"
                            clearable>
                        <Option v-for="(option, index) in hdfsTables" :value="option.value" :key="index">
                            {{option.label}}
                        </Option>
                    </Select>
                </FormItem>
            </Col>
        </Row>
        <FormItem label="添加/删除字段名称">
            <Tag v-for="item in formItem.parameter.column" color="blue" :key="item" :name="item" closable
                 @on-close="handleClose">{{ item }}
            </Tag>
            <!--<CheckboxGroup v-model="formItem.parameter.column" v-on:on-change="sendData2Parent">-->
                <!--<Tag v-for="item in formItem.parameter.column" color="blue" :key="item" :name="item" closable-->
                     <!--@on-close="handleClose">{{ item }}-->
                <!--</Tag>-->
                <!--<Input style="width: 100px" size="small" v-if="addMode==='add'" v-model="columnTmp" placeholder="回车确认"-->
                       <!--v-on:on-enter="addColumn"/>-->
                <!--<Icon v-if="addMode!=='add'" @click.native="addMode = 'add'" color="green" type="plus-circled"></Icon>-->
            <!--</CheckboxGroup>-->
        </FormItem>
        <!--<FormItem label="用户名">-->
            <!--<Input v-model="formItem.parameter.username" placeholder="用户名" v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
        <!--<FormItem label="密码">-->
            <!--<Input type="password" v-model="formItem.parameter.password" placeholder="密码"-->
                   <!--v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
    </Form>
</template>
<script>
    export default {
        props: ["writerData"],
        data() {
            return {
                hdfsDB: "",
                dataSources:[],
                hdfsTable: "",
                tables: "",
                hdfsDB_Loading: false,
                hdfsTable_Loading: false,
                hdfsDBs: [],
                hdfsTables: [],
                tableShcame: [],
                addMode: "",
                columnTmp: "",
                formItem: {
                    name: "mysqlwriter",
                    parameter: {
                        writeMode: "insert",
                        username: "root",
                        password: "root",
                        column: [
                            "id",
                            "name"
                        ],
                        preSql: [],
                        postSql: [],
                        connection: [
                            {
                                jdbcUrl: "jdbc:mysql://127.0.0.1:3306/datax?useUnicode=true&characterEncoding=gbk",
                                table: [
                                    "test"
                                ]
                            }
                        ]
                    }
                },
                modes: [
                    {
                        value: 'insert',
                        label: 'insert'
                    },
                    {
                        value: 'replace',
                        label: 'replace'
                    },
                    {
                        value: 'update',
                        label: 'update'
                    }
                ]
            }
        },
        created: function () {
            //加载父组件的传值
            if (this.writerData.name && this.writerData.name === "mysqlwriter") {
                this.formItem = this.writerData
            }
            this.getDataSources();
        },
        methods: {
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
            sendData2Parent: function () {
                this.$emit('receiveWriterData', this.formItem)
            },
            handleClose(event, name) {
                const index = this.formItem.parameter.column.indexOf(name);
                this.formItem.parameter.column.splice(index, 1);
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
                        that.hdfsDB_Loading = false;
                        that.hdfsDBs = that.tableShcame.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
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
            getColumn() {
                if (!this.hdfsTable || this.hdfsTable === "") {
                    this.formItem.parameter.column = [];
                    return
                }
                const that = this;
                this.$axios.get(this.$global.whtcServerPath + '/hive/' + that.hdfsTable + '/cols', {}, this.$axiosConfig.axios_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.formItem.parameter.column = response.data.map(item => {
                                return  item.label
                            });
                            that.sendData2Parent();
                        } else {
                            that.error()
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("获取数据库字段信息失败")
                    });
            }
        }
    }
</script>
