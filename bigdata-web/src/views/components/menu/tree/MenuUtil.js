import Axios from "axios";
import global from '@/global_config'

class MenuUtil{}

MenuUtil.getColumnsInfo = async function (params) {
    //query string
    let url = global.dbmsServerPath+'/get/schema/table/column';
    let res =  await Axios.post(url,params);
    if(res.status===200){
        res = res.data;
        if(res.status === 200){
            return res.data
        }else{
            return [{column:res.status,desc:res.msg}]
        }
    }else{
        return [{column:res.status,desc:res.msg}]
    }
};


export default MenuUtil;