const home = r => require.ensure([], () => r(require('@dbms/main.vue')), 'home');
const show = r => require.ensure([], () => r(require('@rdbms/RdbShow.vue')), 'home');
const showDemo = r => require.ensure([], () => r(require('@rdbms/RdbShowDemo.vue')), 'home');

const routers = [
    //首页
    {path: 'index', meta: {keepAlive: true}, component: home},
    {path: 'dataCenter/show', meta: {keepAlive: true}, component: show},
    {path: 'dataCenter/show/:name/:dbType', meta: {keepAlive: true}, component: showDemo},
];
export default routers;