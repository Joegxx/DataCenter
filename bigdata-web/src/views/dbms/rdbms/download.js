import util from '@/libs/util'
import exportUtils from '@dbms/util/exportUtils';
import global from '@/global_config'
import Ajax from '@views/utils/ajax'

class Download{

    constructor(url) {
        this.ws=new WebSocket('ws://'+url);
    }

//getData(msg)获取数据 over()数据获取完成   success()下载成功
    download (req,getData,over,success,filename){
        // let ws = new WebSocket('ws://localhost:19999/websocket');
        let file = filename || 'data.csv';
        let ws = this.ws;
        ws.onopen = () => {
            // Web Socket 已连接上，使用 send() 方法发送数据
            ws.send(JSON.stringify(req));
            console.log('请求发送中...')
        };
        ws.onmessage = evt => {
            let data = JSON.parse(evt.data);
            if(data.status===200){
                over();
                let columns = util.getColumns(data.data);
                let params = {
                    columns: columns,
                    data: data.data,
                    fileName:file
                };
                exportUtils.exportCsv(params);
                success();
            }else{
                // console.log(data.msg);
                getData(data.msg)
            }
        };
        ws.onclose = function () {
            // 关闭 websocket
            console.log('连接已关闭...')
        };
    };

    close(){
        this.ws.close();
    }
}
Download.createTask = async function (param) {
    return await Ajax.post(global.dbmsServerPath+"/task",param)
};
Download.checkTaskName =async function (name) {
    return await Ajax.get(global.dbmsServerPath+"/task/"+name)
};


export  default  Download;