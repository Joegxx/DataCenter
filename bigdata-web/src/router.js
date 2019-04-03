
import metaData from '@views/metaData'
//加载主页
const bdIndex = r => require.ensure([], () => r(require('@bd/index.vue')), 'bdIndex');
const dbmsIndex = r => require.ensure([], () => r(require('@dbms/index.vue')), 'dbmsIndex');
const cbrIndex = r => require.ensure([], () => r(require('@cbr/index.vue')), 'cbrIndex');
//导入路由信息
import bdRouters from '@bd/router'
import dbmsRouters from '@dbms/router'
import cbrRouters from '@cbr/router'





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

const BizTools = r => require.ensure([], () => r(require('@cbr/manage/BizTools.vue')), 'BizTools');
const CrawlDataShow = r => require.ensure([], () => r(require('@bd/crawl/CrawlDataShow')), 'CrawlDataShow');
//boss系统中树形报表
const bossTree = r => require.ensure([], () => r(require('@cbr/templates/TreeCBR.vue')), 'bossTree');

const channelPosition = r => require.ensure([], () => r(require('@cbr/custom/charts/channelPosition.vue')), 'channelPosition');


const routers = [
    //主页配置
    {path: metaData.bdPrefix,component: bdIndex,children:bdRouters,},
    {path: metaData.dbmsPrefix,component: dbmsIndex,children:dbmsRouters,},
    {path: metaData.cbrPrefix,component: cbrIndex,children:cbrRouters,},



    //提供boss系统的报表
    { path: '/bigdata/cbr/boss/:realreportId',component:  bossTree},
    //线下运营报表
    { path: '/bigdata/cbr/OperIndicOffline',component:  OperIndicOffline},
    //商户出价报表
    { path: '/bigdata/cbr/bid/BuyerBid',component:  BuyerBid},
    //商户出价报表
    { path: '/bigdata/cbr/bid/avg',component:  BidAvg},
    //车辆出价报表
    { path: '/bigdata/cbr/bid/CarBid',component:  CarBid},
    //报表工具
    { path: '/bigdata/cbr/tool',component:  BizTools},
    //C端检测收车实时报表
    { path: '/bigdata/cbr/chargecar/CPortDetectionOfCar',component:  CPortDetectionOfCar},
    //C端门店收车实时报表
    { path: '/bigdata/cbr/chargecar/CPortDetectionOfCar',component:  CPortStoreCollectionCar},
    //R端检测收车实时报表
    { path: '/bigdata/cbr/chargecar/RPortDetectionOfCar',component:  RPortDetectionOfCar},
    //R端渠道收车实时报表
    { path: '/bigdata/cbr/chargecar/RPortChannelOfCar',component:  RPortChannelOfCar},
    //数据抓取
    { path: '/bigdata/data/crawl/CrawlDataShow',component:  CrawlDataShow},
    //树形户均
    { path: '/bigdata/cbr/auction/bid/avg',component:  CrawlDataShow},
    //树形户均
    { path: '/bigdata/cbr/OnlineTarget',component:  OnlineTarget},
    //树形户均
    { path: '/bigdata/cbr/channelPosition',component:  channelPosition},

];
export default routers;