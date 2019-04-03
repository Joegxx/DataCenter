<template>
    <div>
        <h1 style="color: red">【datax配置功】能迁至 <a href="http://rr.mychebao.com/web/cbr">http://rr.mychebao.com/web/cbr</a>中</h1>
        <h2>这个是主页面</h2>
        <div id="app" @contextmenu="showMenu" style="width: 100px;height: 100px;background: red;">
            <vue-context-menu :contextMenuData="contextMenuData"
                              @savedata="savedata"
                              @newdata="newdata">
            </vue-context-menu>
        </div>
        <button type="button" @contextmenu.prevent="showMenu1" value="======">按钮</button>
    </div>
</template>
<style></style>
<script>
    export default {
        name: 'app',
        data() {
            return {
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

            }
        }
    }
</script>