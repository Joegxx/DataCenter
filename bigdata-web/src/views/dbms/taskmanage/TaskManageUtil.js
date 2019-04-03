import global from '@/global_config'
import Ajax from '@views/utils/ajax'
class TaskManageUtil{}
TaskManageUtil.getAllTask = async function(){
    return await Ajax.get(global.dbmsServerPath+"/task/info")
};
TaskManageUtil.download = async function(name){
    let url = global.dbmsServerPath+"/download/"+encodeURI(name);
    window.location.href = url;
};
TaskManageUtil.deleteTask = async function(id){
    return await Ajax.post(global.dbmsServerPath+"/task/delete/"+id)
};
export default TaskManageUtil