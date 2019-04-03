<template>
    <div id="cbrTreeTbl">
        <span v-for="(item,index) in cbrParams" :key="index">{{item.label}}:
            <!--是输入框-->
            <component v-if="item.type==='Input'" v-model="item.value" :style="item.style" :is="item.type"></component>
            <!--是时间选择框-->
            <component v-if="item.type==='DatePicker'" format="yyyy-MM-dd HH:mm:ss" :style="item.style" :is="item.type"
                       type="datetime" v-model="item.value"></component>
            <!--选择框-->
            <component v-if="item.type==='CbrSelect'" :item="item" :valueList="item.valueList" :style="item.style"
                       :is="item.type"></component>
            <!--多选框-->
            <component v-if="item.type==='CbrMultiSelect'" :valueSelected="item.value" :valueList="item.valueList"
                       :style="item.style" :is="item.type"></component>
        </span>
        <Button type="info" @click="init()">刷新</Button>
        <b v-if="latestTime&&latestTime !==''" style="font-size: larger;color: red">
            <Icon type="clock"></Icon>
            {{ latestTime }}</b>
        <Button type="info" v-if="downloadAble" @click="downloadData()">数据下载</Button>

        <!--<div style="float: right;color: #0f72ff">-->
        <!--<fullscreen v-model="fullscreen" :element-doc="elementDoc"></fullscreen>-->
        <!--</div>-->
        <tree-table :height="height" :loading="loading" :columns="columns" @expandData="expandData"
                    :tree-structure="false"
                    :dataSource="queryData"></tree-table>

        <Modal
                width="500"
                v-model="downloadPage"
                title="数据导出">
            <download-btn v-if="downloadPage" :download="download"></download-btn>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
    import TreeTable from '@components/tree/CBRTreeTable'
    import CbrDataUtils from '@cbr/util/CbrDataUtils'
    import 'element-ui/lib/theme-chalk/display.css';
    import CbrAjax from '@cbr/util/CbrAjax'
    import DownloadBtn from './DownloadBtn'
    import Download from './Download'
    import CbrSelect from '@components/basic/CbrSelect'
    import CbrMultiSelect from '@components/basic/CbrMultiSelect'
    import Fullscreen from '@components/fullscreen'

    export default {
        data() {
            return {
                height: window.screen.height * 0.7,
                loading: false,
                downloadPage: false,
                downloadAble: false,
                download: {},
                cbrParams: [],
                realreportId: '',
                realreportName: '',
                columns: [],
                cityNames: [],
                isFullscreen: false,
                level: 0,
                queryData: [],
                dimensionCols: [],
                latestTime: "",
                elementDoc: {},
                fullscreen: false,
                refreshSessionEvent: -1
            }
        },
        methods: {
            async downloadData() {

                this.download = new Download(this.realreportId, this.realreportName, this.columns, this.dimensionCols, this.cbrParams);
                this.downloadPage = true
            },
            async expandData(data, scope) {
                await CbrDataUtils.queryData(this.queryData, this.realreportId, scope, this.level - 1, this.cbrParams);
            },
            async init() {
                if (this.columns.length === 0) {
                    this.realreportId = this.$route.params.realreportId;
                    this.queryData = [];
                    //获取报表骨架
                    let framework = await CbrAjax.get('framework?realreportId=' + this.realreportId);
                    let cbrData = framework.data.data;
                    this.columns = cbrData.columns;
                    //初始化参数值
                    if (cbrData.cbrParams && cbrData.cbrParams.length > 0) {
                        cbrData.cbrParams.forEach(item => {
                            if (item.type === "CbrSelect" || item.type === "CbrMultiSelect") {

                                let f = new Function('item', item.value);
                                f(item);
                            } else {
                                let f = new Function('return ' + item.value);
                                f();
                                item.value = f()
                            }
                        });
                        this.cbrParams = cbrData.cbrParams;
                    }
                    this.level = cbrData.level;
                    this.realreportName = cbrData.realreportName;
                }
                this.queryData = [];
                this.cityNames = await CbrDataUtils.queryData(this.queryData, this.realreportId, {}, this.level - 1, this.cbrParams);
                if (this.queryData && this.queryData.length > 0) {
                    this.latestTime = this.queryData[0].latestTime;
                }
                //查看下载数据的字段
                let res = await CbrAjax.get("/download/" + this.realreportId);
                try {
                    this.dimensionCols = res.data.data.columns;
                    this.downloadAble = this.dimensionCols.length > 0
                } catch (e) {
                    console.log("不可下载！！", e)
                }

            },
        },

        async created() {
            // document.domain = "mychebao.com";
            this.refreshSessionEvent = CbrDataUtils.refreshSession();
            await this.init();
        },
        destroyed() {
            window.clearInterval(this.refreshSessionEvent);
        },
        watch: {
            async '$route'() {
                await this.init();
            }
        },
        mounted() {
            this.elementDoc = document.getElementById('cbrTreeTbl')
        },
        components: {TreeTable, DownloadBtn, CbrSelect, CbrMultiSelect, Fullscreen}

    }
</script>
