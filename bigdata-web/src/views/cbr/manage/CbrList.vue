<template>
    <div>
        <el-table
                :data="tableData"
                border
                size="mini"
                style="width: 100%">
            <el-table-column
                    prop="id"
                    label="ID"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="realreportId"
                    label="报表ID"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="realreportName"
                    label="报表名称"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="层级"
                    width="50">
            </el-table-column>
            <el-table-column
                    prop="desc"
                    label="报表描述">
            </el-table-column>
            <el-table-column
                    prop="createdTime"
                    label="创建时间"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="updatedTime"
                    label="更新时间"
                    width="150">
            </el-table-column>
            <el-table-column label="操作" width="220">
                <template slot-scope="scope">
                    <!--<a target="_blank" :href='"/bigdata/cbr/boss/"+scope.row.realreportId'>查看</a>-->
                    <Button type="info" size="small" @click="show(scope.row.realreportId)">查看</Button>
                    <Button type="warning" size="small" @click="edit(scope.row.realreportId)">编辑</Button>
                    <Button type="success" class="tag-read" size="small" @click="copyBossUrl(scope.row.realreportId)">复制URL</Button>
                    <Poptip
                            confirm
                            title="确定删除这张报表吗？"
                            @on-ok="deleteCbr(scope.row.realreportId)"
                            @on-cancel="()=>{}">
                        <Button type="error"  size="small">删除</Button>
                    </Poptip>

                </template>
            </el-table-column>
        </el-table>
        <Modal
                width="100%"
                v-model="modalEdit"
                :styles="{top: '20px'}"
                :mask-closable="false"
                :title="'编辑报表：'+cbr.realreportName">
            <create v-if="editCbr" :edit-mode="editCbr" :cbr="cbr"></create>
            <div slot="footer">
            </div>
        </Modal>
    </div>
</template>
<script>
    import CbrAjax from '@cbr/util/CbrAjax'
    import create from '@cbr/create/index'
    import Clipboard from 'clipboard';
    import CbrData from '@cbr/util/CbrData'

    export default {
        components: {create},
        data() {
            return {
                cbr: {},
                modalEdit: false,
                editCbr: false,
                tableData: [],
                height:window.screen.height * 0.7
            }
        },
        created() {
            this.init();
        },
        methods: {
            async deleteCbr(realreportId) {
                let res = await CbrAjax.get(realreportId+"/status");
                if(res.data.status === 200){
                    this.$Message.success("删除成功");
                }else{
                    this.$Message.error("删除失败");
                }
            },
            async edit(realreportId) {
                this.editCbr = false;
                this.cbr = new CbrData();
                let assembler = await CbrAjax.get("assembler?realreportId=" + realreportId);
                let downloadResp = await CbrAjax.get("/download/" + realreportId);
                let downloadData = downloadResp.data.data;
                let data = assembler.data.data;
                data["download"] = downloadData;
                for (let key in data) {
                    this.cbr[key] = data[key]
                }
                this.editCbr = true;
                this.modalEdit = true;
            },
            copyBossUrl(realreportId) {
                let bossUrl = 'http://rr.mychebao.com/bigdata/cbr/boss/' + realreportId;
                // 操作：复制报表Boss链接
                let clipboard = new Clipboard('.tag-read', {
                    text: function () {
                        return bossUrl;
                    }
                });
                clipboard.on('success', e => {
                    this.$Notice.success({
                        title: '复制成功!',
                        desc: bossUrl
                    });
                    // 释放内存
                    clipboard.destroy()
                });
                clipboard.on('error', e => {
                    // 不支持复制
                    this.$Notice.warning({
                        title: '该浏览器不支持自动复制URL!',
                        desc: bossUrl
                    });
                    // 释放内存
                    clipboard.destroy()
                })
            },

            show(realreportId) {
                const {href} = this.$router.resolve({
                    path: "/bigdata/cbr/boss/" + realreportId
                });
                window.open(href, '_blank');
            },
            async init() {
                let all = await CbrAjax.post('all');
                console.log(all);
                this.tableData = all.data.data;
            }
        }
    }
</script>