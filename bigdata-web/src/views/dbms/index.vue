<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .layout-logo {
        width: 70px;
        height: 30px;
        border-radius: 3px;
        margin-left: 4px;
        margin-top: 6px;
    }
    .layout-logo_long {
        width: 190px;
        height: 30px;
        border-radius: 3px;
        margin-left: 4px;
        margin-top: 6px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 70%;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        display: none;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        display: none;
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 16px;
        margin-left: -10px;
    }
</style>
<template>
    <div class="layout">
        <Layout>
            <Sider collapsible :collapsed-width="18" v-model="isCollapsed">
                <div v-if="!isCollapsed">
                <Menu theme="dark"  width="auto" :class="menuitemClasses" @on-select="selectedMenu">
                    <!--<Menu active-name="1-2" theme="light" width="auto" :open-names="['1']">-->
                    <Submenu v-for="(item,index) in homeMenu" :name="index" :key="index">
                        <template slot="title">
                            <Icon :type="item.icon"></Icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <MenuItem v-for="(submenu,subindex) in item.children" :name="submenu.name"
                                  :key="index + '-' + subindex">
                            <db-menu :menu="submenu"></db-menu>
                        </MenuItem>
                    </Submenu>
                </Menu>
                </div>
            </Sider>
            <Layout>
                <Content :style="{padding: '6px 6px 6px 6px'}">

                    <div style="height: 900px">
                        <Tabs v-model="activeTag" type="card" @on-tab-remove="handleTabRemove" :animated="false"
                              @on-click="selectedTab">
                            <TabPane :closable="closable" label="首页" name="/index" key="/main">
                            <main-page></main-page>
                            </TabPane>
                            <TabPane v-for="val in visitedViews" :closable="!closable" :label="val.name"
                                     :name="val.name" :key="val.key">
                                <rdb-show v-if="val.dbType<10" :db="val"></rdb-show>
                                <db-manage v-if="val.dbType===11"></db-manage>
                                <taskmanage v-if="val.dbType==='taskmanage'"></taskmanage>
                            </TabPane>
                        </Tabs>

                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import MainPage from '@dbms/main'
    import paramsData from './ParamsData'
    import RdbShow from '@rdbms/RdbShow'
    import dbMenu from '@components/db/dbMenu'
    import DbManage from '@dbms/dbmanage/DbManage'
    import taskmanage from '@dbms/taskmanage/index'
    import DbmsUtils from '@dbms/util/dbmsUtils'

    export default {
        data() {
            return {
                activeTag:"/dbms/index",
                isCollapsed: false,
                homeMenu: {},
                currentMenuName: "",
                closable: false,
                isFullscreen: false,
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            },
            visitedViews() {//store中取值
                let a = this.activeTag;
                return this.$store.state.tags.visitedviews
            }
        },
        created() {
            this.refreshSessionEvent = DbmsUtils.refreshSession();
            this.homeMenu = paramsData.homeMenuData;
            let that = this;
            this.$axios.get(this.$global.dbmsServerPath + '/instance/get/menu', {}, this.$axiosConfig.axios_config)
                .then(function (response) {
                    response = response.data;
                    if (response.status === 200) {
                        that.homeMenu[0].children = response.data;
                        that.$Message.success('加载成功!');
                    } else {
                        that.$Message.error('提交失败!\n' + response.msg)
                    }
                })
                .catch(function (error) {
                    that.$Message.error('提交失败!\n' + error)
                });
        },
        destroyed(){
            window.clearInterval(this.refreshSessionEvent);
        },
        methods: {
            handleTabRemove(name) {
                this['tab' + name] = false;
                this.delViewTag(name);
            },
            delViewTag(name){
                this.$store.dispatch('delVisitedViews', name);
            },
            selectedMenu(name) {
                this.activeTag=name;
            },
            selectedTab(name) {
               // let path = this.$store.state.tags.visitedviews[name].path;
               //  this.$router.push({path: path})
            },
        },
        watch: {
        },
        components: {MainPage,RdbShow,dbMenu,DbManage,taskmanage}
    }
</script>
