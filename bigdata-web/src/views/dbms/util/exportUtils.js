import json2csv from 'json2csv';

class exportUtils{}

exportUtils.exportCsv=function(params){
    try {
        const fields = params.columns.map(t => t.key);
        const fieldNames = params.columns.map(t => t.title);

        let link = document.createElement("a");
        let parser = new json2csv.Parser({fields: fields, fieldNames: fieldNames});
        let result = parser.parse(params.data);
        let blob = new Blob(["\ufeff" + result], {type: 'text/csv'}); //解决大文件下载失败
        link.setAttribute("href", URL.createObjectURL(blob));
        link.setAttribute("download", params.fileName + "");
        document.body.appendChild(link); // Required for FF
        link.click(); // This will download the data file named "my_data.csv".
        document.body.removeChild(link); // Required for FF
    } catch (err) {
        // Errors are thrown for bad options, or if the data is empty and no fields are provided.
        // Be sure to provide fields if it is possible that your data array will be empty.
        console.error(err);
    }
};


export default exportUtils