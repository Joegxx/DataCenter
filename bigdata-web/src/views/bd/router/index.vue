<template>
    <div>
        <Button type="success" @click="modal = true">添加</Button>
        <tables v-if="tableShow" @on-save-edit="saveEditCol" @on-delete="deleteCol" border :searchable="searchable"
                :editable="editable" :columns="columns" v-model="data"></tables>
        <Modal
                v-model="modal"
                title="添加路由配置"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="原始地址">
                    <Input v-model="formItem.location" placeholder="输入需要被代理的原始地址"></Input>
                </FormItem>
                <FormItem label="代理地址">
                    <Input v-model="formItem.proxyPass" placeholder="代理后的地址"></Input>
                </FormItem>
                <FormItem label="是否权鉴">
                    <Select v-model="formItem.isNeedAuth">
                        <Option value="true">需要</Option>
                        <Option value="false">不需要</Option>
                    </Select>
                </FormItem>

                <FormItem label="是否正则">
                    <Select v-model="formItem.isReg">
                        <Option value="false">不是</Option>
                        <Option value="true">是</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import tables from '@components/tables/tables'
    import cols from './columns'

    export default {
        name: "DbManage",
        data() {
            return {
                dbPropValue: "",
                dbProp: "",
                data: [],
                columns: cols,
                modal: false,
                tableShow: false,
                searchable: true,
                editable: true,
                formItem: {
                    location: "",
                    proxyPass: "",
                    isNeedAuth:"",
                    isReg: "",
                }
            }
        },
        methods: {
            searchDbs() {
                console.log("查询db")
            },
            ok() {
                let that = this;
                this.$axios.post(this.$global.router + '/info/add', this.formItem, this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.getAllInstance();
                            that.$Message.success('添加成功!');
                        } else {
                            that.$Message.error('添加失败!\n' + response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('添加失败!\n' + error)
                    });
            },
            cancel() {
                this.$Message.info('Clicked cancel');
            },
            // row, index, column, value
            saveEditCol(params) {
                let k = params.column['key'];
                let v = params.value;
                let row = params.row;
                row[k] = v;
                let that = this;
                this.$axios.post(this.$global.router + '/info/update', row, this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.$Message.success('修改成功!');
                        } else {
                            that.$Message.error('修改失败!\n' + response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('修改失败!\n' + error)
                    });
            },
            deleteCol(params) {
                // console.log( row, index, column, value)
                let that = this;
                this.$axios.post(this.$global.router + '/info/del' ,{location: params.row['location']}, this.$axiosConfig.normal_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.$Message.success('删除成功!');
                        } else {
                            that.$Message.error('删除失败!\n' + response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('删除失败!\n' + error)
                    });
            },
            getAllInstance() {
                let that = this;
                this.$axios.get(this.$global.router + '/info/all', this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {

                            that.data = Object.values(response.data);

                            that.tableShow = true;
                            that.$Message.success('加载成功!');
                        } else {
                            that.$Message.error('提交失败!\n' + response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('提交失败!\n' + error)
                    });
            }
        },
        components: {
            tables
        },
        created() {
            this.getAllInstance();
        }

    }
</script>

<style scoped>

</style>