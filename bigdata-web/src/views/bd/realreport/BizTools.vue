<template>
    <Card>
        <h1>添加过滤场次</h1>
        <Transfer
                :titles=title
                :data=sessions
                :target-keys=targetKeys
                :list-style=listStyle
                :render-format=render3
                :operations="['删除','添加']"
                filterable

                @on-change="handleChange">
            <div :style="{float: 'right', margin: '5px'}">
                <Button type="ghost" size="small" @click="reloadMockData">Refresh</Button>
            </div>
        </Transfer>
    </Card>
</template>
<script>
    export default {
        data() {
            return {
                title: ['显示场次', '过滤场次'],
                sessions: [],
                targetKeys: [],
                listStyle: {
                    width: '250px',
                    height: '900px'
                }
            }
        },
        created() {
            this.getData();
        },
        methods: {
            getData() {
                var that = this;
                let mockData = [];
                this.$axios.get(this.$global.cbr_old + "/auction/session", this.$axiosConfig.axios_config).then(function (response) {
                    if (response.status === 200) {
                        for (let s of response.data.data) {
                            mockData
                                .push({
                                    key:  s,
                                    label: s,
                                    description: "",
                                });
                        }
                        that.$axios.get(that.$global.cbr_old + "/auction/session/exclusion", that.$axiosConfig.axios_config).then(function (response) {
                            if (response.status === 200) {
                                for (let s of response.data.data) {
                                    mockData
                                        .push({
                                            key:  s,
                                            label: s,
                                            description: "",
                                        });
                                    that.targetKeys.push(s)
                                }

                            }
                        });
                    }
                });
                this.sessions = mockData;

            },
            handleChange(newTargetKeys, direction, moveKeys) {
                this.targetKeys = newTargetKeys;

                if (direction === "right") {
                    //添加过滤场次
                    var that=this;
                    this.$axios.post(this.$global.cbr_old + "/auction/session?name=" + moveKeys.join(","), this.$axiosConfig.axios_config).then(function (response) {
                        if (response.status === 200) {
                            that.$Message.success("添加过滤场次成功");
                        }else{
                            that.$Message.error("添加过滤场次失败");
                        }
                    });
                }

                if (direction === "left") {
                    //删除过滤场次
                    var that=this;
                    this.$axios.delete(this.$global.cbr_old + "/auction/session?name="+moveKeys.join(","), this.$axiosConfig.axios_config).then(function (response) {
                        if (response.status === 200) {
                            that.$Message.success("删除过滤场次成功");
                        }else{
                            that.$Message.error("删除过滤场次失败");
                        }
                    });

                }

            },
            render3(item) {
                return item.label;
            },
            reloadMockData() {
                this.getData();

            }
        }
    }
</script>

<style scoped>

</style>