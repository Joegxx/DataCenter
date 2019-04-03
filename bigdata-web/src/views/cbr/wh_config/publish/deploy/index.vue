<template>
    <div>
        <h1>发布管理</h1>
        ----------------------------------------------------
        ----------------------------------------------------
        ----------------------------------------------------
        <div>
            <div>
                文件名=><Input type="text" v-model="find_name" placeholder="SVN文件名,如 ods_aucs_ams_bidlog_init.sh..." style="width: 300px"></Input>
                <Button @click="getPath" type="ghost" icon="ios-search">查找路径</Button>
            </div>

            <div v-for="(value,index) in list1">
                {{value}}<Button @click="pathSelect(value)" type="ghost" size="small">选择</Button>
            </div>
        </div>
        ----------------------------------------------------
        ----------------------------------------------------
        ----------------------------------------------------
        <div>
            <div>
                path=><Input type="text" v-model="find_path" placeholder="SVN全路径,如 ods/chezhibao/job/***.sh..." style="width: 300px"></Input>
                <Button @click="getVersion" type="ghost" icon="ios-search">查找发布版本</Button>
            </div>
            <p>{{version}}</p>
        </div>
        ----------------------------------------------------
        ----------------------------------------------------
        ----------------------------------------------------
        <div>
            <div>
                path=><Input type="text" v-model="publish_path" placeholder="SVN全路径,如 ods/chezhibao/job/***.sh..." style="width: 300px"></Input>
                version=><Input type="text" v-model="publish_version" style="width: 50px"></Input>
                type=>
                <Select v-model="publish_type" style="width:100px">
                    <Option value="1">文件夹</Option>
                    <Option value="0">文件</Option>
                </Select>
                <Button @click="publish" type="ghost">发布</Button>{{status}}
            </div>
            <p>{{message}}</p>
            <p>{{data}}</p>
        </div>

        ----------------------------------------------------
        ----------------------------------------------------
        ----------------------------------------------------
        <div>
            <div>
                <P>批量发布(使用[split]分隔符;不要换行;必须是全路径;)</P>
                <Input v-model="publish_paths" type="textarea" :autosize="{minRows: 2,maxRows: 10}" placeholder="如:ods/chezhibao/job/aa.sh[split]ods/chezhibao/job/bb.sh[split]ods/chezhibao/job/cc.sh"></Input>
                <Button @click="publish_all" type="ghost">发布</Button>{{allStatus}}
            </div>
            <h3>{{publish_all_message}}</h3>
            <div v-for="(value,index) in publish_all_data">
                <p>path:{{value.path}}</p>
                <p>错误提示:{{value.message}}</p>
                <p>错误详情:{{value.data}}</p>
                <p>----------------------</p>
            </div>

        </div>




    </div>
</template>

<script type="text/javascript">
    import DepolyAjax from '@cbr/wh_config/publish/util/DeployAjax.js'

    export default {
        name: "deployIndex",
        data() {
            return {
                version: '',
                find_name:'',
                find_path:'',
                publish_path:'',
                publish_version:'0',
                publish_type:'1',
                message:'',
                data:'',
                status:'',
                allStatus:'',

                publish_paths:'',
                publish_all_message:'',
                publish_all_data:[],

                list1:[],
            }
        },
        methods: {
            getPath: async function () {
                var _that = this
                let ret = await DepolyAjax.get("findPath2?name=" + _that.find_name)
                _that.list1 = ret.data.data
            },
            pathSelect: async function (value) {
                var _that = this
                _that.find_path = value
                _that.publish_path = value
                _that.publish_type = '0'
                _that.publish_version = '0'
            },
          getVersion: async function () {
              var _that = this
              _that.version = ""
              let ret = await DepolyAjax.get("find2?path=" + _that.find_path)
              _that.version = _that.find_path + "文件的发布版本目前为:" + ret.data.data
          },
            publish: async function () {
                var _that = this
                _that.status = "发布中,请稍候..."
                _that.message = ""
                _that.data = ""
                let ret = await DepolyAjax.get("publish2?type="+_that.publish_type+"&path="+_that.publish_path+"&version=" + _that.publish_version)
                _that.message = "发布状态:" + ret.data.message
                _that.data = "详细信息:" + ret.data.data
                _that.status = "发布完成."
            },
            publish_all: async function () {
                var _that = this
                _that.allStatus = '发布中,请稍候,可能需要几分钟...'
                _that.publish_all_message = ""
                _that.publish_all_data = []

                let ret = await DepolyAjax.post("publishall2", _that.publish_paths)
                _that.allStatus = '发布完成'
                _that.publish_all_message = ret.data.message
                _that.publish_all_data = ret.data.data
            },
        }

    }
</script>

<style scoped>

</style>