<template>
    <div>
        <Button type="success" @click="modal = true">添加</Button>
        <Table size="small" border :columns="columns" :data="data" height="500"></Table>
        <Modal
                v-model="modal"
                title="添加大区信息"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="大区名称">
                    <Input v-model="formItem.largeAreaName" placeholder="输入大区名称"></Input>
                </FormItem>
                <FormItem label="大区优先级">
                    <Input v-model="formItem.largeAreaPriority" placeholder="输入大区优先级"></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                modal:false,
                formItem:{
                    id: '',
                    largeAreaId: '',
                    largeAreaName: '',
                    largeAreaPriority: '',
                    createdTime: '',
                    updatedTime: '',
                },
                columns: [
                    {
                        title: '#',
                        key: 'id',
                        width: 80
                    },
                    {
                        title: '大区ID',
                        key: 'largeAreaId'
                    },
                    {
                        title: '大区名称',
                        key: 'largeAreaName'
                    },
                    {
                        title: '大区优先级',
                        key: 'largeAreaPriority'
                    },
                    {
                        title: '创建时间',
                        key: 'createdTime'
                    },
                    {
                        title: '修改时间',
                        key: 'updatedTime'
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
                                            this.show(params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: [
                    {
                        id: '1',
                        largeAreaId: 88,
                        largeAreaName: '线上拓展',
                        largeAreaPriority: 88,
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                    {
                        id: '1',
                        largeAreaId: 88,
                        largeAreaName: '线上拓展',
                        largeAreaPriority: 88,
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                    {
                        id: '1',
                        largeAreaId: 88,
                        largeAreaName: '线上拓展',
                        largeAreaPriority: 88,
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                    {
                        id: '1',
                        largeAreaId: 88,
                        largeAreaName: '线上拓展',
                        largeAreaPriority: 88,
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                ]
            }
        },
        methods: {
            ok(){
                console.log(this.formItem)
            },
            cancel(){
                console.log(this.formItem)
            },
            show(index) {
                this.formItem=this.data[index];
                console.log(this.formItem);
                this.modal=true;
            },
            remove(index) {
                this.data.splice(index, 1);
                console.log(this.data[index]['id'])
            },
            getAllArea(){
                let that = this;
                this.$axios.get(this.$global.cbr + '/area/get/all', this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.data =response.data;
                            that.$Message.success('加载成功!');
                        } else {
                            that.$Message.error('添加失败!\n' + response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('添加失败!\n' + error)
                    });
            }
        },
        created(){
            this.getAllArea();
        }

    }
</script>