<template>
    <div>
        <Row>
            <Col span="3">
                <Steps :current="current" direction="vertical">
                    <Step v-for="(item,index) in steps" :title="item.title" :content="item.content" :key="index"></Step>
                </Steps>
                <Button type="success" @click="preview()">预览</Button>
            </Col>
            <Col span="21">
                <define-report v-model="reportData" v-if="current===0"  @nestStep="nextStep"></define-report>
                <define-report-columns v-model="reportData" v-if="current===1" @nestStep="nextStep" @preStep="preStep"></define-report-columns>
                <define-query-express :realreportId="reportData.realreportId" :dataBases="dataBases" v-model="reportData.querySql"
                                      :columns="reportData.columns" v-if="current===2" @nestStep="nextStep" @preStep="preStep"></define-query-express>
                <cbr-params :select-params="selectParams" :query-sqls="reportData.querySql" :realreportId="reportData.realreportId"
                            v-model="reportData.cbrParams"
                v-if="current===3" @preStep="preStep" @nestStep="nextStep"></cbr-params>
                <cbr-download :dataBases="dataBases" v-if="current===4" v-model="reportData.download"  @preStep="preStep"></cbr-download>
            </Col>
        </Row>
    </div>
</template>
<script>
    import DefineReport from '@cbr/create/DefineReport.vue'
    import DefineQueryExpress from '@cbr/create/DefineQueryExpress.vue'
    import CbrDownload from '@cbr/create/CBRDownload.vue'
    import CbrConfig from '@cbr/CbrConfig'
    import CbrParams from '@cbr/create/CbrParams'
    import CbrData from '@cbr/util/CbrData'
    import CbrDataUtils from '@cbr/util/CbrDataUtils'
    import DefineReportColumns from "@/views/cbr/create/DefineReportColumns";


    export default {
        components: {DefineReportColumns, DefineReport, DefineQueryExpress, CbrParams, CbrDownload},
        props: {
            cbr: {
                type: Object,
                default() {
                    return {}
                }
            },
            editMode:{
                type: Boolean,
                default:()=>false
            }
        },
        created() {
            //session保持
            this.refreshSessionEvent = CbrDataUtils.refreshSession();
            //判断是编辑还是创建
            if (this.editMode) {
                //判断是否有下载项
                if (!this.cbr.download) {
                    this.cbr.download = {};
                }
                if (!this.cbr.download.sqls || this.cbr.download.sqls.length === 0) {
                    this.cbr.download.sqls = [
                        {datasource: "", sql: "", name: '999'},
                        {datasource: "", sql: "", name: '_999'},
                    ]
                }
                if (!this.cbr.download.columns) {
                    this.cbr.download.columns = []
                }
                //编辑直接将报表数据加载到页面
                this.reportData = this.cbr;
            } else {
                //创建则将页面数据初始化
                this.reportData = new CbrData();
            }
        },
        data() {
            return {
                dataBases: CbrConfig.dataBases,
                selectParams: CbrConfig.selectParams,
                reportData: {},
                steps: CbrConfig.createSteps,
                current: 0,
                refreshSessionEvent:-1
            }
        },
        destroyed(){
            window.clearInterval(this.refreshSessionEvent);
        },
        methods: {
            preview() {
                let cbrData = this.$store.state.cbr.cbrData;
                console.log(cbrData);
            },
            nextStep() {
                if (this.current < this.steps.length) {
                    this.current++;
                }
                this.computedSteps();
            },
            preStep() {
                if (this.current > 0) {
                    this.current--;
                }
                this.computedSteps();
            },
            computedSteps() {
                this.steps.map(item => {
                    let index = this.steps.indexOf(item);
                    if (index === this.current) {
                        item.title = "进行中"
                    }
                    if (index < this.current) {
                        item.title = "已完成"
                    }
                    if (index > this.current) {
                        item.title = "待进行"
                    }
                })
            }
        }

    }
</script>