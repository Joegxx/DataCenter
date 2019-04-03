<template>
    <div>

        <Button type="info" @click="init()">刷新</Button>
        <tree-table :height="height" :loading="loading" :columns="columns" @expandData="expandData"
                    :tree-structure="false"
                    :dataSource="queryData"></tree-table>
    </div>
</template>
<script>
    import TreeTable from '@components/tree/CBRTreeTable'
    import CbrData from '@cbr/util/CbrDataUtils'
    import 'element-ui/lib/theme-chalk/display.css';

    export default {
        data() {
            return {
                height:window.screen.availHeight*0.8+'',
                loading: false,
                realreportId: 'OnlineTarget',
                columns: [
                    {
                        title: '项目',
                        key: 'item',
                        width: 180
                    },
                    {
                        title: '新数据分配量',
                        key: 'newdatacount',
                        text: 'return row[key] || 0',
                        style: 'return "default"',
                    },
                    {
                        title: '数据跟踪量',
                        key: 'dataTackingCount_avg',
                        func: ' row["dataTackingCount_avg"] = row["loginCount"]===0?row["dataTackingCount"]:(row["dataTackingCount"]/row["loginCount"]).toFixed(0);' +
                        'row["_dataTackingCount_avg"] = (row["_dataTackingCount"]/row["_count"]).toFixed(0);' +
                        'row["dataTackingCount_avg"] = isNaN(row["dataTackingCount_avg"])?0:row["dataTackingCount_avg"];' +
                        'row["_dataTackingCount_avg"] = isNaN(row["_dataTackingCount_avg"])?0:row["_dataTackingCount_avg"];',

                    },
                    {
                        title: '预约检测量',
                        key: 'appointDetectionCount',
                        width: 130
                    },
                    {
                        title: '预约检测达成率',
                        key: 'appointDetectionCount_target',
                        func: ' let k="appointDetectionCount"; row[k]=isNaN(row[k])?0:row[k] ; row["appointDetectionCount_target"]= (!row["_"+k] || row["_"+k]===0) ? 0.00:(row[k]/row["_"+k]*100).toFixed(2)',
                        style: 'return "progress"',


                    },
                    {
                        title: '平台竞拍量',
                        key: 'auctioncount',
                        text: 'return row[key] || 0',
                        style: 'return "default"',

                    },
                    {
                        title: '预约成交量',
                        key: 'notransactionCount',


                    },
                    {
                        title: '预约成交达成率',
                        key: 'notransactionCount_target',
                        func: ' let k="notransactionCount";row[k]=isNaN(row[k])?0:row[k] ; row["notransactionCount_target"]= (!row["_"+k] || row["_"+k]===0) ? 0.00:(row[k]/row["_"+k]*100).toFixed(2)',
                        style: 'return "progress"',

                    },
                    {
                        title: '预约成交率',
                        key: 'reservationRate',
                        text: ' return (!row["auctioncount"] || row["auctioncount"]===0) ? "0.00%":(row["notransactionCount"]/row["auctioncount"]*100).toFixed(2)+"%"',
                        style: 'return "default"',

                    },
                    {
                        title: '预约成交服务费总收入',
                        key: 'noserviceCharge',
                        width: 130

                    },
                    {
                        title: '预收收入达成率',
                        key: 'noserviceCharge_target',
                        func: ' let k="noserviceCharge";row[k]=isNaN(row[k])?0:row[k] ; row["noserviceCharge_target"]=(!row["_"+k] || row["_"+k]===0) ? 0.00:(row[k]/row["_"+k]*100).toFixed(2)',
                        style: 'return "progress"',

                    },
                    {
                        title: '车均预约成交服务费收入',
                        key: 'noserviceChargeAve',
                        func: 'let k ="noserviceChargeAve"; row[k] = row["notransactionCount"]===0?0:(row["noserviceCharge"]/row["notransactionCount"]).toFixed(0);' +
                        'row["_"+k] = row["_notransactionCount"]===0?0:(row["_noserviceCharge"]/row["_notransactionCount"]).toFixed(0);' +
                        'row["k"] = isNaN(row["k"])?0:row["k"];' +
                        'row["_"+k] = isNaN(row["_"+k])?0:row["_"+k];',
                        width: 130
                    }

                ],
                queryData: [],
            }
        },
        methods: {
            async expandData(data, scope) {
                await CbrData.queryData(this.queryData, this.realreportId, scope, 3);
            },
            async init() {
                this.queryData = [];
                await CbrData.queryData(this.queryData, this.realreportId, {}, 3)
            }
        },
        async created() {
            await this.init();
        },
        components: {TreeTable}

    }
</script>
