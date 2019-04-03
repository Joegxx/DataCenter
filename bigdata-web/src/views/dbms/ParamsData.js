import metaData from '@views/metaData'

const prefix=metaData.dbmsPrefix;

const homeMenuData = [
    {
        "icon": "laptop",
        "name": "数据中心",
        "children": [
            {
                "icon": "laptop",
                "name": "老数仓",
                "key": "老数仓",
                "mType": "1",
                "url":"/dataCenter/show",
                "data": "10.100.16.12",
            },
            {
                "icon": "laptop",
                "name":"新数仓",
                "key":"新数仓",
                "mType": "1",
                "url":"/dataCenter/show",
                "data":  "10.100.16.94"
            },
            {
                "icon": "laptop",
                "name":"报表数据库",
                "key":"报表数据库",
                "mType": "1",
                "url":"/dataCenter/show",
                "data":  "10.100.16.95"
            }
        ]
    },
    {
        "icon": "ios-navigate",
        "name": "用户中心",
        "children": [
            {
                "icon": "ios-navigate",
                "data": "/cbr/OperIndicOffline",
                "name": "下载任务",
                "dbType": "taskmanage",
                "key": "下载任务",
            },
            {
                "icon": "ios-navigate",
                "data": "/sys/config/param/index",
                "name": "登出",
                "key": "登出"
            },
            {
                "icon": "ios-navigate",
                "data": "/#",
                "name": "修改密码",
                "key": "修改密码",
            }
        ]
    },
    {
        "icon": "ios-navigate",
        "name": "系统管理",
        "children": [
            {
                "icon": "ios-navigate",
                "data": "/cbr/admin",
                "name": "切换主题",
                "key": "切换主题",
            },
            {
                "icon": "ios-navigate",
                "data": "/cbr/OperIndicOffline",
                "name": "数据源管理",
                "dbType": 11,
                "key": "数据源管理",
            },

        ]
    }

];

export default {
    homeMenuData,prefix
}