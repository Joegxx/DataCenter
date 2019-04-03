<template>
    <div>
        <Button type="success" @click="modal = true">添加</Button>
        <Table size="small" border :columns="columns" :data="data" height="500px"></Table>
        <Modal
                v-model="modal"
                title="添加大区信息"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="城市名称">
                    <Select v-model="formItem.channelCityId">
                        <Option value='1'>Mysql</Option>
                        <Option value='2'>Hive</Option>
                        <Option value='3'>Redis</Option>
                        <Option value='4'>Presto</Option>
                    </Select>
                </FormItem>
                <FormItem label="大区名称">
                    <Select v-model="formItem.largeAreaId">
                        <Option value='1'>Mysql</Option>
                        <Option value='2'>Hive</Option>
                        <Option value='3'>Redis</Option>
                        <Option value='88'>Presto</Option>
                    </Select>
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
                    channelCityId: '1',
                    channelCityName: '',
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
                        title: '城市ID',
                        key: 'channelCityId'
                    },
                    {
                        title: '城市名称',
                        key: 'channelCityName'
                    },
                    {
                        title: '大区名称',
                        key: 'largeAreaName'
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
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: 1,
                        channelCityName:'南京组',
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                    {
                        id: '1',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: '1',
                        channelCityName:'南京组',
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                    {
                        id: '1',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: '1',
                        channelCityName:'南京组',
                        createdTime: '2018-09-18 10:54:27',
                        updatedTime: '2018-09-18 10:54:27',
                    },
                    {
                        id: '1',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: '1',
                        channelCityName:'南京组',
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
            }
        }
    }
</script>