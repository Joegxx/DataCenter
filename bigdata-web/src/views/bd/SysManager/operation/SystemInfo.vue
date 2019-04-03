<template>
    <div style="text-align: center">
        <h3>{{sysName }}系统信息</h3>
        <div style="float:left">
            <Button type="primary" size="small">添加实例</Button>
            <Button type="error" size="small">删除实例</Button>
            <Button type="success" size="small">发布</Button>
            <Button type="info" size="small">回滚</Button>
            <Button type="info" size="small" @click="sourceFileHandler">原版本文件</Button>
        </div>

        <el-table
                :data="sysInfo"
                style="width: 100%"
                :border="true"
                size="mini"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    label="实例节点"
                    prop="host"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="端口"
                    width="80"
                    prop="port">
            </el-table-column>
            <el-table-column
                    label="运行目录"
                    width="350"
                    prop="appPath">
            </el-table-column>
            <el-table-column
                    label="运行状态"
                    width="80">
                <template slot-scope="scope">
                    <span v-if="scope.row.status===1" style="margin-left: 10px;color: green">在线</span>
                    <span v-if="scope.row.status===0" style="margin-left: 10px;color: red">离线</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" style="float: left">
                <template slot-scope="scope">
                    <el-dropdown size="mini" split-button type="primary" trigger="click" @command="handleDeploy">
                        发布管理
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{key:'deploy',row:scope.row}">发布版本</el-dropdown-item>
                            <el-dropdown-item :command="{key:'showVersion',row:scope.row}">查看版本</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown size="mini" split-button type="info" trigger="click" @command="changeLogLevel">
                        日志级别
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{key:'debug',row:scope.row}">debug</el-dropdown-item>
                            <el-dropdown-item :command="{key:'info',row:scope.row}">info</el-dropdown-item>
                            <el-dropdown-item :command="{key:'error',row:scope.row}">error</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <el-dropdown size="mini" split-button type="warning" trigger="click">
                        日志查看
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>debug</el-dropdown-item>
                            <el-dropdown-item>info</el-dropdown-item>
                            <el-dropdown-item>error</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog :title="dialog.title" :visible.sync="dialogTableVisible">
            <el-table
                    size="mini"
                    :data="dialog.gridData">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column property="file" label="版本"></el-table-column>
                <el-table-column property="time" label="生成时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <span v-if="dialog.type==='view'">
                            <el-button :disabled="dialog.version===scope.row.file"
                                       size="mini"
                                       type="primary"
                                       @click="dialog.deploy(scope.row,true)">上线
                            </el-button>
                            <el-button
                                    :disabled="dialog.version!==scope.row.file"
                                    size="mini"
                                    type="danger"
                                    @click="dialog.offline(scope.row)">下线
                            </el-button>
                        </span>

                        <el-button v-if="dialog.type==='deploy'"
                                   size="mini"
                                   type="primary"
                                   @click="dialog.deploy(scope.row,false)">发布此版本
                        </el-button>
                        <el-button v-if="dialog.type==='source'"
                                   size="mini"
                                   type="primary"
                                   @click="dialog.batchDeploy(scope.row,false)">批量发布此版本
                        </el-button>
                        <el-button v-if="dialog.version!==scope.row.file"
                                   size="mini"
                                   type="danger"
                                   @click="dialog.handleDelete(scope.row,scope.index)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>
<script>
    import Data from './operation_data'

    export default {
        props: {
            sysName: {
                type: String,
                default() {
                    return ""
                }
            }
        },
        name: "SystemInfo",
        data() {
            return {
                sysInfo: [],
                dialog: {
                    gridData: []
                },
                dialogTableVisible: false,

            }
        },
        watch: {
            async sysName() {
                console.log('===', this.sysName);
                this.sysInfo = await Data.getSysInfo(this.sysName);
                console.log(this.sysInfo )
            }
        },
        async created() {
            this.sysInfo = await Data.getSysInfo(this.sysName)
        },
        methods: {
            handleSelectionChange() {

            },
            async handleDeploy({key,row}) {
                let host = row.host;
                switch (key) {
                    case "showVersion": {
                        this.dialog={};
                        this.dialog.version=row.version;
                        this.dialog.type = 'view';
                        this.dialog.gridData = [];
                        this.dialog.query = "deployedFile";
                        this.dialog.delete = "deleteDeployedFiles";
                        this.dialog.host = host;
                        this.dialog.sysName=this.sysName;
                        this.dialog.title = "发布在" + host + "上的版本";
                        this.dialogTableVisible = await  Data.deployFileHandler(this.dialog,this.$Message);
                        break;
                    }
                    case "deploy": {
                        this.dialog={};
                        this.dialog.type = 'deploy';
                        this.dialog.gridData = [];
                        this.dialog.query = "sourceFile";
                        this.dialog.delete = "deleteSourceFiles";
                        this.dialog.host = host;
                        this.dialog.title = "可发布的"+this.sysName + "系统版本";
                        this.dialog.sysName=this.sysName;
                        this.dialogTableVisible = await  Data.deployFileHandler(this.dialog,this.$Message)
                    }
                }
            },
            async sourceFileHandler(){
                this.dialog={};
                this.dialog.type = 'source';
                this.dialog.gridData = [];
                this.dialog.query = "sourceFile";
                this.dialog.delete = "deleteSourceFiles";
                this.dialog.host = "deleteSourceFiles";
                this.dialog.title = "发布机器上"+this.sysName + "系统版本";
                this.dialog.sysName=this.sysName;
                this.dialogTableVisible = await  Data.deployFileHandler(this.dialog,this.$Message)
            },
             changeLogLevel({key,row}){
                 Data.changeLogLevel(key,row.host,row.port)
            }

        }
    }
</script>

<style scoped>

</style>