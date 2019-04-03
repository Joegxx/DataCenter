<template>
    <Row>
        <ButtonGroup>
            <Button @click="execute" :disabled="executeAble">
                <Icon type="play" :color="play"></Icon>
                执行(F8)
            </Button>
            <Button @click="stopExecute" :disabled="!executeAble">
                <Icon type="stop" :color="stop"></Icon>
                停止
            </Button>
        </ButtonGroup>
        <Card>
            <codemirror
                    ref="myCm"
                    :value="item.content"
                    :options="cmOptions"
                    @changes="change"
                    class="code"
            ></codemirror>
        </Card>
        <Card>
            <result-data  :db="db"  ref="RD" @getExecuteResult="getExecuteResult"></result-data>
        </Card>
    </Row>
</template>
<script>
    import {codemirror} from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    import ResultData from '@rdbms/ResultData'

    require("codemirror/mode/python/python.js");
    require("codemirror/mode/sql/sql.js");
    require('./sql-hint');
    require('codemirror/addon/hint/show-hint.js');
    require('codemirror/addon/hint/show-hint.css');
    export default {
        name: "SqlOption",
        props: ["db", ""],
        components: {
            codemirror, ResultData
        },
        computed: {
            play() {
                if (!this.executeAble) {
                    return "green"
                } else {
                    return "";
                }
            },
            stop() {
                if (this.executeAble) {
                    return "red"
                } else {
                    return "";
                }
            }
        },
        data() {
            return {
                columns: [],
                webTable: {},
                webDB: {},
                tableShow: false,
                spinShow: false,
                executeAble: false,
                data: [],
                cmOptions: {
                    mode: "text/x-mysql",
                    indentWithTabs: true,
                    inputLen: 0,
                    smartIndent: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    autofocus: true,
                    extraKeys: {
                        "Ctrl-Enter": "autocomplete",
                        "F8": this.execute,
                    },
                    hintOptions: {
                        tables: {
                            users: ["name", "score", "birthDate"],
                            countries: ["name", "population", "size"],
                            dw_v2: ["users", "countries"]
                        },
                    }
                },
                item: {
                    content: "SELECT * from "
                }
            }
        },

        methods: {
            change(editor, options) {
                let completionActive = editor.state.completionActive;
                let length = options[0].text[0].length;

                if (length === 1 && options[0].text[0] !== ";")
                    setTimeout(function () {
                        if (!completionActive)
                            editor.showHint({
                                completeSingle: false
                            });
                    }, 100);
            },
            execute() {
                //获取选中的内容
                this.executeAble = true;
                let doc = this.$refs.myCm.codemirror.doc;
                let s = doc.getSelection().toString();
                if (!s) {
                    s = doc.getValue();
                }
                // this.executeSql("mysql", this.db.name, s)
                this.$refs.RD.executeSql(s)
            },
            getExecuteResult(result) {
                this.executeAble = false;
            },
            stopExecute() {
                let that = this;
                that.spinShow = false;
                that.executeAble = false;
                this.$axios.post(this.$global.dbmsServerPath + '/execute/stop', this.$axiosConfig.json_config)
                    .then(function (response) {
                        response = response.data;
                        if (response.status === 200) {
                            // that.queryData = response.data;
                            that.$Message.success('执行成功!');
                        } else {
                            that.$Message.error('执行失败!\n' + response.msg)
                        }
                    })
                    .catch(function (error) {
                        that.$Message.error('执行失败!\n' + error)
                    });
            },
            completeAfter(cm, pred) {
                if (!pred || pred()) setTimeout(function () {
                    if (!cm.state.completionActive)
                        cm.showHint({
                            completeSingle: false
                        });
                }, 100);
                console.log(cm);
                return "";
            },
            completeIfInTag(cm) {
                // console.log(codemirror);
                return this.completeAfter(cm, function () {
                    var tok = cm.getTokenAt(cm.getCursor());
                    if (tok.type === "string" && (!/['"]/.test(tok.string.charAt(tok.string.length - 1)) || tok.string.length === 1)) return false;
                    var inner = codemirror.innerMode(cm.getMode(), tok.state).state;
                    return inner.tagName;
                });
            },
        },
        created() {
            let that = this;
            this.$axios.post(this.$global.dbmsServerPath + '/instance/get/schema/hint', {
                name: that.db.name,
                dbType: that.db.dbType
            }, this.$axiosConfig.json_config)
                .then(function (response) {
                    response = response.data;
                    if (response.status === 200) {
                        that.cmOptions.hintOptions.tables = response.data;
                        that.$Message.success('加载成功!');
                    } else {
                        that.$Message.error('提交失败!\n' + response.msg)
                    }
                })
                .catch(function (error) {
                    that.$Message.error('提交失败!\n' + error)
                });
        }
    }
</script>

<style scoped>


</style>