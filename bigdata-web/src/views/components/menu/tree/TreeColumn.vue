<template>
    <Tooltip :content="content" placement="top">
        <span>{{ name.split("|-|")[0] }}</span>
    </Tooltip>
</template>
<script>

    export default {
        props:{
            name:{
                type:String,
                default(){
                    return ""
                }
            }
        },
        name: "TreeColumn",
        data() {
            return {
                label:"",
                content:""
            }
        },
        created(){
            let ss = this.name.split("|-|");
            this.label=ss[0];
            if(ss.length>1){
                this.content=ss[1];
            }
        }


    }
</script>

<style scoped>

</style>