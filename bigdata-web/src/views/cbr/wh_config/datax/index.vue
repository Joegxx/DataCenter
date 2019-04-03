<template>
    <div>
        <!--<Breadcrumb :style="{margin: '16px 0'}">-->
            <!--<BreadcrumbItem><router-link  to="/config/datax/create/#" style="color: black">创建任务</router-link></BreadcrumbItem>-->
            <!--<BreadcrumbItem><router-link  to="/config/datax/list/#" style="color: black">任务列表</router-link></BreadcrumbItem>-->
            <!--<BreadcrumbItem><router-link  to="/config/datax/log/#" style="color: black">查看日志</router-link></BreadcrumbItem>-->
        <!--</Breadcrumb>-->
        <!--<Menu mode="horizontal" style="background:rgba(255,255,255,0.0);" active-name="1">-->
            <!--<MenuItem name="create">-->
                <!--<Icon type="ios-paper"></Icon>-->
                <!--<router-link  to="/config/datax/create/#" style="color: black">创建任务</router-link>-->
            <!--</MenuItem>-->
            <!--<MenuItem name="list">-->
                <!--<Icon type="ios-people"></Icon>-->
                <!--<router-link  to="/config/datax/list/#" style="color: black">任务列表</router-link>-->
            <!--</MenuItem>-->
            <!--<MenuItem name="log">-->
                <!--<Icon type="settings"></Icon>-->
                <!--<router-link  to="/config/datax/log/#" style="color: black">查看日志</router-link>-->
            <!--</MenuItem>-->
        <!--</Menu>-->

            <div style="height: 800px">
                <router-view></router-view>
            </div>
    </div>
</template>
<script>
    export default {
        created:function () {
           this.$router.push({ path: `/config/datax/create/#` })
        }
    }
</script>
