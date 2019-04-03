<template>
    <div>
        <div style="z-index:10;margin-left:0px;position: fixed">
            <div class="translucent">
                <Tooltip content="刷新" placement="right">
                    <Button size="small" type="primary" @click="refresh">
                        <Icon size="18" type="refresh"></Icon>
                    </Button>
                </Tooltip>
            </div>
            <div style="margin-top: 5px;">
                <Poptip trigger="hover" placement="right" width="600">
                    <Button size="small" type="primary" class="translucent">
                        <Icon size="18" type="funnel"></Icon>
                    </Button>
                    <div slot="content">
                        <div style="height: 500px">
                            <h3>筛选条件</h3><span>不选默认为全部</span>
                            <Form :label-width="80">
                                <FormItem label="维度">
                                    <Select v-model="condition.dimension">
                                        <Option v-for="item in dimensions" :value="item.value" :key="item.value">{{
                                            item.label}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="场次">
                                    <Select v-model="condition.sessions" filterable multiple label-in-value
                                            @on-change="(value)=> this.sessionTmp=value">
                                        <Option v-for="item in sessionList" :value="item.label" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="大区">
                                    <Select v-model="condition.region" filterable multiple label-in-value
                                            @on-change="changeRegion">
                                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="维护城市">
                                    <Select v-model="condition.city" filterable multiple label-in-value
                                            @on-change="(value)=> this.cityTmp=value">
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
                                            item.label
                                            }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="出价时间">
                                    <Col span="11">
                                        <DatePicker v-model="condition.bidStart" type="datetime" placeholder="开始时间"
                                                    placement="top-start" style="width: 200px"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">
                                        -
                                    </Col>
                                    <Col span="11">
                                        <DatePicker v-model="condition.bidEnd" type="datetime" placeholder="结束时间"
                                                    placement="top-start" style="width: 200px"></DatePicker>
                                    </Col>
                                </FormItem>
                                <!--这里指的是场次开始时间-->
                                <FormItem label="场次开始时间">
                                    <Col span="11">
                                        <DatePicker v-model="condition.sessionStartTime" type="datetime"
                                                    placeholder="开始时间" placement="top-start"
                                                    style="width: 200px"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">
                                        -
                                    </Col>
                                    <Col span="11">
                                        <DatePicker v-model="condition.sessionEndTime" type="datetime"
                                                    placeholder="结束时间" placement="top-start"
                                                    style="width: 200px"></DatePicker>
                                    </Col>
                                </FormItem>
                                <!--这里指的是车辆结束时间-->
                                <FormItem label="场次结束时间">
                                    <Col span="11">
                                        <DatePicker v-model="condition.sessionOverStartTime" type="datetime"
                                                    placeholder="开始时间" placement="top-start"
                                                    style="width: 200px"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">
                                        -
                                    </Col>
                                    <Col span="11">
                                        <DatePicker v-model="condition.sessionOverEndTime" type="datetime"
                                                    placeholder="结束时间" placement="top-start"
                                                    style="width: 200px"></DatePicker>
                                    </Col>
                                </FormItem>
                            </Form>
                        </div>
                        <div style="text-align: right;margin:10px;">
                            <Button type="primary" @click="loadData">提交</Button>
                        </div>
                    </div>
                </Poptip>
            </div>
            <div style="margin-top: 5px;" class="translucent">
                <Dropdown transfer placement="right-start" @on-click="exportData">
                    <Button size="small" type="primary">
                        <Icon size="18" type="android-download"></Icon>
                    </Button>
                    <DropdownMenu slot="list">
                        <DropdownItem name="1">导出源数据</DropdownItem>
                        <DropdownItem disabled name="2">导出排序和过滤的数据</DropdownItem>
                        <DropdownItem disabled name="3">导出自定义数据</DropdownItem>
                    </DropdownMenu>
                </Dropdown>

            </div>
        </div>

        <div style="margin-left:40px">
            <Table @on-sort-change="sortChange" highlight-row :loading="loading" :columns="getColumns" :data="tblData"
                   border height="550" stripe ref="table"></Table>
        </div>
        <div class="chart" id="myChart" ></div>
        <div class="chart"  id="myPie" ></div>
    </div>
</template>

<script>
    import {Columns} from './columns'

    export default {
        name: "OperIndicOffline",
        data() {
            return {
                isGraph:false,
                value1: "",
                dimension: "1",
                sessionList: [],
                region: [],
                regionTmp: [],
                city: [],
                cityTmp: [],
                sessionTmp: [],
                session: [],
                condition: {
                    userId: "",
                    region: [],
                    city: [],
                    dimension: "1",
                    sessions: [],
                    bidStart: "",
                    bidEnd: new Date(),
                    sessionStartTime: "",
                    sessionEndTime: "",
                    carOverStartTime: "",
                    carOverEndTime: "",
                    sessionOverStartTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
                    sessionOverEndTime: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
                },
                tblColumns: [],
                orgSchema: {},
                dimensions: [
                    {
                        value: "0",
                        label: '区域'
                    },
                    {
                        value: "1",
                        label: '大区'
                    },
                    {
                        value: "2",
                        label: '城市'
                    },
                    {
                        value: "3",
                        label: '渠道专员'
                    }
                ],
                cityList: [],
                regionList: [
                    {
                        value: 12365,
                        label: '西北区'
                    },
                    {
                        value: 23654,
                        label: '苏中区'
                    },
                    {
                        value: 2546,
                        label: '鲁东区'
                    }
                ],

                loading: false,
                isCollapsed: false,
                modal9: false,
                tblData: {},
            }
        },
        mounted() {
        },
        created() {
            let that = this;
            this.tblData = Columns.demoData();
            this.condition.userId = this.$cookies.get("LOGIN_USER_ID");
            //获取对应的组织结构
            this.$axios.get(this.$global.cbr_old + '/customer/area/schema', this.$axiosConfig.axios_config)
                .then(function (response) {
                    response = response.data;
                    if (response.status === 200) {
                        that.orgSchema = response.data;
                        that.regionList = [];
                        that.cityList = [];
                        for (let k in that.orgSchema) {
                            let v = that.orgSchema[k];

                            that.regionList.push({
                                value: k,
                                label: v.label
                            });
                            for (let k1 of v.children) {

                                that.cityList.push({
                                    value: k1.value,
                                    label: k1.label
                                })
                            }
                        }
                    } else {
                        that.$Message.error("获取用户组织结构失败")
                    }
                })
                .catch(function () {
                    that.$Message.error("获取用户组织结构失败")
                });
            let mockData = [];
            this.$axios.get(this.$global.cbr_old + "/auction/all/session", this.$axiosConfig.axios_config).then(function (response) {
                if (response.status === 200) {
                    for (let s of response.data.data) {

                        mockData
                            .push({
                                value: s.sessionId,
                                label: s.sessionName,
                            });
                    }
                }
            });
            this.sessionList = mockData;
            //首次查询信息(默认加载所有的大区维度数据)
            this.loadData();

        },
        computed: {
            getColumns() {
                //这个是表格中region的筛选项
                let regions = this.region;
                if (regions.length === 0) {
                    regions = this.regionList;
                }
                //这个是表格中city的筛选项
                let cities = this.city;
                if (cities.length === 0) {
                    cities = this.cityList;
                }

                let sessions = this.session;
                let tblColumns = Columns.getColumns({
                    regionList: regions,
                    cityList: cities,
                    sessionList: sessions
                });
                if (sessions.length < 2) {
                    tblColumns.splice(tblColumns.findIndex(x => x.key === "session"), 1);
                }

                let dimension = this.dimension;
                if (dimension === "1" || dimension === "0") {
                    tblColumns.splice(tblColumns.findIndex(x => x.key === "city"), 1);
                    tblColumns.splice(tblColumns.findIndex(x => x.key === "customerService"), 1)
                }
                if (dimension === "2") {
                    tblColumns.splice(tblColumns.findIndex(x => x.key === "customerService"), 1)
                }
                return tblColumns;
            }
        },
        methods: {
            loadData() {
                this.loading = true;
                let that = this;
                this.dimension = this.condition.dimension;
                this.city = this.cityTmp;
                this.region = this.regionTmp;
                this.session = this.sessionTmp;
                this.$axios.post(this.$global.cbr_old + '/auction/bidave', this.condition, this.$axiosConfig.normal_config)
                    .then(function (response) {
                        that.loading = false;
                        response = response.data;
                        if (response.status === 200) {
                            //处理返回的数据显示到页面
                            that.tblData = response.data;
                            if (that.isGraph && (that.condition.dimension === "1" || that.condition.dimension === "0")) {
                                that.drawLine();
                                that.drawPie();
                            }
                            that.$Message.success("加载数据成功！")
                        } else {
                            that.$Message.error("获取报表数据失败！")
                        }
                    })
                    .catch(function () {
                        that.$Message.error("获取报表数据失败！")
                        that.loading = false;
                    });
                // that.tblColumns=that.getColumns(that.condition,that.regionList,that.cityList);
            },
            exportData(type) {
                if (type === "1") {
                    this.$refs.table.exportCsv({
                        filename: 'The original data'
                    });
                } else if (type === "2") {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === "3") {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
            changeRegion(value) {
                //value 包含label和value
                this.regionTmp = value;
                this.cityList = [];
                if (this.condition.region.length !== 0) {
                    for (let k of this.condition.region) {
                        let v = this.orgSchema[k];
                        for (let k1 of v.children) {
                            this.cityList.push({
                                value: k1.value,
                                label: k1.label
                            })
                        }
                    }
                } else {
                    for (let k in this.orgSchema) {
                        let v = this.orgSchema[k];
                        for (let k1 of v.children) {
                            this.cityList.push({
                                value: k1.value,
                                label: k1.label
                            })
                        }
                    }
                }
            },
            refresh() {
                let date = new Date();
                if (this.condition.bidStart !== "") {
                    this.condition.bidEnd = date
                }
                this.loadData();
                this.$Notice.open({
                    title: '报表刷新时间',
                    desc: date.Format("yyyy-MM-dd HH:mm:ss"),
                    duration: 20
                });

            },
            drawLine() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myChart'));
                // 绘制图表

                myChart.setOption({
                    title: {text: '商户报表条形图'},
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: this.tblData.filter(x => x.region !== "总计").map(x => x.region)
                    },
                    legend: {
                        data: ['今日出价数', '昨日出价数']
                    },
                    yAxis: {},
                    series: [{
                        name: '今日出价数',
                        type: 'bar',
                        data: this.tblData.filter(x => x.region !== "总计").map(x => x.bids)
                    }, {
                        name: '昨日出价数',
                        type: 'bar',
                        data: this.tblData.filter(x => x.region !== "总计").map(x => x._bids)
                    }]
                });
            },
            drawPie() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = this.$echarts.init(document.getElementById('myPie'));
                // 绘制图表
                myChart.setOption( {
                    title : {
                        text: '出价商户',
                        subtext: '出价商户数量分布图',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: this.tblData.filter(x => x.region !== "总计").map(x => x.region)
                    },
                    series : [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:this.tblData.filter(x => x.region !== "总计").map(x => {
                                let name=x.region;
                                let value=x.bidMerchant;
                                return {name:name,value:value};
                            }),
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                });
            },
            sortChange(value) {
                //取出第一个
                let first = this.tblData.splice(0, 1);
                this.tblData = first.concat(this.tblData.sort(this.$compare(value.key, value.order)));
            }
        }

    }
</script>

<style scoped>
    /*
    translucent opacity:0.5;
     */
    .translucent {
        opacity: 0.5;
    }
    .chart {
        float: left;
        margin-right: 20px;
        width: 500px;
        height: 400px
    }
</style>