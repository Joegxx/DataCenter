<template>
    <div :style='"overflow-x: scroll;width: 100%"'>
        <Col>
            <Spin v-if="topSpinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
        <table ref="tb_3" cellspacing="0" cellpadding="2" :width="tableWidth" border="1">

            <thead>
            <tr align="center" bgcolor="#dcdcdc">
                <td v-for="item in insideColumns" :width="item.width">{{ item.title }}</td>
            </tr>
            </thead>
            <tbody @scroll="handlerScroll" :style='"overflow-y: scroll;height: "+heightC+"px;"'>
            <tr v-for="(item,index ) in value">
                <td v-for="col in insideColumns" :width="col.width">{{ item | colValue(col.key,index) }}</td>
                <!--<td v-for="col in columns" :width="col.width">{{ item[col.key] }}</td>-->
            </tr>
            </tbody>
        </table>
        <Col>
            <Spin v-if="bottomSpinShow" fix>
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
            </Spin>
        </Col>
    </div>
</template>

<script>
    export default {
        name: "SimpleTable",
        props: {
            value: {
                type: Array,
                default() {
                    return []
                }
            },
            columns: {
                type: Array,
                default() {
                    return []
                }
            },
            height: {
                type: Number | String,
                default() {
                    return ""
                }
            },
            serialAble: {
                type: Boolean | String,
                default() {
                    return false
                }
            },
        },
        filters:{
            colValue: function (item,key,index) {
                if(key==='serial_'){
                    return index
                }else {
                    return item[key]
                }
            },
        },
        computed: {
            tableWidth() {
                let len = this.columns.length;
                return len * 100 + "px"
                // if (len < 14) {
                //     return "100%"
                // } else {
                //     return len * 100 + "px"
                // }
            },
            heightC() {
                if (this.value.size * 23 < this.height) {
                    return ""
                } else {
                    return this.height;
                }
            },
            insideColumns(){
                if(this.serialAble && this.columns && this.columns.length>0){
                    let col = {
                        title: '#',
                        key: 'serial_',
                        searchable: false,
                        ellipsis: false,
                        width:50
                    };
                    this.columns.unshift(col)
                }
                return this.columns
            }
        },
        data() {
            return {
                td: {},
                bottomSpinShow: false,
                topSpinShow: false,
            }
        },
        methods: {
            handlerScroll(e){
                let currentTarget = e.currentTarget;
                let scrollTop = currentTarget.scrollTop;
                let scrollHeight = currentTarget.scrollHeight;
                let clientHeight = currentTarget.clientHeight;
                // this.scrolling();
                this.$emit("scrolling",currentTarget);
                if((scrollHeight-scrollTop-clientHeight)===0) {
                    this.$emit("reachBottom",this.bottomSpinShow,currentTarget);
                }
                if(scrollTop===0) {
                    this.$emit("reachTop",this.topSpinShow,currentTarget);
                }
            },

            trag() {
                let tTD; //用来存储当前更改宽度的Table Cell,避免快速移动鼠标的问题
                let table = this.$refs.tb_3;
                // console.log(table.rows[0].cells);
                for (let j = 0; j < table.rows[0].cells.length; j++) {
                    table.rows[0].cells[j].onmousedown = function () {
                        //记录单元格
                        tTD = event.currentTarget;
                        console.log(table)
                        if (event.offsetX > tTD.offsetWidth - 10) {
                            tTD.mouseDown = true;
                            tTD.oldX = event.x;
                            tTD.oldWidth = tTD.offsetWidth;
                        }
                        //记录Table宽度
                        //table = tTD; while (table.tagName != ‘TABLE') table = table.parentElement;
                        //tTD.tableWidth = table.offsetWidth;
                    };
                    table.rows[0].cells[j].onmouseup = function () {
                        //结束宽度调整
                        if (tTD == undefined) tTD = event.currentTarget;
                        tTD.mouseDown = false;
                        tTD.style.cursor = 'default';
                    };
                    table.rows[0].cells[j].onmousemove = function () {
                        //更改鼠标样式
                        if (event.offsetX > this.offsetWidth - 10)
                            this.style.cursor = 'col-resize';
                        else
                            this.style.cursor = 'default';
                        //取出暂存的Table Cell
                        if (tTD == undefined) tTD = event.currentTarget;
                        //调整宽度
                        if (tTD.mouseDown != null && tTD.mouseDown == true) {
                            tTD.style.cursor = 'default';
                            if (tTD.oldWidth + (event.x - tTD.oldX) > 0)
                                tTD.width = tTD.oldWidth + (event.x - tTD.oldX);
                            //调整列宽
                            tTD.style.width = tTD.width;
                            tTD.style.cursor = 'col-resize';
                            //调整该列中的每个Cell
                            table = tTD;
                            while (table.tagName != 'TABLE') table = table.parentElement;
                            for (let j = 0; j < table.rows.length; j++) {
                                table.rows[j].cells[tTD.cellIndex].width = tTD.width;
                            }
                            //调整整个表
                            //table.width = tTD.tableWidth + (tTD.offsetWidth – tTD.oldWidth);
                            //table.style.width = table.width;
                        }
                    };
                }
            },

        },
        mounted() {
            this.trag();
        }

    }
</script>

<style scoped>
    .fixedHead {
        position: fixed
    }

    table tbody {
        display: block;
    }

    table thead, tbody tr {
        display: table;
        width: 100%;
        table-layout: fixed;
    }
    table tbody::-webkit-scrollbar {
        display: none;
    }
    /*table thead {*/
        /*width: calc(100% - 1em)*/
    /*}*/

    td {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }

    .demo-spin-col {
        height: 100px;
        position: relative;
        border: 1px solid #eee;
    }
</style>