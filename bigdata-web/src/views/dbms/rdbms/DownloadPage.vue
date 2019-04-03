<template>
    <div>
        <h3 style="color: red">sql需要先执行才能下载</h3>
        <Form :model="taskInfo" label-position="left" :label-width="100">
            <FormItem label="文件名称">
                <Input v-model="taskInfo.taskName"></Input>
            </FormItem>
            <FormItem label="数据源">
                <Input disabled v-model="taskInfo.datasource"></Input>
            </FormItem>
        </Form>
        查询sql(点击下方查看):
        <sql-code :sql="sql"></sql-code>
    </div>
</template>

<script>
    import sqlCode from "@components/codemirror/sqlCode"
    import Download from './download'
    export default {
        props:{
            db:{
                type:Object,
                default(){
                    return {}
                }
            },
            sql:{
                type:String,
                default(){
                    return ""
                }
            }
        },
        name: "DownloadPage",
        data() {
            return {
                taskInfo:{}
            }
        },
        created(){
            this.taskInfo.datasource=this.db.name;
            this.taskInfo.sql=this.sql
        },
        methods:{
            async submit(){
                console.log(this.taskInfo);
                if (this.taskInfo.sql===""){
                    this.$Message.error("sql 不能为空！！");
                    return
                }

                let checkResult = await Download.checkTaskName(this.taskInfo.taskName);
                let status = checkResult.data.status;
                if(status !== 200){
                    this.$Message.error("文件名称重复！！");
                    return
                }

                let result = await Download.createTask({"operation":"CREATE","taskInfoBO":this.taskInfo});
                if(result.data.status === 200){
                    this.$Message.success("任务创建成功！！");
                    return
                }
                this.$Message.error("任务创建失败！！");
            }
        },
        components:{sqlCode}

    }
</script>

<style scoped>

</style>