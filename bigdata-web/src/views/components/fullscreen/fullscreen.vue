<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <a v-if="!value" href="jacascript::void(0)" @click="handleChange"><i class="fa fa-expand fa-2x" aria-hidden="true"></i></a>
      <a v-if="value" href="jacascript::void(0)" @click="handleChange"><i class="fa fa-compress fa-2x" aria-hidden="true"></i></a>
    </Tooltip>
  </div>
</template>



<script>
    export default {
        name: 'Fullscreen',
        computed: {
            showFullScreenBtn () {
                return window.navigator.userAgent.indexOf('MSIE') < 0
            }
        },
        props: {
            value: {
                type: Boolean,
                default: false
            },
            elementDoc:{
                type:HTMLDivElement,
                default(){
                    return undefined
                }
            }
        },
        methods: {
            handleFullscreen () {
                if(!this.elementDoc){
                    this.elementDoc = document.body;
                }
                let main = this.elementDoc;
                if (this.value) {
                    if (document.exitFullscreen) {
                        document.exitFullscreen()
                    } else if (document.mozCancelFullScreen) {
                        document.mozCancelFullScreen()
                    } else if (document.webkitCancelFullScreen) {
                        document.webkitCancelFullScreen()
                    } else if (document.msExitFullscreen) {
                        document.msExitFullscreen()
                    }
                } else {
                    if (main.requestFullscreen) {
                        main.requestFullscreen()
                    } else if (main.mozRequestFullScreen) {
                        main.mozRequestFullScreen()
                    } else if (main.webkitRequestFullScreen) {
                        main.webkitRequestFullScreen()
                    } else if (main.msRequestFullscreen) {
                        main.msRequestFullscreen()
                    }
                }
            },
            handleChange () {
                this.handleFullscreen()
            }
        },
        mounted () {
            let isFullscreen = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen
            isFullscreen = !!isFullscreen
            document.addEventListener('fullscreenchange', () => {
                this.$emit('input', !this.value)
                this.$emit('on-change', !this.value)
            })
            document.addEventListener('mozfullscreenchange', () => {
                this.$emit('input', !this.value)
                this.$emit('on-change', !this.value)
            })
            document.addEventListener('webkitfullscreenchange', () => {
                this.$emit('input', !this.value)
                this.$emit('on-change', !this.value)
            })
            document.addEventListener('msfullscreenchange', () => {
                this.$emit('input', !this.value)
                this.$emit('on-change', !this.value)
            })
            this.$emit('input', isFullscreen)
        }
    }
</script>

<style lang="less">
  .full-screen-btn-con .ivu-tooltip-rel{
    height: 32px;
    line-height: 56px;
    i{
      cursor: pointer;
    }
  }
</style>
