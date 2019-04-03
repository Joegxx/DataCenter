import { Loading,Message } from 'element-ui';
import DbmsServerAjax from "@/views/dbms/util/DbmsServerAjax";
class dbmsUtils{}
dbmsUtils.refreshSession =  function () {
    let t1 = window.setInterval(refreshCount, 15000);
    function refreshCount() {
        DbmsServerAjax.get("session").then(function (data) {
            if(data.status !== 200||data.data.status !== 200){
                Message.error("登陆超时！！请重新登陆")
            }
        }).catch(function (error) {
            Message.error("登陆超时！！请重新登陆")
        });
    }
    return t1
    //去掉定时器的方法
    // window.clearInterval(t1);
};
export default  dbmsUtils;