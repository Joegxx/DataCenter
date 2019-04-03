class WebTable {

    constructor(config) {
        this.errorCallback="error"
        if(!config.version){
            config.version='1.0'
        }
        if(!config.desc){
            config.desc=''
        }
        this.name=config.name;
        this.db = window.openDatabase(config.name, config.version, config.desc, config.size);
    }

    crateTable(name,columns) {

        let sql = 'create table if not exists '+name+'('+columns.join()+')';
        this.db.transaction(function(tx) {
            tx.executeSql(sql, null, function(tx, rs) {
                console.log('执行sql成功');
            },function errorCallback() {
                console.error('error:');
            });
        });
    }
    insert(name,data) {
        let columns = Object.keys(data);
        let values = Object.values(data);
        let sql = 'INSERT INTO '+name+' ('+columns.join()+') VALUES ('+columns.map(x=>'?').join()+')';
        this.execute(sql,values)
    }
    drop(name) {
        let sql = 'drop table '+name;
        this.db.transaction(function(tx) {
            tx.executeSql(sql, null, function(tx, rs) {
                console.log('执行sql成功');
            },function errorCallback() {
                console.error('error:');
            });
        });
    }
    execute(sql, v){
        let values = v || null;
        this.db.transaction(function(tx) {
            tx.executeSql(sql, values, function(tx, rs) {
                // let effectRow = rs.rowsAffected;
                // console.log('影响记录条数:' + effectRow);
                // effectRow && console.log('执行sql成功');
            },function errorCallback() {
                console.error('error:');
            });
        });
    }
     errorCallback(error) {
        console.error('error:' + error.message);
    }

}

const dbms = new WebTable({
    name: 'dbms',
    size:20*1024*1024
});

//example:
//dbms.drop('temp');
//that.webTable= dbms.crateTable("temp",that.columns.map(x=>x.key))
//
//for(let o of response.data){
//    dbms.insert("temp",o)
//}

export {dbms,WebTable};