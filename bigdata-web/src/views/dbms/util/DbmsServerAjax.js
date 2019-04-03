import Ajax from '@views/utils/ajax'
import  global_config from '@/global_config'

class DbmsServerAjax{}
DbmsServerAjax.post=async function (url,params) {
    if(!url.startsWith('/')){
        url='/'+url;
    }
    return await Ajax.post(global_config.dbmsServerPath+url,params);
};

DbmsServerAjax.get=async function (url) {
    if(!url.startsWith('/')){
        url='/'+url;
    }
    return await Ajax.get(global_config.dbmsServerPath+url);
};

export default DbmsServerAjax;