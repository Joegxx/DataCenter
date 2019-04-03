##### 商户出价报表所需的后台API接口
#### 一、根据商户查询出商户的组织结构
##### 查询URL：/cbr/org/schema/:userId
##### 请求方式：GET
##### 请求参数：
```
userId    //用户Id
```
##### 返回结果：
```json
{
  "status": 200,  //返回状态码，200表示成功 其他失败
  "msg": "success",  //返回的信息 成功success 失败：失败的信息
  "data":  //成功返回的数据
  { 
    "12345": { //大区的regionId
      "value": "12345",//大区的regionId
      "label": "华中区",//大区的名称
      "children": [  //城市的子节点
        {
          "value": "025", //城市的cityId
          "label": "南京市" //城市的名称
        },
        {
          "value": "0515",
          "label": "合肥市"
        }
      ]
    },
    "45678": {
      "value": "45678",
      "label": "鲁西区",
      "children": [
        {
          "value": "569",
          "label": "济南市"
        },
        {
          "value": "986",
          "label": "泰安市"
        }
      ]
    }
  }
}
```


#### 二、加载报表信息
##### 查询URL：/cbr/load/bidave
##### 请求方式：POST
##### 请求参数：
```
userId: "123",   //用户ID
region: [123,234], //大区
city: [234,434], //维护城市
dimension: ""//维度 目前三个 1（大区维度），2（城市维度），3（客服维度）
```
##### 返回结果：
```json
{
  "status": 200,  //返回状态码，200表示成功 其他失败
  "msg": "success",  //返回的信息 成功success 失败：失败的信息
  "data":   //成功返回的数据
      [
        {
          "region": "西北区",//大区名称
          "regionId": 12365,//大区ID
          "cityId": 102,//城市ID  在大区维度返回为空
          "city": "烟台市",//城市名称 在大区维度返回为空
          "customerService": "张三",//客服名称  在城市维度返回为空
          "bids": 4627, //今日出价数
          "bidMerchant": 1563, //今日出价商户
          "householdAverage": 4254, //今日户均
          "_bids": 5627, //昨日出价数
          "_bidMerchant": 2563,//昨日出价商户
          "_householdAverage": 4254, //昨日户均
          "bidsGR": 4627, //出价数增长率（精确到小数点后两位）
          "bidMerchantGR": 4627, //出价商户增长率（精确到小数点后两位）
          "householdAverageGR": 4627 //户均增长率（精确到小数点后两位）
        },
        {
          "region": "西北区",
          "city": "烟台市",
          "regionId": 12365,
          "cityId": 102,
          "customerService": "张三",
          "bids": 5327,
          "bidMerchant": 1563,
          "householdAverage": 4254,
          "_bids": 5627,
          "_bidMerchant": 1463,
          "_householdAverage": 4267,
          "bidsGR": 4627, //出价数增长率（精确到小数点后两位）
          "bidMerchantGR": 4627, //出价商户增长率（精确到小数点后两位）
          "householdAverageGR": 4627 //户均增长率（精确到小数点后两位）
        },
        {
          "region": "苏中区",
          "city": "南京市",
          "regionId": 23654,
          "cityId": 105,
          "customerService": "李四",
          "bids": 5687,
          "bidMerchant": 1568,
          "householdAverage": 4254,
          "_bids": 5627,
          "_bidMerchant": 1563,
          "_householdAverage": 4234,
          "bidsGR": 4627, //出价数增长率（精确到小数点后两位）
          "bidMerchantGR": 4627, //出价商户增长率（精确到小数点后两位）
          "householdAverageGR": 4627 //户均增长率（精确到小数点后两位）
        }
      ]
 } 
```
