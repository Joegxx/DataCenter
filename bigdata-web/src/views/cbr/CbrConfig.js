/**
 * cbr的一些配置参数
 */

class CbrConfig {
}

CbrConfig.dataBases = [
    {label: '老数仓', value: 'dw_v2'},
    {label: '新实时报表', value: 'cbr'},
    {label: '新数仓', value: 'new_warehouse'},
];
CbrConfig.selectParams = [
    {label: '输入框', paramName: 'test', type: 'Input', style: 'width:200px'},
    {label: '时间', paramName: 'test', type: 'DatePicker', style: 'width:200px'},
    {label: '选择框', paramName: 'test', type: 'CbrSelect', style: 'width:200px',value:[{value:"v",label:"l1"},{value:"dd",label:"l2"}]},
    {label: '多选框', paramName: 'test', type: 'CbrMultiSelect', style: 'width:200px',value:[{value:"v",label:"l1"},{value:"dd",label:"l2"}]},
];

CbrConfig.createSteps = [
    {title: "进行中", content: "定义报表"},
    {title: "待进行", content: "定义报表字段"},
    {title: "待进行", content: "定义数据查询语句"},
    {title: "待进行", content: "定义报表参数"},
    {title: "待进行", content: "定义数据下载"},
];

export default CbrConfig;