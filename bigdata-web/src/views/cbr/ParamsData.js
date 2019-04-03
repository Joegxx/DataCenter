import metaData from '@views/metaData'

const prefix=metaData.cbrPrefix;

const homeMenuData = {
    "publishConfig": {
        "icon": "ios-navigate",
        "name": "发布配置",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/publish/config",
                "name": "配置"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/publish/deploy",
                "name": "发布"
            }
        ]
    },
    "dataxConfig": {
        "icon": "ios-navigate",
        "name": "DATAX配置",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/datax/create",
                "name": "创建任务"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/datax/list",
                "name": "任务列表"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/datax/datasource",
                "name": "数据源配置"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/datax/log",
                "name": "查看日志"
            }
        ]
    },
    "areaConfig": {
        "icon": "ios-navigate",
        "name": "报表配置",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/AreaConfig",
                "name": "大区管理"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/CityConfig",
                "name": "城市管理"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/config/UserConfig",
                "name": "人员管理"
            }
        ]
    },
    "realreport": {
        "icon": "ios-navigate",
        "name": "实时报表",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/report/create",
                "name": "创建报表"
            },

            {
                "icon": "ios-navigate",
                "url": prefix+"/admin",
                "name": "配置页面"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/list",
                "name": "报表列表"
            },
        ]
    },
    "aboutData": {
        "icon": "ios-navigate",
        "name": "定制报表",
        "children": [
            {
                "icon": "ios-navigate",
                "url": prefix+"/data/crawl/CrawlDataShow",
                "name": "数据抓取"
            },
            {
                "icon": "ios-navigate",
                "url": prefix+"/custom/channelPosition",
                "name": "渠道人员轨迹"
            }
        ]
    },
};
export default {
    homeMenuData,prefix
}
