<template>
    <div>
        <h2>这个是主页面</h2>
        <div id="app" @contextmenu="showMenu" style="width: 100px;height: 100px;background: red;">
            <vue-context-menu :contextMenuData="contextMenuData"
                              @savedata="savedata"
                              @newdata="newdata">
            </vue-context-menu>
        </div>
        <button type="button" @contextmenu.prevent="showMenu1" value="======">按钮</button>
        <codemirror
                ref="myCm"
                :value="item.content"
                :options="cmOptions"
                @changes="change"
                class="code"
        ></codemirror>
    </div>
</template>
<style></style>
<script>
    import { codemirror } from 'vue-codemirror'
    import 'codemirror/lib/codemirror.css'
    require("codemirror/mode/sql/sql.js")
    require ('codemirror/addon/hint/sql-hint')
    require('codemirror/addon/hint/show-hint.js')
    require('codemirror/addon/hint/show-hint.css')
    export default {
        // name: 'app',
        components:{
            codemirror
        },
        data() {
            return {
                cmOptions:{
                    mode: "text/x-mysql",
                    indentWithTabs: true,
                    smartIndent: true,
                    lineNumbers: true,
                    matchBrackets: true,
                    autofocus: false,
                    styleSelectedText: true,
                    extraKeys: {
                        "'a'": this.completeAfter,
                        "'b'": this.completeAfter,
                        "'c'": this.completeAfter,
                        "'d'": this.completeAfter,
                        "'e'": this.completeAfter,
                        "'f'": this.completeAfter,
                        "'g'": this.completeAfter,
                        "'h'": this.completeAfter,
                        "'i'": this.completeAfter,
                        "'j'": this.completeAfter,
                        "'k'": this.completeAfter,
                        "'l'": this.completeAfter,
                        "'m'": this.completeAfter,
                        "'n'": this.completeAfter,
                        "'o'": this.completeAfter,
                        "'p'": this.completeAfter,
                        "'q'": this.completeAfter,
                        "'r'": this.completeAfter,
                        "'s'": this.completeAfter,
                        "'t'": this.completeAfter,
                        "'u'": this.completeAfter,
                        "'v'": this.completeAfter,
                        "'w'": this.completeAfter,
                        "'x'": this.completeAfter,
                        "'y'": this.completeAfter,
                        "'z'": this.completeAfter,
                        "'.'": this.completeAfter,
                        "'='": this.completeIfInTag,
                        // ,
                        // "Ctrl-Space": "autocomplete",
                        "Ctrl-Enter": "autocomplete",
                    },
                    hintOptions: {tables: {
                            users: ["name", "score", "birthDate"],
                            countries: ["name", "population", "size"]
                        }}
                },
                item:{
                    content:"se"
                },
                // contextmenu data (菜单数据)
                contextMenuData: {
                    // the contextmenu name(@1.4.1 updated)
                    menuName: 'demo',
                    // The coordinates of the display(菜单显示的位置)
                    axios: {
                        x: null,
                        y: null
                    },
                    // Menu options (菜单选项)
                    menulists: [
                        {
                            fnHandler: 'savedata', // Binding events(绑定事件)
                            icoName: 'fa fa-home fa-fw', // icon (icon图标 )
                            btnName: 'Save' // The name of the menu option (菜单名称)
                        },
                        {
                            fnHandler: 'newdata',
                            icoName: 'fa fa-home fa-fw',
                            btnName: 'New'
                        }
                    ]
                }
            }
        },
        methods: {
            showMenu() {
                event.preventDefault()
                var x = event.clientX
                var y = event.clientY
                // Get the current location
                this.contextMenuData.axios = {
                    x, y
                }
            },
            showMenu1(sss) {

            },
            savedata() {
                alert(1)
            },
            newdata() {

            },
            change(editor, getHints, options){
                // console.log(getHints)
                // this.$refs.myCm.codemirror.showHint();
                // editor.showHint(options);
            },
            completeAfter(cm, pred) {
                var cur = cm.getCursor();
                if (!pred || pred()) setTimeout(function() {
                    if (!cm.state.completionActive)
                        cm.showHint({
                            completeSingle: false
                        });
                }, 100);
                return codemirror.Pass;
            }
        }
    }
</script>