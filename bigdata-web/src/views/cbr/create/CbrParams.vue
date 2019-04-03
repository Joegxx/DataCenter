<template>
    <div style="width: 850px;margin:0 auto">
        <b>报表中涉及的参数:</b>
        <Tag :closable="false" color="blue" v-for="(item,index) in sqlParams" :key="index">{{ item }}</Tag>
            <div style="background-color: #546a79">
                <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">标签</div>
                <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">参数类型</div>
                <div style="width: 150px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">参数名</div>
                <div style="width: 300px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">默认值</div>
                <div style="width: 40px;float:left;text-align: center;background-color:#546a79;color: #FFFFFF">#</div>
            </div>
        <br>
        <Row>
            <Col span="24" v-for="(param,index) in params" :key="param.paramName">
                <cbr-param @close="deleteParam(index,param)" :params="params" :index="index" :param-names="sqlParams"></cbr-param>
            </Col>
        </Row>
        <div style="text-align: center">
            <Button type="dashed" @click="addParam" icon="plus-round">添加参数</Button>
            <Button type="primary" @click="submit">保存</Button>
            <Button type="ghost" @click="preStep">上一步</Button>
            <Button type="ghost" @click="nextStep" >下一步</Button>
        </div>
    </div>
</template>

<script>
    // 引入拖拽组件
    import draggable from 'vuedraggable'
    import jsCode from '@components/ace/jsCode'
    import CbrSelect from '@components/basic/CbrSelect'
    import CbrMultiSelect from '@components/basic/CbrMultiSelect'
    import CbrFrameUtils from '@cbr/util/CbrFrameUtils'
    import CbrParam from './Param.vue'

    export default {
        name: "CbrParams",
        components: {draggable,jsCode,CbrSelect,CbrMultiSelect,CbrParam},
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },

            querySqls: {
                type: Array,
                default() {
                    return []
                }
            },
            selectParams: {
                type: Array,
                default() {
                    return []
                }
            },
            realreportId: {
                type: String,
                default() {
                    return ""
                }
            }
        },
        created(){
          this.params=this.value
        },
        methods: {
            deleteParam(index,param){
                this.params.splice(index, 1);
                //判断column是否要删除
                if (param.id) {
                    //如果Id存在则说明是要删除
                    this.$Modal.confirm({
                        render: (h) => {
                            return h("span", {}, '确定删除ID为：' + param.id + ',名称为：' + param.paramName + '的参数吗？')
                        },
                        onOk: async () => {
                            this.delParamIds.push(param.id)
                        },
                        onCancel: () => {
                        }

                    });

                }
            },
            addParam() {
                let param = {
                    label: '',
                    type: '',
                    paramName: '',
                    value: '',
                    style: 'width:200px'
                };
                this.params.push(param);
                console.log(this.params)
            },
            async submit(){
                // TODO 检查是否有空的 重复的
                let res = await CbrFrameUtils.saveCbrParams(this.realreportId,this.params,this.delParamIds);
                if(res.status ===200){
                    this.$Message.success("保存成功")
                }else{
                    this.$Message.error("保存失败")
                }
            },
            preStep(){
                this.$emit("preStep",this.step)
            },
            nextStep(){
                this.$emit("nestStep",this.step)
            }
        },
        computed: {
            sqlParams() {
                let sql = '';
                //取出所有的sql
                this.querySqls.forEach(item => {
                    sql += item.sql
                });

                //获取其中的参数
                let reg = /\#\{(.*?)\}/g;
                let matchs = sql.match(reg);

                //定义返回的结果
                let result = []
                reg = /\#\{(.*?)\}/;
                //提取参数名称
                if (!matchs || matchs.length === 0) {
                    return result;
                }
                matchs.forEach(item => {
                    let paramName = item.match(reg)[1].split("\.")[1];
                    if (paramName && result.indexOf(paramName) === -1) {
                        result.push(paramName)
                    }
                });
                return result;
            }
        },
        data() {
            return {
                params: [],
                delParamIds:[]
            }
        }

    }
</script>

<style scoped>

</style>