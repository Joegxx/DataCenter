import Ajax from '@views/utils/ajax'
import global_config from '@/global_config'


class CbrAjax {
}

CbrAjax.post = async function (url, params) {
    if (!url.startsWith('/')) {
        url = '/' + url;
    }

    return await Ajax.post(global_config.cbr + url, params);
};

CbrAjax.get = async function (url) {
    if (!url.startsWith('/')) {
        url = '/' + url;
    }
    let res = await Ajax.get(global_config.cbr + url);

    return res;
};

export default CbrAjax;