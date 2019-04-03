<template>
    <div>
        <Input v-model="userId" placeholder="Enter UserId..." style="width: 300px"></Input>
        <Button type="primary" @click="setCookie">确认</Button>
        <biz-tool></biz-tool>
    </div>
</template>

<script>
    import BizTool from '@realreport/BizTools.vue'
    export default {
        name: "admin",
        data(){
            return{
                userId:""
            }
        },
        methods:{
            setCookie(){
                this.$cookies.set("LOGIN_USER_ID",this.userId);
                this.$Message.success("设置成功！");
            }
        },
        components:{
            BizTool,
        }
    }
</script>

<style scoped>

</style>