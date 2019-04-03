<template>
    <div>
        <div style="height: 550px">
            <!--<tables ref="selection"   border :searchable="searchable" height="500"-->
            <!--:columns="columns" v-model="data"></tables>-->
            <simple-table serial-able="true" @reachBottom="reachBottom" v-if="showTable" ref="selection"
                          :columns="columns" v-model="data"
                          height="500"></simple-table>
            <TextInfo v-if="error" :msg="errorMsg"></TextInfo>
            <Spin v-if="spinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </div>
        <div style="height: 35px" v-if="taskcreateable">
            <Button  @click="exportCsv()">导出当前数据</Button>
            <Button  @click="()=>this.createTask=true">创建下载任务</Button>
            <span style="float: right" v-if="total !== 0">返回{{ total }}条数据</span>
            <Modal
                    v-model="createTask"
                    title="创建下载任务">
                <download-page ref="download" :db="db" :sql="sql"></download-page>
                <div slot="footer">
                    <Button type="success" size="large" long  @click="()=>this.$refs.download.submit()">提交</Button>
                </div>
            </Modal>
        </div>
    </div>
</template>


<script>
    // import tables from '@components/tables/tables'
    import util from '@/libs/util'
    import SimpleTable from '@components/simpletable/SimpleTable'
    import exportUtils from '@dbms/util/exportUtils';
    import TextInfo from '@components/text/TextInfo'
    import DownloadPage from './DownloadPage'
    import QueryData from './query_utils'


    export default {
        name: "ResultData",
        props: ["db"],
        computed: {},
        data: function () {
            return {
                data: [],
                columns: [],
                searchable: true,
                pageSize: 300,
                downloadInfo: "下载所有数据",
                errorMsg: "",
                error: false,
                fileName: "data.csv",
                sql: "",
                showPage: false,
                selectNext: false,
                showTable: false,
                loadedAllData: false,
                spinShow: false,
                createTask: false,
                taskcreateable: false,
                total: 0,
                currentPage: 0,
                midTableData: [],
                insideTableData: [],
            }
        },
        methods: {
            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },
            changePage(num) {
                this.executeSqlData(num, this.pageSize);
            },
            exportCsv() {
                let params = {
                    columns: this.columns,
                    data: this.data,
                    fileName: this.fileName
                };
                exportUtils.exportCsv(params)
            },
            reachBottom(loading) {
                //不再支持多次查询
                // this.currentPage++;
                // this.executeSqlData(this.currentPage, this.pageSize, loading);
            },
            executeSql(sql) {
                this.taskcreateable = false;
                this.showTable = false;
                this.error = false;
                this.loadedAllData = false;
                this.selectNext = false;
                this.sql = sql;
                this.currentPage = 1;
                this.columns = [];
                this.data = [];
                this.executeSqlData(1, this.pageSize, this.spinShow);
            },
             async executeSqlData(page, size, loading) {
                //判断数据是否加载完
                if (this.loadedAllData) {
                    return;
                }
                this.total = 0;
                let response = await QueryData.query(this.db,this.sql);

                 this.sendExecuteResult({
                     status: response.status
                 });
                 if (response.status === 200) {
                     this.taskcreateable = true;
                     let len_data = response.data.length;
                     if (len_data > 0) {
                         this.total = len_data;
                         this.data = this.data.concat(response.data);
                     } else {
                         this.$Message.success('已经加载所有数据!');
                         this.loadedAllData = true;
                     }
                     if (!this.columns || this.columns.length === 0) {
                         this.columns = util.getColumns(response.data);
                     }
                     this.showTable = true;
                 } else {
                     this.error = true;
                     this.errorMsg = response.msg;
                 }
            },
            sendExecuteResult(result) {
                this.$emit("getExecuteResult", result)
            },
        },

        mounted() {
        },

        watch: {
            columns(columns) {
            },
            data() {
            }
        },
        components: {SimpleTable, TextInfo, DownloadPage}
    }
</script>

<style scoped>
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>