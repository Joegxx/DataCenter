const columns=[

    {
        title: '原始地址',
        key: 'location',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    {
        title: '代理地址',
        key: 'proxyPass',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    {
        title: '目标URL',
        key: 'targetUrl',
        editable: true,
        ellipsis: true,
    },
    {
        title: '是否权鉴',
        key: 'isNeedAuth',
        editable: true,
        searchable: true,
        ellipsis: true,
    },
    {
        title: '是否正则',
        key: 'isReg',
        editable: true,
        searchable: true,
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