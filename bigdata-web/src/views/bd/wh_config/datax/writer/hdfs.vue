<template>
    <Form :model="formItem" :label-width="100">
        <!--<FormItem label="HDFS连接地址">-->
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
            <Tag v-for="(item,index) in formItem.parameter.column" color="blue" :key="item.name+'='+item.type"
                 :name="index" closable @on-close="handleClose">{{ item.name+'='+item.type }}
            </Tag>
        </FormItem>
        <FormItem label="字段分隔符">
            <Input v-model="formItem.parameter.fieldDelimiter" placeholder="HDFS文件中的分隔符"
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="写入路径">
            <Input v-model="formItem.parameter.path" placeholder="HDFS文件路径中的文件路径" v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="文件名称">
            <Input v-model="formItem.parameter.fileName" placeholder="HDFS文件名称" v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="写入文件格式" prop="fileType">
            <Select v-model="formItem.parameter.fileType" v-on:on-change="sendData2Parent">
                <Option v-for="item in types" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
        <FormItem label="字符编码">
            <Input v-model="formItem.parameter.encoding" placeholder="HDFS文件的编码，默认值：utf-8 "
                   v-on:on-change="sendData2Parent"/>
        </FormItem>
        <FormItem label="写入模式">
            <Select v-model="formItem.parameter.writeMode" v-on:on-change="sendData2Parent">
                <Option v-for="item in modes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
        </FormItem>
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
                types: [
                    {
                        value: 'text',
                        label: 'textfile文件格式'
                    },
                    {
                        value: 'orc',
                        label: 'orcfile文件格式'
                    }
                ],
                addMode: "",
                columnKey: "",
                columnValue: "",
                modes: [
                    {
                        value: 'append',
                        label: '直接使用filename写入'
                    },
                    {
                        value: 'nonConflict',
                        label: 'nonConflict，如果目录下有fileName前缀的文件，直接报错'
                    }
                ],
                formItem: {
                    name: "hdfswriter",
                    parameter: {
                        defaultFS: "xxx:port",
                        fileType: "orc",
                        path: "/user/hive/warehouse/writerorc.db/orcfull",
                        fileName: "xxxx",
                        column: [
                            {
                                name: "col1",
                                type: "TINYINT"
                            },
                            {
                                name: "col2",
                                type: "SMALLINT"
                            },
                            {
                                name: "col3",
                                type: "INT"
                            },
                            {
                                name: "col4",
                                type: "BIGINT"
                            },
                            {
                                name: "col5",
                                type: "FLOAT"
                            },
                            {
                                name: "col6",
                                type: "DOUBLE"
                            },
                            {
                                name: "col7",
                                type: "STRING"
                            },
                            {
                                name: "col8",
                                type: "VARCHAR"
                            },
                            {
                                name: "col9",
                                type: "CHAR"
                            },
                            {
                                name: "col10",
                                type: "BOOLEAN"
                            },
                            {
                                name: "col11",
                                type: "date"
                            },
                            {
                                name: "col12",
                                type: "TIMESTAMP"
                            }

                        ],
                        writeMode: "append",
                        fieldDelimiter: "\u0001",
                        encoding: "utf-8"
                        // "compress":"NONE"
                    }
                }
            }

        },
        computed:{

        },
        created: function () {
            //加载父组件的传值
            if (this.writerData.name&&this.writerData.name==="hdfswriter") {
                this.formItem = this.writerData
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
                this.$emit('receiveWriterData', this.formItem)
            },
            handleClose (event, index) {
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
                                    name: item.label,
                                    type: item.value,
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
