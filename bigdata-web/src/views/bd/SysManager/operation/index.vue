<template>
    <div >
        <Layout>
            <Sider :style="{background: '#fff'}" breakpoint="md"  >
                <h2 style="width: 100%;text-align: center">系统名称</h2>
                <Menu active-name="1-2" width="auto" @on-select="selectSys" :active-name="sysName">
                    <MenuItem v-for="item,index in sysInfos"  :name="item.sysName" :key="index">
                        <Icon type="ios-navigate"></Icon>
                        <span>{{ item.sysName }}</span>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <system-info :sysName="sysName"></system-info>
            </Layout>
        </Layout>
    </div>
</template>


<script>
    import SystemInfo from './SystemInfo'
    import Data from './operation_data'
    export default {
        data () {
            return {
                sysName:"",
                sysInfos:[]
            };
        },
        components:{SystemInfo},
        methods:{
          selectSys(name){
              this.sysName=name
          }
        },
        async created(){
            this.sysInfos=await Data.getSysInfos();
            this.sysName=await  this.sysInfos[0].sysName
        },
        computed: {
        }
    }
</script>
<style scoped>

</style>