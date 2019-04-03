<template>
    <div class="jsCode">
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
    require("codemirror/mode/javascript/javascript.js");
    require('codemirror/addon/hint/javascript-hint');
    require('codemirror/addon/hint/show-hint.js');
    require('codemirror/addon/hint/show-hint.css');
    export default {
        components: {codemirror},
        name: "jsCode",
        props:{
          js:{
              type:String,
              default(){
                  return "";
              }
          }
        },
        data() {
            return {
                data:"",
                cmOptions: {
                    mode: "javascript",
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
        created(){
            this.data=this.js;
        },
        methods:{
            change(editor, options) {
                this.$emit("change",editor.doc.getValue(),this.js)
            },
        }

    }
</script>

<style>
    .jsCode .CodeMirror {
        /* Set height, width, borders, and global font properties here */
        font-family: monospace;
        height: 100px;
        color: black;
        direction: ltr;
    }
</style>