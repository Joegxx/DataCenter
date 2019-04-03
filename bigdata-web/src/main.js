import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import axios from "axios";
import qs from 'qs';
import VueContextMenu from 'vue-contextmenu';
import Cookies from 'js-cookie';
import echarts from 'echarts';


import 'vue-contextmenu/style/css/font-awesome.min.css'
import 'iview/dist/styles/iview.css';


import store from '@/store/index'
import Routers from '@/router';
import Util from '@/libs/util';
import App from '@/app.vue';
import global from "@/global_config";
import axios_config from "@/axios_config";
import compare from "@/views/utils/compare";

Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueContextMenu);


//elementUI配置
import 'element-ui/lib/theme-chalk/index.css';
import {Table,TableColumn,Button,DropdownMenu,DropdownItem,Dropdown,Autocomplete,Dialog} from 'element-ui'
Vue.use(TableColumn);
Vue.use(Table);
Vue.use(Button);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Dropdown);
Vue.use(Autocomplete);
Vue.use(Dialog);


//百度地图
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
    // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
    ak: 'NQcsKsOwcXq360BjKdNmy1Gtj5ilQygB'
});

//西区选择
import VDistpicker from 'v-distpicker'

Vue.component('v-distpicker', VDistpicker)

//引入进度条组件
// import Progress from 'vue-multiple-progress'
// Vue.component('vm-progress', Progress);
// Vue.use(Progress);

Vue.prototype.$axios = axios;
Vue.prototype.$cookies = Cookies;
Vue.prototype.$axiosConfig = axios_config;
Vue.prototype.$global = global;
Vue.prototype.$qs = qs;
Vue.prototype.$echarts = echarts;
Vue.prototype.$compare = compare;




// 路由配置
const RouterConfig = {
    mode: 'history',
    routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});
router.afterEach(() => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});


new Vue({
    el: '#app',
    router: router,
    store: store,
    render: h => h(App)
});