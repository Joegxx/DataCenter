const columns=[
    {
        title: '编号',
        key: 'id',
        editable: false,
        searchable: true,
        ellipsis: true,
        width: 80,
    },
    {
        title: '实例名称',
        key: 'name',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    {
        title: 'IP地址',
        key: 'host',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    {
        title: '端口号',
        key: 'port',
        editable: true,
        ellipsis: true,
    },
    {
        title: '用户名',
        key: 'username',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    // {
    //     title: '密码',
    //     key: 'password',
    //     editable: true,
    //     ellipsis: true,
    // },
    {
        title: '数据库类型',
        key: 'dbType',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    {
        title: '创建时间',
        key: 'createdTime',
        editable: false,
        ellipsis: true,
    },
    {
        title: '更新时间',
        key: 'updatedTime',
        editable: false,
        ellipsis: true,
    },
    {
        title: '额外url',
        key: 'extraUrl',
        editable: true,
        ellipsis: true,
    },
    {
        title: '操作',
        key: 'handle',
        options: ['delete'],
        width: 80,
    }
];
export default columns;