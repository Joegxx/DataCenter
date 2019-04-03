import metaData from '@views/metaData'

const prefix=metaData.bdPrefix;

const home = r => require.ensure([], () => r(require('@bd/main.vue')), 'home');
//系统管理
const sysConfigIndex = r => require.ensure([], () => r(require('@SysManager/SysParamConfig/index')), 'sysConfigIndex');
//系统运维
const operation = r => require.ensure([], () => r(require('@SysManager/operation/index')), 'operation');


// const dataxTaskCreate = r => require.ensure([], () => r(require('@datax/create.vue')), 'dataxTaskCreate');
// const dataxTaskList = r => require.ensure([], () => r(require('@datax/list.vue')), 'dataxTaskList');
// const dataxTaskLog = r => require.ensure([], () => r(require('@datax/log.vue')), 'dataxTaskLog');
// const datasource = r => require.ensure([], () => r(require('@datax/datasource/index.vue')), 'datasource');

const routerConfig= r => require.ensure([], () => r(require('@bd/router/index')), 'routerConfig');



const CBRAdmin = r => require.ensure([], () => r(require('@realreport/admin.vue')), 'CBRAdmin');
const OperIndicOffline = r => require.ensure([], () => r(require('@realreport/cbr/OperIndicOffline/OperIndicOffline.vue')), 'OperIndicOffline');
const BuyerBid = r => require.ensure([], () => r(require('@realreport/cbr/bid/BuyerBid.vue')), 'BuyerBid');
const CarBid = r => require.ensure([], () => r(require('@realreport/cbr/bid/CarBid')), 'CarBid');
//对商出价报表
const BuyerBidPrice = r => require.ensure([], () => r(require('@realreport/cbr/bid/BuyerBidPrice')), 'BuyerBidPrice');
//新户均
const BidAvg = r => require.ensure([], () => r(require('@realreport/cbr/bid/TreeBidCount')), 'BidAvg');
//C端检测收车实时报表
const CPortDetectionOfCar = r => require.ensure([], () => r(require('@realreport/cbr/chargecar/CPortDetectionOfCar.vue')), 'CPortDetectionOfCar');
//C端门店收车实时报表
const CPortStoreCollectionCar = r => require.ensure([], () => r(require('@realreport/cbr/chargecar/CPortStoreCollectionCar.vue')), 'CPortStoreCollectionCar');
//R端检测收车实时报表
const RPortDetectionOfCar = r => require.ensure([], () => r(require('@realreport/cbr/chargecar/RPortDetectionOfCar.vue')), 'RPortDetectionOfCar');
//R端渠道收车实时报表
const RPortChannelOfCar = r => require.ensure([], () => r(require('@realreport/cbr/chargecar/RPortChannelOfCar.vue')), 'RPortChannelOfCar');
//线上运营指标（目标）
const OnlineTarget = r => require.ensure([], () => r(require('@realreport/cbr/customer/OnlineTarget.vue')), 'OnlineTarget');


//测试
const tblTest = r => require.ensure([], () => r(require('@realreport/cbr/test/TblTest')), 'tblTest');



const BizTools = r => require.ensure([], () => r(require('@realreport/BizTools.vue')), 'BizTools');

const CrawlDataShow = r => require.ensure([], () => r(require('@bd/crawl/CrawlDataShow')), 'CrawlDataShow');



const routers = [
    //首页
    {path: prefix+'/index', meta: {keepAlive: true}, component: home},
    //系统配置页
    {path: prefix+'/sys/config/param/index', component: sysConfigIndex},
    //系统运维页
    {path: prefix+'/sys/operation/index', component: operation},
    // //datax的任务创建
    // {path: prefix+'/config/datax/create', component: dataxTaskCreate, meta: {keepAlive: true}},
    // //datax的任务列表
    // {path: prefix+'/config/datax/list', component: dataxTaskList},
    // //datax任务执行日志
    // {path: prefix+'/config/datax/log', component: dataxTaskLog, meta: {keepAlive: true}},
    // //datax数据源配置页
    // {path: prefix+'/config/datax/datasource', component: datasource, meta: {keepAlive: true}},
    //路由配置页面
    {path: prefix+'/config/router/index', component: routerConfig, meta: {keepAlive: true}},
    //报表管理页面
    {path: 'cbr/admin', component: CBRAdmin},
    //线上运营报表(目标)
    {path: prefix+'/cbr/OnlineTarget', component: OnlineTarget},
    //线下运营报表
    {path: prefix+'/cbr/OperIndicOffline', component: OperIndicOffline, meta: {keepAlive: true}},
    //商户出价报表
    {path: prefix+'/cbr/bid/BuyerBid', component: BuyerBid, meta: {keepAlive: true}},
    //商户出价报表
    {path: prefix+'/cbr/bid/avg', component: BidAvg},
    //车辆出价报表
    {path: prefix+'/cbr/bid/CarBid', component: CarBid, meta: {keepAlive: true}},
    //对商出价报表
    {path: prefix+'/cbr/bid/BuyerBidPrice', component: BuyerBidPrice, meta: {keepAlive: true}},
    //C端检测收车实时报表
    {path: prefix+'/cbr/chargecar/CPortDetectionOfCar', component: CPortDetectionOfCar, meta: {keepAlive: true}},
    //C端门店收车实时报表
    {path: prefix+'/cbr/chargecar/CPortStoreCollectionCar', component: CPortStoreCollectionCar, meta: {keepAlive: true}},
    //R端检测收车实时报表
    {path: prefix+'/cbr/chargecar/RPortDetectionOfCar', component: RPortDetectionOfCar, meta: {keepAlive: true}},
    //R端渠道收车实时报表
    {path: prefix+'/cbr/chargecar/RPortChannelOfCar', component: RPortChannelOfCar, meta: {keepAlive: true}},

    //C端门店收车实时报表
    {path: prefix+'/cbr/test/tblTest', component: tblTest},


    //数据抓取
    {path: prefix+'/data/crawl/CrawlDataShow', component: CrawlDataShow},


];
export default routers;