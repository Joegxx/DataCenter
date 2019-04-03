import Axios from "axios";
import global from "@/axios_config";
import Common from '@views/utils/common'

class Ajax{}

Ajax.post= async function (url,params) {
    let res = await Axios.post(url,params, global.json_config);

    if(res.status === 200 && res.data.status === 4004){
        Common.redirectToLoginPage(res.data.msg)
    }
    return res;

};
Ajax.get=async function (url){
    let res = await Axios.get(url, global.json_config);
    if(res.status === 200 && res.data.status === 4004){
        Common.redirectToLoginPage(res.data.msg)
    }
    return res;
};
export default Ajax;