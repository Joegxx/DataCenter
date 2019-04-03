<template>
    <div>
        <div>
                <Input size="small" style="width: 150px" v-model="value.title" placeholder="输入字段名称"></Input>
                <Input size="small" style="width: 150px" v-model="value.key" placeholder="输入字段实际值"></Input>
                <Input size="small" style="width: 50px" v-model="value.width" placeholder="输入列宽，可以不填 默认自动大小"></Input>
                <Input size="small" style="width: 150px" v-model="value.func" @on-focus="edit('func')"
                       placeholder="输入数据计算代码...."></Input>
                <Input size="small" style="width: 150px" v-model="value.text" @on-focus="edit('text')"
                       placeholder="输入显示文本代码...."></Input>
                <Input size="small" style="width: 150px" v-model="value.style" @on-focus="edit('style')"
                       placeholder="输入显示样式代码...."></Input>
                <Button v-if="index>0" type="error"
                        shape="circle" size="small" icon="close" @click="close()"></Button>

                <!--<Col span="20">-->
                <!--字段名称:<Input size="small" style="width: 150px" v-model="value.title" placeholder="输入字段名称"></Input>-->
                <!--字段实际值:<Input size="small" style="width: 150px" v-model="value.key" placeholder="输入字段实际值"></Input>-->
                <!--列宽:<Input size="small" style="width: 50px" v-model="value.width" placeholder="输入列宽，可以不填 默认自动大小"></Input>-->
                <!--<p style="height: 5px"></p>-->
                <!--数据计算:<Input size="small" style="width: 150px" v-model="value.func" @on-focus="edit('func')"-->
                <!--placeholder="输入数据计算代码...."></Input>-->
                <!--显示文本:<Input size="small" style="width: 150px" v-model="value.text" @on-focus="edit('text')"-->
                <!--placeholder="输入显示文本代码...."></Input>-->
                <!--显示样式:<Input size="small" style="width: 150px" v-model="value.style" @on-focus="edit('style')"-->
                <!--placeholder="输入显示样式代码...."></Input>-->
                <!--</Col>-->
                <!--<Col span="4">-->
                <!--<Button style="float: right" v-if="index>0" type="error"-->
                <!--shape="circle" size="small" icon="close" @click="close()"></Button>-->
                <!--</Col>-->
        </div>
        <Modal
                :title="editName"
                v-model="editable"
                width="50%"
                :mask-closable="false"
                @on-ok="ok">
            <js-code v-if="editable" :code="editValue" :hint-data="hintData"
                     @change="(data,e)=>this.editValue=data"></js-code>
        </Modal>
    </div>

</template>
<script>
    import jsCode from '@components/ace/jsCode'

    export default {
        props: {
            columns: {
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
                return this.columns[this.index]
            },
            hintData() {
                return this.columns.map(item => {
                    return {caption: item.key, meta: item.title, value: item.key}
                })
            },

        },
        data() {
            return {
                editValue: "",
                editable: false,
                editName: ""
            }

        },
        created() {
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