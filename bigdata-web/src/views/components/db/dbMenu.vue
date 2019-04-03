<template>
    <div @click="addMenuInfo()">
        <Icon :type="menu.icon"></Icon>
        <span>{{ menu.name }}</span>
    </div>
</template>

<script>
    export default {
        name: "dbItem",
        props:{
            menu:{}
        },
        data() {
            return {

            }
        },
        methods: {
            addMenuInfo() {
                this.$store.dispatch('addVisitedViews', this.menu);
            },
        }

    }
</script>

<style scoped>

</style>