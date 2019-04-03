<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
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
                <Col span="5">
                <Sider hide-trigger width="auto" :style="{background: '#fff'}">
                    <Menu active-name="dw_v2" theme="light" width="auto" :open-names="['1']">
                        <Submenu v-for="(db,db_idx) in dbSchemas" :key="db_idx" :name="db.value">
                            <template slot="title" >
                                <i class="fa fa-database" aria-hidden="true"></i>
                                {{ db.label }}
                            </template>

                            <Submenu v-for="(item,index) in db.children" :key="index" :name="db.value+'||'+item.value" >
                                <template slot="title">
                                    <i v-if="item.value==='1'" class="fa fa-table" aria-hidden="true"></i>
                                    <i v-if="item.value==='2'" class="fa fa-eye" aria-hidden="true"></i>
                                    <i v-if="item.value==='3'" class="fa fa-bar-chart-o" aria-hidden="true"></i>
                                    {{ item.label }}
                                </template>
                                <MenuItem v-for="(submenu,subindex) in item.children" :name="submenu.value"
                                          :key="index + '-' + subindex">
                                    <i v-if="item.value==='1'" class="fa fa-table" aria-hidden="true"></i>
                                    <i v-if="item.value==='2'" class="fa fa-eye" aria-hidden="true"></i>
                                    <i v-if="item.value==='3'" class="fa fa-bar-chart-o" aria-hidden="true"></i>
                                    {{ submenu.label }}
                                </MenuItem>
                            </Submenu>
                        </Submenu>

                    </Menu>
                </Sider>
                </Col>
                <Col span="19">
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

    export default {
        data() {
            return {
                db:{},
                dbSchemas: [

                ]
            }
        },
        created() {
            this.db.dbType=this.$route.params.dbType;
            this.db.name=this.$route.params.name;
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
        methods:{

        },
        components:{SqlOption}
    }
</script>
