<template>

    <el-table v-if="!loading"
              :data="data"
              border
              :height="height"
              :header-row-style="{color:'black'}"
              :header-cell-style="{padding:0}"
              :highlight-current-row="true"
              :cell-style="{padding:0}"
              style="width: 100%"
              :row-style="showTr">
        <el-table-column v-for="(column, index) of columns" :key="column.key"
                         :fixed="index===0" :label="column.title" align="left" :width="column.width">
            <template slot-scope="scope">
                    <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) of scope.row._level"
                          class="ms-tree-space"
                          :key="levelIndex">
                    </span>
                <span v-if="toggleIconShow(index,scope.row)" @click="toggle(scope)">
                        <i v-if="!scope.row._expanded" class="el-icon-caret-right" aria-hidden="true"></i>
                        <i v-if="scope.row._expanded" class="el-icon-caret-bottom" aria-hidden="true"></i>
                        <i v-if="!scope.row._expanded" class="fa fa-folder-o" aria-hidden="true"></i>
                        <i v-if="scope.row._expanded" class="fa fa-folder-open-o" aria-hidden="true"></i>
                    </span>

                <span v-else-if="index===0" class="ms-tree-space">
                        <i class="fa fa-file-text-o" aria-hidden="true"></i>
                    </span>
                <b v-if="index===0" style="font-size: larger;color:black">{{scope.row[column.key]}}</b>
                <tree-column v-if="index!==0" :row="scope.row" :column="column" :colIndex="index"></tree-column>
            </template>
        </el-table-column>
    </el-table>

</template>

<script>
    import TreeColumn from './TreeColumn'
    //  import Vue from 'vue'
    export default {
        name: 'tree-grid',
        props: {
            loading: {
                type: Boolean,
                default: function () {
                    return false
                }

            },
            height: Number,
            default: function () {
                return 300
            },
// 该属性是确认父组件传过来的数据是否已经是树形结构了，如果是，则不需要进行树形格式化
            treeStructure: {
                type: Boolean,
                default: function () {
                    return false
                }
            },
// 这是相应的字段展示
            columns: {
                type: Array,
                default: function () {
                    return []
                }
            },
// 这是数据源
            dataSource: {
                type: Array,
                default: function () {
                    return []
                }
            },
// 这个作用是根据自己需求来的，比如在操作中涉及相关按钮编辑，删除等，需要向服务端发送请求，则可以把url传过来
            requestUrl: {
                type: String,
                default: function () {
                    return ''
                }
            },
// 这个是是否展示操作列
            treeType: {
                type: String,
                default: function () {
                    return 'normal'
                }
            },
// 是否默认展开所有树
            defaultExpandAll: {
                type: Boolean,
                default: function () {
                    return false
                }
            }
        },
        data() {
            return {
                positionHeader: ''
            }
        },
        computed: {
            dataheader() {
                let data = [{}];
                this.columns.forEach(item => {
                    console.log(item)
                    data[0][item.key] = item.title
                });
                return data
            },
            data() {
                return this.dataSource
            }
        },
        filters: {
            btnType(value, key) {
                let cur = value[key] || 0;
                if (key === 'item') {
                    return cur
                } else {
                    let yes = value['_' + key] || 0;

                    return cur + '(' + yes + ')'
                }
            }
        },
        methods: {
            // 显示行
            showTr(row, index) {
                let show = (row.row._parent ? (row.row._parent._expanded && row.row._parent._show) : true);
                this.$set(row.row, '_show', show);
                return show ? 'height:0px;font-size:12px;padding:0' : 'display:none;'
            },
            // 展开下级
            toggle(scope) {
                this.$emit("expandData", this.value, scope);
                this.$set(scope.row, '_expanded', !scope.row._expanded);
            },
            // 显示层级关系的空格和图标
            spaceIconShow(index) {
                if (index === 0) {
                    return true
                }
                return false
            },
            // 点击展开和关闭的时候，图标的切换
            toggleIconShow(index, record) {
                if (index === 0 && record.children) {
                    return true
                }
                return false
            },
            // handleDelete() {
            //     this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
            //         confirmButtonText: '确定',
            //         cancelButtonText: '取消',
            //         type: 'error'
            //     }).then(() => {
            //         this.$message({
            //             type: 'success',
            //             message: '删除成功!'
            //         })
            //     }).catch(() => {
            //         this.$message({
            //             type: 'info',
            //             message: '已取消删除'
            //         })
            //     })
            // }
        },
        mounted() {
            // var s = "";
            // s += " 网页可见区域宽："+ document.body.clientWidth+"\n";
            // s += " 网页可见区域高："+ document.body.clientHeight+"\n";
            // s += " 网页可见区域宽："+ document.body.offsetWidth + " (包括边线和滚动条的宽)"+"\n";
            // s += " 网页可见区域高："+ document.body.offsetHeight + " (包括边线的宽)"+"\n";
            // s += " 网页正文全文宽："+ document.body.scrollWidth+"\n";
            // s += " 网页正文全文高："+ document.body.scrollHeight+"\n";
            // s += " 网页被卷去的高(ff)："+ document.body.scrollTop+"\n";
            // s += " 网页被卷去的高(ie)："+ document.documentElement.scrollTop+"\n";
            // s += " 网页被卷去的左："+ document.body.scrollLeft+"\n";
            // s += " 网页正文部分上："+ window.screenTop+"\n";
            // s += " 网页正文部分左："+ window.screenLeft+"\n";
            // s += " 屏幕分辨率的高："+ window.screen.height+"\n";
            // s += " 屏幕分辨率的宽："+ window.screen.width+"\n";
            // s += " 屏幕可用工作区高度："+ window.screen.availHeight+"\n";
            // s += " 屏幕可用工作区宽度："+ window.screen.availWidth+"\n";
            // s += " 你的屏幕设置是 "+ window.screen.colorDepth +" 位彩色"+"\n";
            // s += " 你的屏幕设置 "+ window.screen.deviceXDPI +" 像素/英寸"+"\n";
            // console.log(s);
        },
        components: {TreeColumn}
    }
</script>
<style scoped>
    .ms-tree-space {
        position: relative;
        top: 1px;
        display: inline-block;
        font-family: 'Glyphicons Halflings';
        font-style: normal;
        font-weight: 400;
        line-height: 1;
        width: 18px;
        height: 14px;
    }

    .ms-tree-space::before {
        content: ""
    }

    table td {
        padding: 0;
        line-height: 29px;
    }
</style>