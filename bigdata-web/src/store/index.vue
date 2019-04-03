<script>
    import Vue from 'vue'
    import Vuex from 'vuex'
    import tagsview from '@store/modules/tagsview'
    import cbr from '@store/modules/cbr'

    Vue.use(Vuex);
    const store = new Vuex.Store({
        modules: {
            tags: tagsview,
            cbr: cbr
        }
    });
    export default store
</script>