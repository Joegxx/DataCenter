<template>
    <div style="width: 850px;margin:0 auto">
        <div style="background-color: #546a79">
            <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">字段名称</div>
            <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">字段实际值</div>
            <div style="width: 50px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">列宽</div>
            <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">数据计算</div>
            <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">显示文本</div>
            <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">显示样式</div>
            <div style="width: 40px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">#</div>
        </div>
        <br>
        <draggable element="Row" v-model="value.columns">
            <Col v-for="(item,index) of value.columns" :key="index">
                <column @close="deleteColumn(index,item)" :columns="value.columns"
                        :index="index"></column>
            </Col>
        </draggable>
        <div style="text-align: center">
            <Button type="dashed" @click="addColumn" icon="plus-round">添加字段</Button>
            <Button type="primary" @click="submit">保存</Button>
            <Button type="ghost" @click="preStep">上一步</Button>
            <Button type="ghost" @click="nextStep">下一步</Button>
        </div>
    </div>
</template>
<script>
    import Column from './Column'
    // 引入拖拽组件
    import draggable from 'vuedraggable'
    import CbrFrameUtils from '@cbr/util/CbrFrameUtils'

    export default {
        components: {Column, draggable},
        props: {
            value: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                delColumnIds:[]
            }
        },

        methods: {
            deleteColumn(index, column) {
                this.value.columns.splice(index, 1);
                //判断column是否要删除
                if (column.id) {
                    //如果Id存在则说明是要删除
                    this.$Modal.confirm({
                        render: (h) => {
                            return h("span", {}, '确定删除ID为：' + column.id + ',名称为：' + column.title + '的字段吗？')
                        },
                        onOk: async () => {
                            this.delColumnIds.push(column.id)
                        },
                        onCancel: () => {
                        }

                    });
                }
            },
            addColumn() {
                let column = {
                    title: '',
                    key: '',
                    width: '',
                    func: '',
                    text: '',
                    style: '',
                };
                this.value.columns.push(column);
                console.log(this.value.columns)
            },
            async submit() {
                let res = await CbrFrameUtils.saveCbrColumns(this.value.realreportId, this.value.columns,this.delColumnIds);
                if (res.status === 200) {
                    this.$Message.success("保存成功");
                    //回显数据
                    this.value.columns = res.data;
                } else {
                    this.$Message.error("保存失败")
                }
            },
            preStep() {
                this.$emit("preStep", this.step)
            },
            nextStep() {
                this.$emit("nestStep", this.step)
            }
        }
    }
</script>