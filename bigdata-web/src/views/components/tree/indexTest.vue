<template>
    <tree-table :columns="columns" @expandData="expandData" :tree-structure="false" v-model="subData"></tree-table>
</template>
<script>
    import TreeTable from './CBRTreeTable'

    export default {
        data() {
            return {
                columns: [
                    {
                        title: '项目',
                        key: 'menuName'
                    },
                    {
                        title: '类型',
                        key: 'menuType'
                    },
                    {
                        title: '路径',
                        key: 'request'
                    },
                    {
                        title: '权限',
                        key: 'permission'
                    },
                    {
                        title: '销量',
                        key: 'remark'
                    }
                ],
                menuData: [
                    {
                        menuName: 'ee', menuType: 'ww', request: 'rr', permission: 'tt', remark: 'pp', children: []
                    },
                    {menuName: 'ee', menuType: 'ww', request: 'rr', permission: 'tt', remark: 'pp'},
                    {menuName: 'ee', menuType: 'ww', request: 'rr', permission: 'tt', remark: 'pp'},
                    {menuName: 'ee', menuType: 'ww', request: 'rr', permission: 'tt', remark: 'pp'},
                ],
                subData: [
                    {
                        menuName: 'ee', menuType: 'ww', request: 'rr', permission: 'tt', remark: 'pp', _expanded: false,
                        _level: 0,
                        _show: true,
                        children: []
                    },
                    {
                        menuName: 'ee',
                        menuType: 'www',
                        request: 'rr',
                        permission: 'tt',
                        remark: 'pp',
                        _expanded: false,
                        _level: 0,
                        _show: true,
                        children: []
                    },
                    {
                        menuName: 'ee',
                        menuType: 'wwww',
                        request: 'rr',
                        permission: 'tt',
                        remark: 'pp',
                        _expanded: false,
                        _level: 0,
                        _show: true,
                        children: []
                    },
                ],
            }

        },
        methods: {
            expandData(data, scope) {
                let index = scope.$index;
                let row = scope.row;
                let level = row._level;
                console.log(data, index, level);
                if (data[index].children.length === 0) {
                    let temp= [];
                    this.menuData.forEach((item,index)=>{
                        temp[index]=this.copyObj(item)
                    });
                    temp.forEach(item => {
                        index++;
                        item._level = level + 1;
                        item._parent=row;
                        data.splice(index, 0, item);
                    });
                    row.children = this.menuData;
                }

            },
            copyObj(obj) {
                let res = {}
                for (var key in obj) {
                    res[key] = obj[key]
                }
                return res
            }
        },
        components: {TreeTable}

    }
</script>
