import CBRUtils from './CBRUtils'

class SimpleTable {
    constructor(dimensions, computeColumns, targetColumns, orgSchema) {
        this.dimensions = dimensions;
        this.computeColumns = computeColumns;
        this.targetColumns = targetColumns;
        this.orgSchema = orgSchema;
    }

    getTblColumns(regionIds, cityIds, dimension) {
        let regionCity = this.getSelectRegionCity(regionIds, cityIds);

        let tblColumns = [
            {
                type: 'index',
                width: 60,
                align: 'center',
                "fixed": "left",
            }
        ];
        let dimensionColumn;
        for (let item of this.dimensions) {
            if (item.key === 'region') {
                dimensionColumn = {
                    "title": item.label,
                    "key": item.key,
                    width: 100,
                    "fixed": "left",
                    filters: regionCity.regions,
                    filterMultiple: false,
                    filterMethod(value, row) {
                        let label = "";
                        regionCity.regions.forEach(r => {
                            if (r.value === value) {
                                label = r['label']
                            }
                        });
                        return row.region + "" === label
                    }
                }

            } else if (item.key === 'city') {
                dimensionColumn = {
                    "title": item.label,
                    "key": item.key,
                    width: 100,
                    "fixed": "left",
                    filters: regionCity.cities,
                    filterMultiple: false,
                    filterMethod(value, row) {
                        let label = "";
                        regionCity.cities.forEach(r => {
                            if (r.value === value) {
                                label = r['label']
                            }
                        });
                        return row.city + "" === label
                    }
                }
            } else {
                dimensionColumn = {
                    "title": item.label,
                    "key": item.key,
                    width: 100,
                    "fixed": "left",
                };
            }
            tblColumns.push(dimensionColumn)
        }
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
                        "sortable": 'custom',
                        render: (h, params) => this.getComputedStyle(h, params.row[k], params.row[CBRUtils.getYesterdayColumns(k)])
                    },
                    {
                        "title": "昨日",
                        "key": CBRUtils.getYesterdayColumns(k),
                        width: 100,
                        "sortable": 'custom',
                    }
                ]
            };
            tblColumns.push(computeColumn);
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
                            "sortable": true,
                            render: (h, params) => this.getComputedStyle(h, params.row[k], params.row[CBRUtils.getYesterdayColumns(k)])
                        },
                        {
                            "title": "昨日",
                            "key": CBRUtils.getYesterdayColumns(k),
                            width: 100,
                            "sortable": true
                        }
                    ]
                };
            tblColumns.push(targetColumn);
        }

        //根据维度
        for (let col of this.dimensions) {
            let newVar = col.value + 0;
            if (newVar > (dimension + 0)) {
                tblColumns.splice(tblColumns.findIndex(x => x.key === col.key), 1);
            }
        }
        return tblColumns;
    };

    getTblData(data, regionIds, cityIds, dimension) {
        let regionCity = this.getSelectRegionCity(regionIds, cityIds);
        data = data.filter(d => {
            for (let k of regionCity.cities) {
                if (k.label === d.city) {
                    return true
                }
            }
            return false;
        });

        let tempData = data;
        let result = [{}];
        let tblDatas = {};
        //1、根据维度统计字段值
        if (dimension === "3") {
            result = tempData;
        } else {
            tempData.forEach(d => {
                //拼装key 用来作为统计维度的key
                let key = "";
                for (let item of this.dimensions) {
                    let newVar = item.value + 0;
                    if (newVar <= (dimension + 0)) {
                        key += '-';
                        key += d[item.key]
                    }
                }
                //根据key进行数据的聚合
                if (tblDatas[key]) {
                    let tblDatum = tblDatas[key];
                    //安维度进行统计
                    for (let k in this.computeColumns) {
                        tblDatum[k] += d[k];
                        tblDatum[CBRUtils.getYesterdayColumns(k)] += d[CBRUtils.getYesterdayColumns(k)]
                    }
                    tblDatas[key] = tblDatum
                } else {
                    let newobj = {};
                    for (let attr in d) {
                        if(isNaN(d[attr])){
                            newobj[attr] = d[attr]
                        }else{
                            newobj[attr] = d[attr]+0
                        }
                    }
                    tblDatas[key] = newobj;
                }
            });

            for (let key in tblDatas) {
                result.push(tblDatas[key])
            }
        }
        //将总计放入结果中
        result[0] = this.getSumToData(result);
        return result;
    }

    getSumToData(data) {

        let sum = {};
        for (let item of this.dimensions) {
            sum[item.key] = "总计";
        }

        data.forEach(d => {
            for (let k in this.computeColumns) {
                if (sum[k]) {
                    sum[k] += d[k] ;
                } else {
                    sum[k] = d[k];
                }
                if (sum[CBRUtils.getYesterdayColumns(k)]) {
                    sum[CBRUtils.getYesterdayColumns(k)] += d[CBRUtils.getYesterdayColumns(k)];
                } else {
                    sum[CBRUtils.getYesterdayColumns(k)] = d[CBRUtils.getYesterdayColumns(k)];
                }
            }
        });

        return sum;

    }

    getComputedStyle(h, today, yesterday) {
        let color = 'blue';
        if (today > yesterday) {
            color = 'red'
        }
        return h('div', {
            style: {},
        }, [
            h('span', {
                props: {},
                style: {
                    color: color
                }
            }, today)
        ])
    };

    //根据传入的region和city的id来确定region和city数据
    getSelectRegionCity(regionIds, cityIds) {
        let regions = [];
        let cities = [];

        for (let k in this.orgSchema) {
            if (regionIds.length === 0 || regionIds.indexOf(k) !== -1) {
                let v = this.orgSchema[k];
                regions.push({
                    value: k,
                    label: v.label
                });
                for (let k1 of v.children) {
                    if (cityIds.length === 0 || cityIds.indexOf(k1.value) !== -1) {
                        cities.push({
                            value: k1.value,
                            label: k1.label
                        })
                    }
                }
            }
        }
        return {regions: regions, cities: cities}
    }
}

export default SimpleTable