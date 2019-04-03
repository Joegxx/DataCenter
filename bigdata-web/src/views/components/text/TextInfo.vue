<template>
    <Card :title="title" style="overflow-y: scroll;height: 100%">
        <div  >{{ msg }}</div>
    </Card>
</template>

<script>
    export default {
        name: "TextInfo",
        props:{
            title:{
                type:String,
                default(){
                    return "";
                }
            },
            msg:{
                type:String,
                default(){
                    return "";
                }
            }
        },
        data() {
            return {}
        }

    }
</script>

<style scoped>

</style>