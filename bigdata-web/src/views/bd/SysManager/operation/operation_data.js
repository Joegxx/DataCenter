import axios from "axios";
import global from "@/global_config"
import axios_config from "@/axios_config"
import { Loading } from 'element-ui';

class Data {}

Data.getSysInfos= async function () {
    let res = await axios.get(global.sysConfigPath+"/sys/name");
    if(res.data.status===200){
        return res.data.data
    }
  return []
};

Data.getSysInfo =async function(sysName){
    if(!sysName){
        return
    }
    let res = await axios.get(global.sysConfigPath+"/sys/info/"+sysName);
    if(res.data.status===200){
        res.data.data.forEach(item=>{
            let appPath = item["appPath"];
            let split = appPath.trim().split("/");
            item["version"] = split[split.length-2]
        });
        return res.data.data
    }
    return []
};

Data.deploy= async function (sysName,versionFileName,host,local) {
    const loading = Loading.service({
        lock: true,
        text: '发布中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
    if(!sysName || !versionFileName || !host){
        return
    }
    let params = {
        versionFileName:versionFileName,
        sysName:sysName,
        host:host,
        local:local
    };
    let res = await axios.post(global.deploy+"/sys",params,axios_config.json_config);
    loading.close();
    if(res.status===200){
        return res.data
    }
    return res
};

Data.deployFileOpt= async function (params) {
    let sysName = params["sysName"];
    let host = params["host"];
    if(!sysName || !host){
        return
    }
    let res = await axios.post(global.deploy+"/files",params,axios_config.json_config);
    if(res.status===200){
        return res.data
    }
    return res
};

Data.deployFileHandler =async function (dialog,message) {
    let res = await Data.deployFileOpt({sysName:dialog.sysName, option:dialog.query, host:dialog.host});
    if (res.status === 200) {
        res.data.forEach(item => {
            let ss = item.trim().split("||");
            if (ss[1] !== "" && ss[0] !== "") {
                    dialog.gridData.push({
                    file: ss[1],
                    time: ss[0],
                    host: dialog.host,
                    expiredFiles:ss[1],
                    option: dialog.delete,
                    sysName: this.sysName
                })
            }
        });
        dialog.delete = true;
        dialog.handleDelete = async function (params,index) {
            let ret =await Data.deployFileOpt(params);
            if(ret.status===200){
                gridData.splice(index,1);
                message.success("删除成功!!")
            }else{
                message.error("删除失败!!")
            }
        };
        dialog.deploy = async function (params,local) {
            let ret =await Data.deploy(dialog.sysName,params.file,dialog.host,local);
            if(ret.status===200){
                message.success("发布成功!!")
            }else{
                message.error("发布失败!!")
            }
        };
        return true;
    } else {
        message.error("查询失败!!")
    }
    return false
};

Data.changeLogLevel=function (level,host,port) {
    let url = "http://"+host+":"+port+"/logback/level";
    axios.post(url,{
        level:level,
        packageName:'com.chezhibao.bigdata'
    },axios_config.normal_config);

    axios.post(url,{
        level:level
    },axios_config.normal_config);
    axios.post(url,{
        level:level,
        packageName:'org.mybatis'
    },axios_config.normal_config);

};
class Dialog{

}

export default Data;