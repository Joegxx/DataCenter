import axios from 'axios';
import env from '../config/env';

let util = {

};
util.title = function(title) {
    title = title ? title + ' - Home' : '大数据后台管理';
    window.document.title = title;
};

const ajaxUrl = env === 'development' ?
    'http://127.0.0.1:8888' :
    env === 'production' ?
    'https://www.url.com' :
    'https://debug.url.com';

util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.getColumns = function (data) {
    let cols = [];
    let col;
    if (data && data.length > 0) {
        let datum = data[0];
        let len = Object.keys(datum).length;
        for (let item in datum) {
            col = {
                title: item,
                key: item,
                searchable: true,
                ellipsis: true,
                width:100
            };
            // if (len > 14) {
            //     col["width"] = 100;
            // }
            cols.push(col)
        }
    }
    return cols;
};
util.post=function (params,success,error) {

};


util.copyObject=function copy(obj){
    let newobj = {};
    for ( let attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
};
export default util;