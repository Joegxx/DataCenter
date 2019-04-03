<template>
    <div>
        <Button type="success" size="small" @click="modal = true">添加</Button>
        <Button  size="small" @click="getAllDataSources">刷新</Button>
        <el-table
                :data="tableData"
                border
                size="mini"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    width="80"
                    label="ID">
            </el-table-column>
            <el-table-column
                    label="数据源名称">
                <template slot-scope="{$index,row,column}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.name">
                    <span v-if="!showEdit[$index]">{{row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    show-overflow-tooltip
                    label="链接地址">
                <template slot-scope="{$index,row,column}">
                    <input class="edit-cell" v-if="showEdit[$index]" v-model="row.url">
                    <span v-if="!showEdit[$index]">{{row.url}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="username"
                    label="用户名">
            </el-table-column>
            <el-table-column
                    label="数据源类型">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ dsconfig[scope.row.type].label }}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="createdTime"
                    label="创建时间">
            </el-table-column>
            <el-table-column
                    prop="updatedTime"
                    label="更新时间">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button v-if="showBtn[scope.$index]" size="mini" type="success"
                               @click="handleUpdate(scope.$index, scope.row)">更新
                    </el-button>
                    <el-button v-if="showBtn[scope.$index]" size="mini" type="warning"
                               @click="handleCancel(scope.$index, scope.row)">取消
                    </el-button>

                    <el-button v-if="!showBtn[scope.$index]" size="mini" @click="handleEdit(scope.$index, scope.row)">
                        编辑
                    </el-button>
                    <el-button v-if="!showBtn[scope.$index]" size="mini" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Modal
                v-model="modal"
                title="添加/编辑数据源"
                @on-ok="addDataSource"
                @on-cancel="cancel">
            <Form :model="formItem" :label-width="80">
                <FormItem label="数据源名称">
                    <Input v-model="formItem.name" placeholder="输入数据源名称"></Input>
                </FormItem>
                <FormItem label="数据源类型">
                    <Select v-model="formItem.type">
                        <Option v-for="(item,index) of dsconfig" :value="item.value" :key="index">{{ item.label }}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem v-if="formItem.type===1" label="数据源链接">
                    <Input v-model="formItem.url" placeholder="输入数据源链接 例如hdfs://"></Input>
                </FormItem>
                <div v-if="formItem.type===0">
                    <FormItem label="数据源链接">
                        <Input v-model="formItem.url" placeholder="输入数据源链接 例如jdbc:mysql://"></Input>
                    </FormItem>
                    <FormItem label="用户名">
                        <Input v-model="formItem.username" placeholder="输入用户名"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-model="formItem.password" placeholder="输入密码"></Input>
                    </FormItem>
                </div>
            </Form>
        </Modal>
        <Modal v-model="deleteModal" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认删除</span>
            </p>
            <div style="text-align:center">
                <p>数据源名称：{{ row.name }}</p>
                <p>数据源链接：{{ row.url }}</p>
                <p>是否继续删除?</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="delDataSource">删除</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Config from './datasource'
    import util from '@/libs/util'

    export default {
        data() {
            return {
                tableData: [],
                _tableData: [],
                //显示编辑按钮
                showBtn: [],
                row: {},
                index: -1,
                //显示编辑框
                showEdit: [],
                dsconfig: Config.dsConfig,
                modal: false,
                modal_loading: false,
                deleteModal: false,
                formItem: {},

            }
        },
        created() {
            this.getAllDataSources();
        },
        methods: {
            handleUpdate(index, row) {
                this.updateDataSource(row);
                this._tableData.splice(index,1);
                this.$set(this.showBtn, index, false);
                this.$set(this.showEdit, index, false);
            },
            handleCancel(index, row) {
                this.tableData[index]=this._tableData[index];
                this._tableData.splice(index,1);
                this.$set(this.showBtn, index, false);
                this.$set(this.showEdit, index, false);
            },
            cancel() {

            },
            handleEdit(index, row) {
                if (!this._tableData) {
                    this._tableData = [];
                }
                this._tableData[index] = util.copyObject(row);
                this.$set(this.showBtn, index, true);
                this.$set(this.showEdit, index, true);
            },
            handleDelete(index, row) {
                this.row = row;
                this.index=index;
                this.deleteModal=true;
            },
            delDataSource() {
                this.modal_loading=true;
                const that = this;
                this.$axios.delete(this.$global.whtcServerPath + '/datax/datasource/'+ this.row['id'], this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        that.row={};
                        that.deleteModal=false;
                        that.modal_loading=false;
                        if (response.status === 200) {
                            that.tableData.splice(that.index,1);
                            that.$Message.success("删除成功")
                        } else {
                            that.$Message.error("删除失败");
                        }
                        that.index=-1;
                    })
                    .catch(function (error) {
                        that.row={};
                        that.index=-1;
                        that.deleteModal=false;
                        that.modal_loading=false;
                        that.$Message.error("删除失败");
                    });
            },
            updateDataSource(params) {
                const that = this;
                this.$axios.post(this.$global.whtcServerPath + '/datax/datasource/update', params, this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.$Message.success("修改成功")
                        } else {
                            that.$Message.error("修改失败");
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("修改失败");
                    });
            },
            addDataSource() {
                const that = this;
                this.$axios.post(this.$global.whtcServerPath + '/datax/datasource', this.formItem, this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.getAllDataSources();
                            that.$Message.success("添加成功")
                        } else {
                            that.$Message.error("添加失败");
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("添加失败");
                    });
            },
            getAllDataSources() {
                const that = this;
                this.$axios.post(this.$global.whtcServerPath + '/datax/get/datasource', {}, this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            that.tableData = response.data;
                        } else {
                            that.error()
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error("获取数据源信息失败")
                    });
            }
        },


    }
</script>

<style scoped>
.edit-cell{
    width: 100%;
}
</style>