<template>
    <div>
        <Select v-model="params.column" style="width:200px">
            <Option v-for="item in columnList" :value="item.key" :key="item.key">{{ item.title }}</Option>
        </Select>=
        <Input v-model="params.value" placeholder="可以使用‘%’和‘_’进行模糊查询 " style="width: 300px"></Input>
        <Button type="primary" @click="filterSearch" shape="circle" icon="ios-search"></Button>

        <Table border :loading="loading" size="small" ref="selection" :columns="columns" :data="data"></Table>
        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">全不选</Button>
        <Page style="float: right" :total="total" :current="page" :page-size="size" show-elevator show-sizer show-total
              placement="top" @on-change="handlePage" @on-page-size-change="handleSize"></Page>

        <Modal
                v-model="modal"
                width="90%"
                :mask-closable="false"
                @on-visible-change="editOver">
            <p slot="header" style="text-align:center">
                <span>{{ title }}</span>
            </p>

            <Create v-if="editMode==='edit'" v-bind:job-info="jobInfo" v-bind:reader-data="readerData"
                    v-bind:writer-data="writerData"></Create>
            <div slot="footer">
            </div>
        </Modal>

        <Modal v-model="modal_remove" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除确认</span>
            </p>
            <div style="text-align:center">
                <p>任务{{ current_row.jobName }}删除后,将不能恢复！</p>
                <p>是否继续删除？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="del">删除</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import create from './create.vue'

    export default {
        computed:{
            columnList(){
               return this.columns.filter(item=>item.searchable)
            }
        },
        data() {
            return {
                params:{
                  column:"",
                  value:'',
                },
                jobInfo: {},
                editMode: "",
                readerData: {},
                writerData: {},
                title: "",
                loading: true,
                modal_loading: false,
                current_row: {},
                modal: false,
                modal_remove: false,
                size: 14,
                page: 1,
                total: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '任务ID',
                        width: 100,
                        searchable:true,
                        key: 'id'
                    },
                    {
                        title: '任务名称',
                        key: 'jobName',
                        searchable:true,
                    },
                    {
                        title: '任务信息',
                        key: 'jobDesc',
                        searchable:true,
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime',
                    },
                    {
                        title: '最后一次修改',
                        key: 'updatedTime'
                    },
                    {
                        title: '状态',
                        key: 'status',
                        searchable:true,
                        width: 100,
                        render: (h, params) => {
                            // let children = [];
                            // children.push(h("span", {
                            //     props:{
                            //         slot: 'open'
                            //     }
                            // },'开'));
                            // children.push(h("span", {
                            //     props:{
                            //         slot: 'close'
                            //     }
                            // },'关'));
                            return h('i-switch', {
                                props: {
                                    value: params.row.status
                                },
                                on: {
                                    'on-change': () => {
                                        this.current_row = params.row;
                                        this.switchStatus();
                                    }
                                }
                            }, []);


                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        width: 170,
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
                                            this.current_row = params.row;
                                            this.title = "查看编辑" + this.current_row.jobName;
                                            this.query(params.row.id);
                                        }
                                    }
                                }, '查看编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.current_row = params.row;
                                            this.modal_remove = true;
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }

                ],
                data: []
            }
        },
        created: function () {
            this.search(this.page, this.size);
        },
        methods: {
            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },
            //筛选查询
            filterSearch(){
                const that = this;
                that.loading = true;
                that.data=[];
                that.total=0;
                that.params.page=that.page;
                that.params.size=that.size;
                this.$axios.post(this.$global.whtcServerPath + '/datax/get',that.params,
                    this.$axiosConfig.json_config)
                    .then(function (response) {
                        that.loading = false;
                        if (response.status === 200) {
                            that.data = response.data.data;
                            that.total = parseInt(response.data.msg)
                        } else {
                            that.loading = false;
                            that.error(response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.error(error)
                    });
            },
            //初始化列表
            search(page, size) {
                const that = this;
                this.$axios.get(this.$global.whtcServerPath + '/datax/get?page=' + page + '&size=' + size,
                    this.$axiosConfig.axios_config)
                    .then(function (response) {
                        if (response.status === 200) {
                            that.loading = false;
                            that.data = response.data.data;
                            that.total = parseInt(response.data.msg)
                        } else {
                            that.error(response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.error(error)
                    });
            },
            success(msg) {
                this.$Message.success(msg);
            },
            error(error) {
                this.$Message.error('出错了!\n' + error);
            },
            handlePage(page) {
                this.page = page;
                this.search(this.page, this.size);
            },
            handleSize(size) {
                this.size = size;
                this.search(this.page, this.size);
            },
            query(id) {
                const that = this;
                this.$axios.get(this.$global.whtcServerPath + '/datax/get/' + id,
                    this.$axiosConfig.axios_config)
                    .then(function (response) {
                        if (response.status === 200) {
                            that.jobInfo = response.data.data.jobInfo;
                            that.readerData = response.data.data.readerData;
                            that.writerData = response.data.data.writerData;
                            that.modal = true;
                        } else {
                            that.error(response.data.msg)
                        }
                    })
                    .catch(function (error) {
                        that.error(error);
                    });
            },
            del() {
                this.modal_loading = true;
                const that = this;
                this.$axios.delete(this.$global.whtcServerPath + '/datax/delete/' + this.current_row.id,
                    this.$axiosConfig.axios_config)
                    .then(function (response) {
                        if (response.status === 200) {
                            setTimeout(() => {
                                that.modal_loading = false;
                                that.modal_remove = false;
                                that.success('删除成功!');
                            }, 1000);
                            that.search(that.page, that.size);
                        } else {
                            that.error(response.msg)
                        }
                    })
                    .catch(function (error) {
                        setTimeout(() => {
                            that.modal_loading = false;
                            that.modal_remove = false;
                            that.error(error);
                        }, 1000);
                    });
            },
            switchStatus() {
                const that = this;
                this.$axios.post(this.$global.whtcServerPath + '/datax/switch', {
                        id: this.current_row.id,
                        status: this.current_row.status
                    },
                    this.$axiosConfig.axios_config)
                    .then(function (response) {
                        if (response.status === 200) {
                            that.search(that.page, that.size);
                            if (response.data.data) {
                                that.success('成功开启任务');
                            } else {
                                that.success('成功停止任务');
                            }
                        } else {
                            that.error(response.msg)
                        }
                    })
                    .catch(function (error) {

                    });
            },
            editOver(){
                if(this.editMode === ""){
                    this.editMode = "edit";
                }else{
                    this.editMode = "";
                    this.search(this.page,this.size)
                }
            }
        },
        components: {
            //加载数据显示模块
            Create: create,
        }
    }
</script>
