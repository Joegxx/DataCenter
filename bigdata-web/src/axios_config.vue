<script>
     // import qs from 'qs';
     // "Content-Type": "application/json"
     // 顺便一提
     // "Content-Type": "application/x-www-form-urlencoded" // 适用于大部分情况
     // "Content-Type": "multipart/form-data" // 适用于文件上传

     Date.prototype.Format = function (fmt) { //author: meizz
         var o = {
             "M+": this.getMonth() + 1, //月份
             "d+": this.getDate(), //日
             "H+": this.getHours(), //小时
             "m+": this.getMinutes(), //分
             "s+": this.getSeconds(), //秒
             "q+": Math.floor((this.getMonth() + 3) / 3), //季度
             "S": this.getMilliseconds() //毫秒
         };
         if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
         for (var k in o)
             if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
         return fmt;
     };

     const axios_config = {
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(JSON.stringify(data[it]).replace("\\\\", "\\"))
            }
            if (ret === '') {
                return ret;
            }
            return ret.substring(1)

            // return this.$qs.stringify(data);
        }],
        transformResponse: [function (data) {
            // 这里提前处理返回的数据

            return data;
        }],

        // 请求头信息
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
        },


        //设置超时时间
        timeout: 50000,
        //返回数据类型
        responseType: 'json', // default


    };

    const normal_config = {
        transformRequest: [function (data) {
            let ret = '';
            for (let it in data) {
                let value = data[it];
                if(value instanceof Array){
                    ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(value.join(","))
                }else if(value instanceof Date){
                    let v = value.Format("yyyy-MM-dd HH:mm:ss");
                    ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(v)
                }else {
                    ret += '&' + encodeURIComponent(it) + '=' + encodeURIComponent(value)
                }

            }
            if (ret === '') {
                return ret;
            }
            return ret.substring(1)

            // return this.$qs.stringify(data);
        }],
        transformResponse: [function (data) {
            // 这里提前处理返回的数据

            return data;
        }],

        // 请求头信息
        headers: {
            "Content-Type": 'application/x-www-form-urlencoded;charset=UTF-8'
        },


        //设置超时时间
        timeout: 30000,
        //返回数据类型
        responseType: 'json', // default


    };
     const json_config = {
         transformRequest: [function (data) {
              return JSON.stringify(data);
         }],
         transformResponse: [function (data) {
             // 这里提前处理返回的数据

             return data;
         }],

         // 请求头信息
         headers: {
             "Content-Type": 'application/json;charset=UTF-8'
         },


         //设置超时时间
         timeout: 50000,
         //返回数据类型
         responseType: 'json', // default

     };
     const data_query_config = {
         transformRequest: [function (data) {
             return JSON.stringify(data);
         }],
         transformResponse: [function (data) {
             // 这里提前处理返回的数据

             return data;
         }],

         // 请求头信息
         headers: {
             "Content-Type": 'application/json;charset=UTF-8'
         },


         //设置超时时间
         timeout: 500000,
         //返回数据类型
         responseType: 'json', // default

     };
    export default {
        axios_config,
        normal_config,
        json_config,
        data_query_config
    }
</script>

