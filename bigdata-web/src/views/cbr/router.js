import metaData from '@views/metaData'

const prefix=metaData.cbrPrefix;




const home = r => require.ensure([], () => r(require('@cbr/main.vue')), 'home');

//==================publish==============
const publishConfig = r => require.ensure([], () => r(require('@publish/config')), 'publishConfig');
const publishDeploy = r => require.ensure([], () => r(require('@publish/deploy')), 'publishDeploy');

//大区配置
const AreaConfig = r => require.ensure([], () => r(require('@cbr/config/AreaConfig')), 'AreaConfig');
const CityConfig = r => require.ensure([], () => r(require('@cbr/config/CityConfig')), 'CityConfig');
const UserConfig = r => require.ensure([], () => r(require('@cbr/config/UserConfig')), 'UserConfig');
const reportCreate = r => require.ensure([], () => r(require('@cbr/create/index')), 'reportCreate');
const cbrList = r => require.ensure([], () => r(require('@cbr/manage/CbrList')), 'cbrList');
const admin = r => require.ensure([], () => r(require('@cbr/manage/admin')), 'admin');
//定制报表
const channelPosition = r => require.ensure([], () => r(require('@cbr/custom/charts/channelPosition.vue')), 'channelPosition');

const dataxTaskCreate = r => require.ensure([], () => r(require('@datax/create.vue')), 'dataxTaskCreate');
const dataxTaskList = r => require.ensure([], () => r(require('@datax/list.vue')), 'dataxTaskList');
const dataxTaskLog = r => require.ensure([], () => r(require('@datax/log.vue')), 'dataxTaskLog');
const datasource = r => require.ensure([], () => r(require('@datax/datasource/index.vue')), 'datasource');

const routers = [
    //首页
    {path: prefix+'/index', meta: {keepAlive: true}, component: home},

    //datax的任务创建
    {path: prefix+'/config/datax/create', component: dataxTaskCreate, meta: {keepAlive: true}},
    //datax的任务列表
    {path: prefix+'/config/datax/list', component: dataxTaskList},
    //datax任务执行日志
    {path: prefix+'/config/datax/log', component: dataxTaskLog, meta: {keepAlive: true}},
    //datax数据源配置页
    {path: prefix+'/config/datax/datasource', component: datasource, meta: {keepAlive: true}},

    //==================publish==============
    {path: prefix+'/config/publish/config', component: publishConfig},
    {path: prefix+'/config/publish/deploy', component: publishDeploy},

    //系统配置页
    {path: prefix+'/config/AreaConfig', component: AreaConfig},
    {path: prefix+'/config/CityConfig', component: CityConfig},
    {path: prefix+'/config/UserConfig', component: UserConfig},
    {path: prefix+'/report/create', component: reportCreate,meta: {keepAlive: true}},
    {path: prefix+'/list', component: cbrList},
    {path: prefix+'/admin', component: admin},
    //定制报表
    {path: prefix+'/custom/channelPosition', component: channelPosition},
];
export default routers;