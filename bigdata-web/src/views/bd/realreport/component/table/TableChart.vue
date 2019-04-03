<template>
    <Table :loading="loading" @on-sort-change="sortChange" :columns="tblColumns" :data="tblData" border height="550"
           stripe
           ref="table"></Table>
</template>

<script>
    export default {
        name: "TableChart",
        props: ["loading", "cbrTable", "region", "data", "city", "dimension"],
        data() {
            return {
                tblData: [],
                // tblColumns: [],
            }

        },
        computed: {
            tblColumns() {
                this.tblData = this.cbrTable.getTblData(this.data,this.region, this.city, this.dimension);
                return this.cbrTable.getTblColumns(this.region, this.city, this.dimension)
            }

        },

        created() {
        },
        methods: {
            sortChange(value) {
                //取出第一个
                let first = this.tblData.splice(0, 1);
                this.tblData = first.concat(this.tblData.sort(this.$compare(value.key, value.order)));
                // console.log(this.tblData)
            },

            exportData(type) {
                if (type === "1") {
                    var columns = this.cbrTable.getTblColumns(this.region, this.city, this.dimension);
                    console.log(columns);
                    this.$refs.table.exportCsv({
                        filename: 'The original data',
                        // columns:columns,
                        // data:this.tblData
                    });
                } else if (type === "2") {
                    this.$refs.table.exportCsv({
                        filename: 'Sorting and filtering data',
                        original: false
                    });
                } else if (type === "3") {
                    this.$refs.table.exportCsv({
                        filename: 'Custom data',
                        columns: this.columns8.filter((col, index) => index < 4),
                        data: this.data7.filter((data, index) => index < 4)
                    });
                }
            },
        }
    }
</script>

<style scoped>

</style>