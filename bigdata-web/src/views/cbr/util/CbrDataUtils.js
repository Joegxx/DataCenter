import CbrAjax from '@cbr/util/CbrAjax'
import Cookies from 'js-cookie';
import { Loading,Message } from 'element-ui';

class CbrData {
}
CbrData.queryData = async function (src,realreportId,scope, maxLevel,cbrParams) {
    let index = scope.$index || 0;
    //如果子节点已经有数据 直接结束  防止多次刷新
    if (src.length > 0 && src[index].children.length > 0) {
        return;
    }

    const loading = Loading.service({
        lock: true,
        text: '努力查询中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });

    //初始话参数
    let params = {
        realreportId:realreportId,
        level:0,
        //queryTime:'2018-09-30 14:47:18'
        params:{},
    };
    //根据实际情况重新给参数赋值
    if(Object.keys(scope).length>0){
        let row = CbrData.copyObj(scope.row);
        row.children=[];
        row._parent={};
        params.params=row;
        params.level = row._level+1;
    }
    //将用户自定的参数放入请求参数中
    if(cbrParams && cbrParams.length>0){
        cbrParams.forEach(item=>{
            let v=item.value;
            if(v instanceof Date) {
                v = item.value.Format("yyyy-MM-dd HH:mm:ss");
            }
            params.params[item.paramName]=v
        })
    }
    //添加模拟ID
    let simulatorId = Cookies.get("SIMULATOR_ID");
    if (simulatorId) params["simulatorId"]=simulatorId;

    let response =  await CbrAjax.post('/data/level',params);
    loading.close();
    if (response.data.status!==200){
        Message.error(response.data.msg)
        return
    }
    CbrData.appendData (src, response.data.data, scope, maxLevel);
    let cityName=[];
    response.data.data.forEach(item=>{
        if (item.cityname && cityName.indexOf(item.cityname)<0){
            cityName.push(item.cityname)
        }

    });
    return cityName;
};
CbrData.appendData = function (src, data, scope, maxLevel) {
    let index =  0;
    let row = {};
    let level =  0;
    if( Object.keys(scope).length>0){
        index = scope.$index;
        row = scope.row;
        level = row._level+1;
    }
    if (src.length === 0 || src[index].children.length === 0) {
        data.forEach(item => {
            index++;
            item._level = level;
            //判断是否是第一行 第一行是没有上级行的
            if (Object.keys(row).length > 0) item._parent = row;
            //判断是否到最后一行了
            if (level < maxLevel) {
                //添加子节点
                item.children = []
            }
            //将查询的数据嵌入到源列表中
            src.splice(index, 0, item);
        });
        //判断是否有子节点有则将数据放入子节点
        row.children = data;
    }
    return src;
};

CbrData.init = function (data, maxLevel) {

        data.forEach(item => {
            item._level = 0;
            item.children = [];
        });
};

CbrData.copyObj=function(obj) {
    let res = {};
    for (var key in obj) {
        res[key] = obj[key]
    }
    return res
};

CbrData.refreshSession =  function () {
    let t1 = window.setInterval(refreshCount, 15000);
    function refreshCount() {
        CbrAjax.get("session").then(function (data) {
            if(data.status !== 200||data.data.status !== 200){
                Message.error("登陆超时！！请重新登陆")
            }
        }).catch(function (error) {
            Message.error("登陆超时！！请重新登陆")
        });
    }
    return t1
    //去掉定时器的方法
    // window.clearInterval(t1);
};

export default CbrData;