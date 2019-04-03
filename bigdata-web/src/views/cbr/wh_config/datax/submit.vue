<template>
    <div>
        <Button style="float: right" type="primary" v-on:click="submit">提交</Button>
    </div>
</template>
<script>
    export default {
        props: ['reader_data', 'writer_data', 'job_info'],
        methods: {
            submit: function () {
                const that = this;
                this.$axios.post(this.$global.whtcServerPath + '/datax/create', {
                    readerData: this.reader_data,
                    writerData: this.writer_data,
                    jobInfo: this.job_info

                }, this.$axiosConfig.axios_config)
                    .then(function (response) {
                        response=response.data;
                        if(response.status === 200){
                            that.success()
                        }else{
                            that.error(response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.error(error)
                    });
            },
            success() {
                this.$Message.success('提交成功!');
            },
            error(error) {
                this.$Message.error('提交失败!\n'+error);
            }
        }
    }
</script>
