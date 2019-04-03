<template>
    <div>
        <el-table
                :data="tableData"
                size="mini"
                style="width: 100%">
            <el-table-column
                    label="#"
                    prop="id"
                    width="80">
            </el-table-column>
            <el-table-column
                    label="文件名称"
                    prop="taskName"
                    width="200">
            </el-table-column>
            <el-table-column
                    label="数据源"
                    prop="datasource"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="状态"
                    width="180">
                <template slot-scope="scope">
                    <span v-if="scope.row.status === 0" style="color: black">新建</span>
                    <span v-if="scope.row.status === 1" style="color: orange">等待</span>
                    <span v-if="scope.row.status === 2" style="color: darkslategray">执行</span>
                    <span v-if="scope.row.status === 3" style="color: green">完成</span>
                    <span v-if="scope.row.status === 4" style="color: red">取消</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="createdTime"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="最后更新时间"
                    prop="updatedTime"
                    width="180">
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index,scope.row)">删除
                    </el-button>
                    <el-button v-if="scope.row.status === 3"
                               size="mini"
                               type="success"
                               @click="downloadFile(scope.$index, scope.row)">下载文件
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import TaskManageUtil from "./TaskManageUtil"

    export default {
        name: "index",
        data() {
            return {
                tableData: []
            }
        },
        methods: {
             downloadFile(index, row) {
                 TaskManageUtil.download(row.taskName)
            },
            async handleDelete(index,row) {
               let res = await TaskManageUtil.deleteTask(row.id);
               if(res.data.msg){
                   this.$Message.success("删除成功！！");
                   this.tableData.splice(index,1);
                   return
               }
                this.$Message.error("删除失败！！")
            }
        },
        async created() {
            let result = await TaskManageUtil.getAllTask();
            console.log(result.data);
            this.tableData = result.data.data
        }

    }
</script>

<style scoped>

</style>