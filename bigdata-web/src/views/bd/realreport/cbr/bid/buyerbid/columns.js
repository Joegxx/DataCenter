class Columns {
    static getColumns(list) {
        return [
            {
                type: 'index',
                width: 60,
                align: 'center',
                "fixed": "left",
            },
            {
                "title": "大区",
                "key": "region",
                width: 100,
                "fixed": "left",
                filters: list.regionList,
                filterMultiple: false,
                filterMethod(value, row) {
                    return row.regionId + "" === value
                }
            },
            {
                "title": "城市",
                "key": "city",
                width: 100,
                "fixed": "left",
                filters: list.cityList,
                filterMultiple: false,
                filterMethod(value, row) {
                    return row.cityId + "" === value
                }
            }
            ,
            {
                "title": "场次",
                "key": "session",
                width: 100,
                "fixed": "left",
                filters: list.sessionList,
                filterMultiple: false,
                filterMethod(value, row) {
                    return row.session === value
                }
            },
            {
                "title": "客服人员",
                "key": "customerService",
                width: 100,
                "fixed": "left",
            },

            {
                "title": "出价数",
                align: 'center',
                children: [
                    {
                        "title": "今日",
                        "key": "bids",
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        "title": "昨日",
                        "key": "_bids",
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        title: '增长率',
                        key: 'bidsGR',
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => this.getRate(h, params.row.bidsGR)
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
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        "title": "昨日",
                        "key": "_bidMerchant",
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        title: '增长率',
                        key: 'bidMerchantGR',
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => this.getRate(h, params.row.bidMerchantGR)
                    },
                ]
            },
            {
                "title": "维护商户数",
                align: 'center',
                children: [
                    {
                        "title": "今日",
                        "key": "totalBuyers",
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        "title": "昨日",
                        "key": "_totalBuyers",
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        title: '增长率',
                        key: 'totalBuyersGR',
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => this.getRate(h, params.row.totalBuyersGR)
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
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        "title": "昨日",
                        "key": "_householdAverage",
                        width: 100,
                        "sortable": "custom"
                    },
                    {
                        title: '增长率',
                        key: 'householdAverageGR',
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => this.getRate(h, params.row.householdAverageGR)
                    },
                ]
            },
            {
                "title": "参拍率",
                align: 'center',
                children: [
                    {
                        "title": "今日",
                        "key": "referenceRate",
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => {
                            return h('div',{}, params.row.referenceRate+'%')
                        }
                    },

                    {
                        "title": "昨日",
                        "key": "_referenceRate",
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => {
                            return h('div',{}, params.row.referenceRate+'%')
                        }
                    },
                    {
                        title: '增长率',
                        key: 'referenceRateGR',
                        width: 100,
                        "sortable": "custom",
                        render: (h, params) => this.getRate(h, params.row.referenceRateGR)
                    },
                ]
            }
        ];
    }

//利用render函数渲染增长率数据
    static getRate(h, GR) {
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
    }

    static computeRate(rate) {

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


    static demoData() {
        return [
            {
                "region": "西北区",
                "regionId": 12365,
                "cityId": 102,
                "session": "全国场1",
                "city": "烟台市",
                "customerService": "张三",
                "bids": 4627,
                "bidMerchant": 1563,
                "householdAverage": 4254,
                "_bids": 5627,
                "_bidMerchant": 2563,
                "_householdAverage": 4254,
                "bidsGR": 1.20,
                "bidMerchantGR": -1.33,
                "householdAverageGR": -0.00,
            },
            {
                "region": "西北区",
                "city": "烟台市",
                "session": "全国场1",
                "regionId": 12365,
                "cityId": 102,
                "customerService": "张三",
                "bids": 5327,
                "bidMerchant": 1563,
                "householdAverage": 4254,
                "_bids": 5627,
                "_bidMerchant": 1463,
                "_householdAverage": 4267,
                "id": "1",
                "bidsGR": 12,
                "bidMerchantGR": -22,
                "householdAverageGR": 33,
            },
            {
                "region": "苏中区",
                "city": "南京市",
                "session": "全国场1",
                "regionId": 23654,
                "cityId": 105,
                "customerService": "李四",
                "bids": 5687,
                "bidMerchant": 1568,
                "householdAverage": 4254,
                "_bids": 5627,
                "_bidMerchant": 1563,
                "_householdAverage": 4234,
                "bidsGR": 1.32,
                "bidMerchantGR": 0.22,
                "householdAverageGR": -33,
            },
            {
                "region": "苏中区",
                "city": "烟台市",
                "session": "全国场1",
                "regionId": 23654,
                "cityId": 102,
                "customerService": "王五",
                "bids": 5637,
                "bidMerchant": 1583,
                "householdAverage": 4754,
                "_bids": 5629,
                "_bidMerchant": 1503,
                "_householdAverage": 4054,
                "bidsGR": 6.12,
                "bidMerchantGR": 3.22,
                "householdAverageGR": 56.33,
            },
            {
                "region": "鲁西区",
                "city": "烟台市",
                "session": "全国场2",
                "regionId": 2546,
                "cityId": 102,
                "customerService": "实时",
                "bids": 5620,
                "bidMerchant": 1063,
                "householdAverage": 4054,
                "_bids": 5607,
                "_bidMerchant": 1503,
                "_householdAverage": 4054,
                "bidsGR": 54.12,
                "bidMerchantGR": 65.22,
                "householdAverageGR": 89.33,
            },
            {
                "region": "鲁西区",
                "city": "烟台市",
                "session": "全国场2",
                "regionId": 2546,
                "cityId": 102,
                "customerService": "更改",
                "bids": 5327,
                "bidMerchant": 1533,
                "householdAverage": 4234,
                "_bids": 547,
                "_bidMerchant": 1463,
                "_householdAverage": 4454,
                "bidsGR": 1.12,
                "bidMerchantGR": 223.3,
                "householdAverageGR": 3.3,
            },
        ];
    }
}

function genData(count) {
    var nameList = [
        '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余', '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹', '姚', '邵', '湛', '汪', '祁', '毛', '禹', '狄', '米', '贝', '明', '臧', '计', '伏', '成', '戴', '谈', '宋', '茅', '庞', '熊', '纪', '舒', '屈', '项', '祝', '董', '梁', '杜', '阮', '蓝', '闵', '席', '季', '麻', '强', '贾', '路', '娄', '危'
    ];
    var legendData = [];
    var seriesData = [];
    var selected = {};
    for (var i = 0; i < 50; i++) {
        let s = Math.random() > 0.65 ? makeWord(4, 1) + '·' + makeWord(3, 0) : makeWord(2, 1);
        legendData.push(s);
        seriesData.push({
            name: s,
            value: Math.round(Math.random() * 100000)
        });
        selected[s] = i < 6;
    }

    return {
        legendData: legendData,
        seriesData: seriesData,
        selected: selected
    };

    function makeWord(max, min) {
        var nameLen = Math.ceil(Math.random() * max + min);
        var name = [];
        for (var i = 0; i < nameLen; i++) {
            name.push(nameList[Math.round(Math.random() * nameList.length - 1)]);
        }
        return name.join('');
    }
}


export {
    Columns,
    genData,
};