<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }

    .submenu {
        padding:0
    }

    .layout-logo {
        width: 100px;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        float: left;
        position: relative;
        top: 15px;
        left: 20px;
    }

    .layout-nav {
        width: 420px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>

<template>
    <div class="layout">
        <Layout>
            <Row>
                <Col span="7">
                <Sider hide-trigger width="auto" :style="{background: '#fff'}">
                    <tree-menu :height="height" :db="db" :data-source="dbSchemas"></tree-menu>
                </Sider>
                </Col>
                <Col span="17">
                <Layout :style="{padding: '0 4px 24px'}">
                    <Content :style="{padding: '6px 6px 6px 6px'}">
                        <div style="height: 100%">
                            <Tabs value="name1">
                                <TabPane label="标签一" name="name1">
                                    <sql-option :db="db"></sql-option>
                                </TabPane>
                                <TabPane label="标签二" name="name2">标签二的内容</TabPane>
                                <TabPane label="标签三" name="name3">标签三的内容</TabPane>
                                <TabPane icon="social-tux"></TabPane>
                            </Tabs>
                            <!--<Tabs v-model="activeTag" type="card" @on-tab-remove="handleTabRemove" :animated="false"-->
                                  <!--@on-click="selectedTab">-->
                                <!--<TabPane :closable="closable" label="首页" name="/index" key="/main">-->
                                    <!--<main-page></main-page>-->
                                <!--</TabPane>-->
                                <!--<TabPane v-for="val in visitedViews" :closable="!closable" :label="val.name"-->
                                         <!--:name="val.name" :key="val.key">-->
                                    <!--<rdb-show :db="val"></rdb-show>-->
                                <!--</TabPane>-->
                            <!--</Tabs>-->
                        </div>
                    </Content>
                </Layout>
                </Col>
            </Row>
        </Layout>
    </div>
</template>
<script>
    import SqlOption from '@rdbms/SqlOption'
    import TreeMenu from '@components/menu/tree/index'

    export default {
        data() {
            return {
                dbSchemas: [],
                height: window.screen.availHeight * 0.75 + '',
            }
        },
        props: {db: {}},
        created() {
            let that = this;
            this.$axios.post(this.$global.dbmsServerPath + '/instance/get/schema',{name:that.db.name,dbType:that.db.dbType}, this.$axiosConfig.json_config)
                .then(function (response) {
                    response = response.data;
                    if (response.status === 200) {
                        that.dbSchemas = response.data;
                        that.$Message.success('加载成功!');
                    } else {
                        that.$Message.error('提交失败!\n' + response.msg)
                    }
                })
                .catch(function (error) {
                    that.$Message.error('提交失败!\n' + error)
                });
        },
        methods:{},
        components:{SqlOption,TreeMenu}
    }
</script>
