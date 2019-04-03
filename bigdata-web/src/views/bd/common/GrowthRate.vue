<template>
    <div :style="{color:colorFont}">
        <Icon type="arrow-graph-up-right"></Icon>
    </div>
</template>

<script>
    export default {
        name: "GrowthRate",
        props:{
            first:0,
            second:0
        },
        data(){
            return{
                colorFont:'red'
            }
        }


    }
</script>

<style scoped>

</style>