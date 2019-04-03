<template>
    <div>
        <div style="z-index:10;margin-left:0px;position: fixed">
            <div>
                <Poptip trigger="hover" placement="right" width="600">
                    <Button size="small" type="primary" class="translucent">
                        <Icon size="18" type="refresh"></Icon>
                    </Button>
                    <div slot="content">
                        <div style="height: 400px">
                            <h3>刷新</h3><span>加载数据可能有点慢</span>
                            <Form :label-width="80">
                                <FormItem label="场次">
                                    <Select v-model="condition.sessions" filterable multiple label-in-value
                                            @on-change="(value)=> this.sessionTmp=value">
                                        <Option v-for="item in sessionList" :value="item.label" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="出价时间">
                                    <Col span="11">
                                        <DatePicker v-model="condition.bidStartTime" type="datetime" placeholder="开始时间"
                                                    placement="top-start" style="width: 200px"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">
                                        -
                                    </Col>
                                    <Col span="11">
                                        <DatePicker v-model="condition.bidEndTime" type="datetime" placeholder="结束时间"
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
            <div style="margin-top: 5px;">
                <Poptip trigger="hover" placement="right" width="600">
                    <Button size="small" type="primary" class="translucent">
                        <Icon size="18" type="funnel"></Icon>
                    </Button>
                    <div slot="content">
                        <div style="height: 400px">
                            <h3>筛选条件</h3><span>不选默认为全部</span>
                            <Form :label-width="80">
                                <FormItem label="维度">
                                    <Select v-model="dimension">
                                        <Option v-for="item in this.columns.dimensions" :value="item.value"
                                                :key="item.value">{{
                                            item.label}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="大区">
                                    <Select v-model="region" filterable multiple label-in-value>
                                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="维护城市">
                                    <Select v-model="city" filterable multiple label-in-value
                                            @on-change="(value)=> this.cityTmp=value">
                                        <Option v-for="item in getCities" :value="item.value" :key="item.value">{{
                                            item.label
                                            }}
                                        </Option>
                                    </Select>
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
                        <DropdownItem name="2">导出排序和过滤的数据</DropdownItem>
                        <DropdownItem name="3">导出自定义数据</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </div>
        <div style="margin-left:40px">
            <Table :loading="loading" :columns="getTblColumns" :data="getTblData" border height="550" stripe
                   ref="table"></Table>
        </div>
    </div>
</template>
<script>
    import {Columns} from './columns'


    export default {
        data() {
            return {
                columns: new Columns(),
                name: "carBid",
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
                    sessions: [],
                    bidStartTime: new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000),
                    bidEndTime: new Date(),
                    sessionStartTime: "",
                    sessionEndTime: "",
                    carOverStartTime: "",
                    carOverEndTime: "",
                    sessionOverStartTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
                    sessionOverEndTime: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000),
                },
                tblColumns: [],
                orgSchema: {},
                cityList: [],
                regionList: [],
                loading: false,
                isCollapsed: false,
                modal9: false,
                tblData: []
            }
        },
        mounted() {
            let that = this;
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
            getTblColumns() {
                this.columns.setRegionIds(this.region);
                this.columns.setCityIds(this.city);
                this.columns.setOrgSchema(this.orgSchema);
                //处理返回的数据显示到页面
                this.columns.setDimension(this.dimension);
                return this.columns.getColumns();
            },
            getTblData() {
                this.columns.setOrgSchema(this.orgSchema);
                this.columns.setRegionIds(this.region);
                this.columns.setCityIds(this.city);
                this.columns.setDimension(this.dimension);
                if (this.$store.state.cbr.cbrData[this.name]) {
                    return this.columns.getData(this.$store.state.cbr.cbrData[this.name]);
                } else {
                    return [];
                }
            },
            getCities() {
                let cityList = [];
                if (this.region.length !== 0) {
                    for (let k of this.region) {
                        let v = this.orgSchema[k];
                        for (let k1 of v.children) {
                            cityList.push({
                                value: k1.value,
                                label: k1.label
                            })
                        }
                    }
                } else {
                    for (let k in this.orgSchema) {
                        let v = this.orgSchema[k];
                        for (let k1 of v.children) {
                            cityList.push({
                                value: k1.value,
                                label: k1.label
                            })
                        }
                    }
                }
                return cityList;
            }
        },
        methods: {
            loadData() {
                this.loading = true;
                let that = this;
                this.$axios.post(this.$global.cbr_old + '/auction/carbid', this.condition, this.$axiosConfig.normal_config)
                    .then(function (response) {
                        that.loading = false;
                        response = response.data;
                        if (response.status === 200) {
                            that.$store.dispatch('addCbrData', {name: that.name, data: response.data});
                            that.$Message.success("加载数据成功！")
                        } else {
                            that.$Message.error("获取报表数据失败！")
                        }
                    })
                    .catch(function () {
                        that.$Message.error("获取报表数据失败！")
                        that.loading = false;
                    });
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
                        columns: this.columns.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
            refresh() {
                let date = new Date();
                if (this.condition.bidStartTime === null) {
                    this.condition.bidStartTime = new Date(new Date(new Date().toLocaleDateString()).getTime() - 24 * 60 * 60 * 1000)
                }
                this.condition.bidStartTime = new Date();
                this.loadData();
                this.$Notice.open({
                    title: '报表刷新时间',
                    desc: date.Format("yyyy-MM-dd HH:mm:ss"),
                    duration: 20
                });
            },
            transRegionCityData(region,city){
                let regions = [];
                console.log("===" + regions);
                if (region.length === 0) {
                    regions = this.regionList;
                } else {
                    for (let k of region) {
                        let v = this.orgSchema[k];
                        regions.push({
                            value: v.value,
                            label: v.label
                        })
                    }
                }
                //这个是表格中city的筛选项
                let cities = [];
                if (city.length === 0) {
                    cities = this.cityList;
                }else{
                    for (let k of this.region) {
                        let v = this.orgSchema[k];
                        for (let k1 of v.children) {
                            cities.push({
                                value: k1.value,
                                label: k1.label
                            })
                        }
                    }
                }
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
</style>