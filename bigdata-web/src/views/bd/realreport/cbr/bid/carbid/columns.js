function Columns() {
    //用户可见的所有大区
    var regionIds;
    var orgSchema;
    //用户可见的所有城市
    var cityIds;
    var dimension;
    var tblColumns;
    var dimensions;
    // 计算列 （一些查询得到的列）
    var computeColumns;
    // 维度列（大区 城市）
    var dimensionColumns;
    //指标列  （一般是XXX率 由查询列计算得到的 这个是前端负责实现）
    var targetColumns;
    this.computeColumns = {
        'carCount': "车辆数",
        'bidCount': "出价数",
        'sameCityCount': "本地出价数",
        'diffCityCount': "异地出价数",
    };
    this.dimensionColumns = {
        'region': "大区",
        'city': "城市",
        'carRating': "车型"
    };
    this.targetColumns = {
        //name:显示名称  molecular分子  denominator:分母
        'carAverage': {name: "车均", molecular: "bidCount", denominator: "carCount"}
    };
    this.dimensions = [
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
            label: '车型'
        }
    ];

    this.setOrgSchema = function (setOrgSchema) {
        this.orgSchema = setOrgSchema
    };

    this.setRegionIds = function (regions) {
        this.regionIds = regions;
    };
    this.setCityIds = function (cities) {
        this.cityIds = cities;
    };
    this.setDimension = function (dimension) {
        this.dimension = dimension;
    };
    this.getColumns = function () {
        let regionCity = this.getSelectRegionCity(this.regionIds, this.cityIds);

        this.setTblColumns(regionCity.regions, regionCity.cities);
        // console.log(this.dimension);
        let tblColumns = this.tblColumns;
        if (this.dimension === "1") {
            tblColumns.splice(tblColumns.findIndex(x => x.key === "city"), 1);
            tblColumns.splice(tblColumns.findIndex(x => x.key === "carRating"), 1)
        }
        if (this.dimension === "2") {
            tblColumns.splice(tblColumns.findIndex(x => x.key === "carRating"), 1)
        }
        return tblColumns;
    };

    //通过原始数据（用vuex存储）计算得到展现数据
    this.getData = function (data) {
        let regionCity = this.getSelectRegionCity(this.regionIds, this.cityIds);
        data = data.filter(d =>{
            for(let k of regionCity.cities){
                if(k.label===d.city){
                    return true
                }
            }
            return false;
        });
        let key;
        let tempData = data;
        let result = [];
        let tblDatas = {};
        //1、根据维度统计字段值
        if (this.dimension === "3") {
            result = tempData;
        } else {

            tempData.forEach(d => {
                if (this.dimension === "2") {
                    key = d.region + "-" + d.city;
                }
                if (this.dimension === "1") {
                    key = d.region;
                }
                if (tblDatas[key]) {
                    let tblDatum = tblDatas[key];
                    //安维度进行统计
                    for (let k in this.computeColumns) {
                        tblDatum[k] += d[k];
                        tblDatum[this.getYesterdayColumns(k)] += d[this.getYesterdayColumns(k)]
                    }
                    tblDatas[key] = tblDatum
                } else {
                    let newobj = {};
                    for (let attr in d) {
                        newobj[attr] = d[attr];
                    }
                    tblDatas[key] = newobj;
                }
            });

            for (let key in tblDatas) {
                result.push(tblDatas[key])
            }
        }
        //2、计算对应的指标
        this.computeTargetColumns(result);
        //3、计算增长率
        this.computeGRColumns(result);
        return result;
    };
    //计算数据中的指标率
    this.computeTargetColumns = function (data) {
        data.forEach(d => {
            let targetColumn;
            let molecular;
            let denominator;
            for (let k in this.targetColumns) {
                targetColumn = this.targetColumns[k];
                molecular = targetColumn.molecular;
                denominator = targetColumn.denominator;
                //计算今天的率
                d[k] = (d[molecular] / d[denominator]).toFixed(2);
                //计算昨天的率
                d[this.getYesterdayColumns(k)] = (d[this.getYesterdayColumns(molecular)] / d[this.getYesterdayColumns(denominator)]).toFixed(2);
                //计算增长率
                d[k + 'GR'] = ((d[k] - d[this.getYesterdayColumns(k)]) / d[this.getYesterdayColumns(k)]).toFixed(2);
            }
        })
    };
    //计算数据所有增长率
    this.computeGRColumns = function (data) {
        data.forEach(d => {
            for (let k in this.computeColumns) {
                d[k + 'GR'] = ((d[k] - d[this.getYesterdayColumns(k)]) / d[this.getYesterdayColumns(k)]).toFixed(2);
            }
            let targetColumn;
            let molecular;
            let denominator;
            for (let k in this.targetColumns) {
                targetColumn = this.targetColumns[k];
                molecular = targetColumn.molecular;
                denominator = targetColumn.denominator;
                d[k] = (d[molecular] / d[denominator]).toFixed(2);
                d[this.getYesterdayColumns(k)] = (d[this.getYesterdayColumns(molecular)] / d[this.getYesterdayColumns(denominator)]).toFixed(2)
            }
        })
    };
//利用render函数渲染增长率数据
    this.getRate = function (h, GR) {
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
    };

    this.computeRate = function (rate) {

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
    };

    this.setTblColumns = function (regions,cities) {
        let dimensionColums = [
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
                filters: regions,
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
                filters: cities,
                filterMultiple: false,
                filterMethod(value, row) {
                    return row.cityId + "" === value
                }
            },
            {
                "title": "车等级",
                "key": "carRating",
                width: 100,
                "fixed": "left",
            }];
        let computeColumn;
        let targetColumn;
        for (let k in this.computeColumns) {
            computeColumn = {
                "title": this.computeColumns[k],
                align: 'center',
                width: '200',
                children: [
                    {
                        "title": "今日",
                        "key": k,
                        width: 100,
                        "sortable": true
                    },
                    {
                        "title": "昨日",
                        "key": this.getYesterdayColumns(k),
                        width: 100,
                        "sortable": true
                    },
                    {
                        title: '增长率',
                        key: k + 'GR',
                        width: 100,
                        "sortable": true,
                        render: (h, params) => this.getRate(h, params.row[k + 'GR'])
                    },
                ]
            };
            dimensionColums.push(computeColumn);
        }
        for (let k in this.targetColumns) {
            targetColumn =
                {
                    "title": this.targetColumns[k].name,
                    align: 'center',
                    children: [
                        {
                            "title": "今日",
                            "key": k,
                            width: 100,
                            "sortable": true
                        },
                        {
                            "title": "昨日",
                            "key": "yesterday" + k.substring(0, 1).toUpperCase() + k.substring(1),
                            width: 100,
                            "sortable": true
                        },
                        {
                            title: '增长率',
                            key: k + 'GR',
                            width: 100,
                            "sortable": true,
                            render: (h, params) => this.getRate(h, params.row[k + 'GR'])
                        },
                    ]
                };
            dimensionColums.push(targetColumn);
        }
        this.tblColumns = dimensionColums;
    };

    this.getYesterdayColumns = function (col) {
        return "yesterday" + col.substring(0, 1).toUpperCase() + col.substring(1)
    }
    //根据传入的region和city的id来确定region和city数据
    this.getSelectRegionCity=function(){
        let regions = [];
        let cities = [];

        for (let k in this.orgSchema) {
            if(this.regionIds.length===0 ||this.regionIds.indexOf(k)!==-1 ) {
                let v = this.orgSchema[k];
                regions.push({
                    value: k,
                    label: v.label
                });
                for (let k1 of v.children) {
                    if(this.cityIds.length===0 ||this.cityIds.indexOf(k1.value)!==-1 ) {
                        cities.push({
                            value: k1.value,
                            label: k1.label
                        })
                    }
                }
            }
        }
        return {regions:regions,cities:cities}
    }
}

export {
    Columns,
};