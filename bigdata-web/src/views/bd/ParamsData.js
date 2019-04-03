import metaData from '@views/metaData'

const prefix=metaData.bdPrefix;

const homeMenuData = {
    // "dataxConfig": {
    //     "icon": "ios-navigate",
    //     "name": "DATAX配置",
    //     "children": [
    //         {
    //             "icon": "ios-navigate",
    //             "url": prefix+"/config/datax/create",
    //             "name": "创建任务"
    //         },
    //         {
    //             "icon": "ios-navigate",
    //             "url": prefix+"/config/datax/list",
    //             "name": "任务列表"
    //         },
    //         {
    //             "icon": "ios-navigate",
    //             "url": prefix+"/config/datax/datasource",
    //             "name": "数据源配置"
    //         },
    //         {
    //             "icon": "ios-navigate",
    //             "url": prefix+"/config/datax/log",
    //             "name": "查看日志"
    //         }
    //     ]
    // },
    "sysManage": {
        "icon": "ios-navigate",
        "name": "系统管理",
        "children": [
            {
                "icon": "ios-navigate",
                "url":prefix+"/sys/config/param/index",
                "name": "参数配置"
            },
            {
                "icon": "ios-navigate",
                "url":prefix+"/sys/operation/index",
                "name": "系统运维"
            },
            {
                "icon": "ios-navigate",
                "url":prefix+"/config/router/index",
                "name": "路由配置"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/#",
                "name": "API管理"
            },
        ]
    },
    "realreport": {
        "icon": "ios-navigate",
        "name": "实时报表",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/admin",
                "name": "配置页面"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/OnlineTarget",
                "name": "线上运营指标(目标)"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/OperIndicOffline",
                "name": "线下运营指标"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/bid/BuyerBid",
                "name": "户均参拍率报表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/bid/CarBid",
                "name": "车均报表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/bid/avg",
                "name": "户均报表(新)"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/bid/BuyerBidPrice",
                "name": "对商出价报表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/chargecar/CPortDetectionOfCar",
                "name": "C端检测收车实时报表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/chargecar/CPortStoreCollectionCar",
                "name": "C端门店收车实时报表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/chargecar/RPortDetectionOfCar",
                "name": "R端检测收车实时报表"
            }, {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/chargecar/RPortChannelOfCar",
                "name": "R端渠道收车实时报表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/cbr/test/tblTest",
                "name": "测试"
            }

        ]
    },
    "aboutData": {
        "icon": "ios-navigate",
        "name": "数据相关",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/data/crawl/CrawlDataShow",
                "name": "数据抓取"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/#",
                "name": "敬请期待"
            }
        ]
    },
};

export default {
    homeMenuData,prefix
}
