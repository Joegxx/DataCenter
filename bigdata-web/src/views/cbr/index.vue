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
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <div v-if="isCollapsed"><img class="layout-logo" src="../../images/logo_short.png"></div>
                <div v-if="!isCollapsed"><img class="layout-logo_long" src="../../images/logo_long.png"/></div>

                <Menu theme="dark" width="auto" :class="menuitemClasses" @on-select="selectedMenu">
                    <Submenu v-for="(item,index) in homeMenu" :name="index" :key="index">
                        <template slot="title">
                            <Icon :type="item.icon"></Icon>
                            <span>{{ item.name }}</span>
                        </template>
                        <MenuItem v-for="(submenu,subindex) in item.children" :name="submenu.name"
                                  :key="index + '-' + subindex">
                            <router-link :to="{path:submenu.url,params:{title: submenu.name}}" style="color: white">
                                <Icon :type="submenu.icon"></Icon>
                                <span>{{ submenu.name }}</span>
                            </router-link>
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Content :style="{padding: '6px 6px 6px 6px'}">
                    <div style="height: 950px">
                        <Tabs v-model="activeTag" type="card" @on-tab-remove="handleTabRemove" :animated="false"
                              @on-click="selectedTab">
                            <TabPane v-for="val in visitedViews" :closable="val.isCloseable" :label="val.name"
                                     :name="val.path" :key="val.path"></TabPane>

                        </Tabs>
                        <!--缓存想要缓存的页面，实现后退不刷新-->
                        <!--加上v-if的判断，可以自定义想要缓存的组件，自定义在router里面-->
                        <div style="margin-top: -10px">
                            <keep-alive>
                                <router-view :key="$route.name" v-if="$route.meta.keepAlive"></router-view>
                            </keep-alive>
                            <router-view :key="$route.name" v-if="!$route.meta.keepAlive"></router-view>
                        </div>
                    </div>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import {mapActions} from 'vuex'
    import mainPage from './main'
    import paramsData from './ParamsData'

    export default {
        data() {
            return {
                activeTag: "/index",
                isCollapsed: false,
                homeMenu: {},
                currentMenuName: "",
                closable: false,
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
                return this.$store.state.tags.visitedviews
            }
        },
        created() {

            this.homeMenu = paramsData.homeMenuData;
            this.$router.push({path: paramsData.prefix+"/index"});
        },
        methods: {
            handleTabRemove(name) {
                this['tab' + name] = false;
                this.delViewTag(name);
                this.$router.push({path: this.activeTag})
            },
            delViewTag(path) {
                this.$store.dispatch('delVisitedViews', path);
            },
            addViewTags() {//路由改变时执行的方法
                if (this.$route) {
                    const route = this.$route;
                    let isCloseable = true;
                    let path = route.path;
                    if (route.path.startsWith(paramsData.prefix+"/index") || path === paramsData.prefix) {
                        path = paramsData.prefix+"/index";
                        isCloseable = false;
                        this.currentMenuName = "首页"
                    }
                    this.activeTag = path;
                    let routParams = {
                        name: this.currentMenuName,
                        path: path,
                        isCloseable: isCloseable,
                        params: route.params,
                        meta: route.meta,
                    };
                    this.currentMenuName = "";
                    this.$store.dispatch('addVisitedViews', routParams);
                }
            },
            selectedMenu(name) {
                this.currentMenuName = name;
                // this.addViewTags();
            },
            selectedTab(name) {
                this.$router.push({path: name})
            },
        },
        watch: {
            '$route'(to, from) {
                this.addViewTags();
            }
        },
        components: {mainPage}
    }
</script>
