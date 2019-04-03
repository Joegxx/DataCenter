<template>
    <span>
        <el-table
                  :data="tableData"
                  :row-style="{padding:0}"
                  :header-cell-style="{padding:0}"
                  :cell-style="{padding:0,fontSize:'5px'}"
                  style="width: 100%">
            <el-table-column
                    prop="column"
                    label="字段名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="字段描述"
            >
            </el-table-column>
        </el-table>
    </span>
</template>


<script>

    export default {
        props: {
            tableData: {
                type: Array,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {

            }
        },
        methods: {

        }
    }
</script>