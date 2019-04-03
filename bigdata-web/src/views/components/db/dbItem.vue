<template>
    <div @click="addMenuInfo()">
        <Icon :type="menu.icon"></Icon>
        <span>{{ menu.name }}</span>
    </div>
</template>

<script>
    export default {
        name: "dbMenu",
        props:{
            menu:{}
        },
        data() {
            return {

            }
        },
        methods: {
            addMenuInfo() {
                this.$store.dispatch('addDbitemViews', this.menu);
            },
        }

    }
</script>

<style scoped>

</style>