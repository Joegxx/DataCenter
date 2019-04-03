<template>
    <div>
        <Row class="DefineQueryExpress">
            <Col v-for="(item ,index) of value" span="10" :key="index">
                <div v-if="index>1" style="height: 5px"></div>
                <div style="background-color: #2f3129 ;color: #FFFFFF">
                    <span v-if="index%2===0">
                        <Dropdown style="margin-left: 0px" @on-click="delSqlLevel">
                            <Button type="info">
                                {{"第"+(index/2+1)+"层"}}
                                <Icon type="ios-arrow-down"></Icon>
                            </Button>
                            <DropdownMenu slot="list">
                                <DropdownItem :name="index">删除</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        当前SQL</span>
                    <span v-else-if="index%2!==0">对比SQL</span>
                    <Select v-model="item.datasource" style="width:200px">
                        <Option v-for="item in dataBases" :value="item.value" :key="item.value">{{ item.label }}
                        </Option>
                    </Select>
                </div>
                <sql-code v-if="showable" @change="(data,e)=>item.sql=data" :hint-data="hintData" :code="item.sql"></sql-code>
            </Col>
        </Row>
        <div style="text-align: center">
            <Button type="dashed"
                    @click="()=>{value.push({datasource:'',sql:''});value.push({datasource:'',sql:''})}"
                    icon="plus-round">添加展示层
            </Button>
            <Button type="primary" @click="submit">保存</Button>
            <Button type="ghost" @click="preStep">上一步</Button>
            <Button type="ghost" @click="nextStep">下一步</Button>
        </div>
    </div>
</template>

<script>
    import sqlCode from '@components/ace/sqlCode'
    import CbrFrameUtils from '@cbr/util/CbrFrameUtils'

    export default {
        name: "DefineQueryExpress",
        components: {sqlCode},
        computed: {
            hintData() {
                return this.columns.map(item => {
                    return {caption: item.key, meta: item.title, value: item.key}
                })
            },
        },
        props: {
            dataBases: {
                type: Array,
                default() {
                    return []
                }
            },
            value: {
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
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
        },
        data() {
            return {
                delSqlIndex:[],
                showable:true
            }
        },
        methods: {
            delSqlLevel(index) {
                this.showable = false
                //通过下标删除
                this.value.splice(index, 1);
                this.value.splice(index, 1);
                //临时存储层级，后端通过层级上除
                this.delSqlIndex.push(index/2)
                this.showable = true
            },
            addDisplay() {
                var level = this.value.length / 2;
                this.value.push({datasource: "", sql: "select", name: level + ''});
                this.value.push({datasource: "", sql: "select", name: '_' + level + ''});
            },
            async submit() {
                let res = await CbrFrameUtils.saveCbrSqls(this.realreportId, this.value, this.delSqlIndex);
                if (res.status === 200) {
                    this.$Message.success("保存成功");
                    //回显数据
                    this.value = res.data;
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

<style>
    .DefineQueryExpress .CodeMirror {
        /* Set height, width, borders, and global font properties here */
        font-family: monospace;
        height: 300px;
        color: black;
        direction: ltr;
    }

    .sqlTitle {
        background-color: #546a79;
    }
</style>