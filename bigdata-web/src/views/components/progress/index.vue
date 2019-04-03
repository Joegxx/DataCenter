<style scoped>
    div.progressContainer {
        height: 20px;
        width: 96%;
        border-radius: 10px;
        background-color: #ddd;
        margin-left: 2%;
    }

    div.progress {
        border-radius: 10px;
        height: 20px;
        line-height: 20px;
    }

    b {
        color: #fff;
        font-weight: 100;
        font-size: 12px;
        position: absolute;
        left: 40%;
    }

</style>
<template>
    <div class="progressContainer">
        <div class="progress" :style="{width:percentage+'%','background-color':color}">
            <b style="color:black">{{text}}</b>
        </div>
    </div>

</template>
<script>
    export default {
        props: {
            percentage: {
                type: Number,
                default: function () {
                    return 0
                }

            },
            color: {
                type: String,
                default: function () {
                    return '#1C8DE0'
                }

            },
            text: {
                type: String,
                default: function () {
                    return ''
                }

            },
        },
        data() {
            return {}
        }
    }
</script>
