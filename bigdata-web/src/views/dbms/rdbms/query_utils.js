import axios from "axios";
import global from "@/global_config"
import axios_config from "@/axios_config"
import { Loading,Message } from 'element-ui';

class QueryData{}

QueryData.query=async function (db,sql,) {
    const loading = Loading.service({
        lock: true,
        text: '努力查询中......',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    });
   let res = await axios.post(global.dbmsServerPath + '/execute/data', {
        name: db.name,
        dbType: db.dbType,
        sql: sql,
        selectNext: false
    }, axios_config.data_query_config);
    loading.close();
    if (res.status === 200) {
        return res.data
    } else {
        Message.success("用户未登陆或网络链接有问题！！！");
        return res
    }
};



export default QueryData;