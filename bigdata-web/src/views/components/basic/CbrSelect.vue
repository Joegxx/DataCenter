<template>
    <Select v-model="val" :style='"width:"+width+"px"' filterable>
        <Option v-for="item in valueList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
</template>
<script>
    export default {
        computed:{
          val: {
              get() {
                  return this.valueList[0].value
              },
              set(v) {
                  this.item.value=v;
              }
          }
        },
        props: {
            item: {
                type: Object,
                default() {
                    return {}
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