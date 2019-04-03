<template>
    <div>
        <Button type="success" @click="modal = true">添加</Button>
        <tables v-if="tableShow" @on-save-edit="saveEditCol" @on-delete="deleteCol" border :searchable="searchable"
                :editable="editable" :columns="columns" v-model="data"></tables>
        <Modal
                v-model="modal"
                title="添加实例"
                @on-ok="ok"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="实例名称">
                    <Input v-model="formItem.name" placeholder="输入实例名称（唯一）"></Input>
                </FormItem>
                <FormItem label="数据库类型">
                    <Select v-model="formItem.dbType">
                        <Option value="1">Mysql</Option>
                        <Option value="2">Hive</Option>
                        <Option value="3">Redis</Option>
                        <Option value="4">Presto</Option>
                    </Select>
                </FormItem>
                <FormItem label="IP地址">
                    <Input v-model="formItem.host" placeholder="输入链接IP地址"></Input>
                </FormItem>
                <FormItem label="端口号">
                    <Input v-model="formItem.port" placeholder="输入链接IP地址"></Input>
                </FormItem>
                <FormItem label="用户名">
                    <Input v-model="formItem.username" placeholder="输入用户名"></Input>
                </FormItem>
                <FormItem label="密码">
                    <Input v-model="formItem.password" type="password" placeholder="输入密码"></Input>
                </FormItem>
                <FormItem label="额外Url">
                    <Input v-model="formItem.extraUrl"  placeholder="链接地址后面附加的url片段"></Input>
                </FormItem>
                <FormItem label="驱动类名">
                    <Input v-model="formItem.driverClassName"  placeholder="驱动类名"></Input>
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
                    name: "",
                    host: "",
                    port:"",
                    select: "",
                    password: "",
                    username: "",
                    dbType: "",
                    icon: "laptop",
                    extraUrl: "",
                    driverClassName: "",
                }
            }
        },
        methods: {
            searchDbs() {
                console.log("查询db")
            },
            ok() {
                let that = this;
                this.$axios.post(this.$global.dbmsServerPath + '/instance/save/update', this.formItem, this.$axiosConfig.json_config)
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
                this.$axios.post(this.$global.dbmsServerPath + '/instance/save/update', row, this.$axiosConfig.json_config)
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
                this.$axios.get(this.$global.dbmsServerPath + '/instance/del/' + params.row['id'], this.$axiosConfig.json_config)
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
            getColumns(data) {
                let cols = [];
                if (data && data.length > 0) {
                    let datum = data[0];
                    for (let item in datum) {
                        cols.push({
                            title: item,
                            key: item,
                            editable: true,
                            ellipsis: true,
                        })
                    }
                    cols.push({
                        title: '操作',
                        width: 80,
                        key: 'handle',
                        options: ['delete'],
                    });
                    cols[0]['width'] = 80;
                    cols[0]['editable'] = false;
                }
                return cols;
            },
            getAllInstance() {
                let that = this;
                this.$axios.get(this.$global.dbmsServerPath + '/instance/get/all', this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.data = response.data;
                            // that.columns = that.getColumns(response.data);
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