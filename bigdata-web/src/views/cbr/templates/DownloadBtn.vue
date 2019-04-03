<template>
    <div>
        <Form :label-width="80">
            <FormItem label="维度字段">
                <RadioGroup v-model="dimensionCol">
                    <Radio v-for="item,index in download.dimensionCols" :label="item.key" :key="item.key">
                        {{item.title}}
                    </Radio>
                </RadioGroup>
            </FormItem>
        </Form>
        <Button type="primary" size="large" long :loading="modal_loading" @click="handleClick">导出指定维度的数据</Button>
    </div>

</template>
<script type="text/javascript">
    import CbrAjax from '@cbr/util/CbrAjax'

    export default {
        props: {
            //报表下载对象
            download: {
                type: Object,
                default: {}
            }
        },
        data() {
            return {
                headerLabel: [],
                headerProp: [],
                data: [],
                fileName: "",
                modal_loading:false,
                dimensionCol: "",
            }
        },
        created() {
            console.log(this.download)
        },
        methods: {
            handleClick: async function () {
                if(this.dimensionCol===""){
                    this.$Message.error("请选择导出维度！");
                    return
                }
                this.modal_loading=true;
                await this.downloadPre();
                if (!this.data || this.data.length <= 0) {
                    this.$Message({
                        message: '请先进行查询,并等待查询结果返回!',
                        type: 'error'
                    });
                    this.modal_loading=false;
                    return;
                }
                let csvContent = 'data:text/csv;charset=utf-8,\ufeff';
                csvContent += this.headerLabel.join(',') + '\n';
                this.data.forEach((item, index) => {
                    let dataString = '';
                    for (let i = 0; i < this.headerProp.length; i++) {
                        let element = this.headerProp[i];
                        let func = element.func;
                        if(func && func!=="" ){
                            let f = new Function("row", func);
                            f(item);
                        }
                        dataString += item[element.key] + ',';
                    }
                    csvContent += index < this.data.length ? dataString.replace(/,$/, '\n') : dataString.replace(/,$/, '');
                });
                this.fileName = this.download.realreportName + ".csv";
                let link = document.createElement("a");
                link.setAttribute("href", encodeURI(csvContent));
                link.setAttribute("download", this.fileName);
                document.body.appendChild(link); // Required for FF
                link.click(); // This will download the data file named "my_data.csv".
                document.body.removeChild(link); // Required for FF
                this.modal_loading=false;
                // this.$refs.link.setAttribute('href', encodeURI(csvContent));
                // this.$refs.link.setAttribute('download', this.fileName);
            },
            // 要求head是数组，数组中的每个元素是对象，并且每个对象都有title,key属性
            async downloadPre() {
                //请求数据
                let params = {};
                let cbrParams = this.download.params;
                if (cbrParams && cbrParams.length > 0) {
                    cbrParams.forEach(item => {
                        let v = item.value;
                        if (v instanceof Date) {
                            v = item.value.Format("yyyy-MM-dd HH:mm:ss");
                        }
                        params[item.paramName] = v
                    })
                }
                params["dimensionCol"] = this.dimensionCol;
                let res = await CbrAjax.post("/download/data", {
                    realreportId: this.download.realreportId,
                    params: params
                });
                this.data = res.data.data;
                let header = this.download.header;
                for (let i = 0, j = 0; i < header.length; i++) {
                    if (i === 0) {
                        this.headerProp[j] = {
                            key: header[i].key
                        };
                        this.headerLabel[j++] = header[i].title;
                        continue
                    }
                    this.headerProp[j] = {
                        key: header[i].key,
                        func: header[i].func
                    };
                    this.headerLabel[j++] = "今日" + header[i].title;
                    this.headerProp[j] = {
                        key: "_"+header[i].key
                    };
                    this.headerLabel[j++] = "昨日" + header[i].title
                }
                console.log(this.headerLabel,this.headerProp)
            }
        }
    }

</script>
<style scoped>
    .download-btn {
        display: inline-block;
        margin-left: 10px;
        padding: 2px 15px;
        font-size: 12px;
        border-radius: 4px;
        color: #FFF;
        background-color: #f7ba2a;
        border-color: #f7ba2a;
        outline: 0;
        text-align: center;
        -webkit-appearence: none;
        appearence: none;
        cursor: pointer;
    }

</style>