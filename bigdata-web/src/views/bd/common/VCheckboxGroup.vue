<template>
    <CheckboxGroup v-model="boxValues" v-on:on-change="sendData2Parent">
        <Tag v-for="item in boxValues" color="blue" :key="item" :name="item" closable @on-close="handleClose">{{ item }}</Tag>
        <span v-if="addMode==='add'">
                <Input style="width: 100px" size="small" v-model="columnKey" placeholder="name"
                       v-on:on-enter="addColumn"/>=
                <Input style="width: 100px" size="small" v-model="columnValue" placeholder="type"
                       v-on:on-enter="addColumn"/>
                </span>
        <Icon v-if="addMode!=='add'" @click.native="addMode = 'add'" color="green" type="plus-circled"></Icon>
    </CheckboxGroup>
</template>

<script>
    export default {
        name: "VCheckboxGroup",
        props:["boxValues"],
        data(){
            return{
                addMode:"",
                columnValue:"",
                columnKey:""
            }
        },
        methods:{
            sendData2Parent(){

            },

            handleAdd () {
                if (this.count.length) {
                    this.count.push(this.count[this.count.length - 1] + 1);
                } else {
                    this.count.push(0);
                }
            },
            handleClose (event, name) {
                const index = this.boxValues.indexOf(name);
                this.boxValues.splice(index, 1);
            }
        }

    }
</script>

<style scoped>

</style>