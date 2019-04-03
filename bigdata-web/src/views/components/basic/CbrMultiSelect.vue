<template>
    <Select v-model="valueSelected" multiple :style='"width:"+width+"px"'>
        <Option v-for="item in valueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
    export default {
        props: {
            valueSelected: {
                type: Array,
                default() {
                    return []
                }
            },
            valueList:{
                type:Array,
                default(){
                    return []
                }
            },
            width:{
                type: Number,
                default(){
                    return 200
                }
            }

        }
    }
</script>