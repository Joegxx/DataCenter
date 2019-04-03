import Ajax from '@views/utils/ajax'
import Axios from "axios";
import  global_config from '@/global_config'

class DeployAjax{}
DeployAjax.post=async function (url, params) {
    if(!url.startsWith('/')){
        url='/'+url;
    }
    return await Axios.post(global_config.deploy+url,params);
};

DeployAjax.get=async function (url) {
    if(!url.startsWith('/')){
        url='/'+url;
    }
    return await Ajax.get(global_config.deploy+url);
};

export default DeployAjax;