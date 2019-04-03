const cbr ={
    state:{
        cbrData:{},//存放所有报表的数据
    },
    mutations:{//这
        ADD_VISITED_DATA:(state,data)=>{
            //打开新页签--添加路由数据的方法      if(state.visitedviews.some(v=>v.path==view.path))return;
            state.cbrData[data.name]=data.data
        },
        DEL_VISITED_DATA:(state,name)=>{//关闭页签--删除路由数据的方法
            delete state.cbrData[name]
        }
    },
    actions:{//调用这里去触发mutations，如何调用？在组件内使用this.$store.dispatch('action中对应名字', 参数)
        addCbrData({commit},data){//通过解构赋值得到commit方法
            commit('ADD_VISITED_DATA',data)//去触发ADD_VISITED_VIEWS，并传入参数
        },
        delCbrData({commit},data){//删除数组存放的路由之后，需要再去刷新路由，这是一个异步的过程，需要有回掉函数，所以使用并返回promise对象，也可以让组件在调用的时候接着使用.then的方法
            commit('DEL_VISITED_DATA',name)
            // return new Promise((resolve)=>{//resolve方法：未来成功后回掉的方法
            //     commit('DEL_VISITED_VIEWS',view);
            //     resolve([...state.visitedviews]);
            // })
        }

    },
    getters:{
        cbrData:state => {return state.cbrData}
    }
};
export default cbr