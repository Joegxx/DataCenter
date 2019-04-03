<template>
    <Form :model="formItem" :label-width="100">
        <!--<FormItem label="HDFS连接地址" prop="defaultFS">-->
            <!--<Input v-model="formItem.parameter.defaultFS" placeholder="HDFS连接地址 例：xxx:port"-->
                   <!--v-on:on-change="sendData2Parent"/>-->
        <!--</FormItem>-->
        <FormItem label="数据库连接">
            <Select v-model="formItem.parameter.dataSource" style="width:200px" v-on:on-change="sendData2Parent">
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
            <Tag v-for="(item,index) in formItem.parameter.column" color="blue" :key="item.index+'='+item.type"
                 :name="index" closable @on-close="handleClose">{{ item.index+'='+item.type }}
            </Tag>
        </FormItem>
        <FormItem label="字段分隔符" prop="fieldDelimiter">
            <Input v-model="formItem.parameter.fieldDelimiter" placeholder="HDFS文件中的分隔符"
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="读取路径" prop="path">
            <Input v-model="formItem.parameter.path" placeholder="HDFS文件路径中的文件路径" v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="读取文件格式">
            <Select v-model="formItem.parameter.fileType">
                <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="字符编码" prop="encoding">
            <Input v-model="formItem.parameter.encoding" placeholder="HDFS文件的编码，默认值：utf-8 "
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
    </Form>
</template>
<script>
    import HdfsReaderUtil from '@datax/reader/HdfsReaderUtil'
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
                types: [
                    {
                        value: 'text',
                        label: 'textfile文件格式'
                    },
                    {
                        value: 'orc',
                        label: 'orcfile文件格式'
                    },
                    {
                        value: 'rc',
                        label: 'rcfile文件格式'
                    },
                    {
                        value: 'csv',
                        label: '普通hdfs文件格式'
                    },
                    {
                        value: 'seq',
                        label: 'sequence file文件格式'
                    }
                ],
                formItem: {
                    name: "hdfsreader",
                    parameter: {
                        path: "/user/hive/warehouse/mytable01/*",
                        defaultFS: "hdfs://10.100.16.45:8020",
                        column: [
                            {
                                index: 0,
                                type: "long"
                            },
                            {
                                index: 1,
                                type: "boolean"
                            },
                            {
                                type: "string",
                                value: "hello"
                            },
                            {
                                index: 2,
                                type: "double"
                            }
                        ],
                        fileType: "orc",
                        encoding: "UTF-8",
                        fieldDelimiter: "\u0001"
                    },
                }
            }
        },
        created() {
            //加载父组件的传值
            if (this.readerData.name&&this.readerData.name==="hdfsreader") {
                this.formItem = this.readerData
            }
            this.getDataSources();
        },
        methods: {
            getDataSources(){
                const that = this;
                this.$axios.post(this.$global.whtcServerPath + '/datax/get/datasource', {type:1}, this.$axiosConfig.json_config)
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
                this.$emit('receiveReaderData', this.formItem)
            },
            handleClose(event, index) {
                this.formItem.parameter.column.splice(index, 1);
                this.sendData2Parent();
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
                        if(this.tableShcame.length===0){
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
                if(!this.hdfsTable||this.hdfsTable===""){
                    this.formItem.parameter.column=[];
                   return
                }
                const that = this;
                this.$axios.get(this.$global.whtcServerPath + '/hive/' + that.hdfsTable + '/cols', {}, this.$axiosConfig.axios_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.formItem.parameter.column = response.data.map(item=>{
                                return {
                                   index: item.index,
                                   type: HdfsReaderUtil.getDataXCloType(item.value),
                                }
                            });
                            that.sendData2Parent();
                        } else {
                            that.error()
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("获取数据库字段信息失败")
                    });
            },
        }
    }

</script>
