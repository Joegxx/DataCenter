import CbrAjax from '@cbr/util/CbrAjax'
import Axios from "axios";
import Cookies from 'js-cookie';
class PointUtil {
}

PointUtil.getMarketPoints = async function (city) {
    //query string
    let url = 'http://api.map.baidu.com/place/v2/search?query=%E4%BA%8C%E6%89%8B%E8%BD%A6%E6%B1%BD%E8%BD%A6%E5%B8%82%E5%9C%BA&tag=%E6%B1%BD%E8%BD%A6&region=%E5%8D%97%E4%BA%AC&output=json&ak=NQcsKsOwcXq360BjKdNmy1Gtj5ilQygB';
    let res = await Axios.get(url);
    console.log(res.data.data);
    return res;
};


PointUtil.getPoints = async function (city,dates,) {
    let startTime = dates[0].Format("yyyy-MM-dd HH:mm:ss");
    let endTime = dates[1].Format("yyyy-MM-dd HH:mm:ss");
    let simulatorId = Cookies.get("SIMULATOR_ID");
    let params = {
        sql: 'SELECT userName,DATE_FORMAT(createTime,\'%Y-%m-%d %H:%i:%s\') createTime,coordinate from realreport.t_channel_records_trajectory ' +
        'WHERE createTime>#{params.startTime} and  createTime<#{params.endTime}' +
        'and channelCityName = #{params.city} order by createTime',
        params: {city: city,endTime:endTime,startTime:startTime},
    };
    if (simulatorId) params["simulatorId"]=simulatorId;
    let res = await CbrAjax.post("/data/level", params);
    let data = res.data.data;
    console.log(data);
    let points = {};
    for (let item of data) {

        if (!points[item.userName]) {
            points[item.userName]= []
        }
        let parse = JSON.parse(item.coordinate);
        let p = {name: item.userName,lng: parse[0], lat: parse[1],time:item.createTime};
        points[item.userName].push(p);

    }
    console.log(points);
    return points
};
export default PointUtil