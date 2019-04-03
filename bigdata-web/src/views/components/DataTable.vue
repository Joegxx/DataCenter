<template>
    <tables :searchable="searchable" :editable="editable" :columns="columns" v-model="data"></tables>
</template>

<script>
    import tables from '@components/tables/tables'
    export default {
        name: "DataTable",
        props:["data","searchable","editable","columns"],
        data () {
            return {}
        },
        computed:{
        },
        components:{tables}

    }
</script>

<style scoped>

</style>