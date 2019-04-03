<template>
    <div>
        <h1 v-if="started" style="color: green">正在接受数据</h1>
        <h1 v-if="!started" style="color: red">停止接受数据</h1>
        <Button type="primary" shape="circle" @click="start">开始接受</Button>
        <Button type="primary" shape="circle" @click="over">停止接受</Button>
        <Button type="primary" shape="circle" @click="exportCsv">导出当前数据</Button>
        <Table ref="tbl" height="600" border :columns="columns2" :data="data4"></Table>
    </div>
</template>
<script>
    export default {
        computed: {
            columns2() {
                return this.getColumns(this.data4)
            }
        },
        data() {
            return {
                ws: {},
                started: false,
                // columns2: [
                //     {
                //         title: 'Name',
                //         key: 'name',
                //         width: 100,
                //         fixed: 'left'
                //     },
                //     {
                //         title: 'Age',
                //         key: 'age',
                //         width: 100
                //     },
                //     {
                //         title: 'Province',
                //         key: 'province',
                //         width: 100
                //     },
                //     {
                //         title: 'City',
                //         key: 'city',
                //         width: 100
                //     },
                //     {
                //         title: 'Address',
                //         key: 'address',
                //         width: 200
                //     },
                //     {
                //         title: 'Postcode',
                //         key: 'zip',
                //         width: 100
                //     },
                //     {
                //         title: 'Action',
                //         key: 'action',
                //         fixed: 'right',
                //         width: 120,
                //         render: (h, params) => {
                //             return h('div', [
                //                 h('Button', {
                //                     props: {
                //                         type: 'text',
                //                         size: 'small'
                //                     }
                //                 }, 'View'),
                //                 h('Button', {
                //                     props: {
                //                         type: 'text',
                //                         size: 'small'
                //                     }
                //                 }, 'Edit')
                //             ]);
                //         }
                //     }
                // ],
                data4: []
            }
        },
        methods: {
            websocket() {
                if (this.started) {
                    this.$Message.warn("已经开启了！！");
                    return;
                }
                this.$Message.success("操作成功");
                this.ws = new WebSocket(this.$global.crawlWsUrl);
                this.started = true;
                let ws = this.ws;
                ws.onopen = () => {
                    ws.send("open...");
                };
                this.ws.onmessage = evt => {
                    let data = evt.data;
                    console.log(evt);
                    this.data4 = this.data4.concat(JSON.parse(data));
                    if (data.status === 200) {

                    } else {

                    }
                };
                ws.onclose=()=>{
                    console.log("closing");
                    this.started=false;
                }
            },
            over() {
                console.log("closing");
                if (this.started) {
                    this.ws.close();
                }

                this.started = false;
                this.$Message.success("操作成功")

            },
            getColumns(data) {
                let cols = [];
                let col;
                if (data && data.length > 0) {
                    let datum = data[0];
                    for (let item in datum) {
                        col = {
                            title: item,
                            key: item,
                            searchable: true,
                            ellipsis: true,
                        };
                        cols.push(col)
                    }
                }
                return cols;
            },
            start() {
                this.websocket();
                const that = this;
                this.$axios.post(this.$global.msg + '/crawl/msg/open', {}, this.$axiosConfig.axios_config)
                    .then(function (response) {
                        that.$Message.success("操作成功")
                    })
                    .catch(function (error) {
                        // that.$Message.error("操作失败")
                    });
            },
            exportCsv() {
                let exportData = this.data4;
                this.data4 = [];
                this.$refs.tbl.exportCsv({data: exportData});
            }
        },
        created() {

        },
        beforeDestroy() {
            this.over()
        }
    }
</script>
