<template>
    <div>
        <Layout>
            <Sider :style="{backgroundColor:'white'}">
                <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" :accordion="accordion"
                      @on-select="getGroupinfo" @on-open-change="getSysInfo">
                    <Submenu v-for="(item,sys) in sysMenu" :name="sys" :key="sys">
                        <template slot="title">
                            <Icon type="ios-monitor"></Icon>
                            {{ sys }}
                        </template>
                        <MenuItem v-for="group in item.groups" :name="group.path" :key="group.path">{{
                            group.groupName }}
                        </MenuItem>
                    </Submenu>
                </Menu>
                <div align="center">
                    <Button @click="addSys()" style="margin: auto" type="success" shape="circle"
                            icon="plus-circled" size="small">添加配置
                    </Button>
                    <Button @click="delSys()" style="margin: auto" type="error" shape="circle"
                            icon="minus-circled" size="small">删除配置
                    </Button>

                </div>
            </Sider>
            <Layout>
                <Row>
                    <span>当前系统：{{ sysInfo.sysName }}</span>
                    <div v-for="app in sysInfo.apps" :key="app.host">
                        <span>系统状态：</span>
                        <span v-if="app.status === 1" style="color: green">在线</span>
                        <span v-if="app.status === 0" style="color: red">不在线</span>
                        <span>系统IP：</span> <span>{{ app.host }}</span>:<span>{{ app.port }}</span>
                        <span>系统地址：</span> <span>{{ app.appPath }}</span>
                    </div>
                </Row>
                <Table border :columns="columns" :data="configData"></Table>
            </Layout>
        </Layout>
        <Modal
                v-model="modal"
                :title="Title"
                :loading="loading"
                @on-ok="asyncOK">
            <Form :label-width="80">
                <FormItem label="系统名称:">
                    <AutoComplete
                            :disabled="menuOpt === 'modify'"
                            v-model="sysName"
                            :data="sysNames"
                            :filter-method="filterMethod"
                            placeholder="input here">
                    </AutoComplete>
                </FormItem>
                <FormItem label="分组前缀:">
                    <AutoComplete
                            :disabled="menuOpt === 'modify'"
                            v-model="groupName"
                            :data="groups[sysName]"
                            :filter-method="filterMethod"
                            placeholder="input here">
                    </AutoComplete>
                </FormItem>
                <div v-if="menuOpt !== 'del'">
                    <FormItem label="参数名称:">
                        <Input :disabled="menuOpt === 'modify'" v-model="paramName" placeholder="输入参数名称"></Input>
                    </FormItem>
                    <FormItem label="参数值:">
                        <Input v-model="paramValue" placeholder="输入参数值"></Input>
                    </FormItem>
                    <FormItem  label="动态参数:" >
                        <Select :disabled="menuOpt === 'modify'" v-model="dynamic">
                            <Option value="false">否</Option>
                            <Option value="true">是</Option>
                        </Select>
                    </FormItem>
                </div>
            </Form>
        </Modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                menuOpt: "add",
                accordion: true,
                sysInfo: {},
                modal: false,
                loading: true,
                Title: "",
                path: "",
                sysName: "",
                groupName: "",
                sysNames: [],
                groups: {},
                paramName: "",
                paramValue: "",
                dynamic:'false',
                sysMenu: {
                    sysName: {
                        status: 0,
                        groups:
                            [
                                {
                                    groupName: 'groupName1',
                                    path: '/groupName1'
                                },
                                {
                                    groupName: 'groupName2',
                                    path: '/groupName2'
                                }
                            ]
                    }
                },
                columns: [
                    {
                        title: '配置分组前缀',
                        key: 'groupName'
                    },
                    {
                        title: '配置属性名称',
                        key: 'paramName'
                    },
                    {
                        title: '配置属性值',
                        key: 'paramValue'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modify(params.row)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            let sysName = this.sysInfo.sysName;
                                            let groupName = params.row.groupName;
                                            let paramName = params.row.paramName;
                                            const that = this;
                                            this.$axios.delete(this.$global.sysConfigPath + '/config/menu/param?sysName=' + sysName + "&groupName=" + groupName + "&paramName=" + paramName)
                                                .then(function (response) {
                                                    if (response.status === 200) {
                                                        that.remove(params.index);
                                                        that.$Message.success('删除' + paramName + '成功!');
                                                    } else {
                                                        that.$Message.error('网络链接异常!');
                                                    }
                                                })
                                                .catch(function (error) {
                                                    that.$Message.error('网络链接异常!');
                                                });

                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                configData: []
            }
        },
        created() {
            //初始化菜单
            this.getSysMenu();
        },
        methods: {
            getSysMenu() {
                const that = this;
                this.$axios.get(this.$global.sysConfigPath + '/config/menu')
                    .then(function (response) {
                        if (response.status === 200) {
                            that.sysMenu = response.data.data;
                        } else {
                            that.$Message.error('网络链接异常!');
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('网络链接异常!');
                    });
            },

            remove(index) {
                this.configData.splice(index, 1);
            },
            prepareMenu() {
                let array = [];
                let _gMap = {};
                if (!this.sysMenu) {
                    this.modal = true;
                    return;
                }
                for (let key in this.sysMenu) {
                    // this.sysMenu.map(function (sysName,item) {
                    array.push(key);
                    let _groups = [];
                    this.sysMenu[key].groups.forEach(function (g) {
                        _groups.push(g.groupName)
                    });
                    _gMap[key] = _groups
                }
                ;
                this.sysNames = array;
                this.groups = _gMap;
            },
            modify(row) {
                this.menuOpt = 'modify';
                this.sysName = this.sysInfo.sysName;
                this.groupName = row.groupName;
                this.paramName = row.paramName;
                this.paramValue = row.paramValue;
                this.dynamic = row.dynamic+"";
                this.modal = true;
            },
            addSys() {
                this.Title = "添加配置";
                this.prepareMenu();
                this.menuOpt = 'add';
                this.modal = true;

            },
            delSys() {
                this.Title = "删除配置";
                this.menuOpt = "del";
                this.prepareMenu();
                this.modal = true;
            },
            getGroupinfo(groupPath) {
                const that = this;
                this.$axios.get(this.$global.sysConfigPath + '/config/menu/group?groupPath=' + groupPath)
                    .then(function (response) {
                        if (response.status === 200) {
                            that.configData = response.data.data;
                            that.groupName = response.data.data.groupName;
                        } else {
                            that.$Message.error('网络链接异常!');
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('网络链接异常!');
                    });
            },
            asyncOK() {
                const that = this;
                if (this.menuOpt === 'add') {
                    this.$axios.post(this.$global.sysConfigPath + '/config/menu', {
                        sysName: this.sysName.trim(),
                        groupName: this.groupName.trim(),
                        paramName: this.paramName.trim(),
                        paramValue: this.paramValue.trim(),
                        dynamic: this.dynamic.trim(),
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                setTimeout(() => {
                                    that.modal = false;
                                    that.getSysMenu();
                                }, 1000);
                                that.$Message.success('添加成功!');
                            } else {
                                that.$Message.error('网络链接异常!');
                            }
                        })
                        .catch(function (error) {
                            that.$Message.error('网络链接异常!');
                        });
                }
                if (this.menuOpt === 'del') {
                    this.$axios.delete(this.$global.sysConfigPath + '/config/menu?sysName=' + this.sysName + "&groupName=" + this.groupName)
                        .then(function (response) {
                            if (response.status === 200) {
                                setTimeout(() => {
                                    that.modal = false;
                                    that.getSysMenu();
                                }, 1000);
                                that.$Message.success('删除成功!');
                            } else {
                                that.$Message.error('网络链接异常!');
                            }
                        })
                        .catch(function (error) {
                            that.$Message.error('网络链接异常!');
                        });
                }
                if (this.menuOpt === 'modify') {
                    this.$axios.post(this.$global.sysConfigPath + '/config/param', {
                        sysName: this.sysName.trim(),
                        groupName: this.groupName.trim(),
                        paramName: this.paramName.trim(),
                        paramValue: this.paramValue.trim(),
                        dynamic: this.dynamic,
                    })
                        .then(function (response) {
                            if (response.status === 200) {
                                setTimeout(() => {
                                    that.modal = false;
                                    that.getSysMenu();
                                }, 1000);
                                that.$Message.success('修改成功!');
                            } else {
                                that.$Message.error('网络链接异常!');
                            }
                        })
                        .catch(function (error) {
                            that.$Message.error('网络链接异常!');
                        });
                }

            },
            filterMethod(value, option) {
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            getSysInfo(e) {
                let sys = e[1];
                if (sys) {
                    this.sysInfo = this.sysMenu[sys]
                }
            }
        }
    }
</script>

<style scoped>
</style>