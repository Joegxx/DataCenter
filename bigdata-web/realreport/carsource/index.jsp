<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://dragon.net/jstl/util" prefix="u"%>
<%@ taglib uri="http://dragon.net/jstl/sys" prefix="sys"%>
<%@ taglib uri="http://dragon.net/jstl/views" prefix="v"%>
<%@ taglib uri="http://dragon.net/jstl/model" prefix="model"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>车源报表</title>
    <%@ include file="/webmodules/console/css.jsp" %>
    <%@ include file="/webmodules/console/js.jsp" %>


    <%
        String path = request.getContextPath();
        String basePath = request.getScheme() + "://"
                + request.getServerName() + ":" + request.getServerPort()
                + path + "/";
    %>

    <script type="text/javascript">

        var basePath = '<%=basePath%>';
        document.domain = "mychebao.com";


        $(function () {

            $.ajax({
                type: "POST",
                url: basePath + "carsource/loadCity.do",
                dataType: "json",
                success: function (data) {
                    $('#region').combobox({
                        data: data,
                        multiple:true,
                        groupField:'largeAreaName',
                        groupFormatter: function(group){
                            return '<span style="color:red">' + group + '</span>';
                        }
                    });
                }
            });
            $('#starttime').datebox('setValue', getCurentDateStr())
            $('#endtime').datebox('setValue', getCurentDateStr())

            $("#datag").treegrid({
                idField: 'id',
                treeField: 'item',
                fit: true,
                border: false,
                striped: true,
                animate: true,
                nowrap: true,
                loadMsg: '大侠莫慌，正在玩命加载中。。。',
                columns: [
                    [
                        {
                            title: '项目',
                            field: 'item',
                            width: 180,
                            rowspan: 2,
                            halign: 'center',
                            formatter: function (value, row, index) {
                                var size = 18 - (row.level * 2);
                                return "<font style='font-size: " + size + "px;'>" + value + "</font>";
                            }
                        },
                        {
                            title: '主业务指标',
                            colspan: 8
                        },
                        {
                            title: '本异地指标',
                            colspan: 6
                        }
                    ], [
                        {
                            title: '有效信息量',
                            field: 'vaildCount',
                            width: 70,
                            align: 'center'
                        },
                        {
                            title: '平台竞拍量',
                            width: 70,
                            align: 'center',
                            field: 'auctionCount'
                        },
                        {
                            title: '数据上拍率',
                            width: 70,
                            align: 'center',
                            field: 'dataAuctionRate',
                            formatter: function (value, row, index) {
                                if(row.vaildCount == 0){
                                    return 0
                                }
                                var result = row.auctionCount / row.vaildCount * 100;
                                return result.toFixed(2) + "%";
                            }
                        },
                        {
                            title: '提车完成量',
                            width: 70,
                            align: 'center',
                            field: 'carFinishCount'
                        },
                        {
                            title: '竞拍成交率',
                            width: 70,
                            align: 'center',
                            field: 'auctionSuccRate',
                            formatter: function (value, row, index) {
                                if(row.auctionCount == 0){
                                    return 0
                                }
                                var result = row.carFinishCount / row.auctionCount * 100;
                                return result.toFixed(2) + "%";
                            }
                        },
                        {
                            title: '交易额',
                            width: 70,
                            align: 'center',
                            field: 'transactionVolume',
                        },
                        {
                            title: '平均交易额',
                            width: 70,
                            align: 'center',
                            field: 'avgTransactionVolume',
                            formatter: function (value, row, index) {
                                if(row.carFinishCount == 0){
                                    return 0
                                }
                                var result = row.transactionVolume / row.carFinishCount;
                                return result.toFixed(2)
                            }
                        },
                        {
                            title: '交易服务收入',
                            width: 80,
                            align: 'center',
                            field: 'transactionCharge'
                        },
                        {
                            title: '本地交易额',
                            width: 70,
                            align: 'center',
                            hidden: true,
                            field: 'localTransactionVolume'
                        },
                        {
                            title: '本地交易服务收入',
                            width: 70,
                            align: 'center',
                            hidden: true,
                            field: 'localTransactionCharge'
                        },
                        {
                            title: '本地提车量',
                            width: 70,
                            align: 'center',
                            field: 'localCarCount'
                        },
                        {
                            title: '本地平均交易额',
                            width: 90,
                            align: 'center',
                            field: 'localAvgtransactionVolume',
                            formatter: function (value, row, index) {
                                if(row.localCarCount == 0){
                                    return 0
                                }
                                var result = row.localTransactionVolume / row.localCarCount;
                                return result.toFixed(2)
                            }
                        },
                        {
                            title: '本地平均交易收入',
                            width: 100,
                            align: 'center',
                            field: 'localAvgTransactionCharge',
                            formatter: function (value, row, index) {
                                if(row.localCarCount == 0){
                                    return 0
                                }
                                var result = row.localTransactionCharge / row.localCarCount;
                                return result.toFixed(2)
                            }
                        },
                        {
                            title: '异地交易额',
                            width: 70,
                            align: 'center',
                            hidden: true,
                            field: 'remoteTransactionVolume'
                        },
                        {
                            title: '异地交易服务收入',
                            width: 70,
                            align: 'center',
                            hidden: true,
                            field: 'remoteTransactionCharge'
                        },
                        {
                            title: '异地提车量',
                            width: 70,
                            align: 'center',
                            field: 'remoteCarCount'
                        },
                        {
                            title: '异地平均交易额',
                            width: 90,
                            align: 'center',
                            field: 'remoteAvgtransactionVolume',
                            formatter: function (value, row, index) {
                                if(row.remoteCarCount == 0){
                                    return 0
                                }
                                var result = row.remoteTransactionVolume / row.remoteCarCount;
                                return result.toFixed(2)
                            }
                        },
                        {
                            title: '异地平均交易收入',
                            width: 100,
                            align: 'center',
                            field: 'remoteAvgTransactionCharge',
                            formatter: function (value, row, index) {
                                if(row.remoteCarCount == 0){
                                    return 0
                                }
                                var result = row.remoteTransactionCharge / row.remoteCarCount;
                                return result.toFixed(2)
                            }

                        }
                    ]
                ]
            });
        });

        /**
         * 刷新列表
         */
        function reflash() {
            var starttime = $('#starttime').datebox('getValue');
            var endtime = $('#endtime').datebox('getValue');
            if(!endtime){
                top.showMsg("温馨提示", "请选择结束时间", true, "warning");
                return;
            }

            if(starttime && starttime > endtime){
                top.showMsg("温馨提示", "结束时间不能早于开始时间", true, "warning");
                return;
            }

            if($('#endtime').datebox('getValue'))
            $("#datag").treegrid("loadData", []);
            $("#datag").datagrid("loading");
            $.ajax({
                type: "POST",
                url: basePath + "carsource/loadData.do",
                traditional:true,
                data: {
                    starttime: $('#starttime').datebox('getValue'),
                    endtime: $('#endtime').datebox('getValue'),
                    region:  $('#region').combobox('getValues')
                },
                dataType: "json",
                success: function (data) {
                    // 规避easyUI连续加载后loadData失败问题;
                    try {
                        if(!data[0].vaildCount){
                            top.showMsg("温馨提示", "数据未同步,查询不到数据", true, "warning");
                            $("#datag").datagrid("loaded");
                            return;
                        }
                        $("#datag").treegrid("loadData", data);
                        $("#datag").datagrid("loaded");
                    } catch (e) {
                        // 重新加载本页面;
                        console.log("error message : %o", e);
                        //location.reload();
                    }
                }
            });
        }

        function defaultClear(id) {
            $('#' + id).combobox('clear');
        }

        function getCurentDateStr()
        {
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            return year + '-' + ('00' + month).substr(month.length) + '-' + ('00' + day).substr(day.length);
        }


    </script>
    <style type="text/css">
        body {
            padding: 0 0 0 20px
        }

        .bd {
            width: 100%;
            height: calc(100% - 90px);
        }

        .title {
            height: 50px;
        }

    </style>

</head>
<body>
<div style="height:30px;border-bottom: 1px solid #CCCCCC;padding: 5px;">
    时间:
    <input type="text" id="starttime" style="width: 146px;" class="easyui-datebox" value=""/>
    -
    <input type="text" id="endtime" style="width: 146px;" class="easyui-datebox" value=""/>
    地区:
    <input type="text" id="region" style="width: 200px;" class="easyui-combobox region"/>
    <span class="icon-remove" style="cursor:pointer; display: inline-block;width: 16px;height: 16px;line-height: 16px;font-size: 1px;" onclick="defaultClear('region');">&nbsp;</span>
    <a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-reload'" style="width:80px" onclick="reflash()">请刷新</a>
</div>
<div class="bd">
    <table id="datag"></table>
</div>
</body>
</html>