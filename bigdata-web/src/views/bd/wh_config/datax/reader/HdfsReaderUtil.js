class HdfsReaderUtil {

}

const long = ['TINYINT', 'SMALLINT', 'INT', 'BIGINT', 'LONG'];
const double = ['FLOAT', 'DOUBLE'];
const string = ['STRING', 'CHAR', 'VARCHAR', 'STRUCT', 'MAP', 'ARRAY', 'UNION', 'BINARY'];
const date = ['DATE', 'TIMESTAMP'];

HdfsReaderUtil.getDataXCloType = function (type) {
     type = type.toUpperCase();
    if (long.indexOf(type) !==-1) {
        return "long"
    }
    if (double.indexOf(type) !==-1 ) {
        return "double"
    }
    if (string.indexOf(type) !==-1) {
        return "string"
    }
    if (date.indexOf(type) !==-1) {
        return "date"
    }
    return type;
};

export default HdfsReaderUtil;