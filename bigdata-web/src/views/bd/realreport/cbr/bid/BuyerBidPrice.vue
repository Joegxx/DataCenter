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
                            <h3>筛选条件</h3><span>不选默认为全部</span>
                            <Form :label-width="80">
                                <FormItem label="场次">
                                    <Select v-model="condition.sessions" filterable multiple label-in-value>
                                        <Option v-for="item in sessionList" :value="item.label" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <!--这里指的是车辆结束时间-->
                                <FormItem label="场次结束时间">
                                    <Col span="11">
                                        <DatePicker v-model="condition.overStartTime" type="datetime"
                                                    placeholder="开始时间" placement="top-start"
                                                    style="width: 200px"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">
                                        -
                                    </Col>
                                    <Col span="11">
                                        <DatePicker v-model="condition.overEndTime" type="datetime"
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
                                        <Option v-for="item in this.dimensions" :value="item.value"
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
                                <FormItem label="城市">
                                    <Select v-model="city" filterable multiple label-in-value>
                                        <Option v-for="item in getCities" :value="item.value" :key="item.value">{{
                                            item.label
                                            }}
                                        </Option>
                                    </Select>
                                </FormItem>
                            </Form>
                        </div>
                        <div style="text-align: right;margin:10px;" v-if="false">
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
            <table-chart :loading="loading" :data="origData" :cbrTable="cbrTable" :dimension="dimension" :region="region" :city="city" ref="table"></table-chart>
        </div>
    </div>
</template>
<script>
    import TableChart from '../../component/table/TableChart'
    import {SimpleRateTable} from '../../component/table/CBRTable'

    function carCountRateCompute(col,result){
        let t=col['carCount']/result[0]['carCount']*100;
        let y =col['yesterdayCarCount']/result[0]['yesterdayCarCount']*100;
        t=t?t.toFixed(2):0;
        y=y?y.toFixed(2):0;
        return [t,y]
    }

    export default {
        components: {TableChart},
        data() {
            return {
                name:'/auction/bidprice',
                cbrTable:{},
                loading:false,
                region:[],
                city:[],
                regionList:[],
                sessionList:[],
                cityList:[],
                origData:[],
                dimension:"1",
                condition:{
                    sessions:[],
                    overStartTime: new Date(new Date(new Date().toLocaleDateString()).getTime()),
                    overEndTime: new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1),
                },
                computeColumns: {
                    "carCount": "竞拍结束车辆数"
                },
                targetColumns: {
                    //name:显示名称  molecular分子  denominator:分母
                     'carCountRate': {name: "比率", _func:carCountRateCompute}
                },
                dimensions:[
                    {
                        value: "1",
                        label: '差值幅度',
                        key:'range'
                    },
                    {
                        value: "2",
                        label: '大区',
                        key:'region'
                    },
                    {
                        value: "3",
                        label: '城市',
                        key:'city'
                    },
                ],
                orgSchema: {}
            }
        },
        created() {
            let that = this;
            that.cbrTable=new SimpleRateTable(that.dimensions,that.computeColumns, that.targetColumns,that.orgSchema);
            //获取对应的组织结构
            this.$axios.get(this.$global.cbr_old + '/auction/bidprice/schema', this.$axiosConfig.axios_config)
                .then(function (response) {
                    response = response.data;
                    if (response.status === 200) {
                        that.orgSchema = response.data;
                        that.cbrTable.orgSchema=response.data;
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
                        that.loadData();
                    } else {
                        that.$Message.error("获取用户组织结构失败")
                    }
                })
                .catch(function () {
                    that.$Message.error("获取用户组织结构失败")
                });
        },
        computed: {
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
                this.$axios.post(this.$global.cbr_old + "/auction/bidprice/sessions", this.condition, this.$axiosConfig.normal_config)
                    .then(function (response) {
                        that.loading = false;
                        response = response.data;
                        if (response.status === 200) {
                            that.sessionList=response.data;
                            that.$Message.success("加载场次数据成功！")
                        } else {
                            that.$Message.error("获取场次数据失败！")
                        }
                    })
                    .catch(function () {
                        that.$Message.error("获取场次数据失败！")
                        that.loading = false;
                    });
                this.$axios.post(this.$global.cbr_old + this.name, this.condition, this.$axiosConfig.normal_config)
                    .then(function (response) {
                        that.loading = false;
                        response = response.data;
                        if (response.status === 200) {
                            that.origData=response.data;
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
                this.$refs.table.exportData(type);
            },
            refresh() {
                let date = new Date();
                this.loadData();
                this.$Notice.open({
                    title: '报表刷新时间',
                    desc: date.Format("yyyy-MM-dd HH:mm:ss"),
                    duration: 20
                });
            },
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