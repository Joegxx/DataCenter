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
                        <div>
                            <h3>筛选条件</h3><span>不选默认为全部</span>
                            <Form :label-width="80">
                                <FormItem label="维度">
                                    <Select v-model="dimension">
                                        <Option v-for="item in dimensions" :value="item.value" :key="item.value">{{
                                            item.label}}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="大区">
                                    <Select v-model="region" filterable multiple clearable>
                                        <Option v-for="item in regionList" :value="item.value" :key="item.value">{{
                                            item.label }}
                                        </Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="维护城市">
                                    <Select v-model="city" filterable multiple>
                                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{
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
            <Table :columns="getColumns" :data="tblData" border stripe ref="table"></Table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "OperIndicOffline",
        data() {
            return {
                value1: "",
                userId: "",
                region: [],
                city: [],
                tblColumns: [],
                orgSchema: {
                    12365: {
                        value: 12365,
                        label: '西北区',
                        children: [
                            {
                                value: 9632,
                                label: '烟台市'
                            }, {
                                value: 8524,
                                label: '青岛市'
                            },
                        ]
                    },
                    23654: {
                        value: 23654,
                        label: '苏中区',
                        children: [
                            {
                                value: 89654,
                                label: '济南市'
                            }, {
                                value: 6532,
                                label: '合肥市'
                            },
                        ]
                    },
                    2546: {
                        value: 2546,
                        label: '鲁东区',
                        children: [
                            {
                                value: 2536,
                                label: '武汉市'
                            }, {
                                value: 8956,
                                label: '芜湖市'
                            },
                        ]
                    }
                },
                dimension: "region",
                dimensions: [
                    {
                        value: 'region',
                        label: '大区'
                    },
                    {
                        value: 'city',
                        label: '城市'
                    },
                    {
                        value: 'customerService',
                        label: '客服'
                    }
                ],
                cityList: [
                    {
                        value: 102,
                        label: '烟台市'
                    },
                    {
                        value: 103,
                        label: '青岛市'
                    },
                    {
                        value: 104,
                        label: '济南市'
                    },
                    {
                        value: 105,
                        label: '南京市'
                    }
                ],
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
                visible: false,
                isCollapsed: false,
                modal9: false,
                tblData: [
                    {
                        "region": "西北区",
                        "regionId": 12365,
                        "cityId": 102,
                        "city": "烟台市",
                        "customerService": "张三",
                        "bids": 4627,
                        "bidMerchant": 1563,
                        "householdAverage": 4254,
                        "_bids": 5627,
                        "_bidMerchant": 2563,
                        "_householdAverage": 4254,
                    },
                    {
                        "region": "西北区",
                        "city": "烟台市",
                        "regionId": 12365,
                        "cityId": 102,
                        "customerService": "张三",
                        "bids": 5327,
                        "bidMerchant": 1563,
                        "householdAverage": 4254,
                        "_bids": 5627,
                        "_bidMerchant": 1463,
                        "_householdAverage": 4267,
                        "id": "1"
                    },
                    {
                        "region": "苏中区",
                        "city": "南京市",
                        "regionId": 23654,
                        "cityId": 105,
                        "customerService": "李四",
                        "bids": 5687,
                        "bidMerchant": 1568,
                        "householdAverage": 4254,
                        "_bids": 5627,
                        "_bidMerchant": 1563,
                        "_householdAverage": 4234,
                    },
                    {
                        "region": "苏中区",
                        "city": "烟台市",
                        "regionId": 23654,
                        "cityId": 102,
                        "customerService": "王五",
                        "bids": 5637,
                        "bidMerchant": 1583,
                        "householdAverage": 4754,
                        "_bids": 5629,
                        "_bidMerchant": 1503,
                        "_householdAverage": 4054,
                    },
                    {
                        "region": "鲁西区",
                        "city": "烟台市",
                        "regionId": 2546,
                        "cityId": 102,
                        "customerService": "实时",
                        "bids": 5620,
                        "bidMerchant": 1063,
                        "householdAverage": 4054,
                        "_bids": 5607,
                        "_bidMerchant": 1503,
                        "_householdAverage": 4054,
                    },
                    {
                        "region": "鲁西区",
                        "city": "烟台市",
                        "regionId": 2546,
                        "cityId": 102,
                        "customerService": "更改",
                        "bids": 5327,
                        "bidMerchant": 1533,
                        "householdAverage": 4234,
                        "_bids": 547,
                        "_bidMerchant": 1463,
                        "_householdAverage": 4454,
                    },
                ]
            }
        },
        created() {
            let that = this;
            this.userId = this.$cookies.get("LOGIN_USER_ID");
            //获取对应的组织结构
            this.$axios.get(this.$global.cbr_old + '/get/org/schema?userId=' + this.userId, this.$axiosConfig.axios_config)
                .then(function (response) {
                    response = response.data;
                    if (response.status === 200) {
                        that.orgSchema = response.data;
                        for (let [k, v] of that.orgSchema) {
                            that.regionList.push({
                                value: k,
                                label: v.label
                            });
                            for (let [k1, v1] of v.children) {
                                that.cityList.push({
                                    value: k1,
                                    label: v1
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
            //首次查询信息(默认加载所有的大区维度数据)
            this.loadData();
            // this.getColumns()
        },
        computed:{
            getColumns(){
                //TODO 这边的region只有value值没有label 需要处理
                let regionList=this.region;
                if(regionList.length===0){
                    regionList = this.regionList;
                }
                console.log(this.region)
                let cityList = this.city;
                if(cityList.length===0){
                    cityList = this.cityList;
                }
                let tblColumns= [
                    {
                        "title": "大区",
                        "key": "region",
                        "fixed": "left",
                        filters: regionList,
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.regionId === value
                        }
                    },
                    {
                        "title": "城市",
                        "key": "city",
                        "fixed": "left",
                        filters: cityList,
                        filterMultiple: false,
                        filterMethod(value, row) {
                            return row.cityId === value
                        }
                    },
                    {
                        "title": "客服人员",
                        "key": "customerService",
                        "fixed": "left",
                    },

                    {
                        "title": "出价数",
                        align: 'center',
                        width: '200',
                        children: [
                            {
                                "title": "今日",
                                "key": "bids",
                                "sortable": true
                            },
                            {
                                "title": "昨日",
                                "key": "_bids",
                                "sortable": true
                            },
                            {
                                title: '增长率',
                                key: 'bidsGR',
                                "sortable": true,
                                render: (h, params) => this.getRate(h,params.row.bidsGR)
                            },
                        ]
                    },
                    {
                        "title": "出价商户",
                        align: 'center',
                        children: [
                            {
                                "title": "今日",
                                "key": "bidMerchant",
                                "sortable": true
                            },
                            {
                                "title": "昨日",
                                "key": "_bidMerchant",
                                "sortable": true
                            },
                            {
                                title: '增长率',
                                key: 'bidMerchantGR',
                                "sortable": true,
                                render: (h, params) =>  this.getRate(h,params.row.bidMerchantGR)
                            },
                        ]
                    },
                    {
                        "title": "户均",
                        align: 'center',
                        children: [
                            {
                                "title": "今日",
                                "key": "householdAverage",
                                "sortable": true
                            },
                            {
                                "title": "昨日",
                                "key": "_householdAverage",
                                "sortable": true
                            },
                            {
                                title: '增长率',
                                key: 'householdAverageGR',
                                "sortable": true,
                                render: (h, params) => this.getRate(h,params.row.householdAverageGR)
                            },
                        ]
                    }
                ];

                if(this.dimension==="region"){
                    tblColumns.splice(tblColumns.findIndex(x=>x.key==="city"),1);
                    tblColumns.splice(tblColumns.findIndex(x=>x.key==="customerService"),1)
                }
                if(this.dimension==="city"){
                    tblColumns.splice(tblColumns.findIndex(x=>x.key==="customerService"),1)
                }
                return tblColumns;
            },
        },
        methods: {
            loadData() {
                let that = this;
                this.$axios.post(this.$global.cbr_old + '/load/CPL', {
                    userId: this.userId,
                    region: this.region,
                    city: this.city,
                    dimension: this.dimension
                }, this.$axiosConfig.axios_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            //处理返回的数据显示到页面
                            that.$Message.error("加载数据成功！")
                        } else {
                            that.$Message.error("获取报表数据失败！")
                        }
                    })
                    .catch(function () {
                        that.$Message.error("获取报表数据失败！")
                    });
                // 处理数据中增长率
                this.hadlerTblData();
                //处理表字段

            },
            handleClose() {
                this.visible = false;
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
            refresh() {
                this.loadData();
                this.$Notice.open({
                    title: '报表刷新时间',
                    desc: '2018-06-15 17:35',
                    duration: 20
                });
            },
            hadlerTblData() {
                for (let d of this.tblData) {
                    d.bidsGR = parseFloat(((d.bids - d._bids) / d._bids * 100).toFixed(2));
                    d.householdAverageGR = parseFloat(((d.householdAverage - d._householdAverage) / d._householdAverage * 100).toFixed(2));
                    d.bidMerchantGR = parseFloat(((d.bidMerchant - d._bidMerchant) / d._bidMerchant * 100).toFixed(2))
                }
            },

            //利用render函数渲染增长率数据
            getRate(h, GR){
                let result = this.computeRate(GR);
                return h('div', {
                    style: {
                        marginLeft: '-10px'
                    },
                }, [
                    h('span', {
                        props: {}
                    }, GR + '%'),
                    h('icon', {
                        props: {
                            type: result.iconType,
                            size: '18',
                            color: result.iconColor
                        }
                    }, [])
                ])
            },
            computeRate(rate) {

                let iconType = 'arrow-graph-up-right';
                let iconColor = 'red';
                if (rate < 0) {
                    iconType = 'arrow-graph-down-right';
                    iconColor = 'blue'
                }
                if (parseFloat(rate) === 0) {
                    iconType = 'ios-minus-empty';
                    iconColor = 'black'
                }
                return {
                    iconType: iconType,
                    iconColor: iconColor,
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