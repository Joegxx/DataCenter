<template>


    <div style="width:500px;margin:0 auto">
        <Form :model="value" label-position="right" :label-width="80">
            <FormItem label="报表名称:">
                <Input v-model="value.realreportName" placeholder="输入报表名称"></Input>
            </FormItem>
            <FormItem label="报表ID:">
                <Input v-model="value.realreportId" placeholder="输入报表ID"></Input>
            </FormItem>
            <FormItem label="报表描述:">
                <Input v-model="value.desc" :width="300" type="textarea" :autosize="{minRows: 4,maxRows: 8}"
                       placeholder="Enter something..."></Input>
            </FormItem>
        </Form>
        <div style="text-align: center" >
            <Button type="primary" @click="submit">保存</Button>
            <Button type="ghost" @click="nextStep">下一步</Button>
        </div>
    </div>
</template>
<script>
    import CbrFrameUtils from '@cbr/util/CbrFrameUtils'
    export default {
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            },
            step:{
                type: Number,
                default:()=>0
            }

        },
        data() {
            return {}
        },
        methods: {
            async submit(){
                let res = await  CbrFrameUtils.defineCbr(this.value);
                if(res.status === 200){
                    this.$Message.success("提交成功！！");
                }
            },
            nextStep(){
                this.$emit("nestStep",this.step)
            }
        }
    }
</script>