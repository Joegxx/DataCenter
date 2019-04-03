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
                <FormItem label="人员名称">
                    <Input v-model="formItem.userName" placeholder="输入渠道人员名称..."></Input>
                </FormItem>
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
                    userName: '',
                    userId: '',
                    largeAreaId: '',
                    largeAreaName: '',
                    channelCityId: '',
                    largeAreaPriority: '',
                    channelCityName:'',
                    companyCityId: '',
                    companyCityName:'',
                },
                columns: [
                    {
                        title: '#',
                        key: 'id',
                        width: 100
                    },
                    {
                        title: '人员ID',
                        key: 'userName'
                    },
                    {
                        title: '人员名称',
                        key: 'channelCityId'
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
                        title: '公司ID',
                        key: 'companyCityId'
                    },
                    {
                        title: '公司名称',
                        key: 'companyCityName'
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
                        id: '73497506',
                        userName: '韩火平',
                        userId: '3241',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: 1,
                        largeAreaPriority: 12000,
                        channelCityName:'南京组',
                        companyCityId: 1,
                        companyCityName:'南京组',
                    },
                    {
                        id: '73497506',
                        userName: '韩火平',
                        userId: '3241',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: 1,
                        largeAreaPriority: 12000,
                        channelCityName:'南京组',
                        companyCityId: 1,
                        companyCityName:'南京组',
                    },
                    {
                        id: '73497506',
                        userName: '韩火平',
                        userId: '3241',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: 1,
                        largeAreaPriority: 12000,
                        channelCityName:'南京组',
                        companyCityId: 1,
                        companyCityName:'南京组',
                    },
                    {
                        id: '73497506',
                        userName: '韩火平',
                        userId: '3241',
                        largeAreaId: '88',
                        largeAreaName: '线上拓展',
                        channelCityId: 1,
                        largeAreaPriority: 12000,
                        channelCityName:'南京组',
                        companyCityId: 1,
                        companyCityName:'南京组',
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