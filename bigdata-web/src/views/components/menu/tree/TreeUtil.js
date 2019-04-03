class TreeUtil {
}


//将非树形数据处理成树形
TreeUtil.handler = function (data) {
    let level = -1;
    let result = [];
    TreeUtil.handlerChildren(result,{children:data},level);
    return result
};

TreeUtil.handlerChildren = function (result,parent, level) {
    level = level + 1;
    parent.children.forEach(item => {
        //第一个菜单 是没有父节点的
        if(level>0){
            item._parent = parent;
        }
        item._level = level;
        result.push(item);
        if (parent.children && parent.children.length > 0) {
            TreeUtil.handlerChildren(result,item,level)
        }
    })
};


export default TreeUtil;