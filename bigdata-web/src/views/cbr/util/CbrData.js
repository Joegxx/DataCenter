class CbrData {
    constructor() {
        this.realreportId = '';
        this.realreportName = '';
        this.desc = '';
        this.columns = [
            {
                title: '项目',
                key: 'item',
                width: '100',
                func: '',
                text: '',
                style: '',
            }
        ];
        this.querySql = [
            {datasource: "", sql: "", name: '0'},
            {datasource: "", sql: "", name: '_0'},
        ];
        this.cbrParams = [];
        this.download = {
            sqls: [
                {datasource: "", sql: "", name: '999'},
                {datasource: "", sql: "", name: '_999'},
            ],
            columns: [
            ]
        }
    }

    get getDownload() {
        return this.download;
    }

    set setDownload(value) {
        this.download = value;
    }

    get getRealreportId() {
        return this.realreportId;
    }

    set setRealreportId(value) {
        this.realreportId = value;
    }

    get getRealreportName() {
        return this.realreportName;
    }

    set setRealreportName(value) {
        this.realreportName = value;
    }

    get getDesc() {
        return this.desc;
    }

    set setDesc(value) {
        this.desc = value;
    }

    get getColumns() {
        return this.columns;
    }

    set setColumns(value) {
        this.columns = value;
    }

    get getQuerySql() {
        return this.querySql;
    }

    set setQuerySql(value) {
        this.querySql = value;
    }

    get getCbrParams() {
        return this.cbrParams;
    }

    set setCbrParams(value) {
        this.cbrParams = value;
    }
}

export default CbrData;