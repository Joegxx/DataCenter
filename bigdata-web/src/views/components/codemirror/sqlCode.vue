<template>
    <div class="sqlCode">
        <codemirror
                v-model="data"
                :options="cmOptions"
                @changes="change"
                class="code"
        ></codemirror>
    </div>
</template>

<script>
    import {codemirror} from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'

    require("codemirror/mode/python/python.js");
    require("codemirror/mode/sql/sql.js");
    require('codemirror/addon/hint/show-hint.js');
    require('codemirror/addon/hint/show-hint.css');
    export default {
        components: {codemirror},
        name: "sqlCode",
        props:{
            sql:{
                type:String,
                default(){
                    return "";
                }
            }
        },
        created(){
            this.data=this.sql;
        },
        data() {
            return {
                data:"",
                cmOptions: {
                    mode: "text/x-mysql",
                    indentWithTabs: true,
                    inputLen: 0,
                    smartIndent: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    autofocus: true,
                    extraKeys: {},
                    hintOptions: {
                        tables: {
                            users: ["name", "score", "birthDate"],
                            countries: ["name", "population", "size"],
                            dw_v2: ["users", "countries"]
                        },
                    }
                },

            }
        },
        methods:{
            change(editor, options) {
                this.$emit("change",editor.doc.getValue(),this.sql)
            },
        }

    }
</script>

<style>
    .sqlCode .CodeMirror {
        /* Set height, width, borders, and global font properties here */
        font-family: monospace;
        height: 300px;
        color: black;
        direction: ltr;
    }
</style>