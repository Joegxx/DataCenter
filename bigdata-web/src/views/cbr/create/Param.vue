<template>
    <div>
        <div>
            <Input size="small" style="width: 150px" v-model="value.label"></Input>
            <Select size="small" style="width: 150px" v-model="value.type">
                <Option v-for="item in paramTypes" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select size="small" style="width: 150px" v-model="value.paramName">
                <Option v-for="item in paramNames" :value="item" :key="item">{{ item }}</Option>
            </Select>
            <Input size="small" style="width: 290px" v-model="value.value" @on-focus="edit('value')"></Input>
            <Button type="error"
                    shape="circle" size="small" icon="close" @click="close()"></Button>
        </div>
        <Modal
                :title="editName"
                v-model="editable"
                width="50%"
                :mask-closable="false"
                @on-ok="ok">
            <js-code v-if="editable" :code="editValue"
                     @change="(data,e)=>this.editValue=data"></js-code>
        </Modal>
    </div>
</template>

<script>
    import jsCode from '@components/ace/jsCode'

    export default {
        name: "CbrParam",
        props: {
            params: {
                type: Array,
                default() {
                    return []
                }
            },
            paramNames: {
                type: Array,
                default() {
                    return []
                }
            },
            index: {
                type: Number,
                default() {
                    return -1
                }
            },
        },
        components: {jsCode},
        computed: {
            value() {
                return this.params[this.index]
            },

        },
        data() {
            return {
                editValue: "",
                editable: false,
                editName: "",
                paramTypes: [
                    {label:'输入框',value:'Input'},
                    {label:'时间',value:'DatePicker'},
                    {label:'选择框',value:'CbrSelect'},
                    {label:'多选框',value:'CbrMultiSelect'},
                ],
            }
        },
        methods: {
            close() {
                this.$emit("close", this.index)
            },
            edit(name) {
                this.editName = name;
                this.editValue = this.value[name];
                this.editable = true;
            },
            ok() {
                this.value[this.editName] = this.editValue;
            }
        }

    }
</script>

<style scoped>

</style>