<template>
    <span class="default" v-if="style==='default'">{{ text }}</span>
    <div v-else-if="style==='red'">
        <b class="red">{{ text.split('(')[0] }}</b>
        <span class="default">{{ '('+text.split('(')[1] }}</span>
    </div>
    <div v-else-if="style==='blue'">
        <b class="blue">{{ text.split('(')[0] }}</b>
        <span class="default">{{ '('+text.split('(')[1] }}</span>
    </div>
    <!--<vm-progress v-else-if="style==='progress'" :percentage="percentage" :text-inside="true" :stroke-width="18"-->
    <!--:status="percentageStatus">完成 {{ row[column['key']] }}%</vm-progress>-->
    <vm-progress v-else-if="style==='progress'" :percentage="percentage"
                 :color="percentageStatus" :text="row[column['key']]+'%'"></vm-progress>
</template>

<script>
    /**
     * ====================================================================================
     * 《《实时报表单元格》》
     * 属性：   row：报表中的一行数据对象  格式：{col1:v1,col2:v2....}
     *       column：当前单元格所对应列的白头信息，格式：
     *                  {
     *                  title: '新数据分配量',
     *                  key: 'newdatacount',
     *                  func:'return row[key] || 0',
     *                  text:'return row[key] || 0',
     *                  style:'return "default"',
     *                  },
     *                其中：title表示列名,key:列对用数据中的key（和row中的key一一对应）
     *                      width：列的宽度
     *                      func：在该列进行渲染前执行的一段js脚本 不做返回
     *                      text：一段js脚本（文本新式，后期存入数据库）
     *                            需要返回当前单元格的显示文本
     *                      style：一段js脚本（文本新式，后期存入数据库）
     *                             需要返回当前单元格的显示样式，该样式须预先定义好通过v-if
     *                             进行选择
     *
     *       colIndex：当前单元格对应的列的序号
     * =====================================================================================
     */
    import vmProgress from '@components/progress'

    export default {
        components: {vmProgress},
        props: {
            row: {
                type: Object || Array,
                default() {
                    return {}
                }
            },
            column: {
                type: Object || String,
                default() {
                    return {}
                }
            },
            colIndex: {
                type: Number,
                default() {
                    return -1
                }
            }
        },
        name: "TreeColumn",
        data() {
            return {
                color: 'black',
                text: '',
                style: 'default',
            }
        },
        watch: {
            row() {
                this.init()
            }
        },
        methods: {
            init() {

                let key = this.column['key'];
                let value = this.row;
                let func = this.column.func;
                //计算属性
                this.computeColumnValue(value, func);

                //获取文字显示内容
                let text = this.column.text;
                this.computeColumnText(value, key, text);

                //获取样式
                let style = this.column.style;
                this.computeColumnStyle(value, key, style);

            },
            //执行用户输入的计算列值得js代码 计算属性
            computeColumnValue(row, func) {
                if (func) {
                    let f = new Function("row", func);
                    f(row);
                }
            },
            //计算单元格中显示得文字
            computeColumnText(row, key, text) {
                let cur = row[key] || 0;
                let yes = row['_' + key] || 0;
                if (text) {
                    let f = new Function('row', 'key', text);
                    this.text = f(row, key);
                } else {
                    this.text = cur + '(' + yes + ')';
                }
            },

            //计算单元格中文字显示的样式
            computeColumnStyle(row, key, style) {
                let cur = row[key] || 0;
                let yes = row['_' + key] || 0;
                if (style) {
                    let f = new Function('row', 'key', style);
                    this.style = f(row, key);
                } else {
                    if (yes < cur) {
                        this.style = 'red'
                    } else {
                        this.style = 'blue'
                    }

                }
            }
        },
        computed: {
            percentage() {
                return this.row[this.column['key']] * 1 >= 100 ? 100 : this.row[this.column['key']] * 1
            },

            percentageStatus() {
                return this.row[this.column['key']] * 1 >= 100 ? '#F58D8D' : 'moccasin'
            }
        },
        mounted() {
            this.init()
        }

    }
</script>


<style scoped>
    .default{
        color: black;
    }
    .red {
        color: red;
        font-size: larger;
    }

    .blue {
        color: blue;
        font-size: larger;
    }
</style>