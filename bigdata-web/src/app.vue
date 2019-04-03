<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>
    import Axios from "axios";

    export default {
        data() {
            return {};
        },
        mounted() {

        },
        async created() {
            this.isChrome = navigator.userAgent.indexOf('Chrome') > 0;
            if (!this.isChrome) {
                this.$Notice.info({
                    title: '重要通知',
                    desc: '如果报表打开没有数据，点击<a style="color: red" href="https://dl.softmgr.qq.com/original/Browser/70.0.3538.110_chrome_installer.exe"\n' +
                    '               target="_blank"><i style="color: red" class="fa fa-chrome" aria-hidden="true"></i>下载【最新版的浏览器】</a>或者【清理浏览器缓存】',
                    duration: 5
                });
            }
            // this.checkLogin();
        },
        beforeDestroy() {

        },
        methods: {
            async checkLogin() {
                // let t1 = window.setInterval(refreshCount, 15000);
                Axios.get("http://test.mychebao.com").then(res=>{
                    console.log(res)
                }).catch(err=>{
                    console.log(err)
                })
            }
        },

    };
</script>


