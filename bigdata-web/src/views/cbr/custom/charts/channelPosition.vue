<template>
    <div>
        <Row>
            <Col :lg="{span:5}" :xs="{span:8}">
                <v-distpicker hide-area :province="province" :city="city" @province="p=>this.province=p.value"
                              @city="c=>this.city=c.value"></v-distpicker>
            </Col>
            <Col :lg="{span:8}" :xs="{span:10}">
                <DatePicker v-model="date" type="datetimerange" confirm placement="bottom-end" placeholder="选择开始结束时间"
                            style="width: 400px"></DatePicker>
                <Button type="primary" @click="shiftCity">提交</Button>
            </Col>



            <Col :lg="{span:5}" :xs="{span:8}" style="float: right">
                人员筛选:
                <Select v-model="choiceUser" style="width:200px" @on-change="changeChannelUser">
                    <Option value="all" selected>所有</Option>
                    <Option v-for="item,index in points" :value="index" :key="index">{{ index }}</Option>
                </Select>
            </Col>
        </Row>

        <baidu-map @ready="bMapReady" ref="map" :scroll-wheel-zoom="true" class="map" :center="centerCity" :zoom="10">
            <!--<bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT" @changeBefore="changeBefore" @changeAfter="changeAfter"></bm-city-list>-->
            <!--<bm-control :offset="{width: '10px', height: '10px'}">-->
            <!--<bm-auto-complete v-model="keyword" :sugStyle="{zIndex: 999999}">-->
            <!--<input type="text" placeholder="请输入搜索关键字" class="serachinput">-->
            <!--</bm-auto-complete>-->
            <!--</bm-control>-->

            <bm-local-search :keyword="keyword" :auto-viewport="true" :location="centerCity"></bm-local-search>
            <div v-for="channelPoints,index in middleUserInfo" :key="index">
                <!--<bm-polyline :path="channelPoints" stroke-color="blue" :stroke-opacity="0.5" :stroke-weight="2" :editing="false"></bm-polyline>-->
                <bm-marker :icon="{url:'/static/star.png',size: {width: 32, height: 32}}"
                           v-for=" item,index in channelPoints " :title="item.name +'-'+ item.time" :position="item"
                           :dragging="false" :key="index">
                    <bm-label :content="item.name +'<br>'+ item.time" :labelStyle="{color: 'red', fontSize : '10px'}"
                              :offset="{width: -35, height: -35}"/>
                </bm-marker>
            </div>
            <!--<bm-point-collection id="112233" size="BMAP_POINT_SIZE_BIG" :points="points" shape="BMAP_POINT_SHAPE_CIRCLE" color="red"  @click="clickHandler"></bm-point-collection>-->
        </baidu-map>
    </div>


</template>

<script>
    import PointUtil from './PointUtil'

    export default {
        data() {
            return {
                points: {},
                date: [new Date(new Date(new Date().toLocaleDateString()).getTime()), new Date()],
                centerCity: "南京",
                city: "南京市",
                province: "江苏省",
                keyword: [],
                //实际展示的渠道用户信息
                middleUserInfo: {},
                choiceUser: "all",
            }
        },
        methods: {
            bMapReady(bm) {

            },
            async shiftCity() {
                // console.log(typeof this.date,this.date)
                this.centerCity = this.province.endsWith("市") ? this.province.replace('市', '') : this.city.replace('市', '');
                if (!this.centerCity || this.centerCity === '') {
                    this.$Message.error("城市不能为空！！");
                    return
                }
                this.points = await PointUtil.getPoints(this.centerCity, this.date);
            },
            changeChannelUser(value){
                if(value === "all"){
                    this.middleUserInfo = this.points;
                }else{
                    this.middleUserInfo={};
                    this.middleUserInfo[value] = this.points[value];
                }
            }
        },
        watch: {
            points() {
                this.middleUserInfo = this.points;
                console.log("this.middleUserInfo", this.middleUserInfo)
            }
        },
        async created() {
            this.points = await PointUtil.getPoints(this.centerCity, this.date);
            this.middleUserInfo = this.points;
            this.keyword = ["二手车", "汽车销售", "4s店", "汽车", "东方二手车交易市场"]

        }

    }
</script>
<style>
    .map {
        width: 100%;
        height: 900px;
    }
</style>