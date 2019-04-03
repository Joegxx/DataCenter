<template>
    <div>
        <span>任务名称:</span><Input v-model="job_info.jobName" placeholder="任务名称" style="width: 300px"></Input>
        <span >数据输入：</span>
        <Select v-model="job_info.input_type" style="width:200px" @on-change="router_to_input" label-in-value>
            <Option v-for="item in reader" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <span >数据输出：</span>
        <Select v-model="job_info.output_type" style="width:200px" @on-change="router_to_output" label-in-value>
            <Option v-for="item in writer" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <span>任务描述:</span><Input v-model="job_info.jobDesc" type="textarea" placeholder="任务描述" style="width: 600px"></Input>
        <Row>
            <Col span="12">
                <Row>
                    <Col span="20">
                        <h2>{{input_data}}</h2>
                        <reader-mysql :reader-data="reader_data" v-on:receiveReaderData="handlerReaderDate" v-if="job_info.input_type==='mysqlreader'"></reader-mysql>
                        <reader-hdfs :reader-data="reader_data" v-on:receiveReaderData="handlerReaderDate" v-if="job_info.input_type==='hdfsreader'"></reader-hdfs>
                        <reader-hbase :reader-data="reader_data" v-on:receiveReaderData="handlerReaderDate" v-if="job_info.input_type==='hbasereader'"></reader-hbase>
                    </Col>
                </Row>

            </Col>
            <Col span="12">
                <Row>
                    <Col span="20">
                        <h2>{{output_data}}</h2>
                        <writer-mysql :writer-data="writer_data" v-on:receiveWriterData="handlerWriterDate" v-if="job_info.output_type==='mysqlwriter'"></writer-mysql>
                        <writer-hdfs :writer-data="writer_data" v-on:receiveWriterData="handlerWriterDate" v-if="job_info.output_type==='hdfswriter'"></writer-hdfs>
                        <writer-hbase :writer-data="writer_data" v-on:receiveWriterData="handlerWriterDate" v-if="job_info.output_type==='hbasewriter'"></writer-hbase>
                    </Col>
                </Row>
            </Col>
        </Row>
        <submit style="float: right" :reader_data="reader_data" :writer_data="writer_data" :job_info="job_info" v-if="job_info.input_type&&job_info.output_type"  type="primary">提交</submit>
    </div>
</template>
<script>
    import reader_mysql from './reader/mysql.vue'
    import reader_hbase from './reader/hbase.vue'
    import reader_hdfs from './reader/hdfs.vue'
    import writer_mysql from './writer/mysql.vue'
    import writer_hbase from './writer/hbase.vue'
    import writer_hdfs from './writer/hdfs.vue'
    import submit from './submit.vue'

    export default {
        props: ['value','jobInfo', 'readerData','writerData'],
        data() {
            return {
                job_info:{
                    jobDesc: '',
                    jobName: '',
                    input_type: '',
                    output_type: '',
                },
                reader_data: {},
                writer_data: {},
                input_data: '',
                output_data: '',
                reader: [
                    {
                        value: 'mysqlreader',
                        label: 'Mysql数据库'
                    },
                    {
                        value: 'hdfsreader',
                        label: 'HDFS'
                    },
                    {
                        value: 'hbasereader',
                        label: 'Hbase'
                    }
                ],
                writer: [
                    {
                        value: 'mysqlwriter',
                        label: 'Mysql数据库'
                    },
                    {
                        value: 'hdfswriter',
                        label: 'HDFS'
                    },
                    {
                        value: 'hbasewriter',
                        label: 'Hbase'
                    }
                ],

            }
        },
        methods: {
            router_to_input: function (ele) {
                // this.reader_data="";
                this.input_data = "输入：" + ele.label;
                this.job_info.input_type = ele.value

            },
            router_to_output: function (ele) {
                // this.writer_data="";
                this.output_data = "输出：" + ele.label;
                this.job_info.output_type = ele.value;

            },
            //监听读数据模块传来的数据
            handlerReaderDate:function (data) {
                this.reader_data=data
            },
            //监听写数据模块传来的数据
            handlerWriterDate:function (data) {
                this.writer_data=data
            }
        },
        mounted:function(){
            //接受父组件的传值如果jobInfo有值就复制给job_info
            if(this.jobInfo){
                this.job_info=this.jobInfo
            }
            if(this.readerData){
                this.reader_data=this.readerData
            }
            if(this.writerData){
                this.writer_data=this.writerData
            }

        },
        components: {
            //加载读取数据所需的模块
            readerMysql: reader_mysql,
            readerHdfs: reader_hdfs,
            readerHbase: reader_hbase,
            //加载写出数据所需的模块
            writerMysql: writer_mysql,
            writerHdfs: writer_hdfs,
            writerHbase: writer_hbase,
            //加载提交模块
            submit: submit,
        }
    }
</script>
