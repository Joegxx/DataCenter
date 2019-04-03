<template>
    <div>
        <Row>
            <strong style="font-size: larger">定义下载维度字段</strong><Button type="primary" @click="addColumn()">添加</Button>
            <Col v-for="item,index in value.columns" :key="index">
                <Form :model="item" label-position="left" :label-width="100" inline>
                    <FormItem label="下载字段名称">
                        <Input v-model="item.title" placeholder="输入字段名称"></Input>
                    </FormItem>
                    <FormItem label="字段实际值:">
                        <Input v-model="item.key" placeholder="输入数据库字段值"></Input>
                    </FormItem>
                    <Button type="error" @click="delColumn(index)">删除</Button>
                </Form>
            </Col>
            <Col>

            </Col>

        </Row>
        <Row>
            <Col v-for="(item ,index) of value.sqls" span="10" :key="index">
                <Card>
                    <span v-if="index%2===0"><b v-if="index%2===0">数据导出sql</b>当前SQL</span>
                    <span v-else-if="index%2!==0">对比SQL</span>
                    <Select v-model="item.datasource" style="width:200px">
                        <Option v-for="item in dataBases" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                    <sql-code @change="(data,e)=>item.sql=data" :code="item.sql"></sql-code>
                </Card>
            </Col>
        </Row>
        <div style="text-align: center">
            <Button type="primary" @click="submit">保存</Button>
            <Button type="ghost" @click="preStep">上一步</Button>
            <!--<Button type="ghost" @click="nextStep" >下一步</Button>-->
        </div>
    </div>

</template>

<script>
    import sqlCode from '@components/ace/sqlCode'
    import CbrFrameUtils from '@cbr/util/CbrFrameUtils'

    export default {
        components: {sqlCode},
        name: "CBRDownload",
        props: {
            dataBases: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            editMode:{
                type: Boolean,
                default:()=>false
            }
        },
        data() {
            return {}
        },
        methods:{
            addColumn(){
                this.value.columns.push({title: '',key: '',type:1})
            },
            delColumn(index){
                this.value.columns.splice(index,1)
            },
            preStep(){
                this.$emit("preStep",this.step)
            },
            nextStep(){
                this.$emit("nestStep",this.step)
            },
            async submit(){
                let res = await CbrFrameUtils.saveCbrDownload(this.value.realreportId,this.value);
                if(res.status ===200){
                    this.$Message.success("保存成功")
                }else{
                    this.$Message.error("保存失败")
                }
            },
        }

    }
</script>

<style scoped>

</style>