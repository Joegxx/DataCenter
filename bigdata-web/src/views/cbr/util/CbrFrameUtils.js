/***************************************************************************
 * 创建报表时后端数据交互
 ***************************************************************************/
import CbrAjax from '@cbr/util/CbrAjax'
import CbrData from "@/views/cbr/util/CbrDataUtils";

class CbrFrameUtils{}
//定义报表基础数据 表名、id、描述
CbrFrameUtils.defineCbr = async function(param){
    let res = await CbrAjax.post("/define",param);
    if(res.status === 200){
        return res.data;
    }
    return {status:res.status}
};
//保存报表字段
CbrFrameUtils.saveCbrColumns = async function(relreportId,columns,delColumnIds){
    for (let index in columns){
        columns[index]['order'] = index
    }
    let param = {};
    param['columns'] = columns;
    param['delColumnIds'] = delColumnIds;
    let url = "/"+relreportId+"/columns";
    let res = await CbrAjax.post(url,param);
    if(res.status === 200){
        return res.data;
    }
    return {status:res.status}

};

//保存报表查询sql
CbrFrameUtils.saveCbrSqls = async function(relreportId,value,delSqlIndex){
    for (let index in value){
        if(index % 2 === 0){
            value[index]['name'] = index/2+""
        }else{
            value[index]['name'] = "_"+((index-1)/2)
        }

    }
    let param = {};
    param['value'] = value;
    param['delSqlIndex'] = delSqlIndex;
    let url = "/"+relreportId+"/sqls";
    let res = await CbrAjax.post(url,param);
    if(res.status === 200){
        return res.data;
    }
    return {status:res.status}

};
//保存报表下载sql
CbrFrameUtils.saveCbrDownload = async function(relreportId,param){
    let url = "/"+relreportId+"/download";
    let res = await CbrAjax.post(url,param);
    if(res.status === 200){
        return res.data;
    }
    return {status:res.status}

};
//保存报表查询参数
CbrFrameUtils.saveCbrParams = async function(relreportId,params,delParamIds){
    let param = {};
    param['params'] = params;
    param['delParamIds'] = delParamIds;
    let url = "/"+relreportId+"/params";
    let res = await CbrAjax.post(url,param);
    if(res.status === 200){
        return res.data;
    }
    return {status:res.status}

};

export default CbrFrameUtils;