<template>
    <div>
        <DatePicker v-model="params.overTime" type="datetime" placeholder="场次结束时间" style="width: 200px"  ></DatePicker>
        <Button @click="queryData" type="primary" shape="circle"><i class="fa fa-refresh" aria-hidden="true"></i>刷新</Button>
        <tree-table :loading="loading" height="500" :columns="columns" :tree-structure="true"
                    :data-source="data"></tree-table>
    </div>
</template>
<script>
    import TreeTable from '@components/tree/TreeTable'

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '项目',
                        key: 'item'
                    },
                    {
                        title: '出价商户',
                        key: 'bidBuyers'
                    },
                    {
                        title: '出价次数',
                        key: 'bidCounts'
                    },
                    {
                        title: '本地出价',
                        key: 'sameCityCounts'
                    },
                    {
                        title: '异地出价',
                        key: 'diffCityCounts'
                    },
                    {
                        title: '户均',
                        key: 'bidAvg',
                        func: 'row["bidAvg"]=(row["bidCounts"]/row["bidBuyers"]).toFixed(2);row["_bidAvg"]=(row["_bidCounts"]/row["_bidBuyers"]).toFixed(2)'
                    }
                ],
                data: [],
                loading: false,
                params: {
                    overTime: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000-1),
                }
            }
        },
        methods: {
            queryData() {
                let that = this;
                this.loading = true;
                //查询数据
                this.$axios.post(this.$global.cbr_old + '/auction/bid/avg', this.params, this.$axiosConfig.normal_config)
                    .then(function (response) {
                        that.loading = false;
                        response = response.data;
                        if (response.status === 200) {
                            that.data = response.data;
                            that.$Message.success("获取数据成功")
                        } else {
                            that.$Message.error("获取数据失败")
                        }
                    })
                    .catch(function () {
                        that.loading = false;
                        that.$Message.error("获取数据失败")
                    });
            }
        },
        components: {TreeTable},
        mounted() {
            this.queryData()
        },

    }
</script>
