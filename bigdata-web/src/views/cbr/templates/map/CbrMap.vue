<template>
    <div id="mapContainer" :style="'width:'+width+';height:'+height"></div>
    <!--<div id="mapContainer" class="map"></div>-->
</template>
<script>
    import {MP} from './bmap'
    import 'echarts/extension/bmap/bmap'
    export default {
        props:{
          option:{
              type:Object,
              default(){
                  return {

                  }
              }
          } ,
            width:{
              type:String,
              default(){
                  return '100%'
              }
          } ,
            height:{
              type:String,
              default(){
                  return '400px'
              }
          } ,
        },
        data(){
            return{
                myChart:{}
            }
        },
        methods:{
            drawChart(){
                MP('ZUONbpqGBsYGXNIYHicvbAbM').then(BMAP=>{
                    this.myChart.setOption(this.option);
                })
            }
        },
        watch:{
          'option'(){
              this.drawChart()
          }
        },
        mounted(){
            this.myChart = this.$echarts.init(document.getElementById('mapContainer'));
            this.drawChart()
        }
    }
</script>
<style>
    .map {
        width: 100%;
        height: 400px;
    }
</style>