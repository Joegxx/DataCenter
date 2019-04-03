<%@ page language="java" pageEncoding="UTF-8" %>
<%@ taglib uri="http://dragon.net/jstl/util" prefix="u"%>
<%@ taglib uri="http://dragon.net/jstl/sys" prefix="sys"%>
<%@ taglib uri="http://dragon.net/jstl/views" prefix="v"%>
<%@ taglib uri="http://dragon.net/jstl/model" prefix="model"%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <title>商户报表</title>
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
                url: basePath + "buyer/loadCity.do",
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
            $('#starttime').datetimebox('setValue', getCurentDateStart());
            $('#endtime').datetimebox('setValue', getCurentDateStr());

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
                            title: '商户数量指标',
                            colspan: 5
                        },
                        {
                            title: '商户参拍指标',
                            colspan: 4
                        }
                    ], [
                        {
                            title: '开通商户数',
                            field: 'openBuyerCount',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '参拍商户数',
                            width: 80,
                            align: 'center',
                            field: 'auctionBuyerCount'
                        },
                        {
                            title: '提车商户数',
                            width: 80,
                            align: 'center',
                            field: 'carBuyerCount'
                        },
                        {
                            title: '流失商户数',
                            width: 80,
                            align: 'center',
                            field: 'lossBuyerCount'
                        },
                        {
                            title: '商户总数量',
                            width: 80,
                            align: 'center',
                            field: 'buyerCount'
                        },
                        {
                            title: '出价总次数',
                            width: 80,
                            align: 'center',
                            field: 'priceCount',
                        },
                        {
                            title: '户均出价次数',
                            width: 90,
                            align: 'center',
                            field: 'pricePerCount',
                            formatter: function (value, row, index) {
                                if(row.auctionBuyerCount == 0){
                                    return 0
                                }
                                var result = row.priceCount / row.auctionBuyerCount;
                                return result.toFixed(2)
                            }
                        },
                        {
                            title: '参拍商户占比',
                            width: 90,
                            align: 'center',
                            field: 'auctionBuyerRate',
                            formatter: function (value, row, index) {
                                if(row.buyerCount == 0){
                                    return 0
                                }
                                var result = row.auctionBuyerCount / row.buyerCount * 100;
                                return result.toFixed(2) + '%';
                            }
                        },
                        {
                            title: '参拍提车商户占比',
                            width: 110,
                            align: 'center',
                            hidden: true,
                            field: 'carBuyerRate',
                            formatter: function (value, row, index) {
                                if(row.auctionBuyerCount == 0){
                                    return 0
                                }
                                var result = row.carBuyerCount / row.auctionBuyerCount * 100;
                                return result.toFixed(2) + '%';
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
                url: basePath + "buyer/loadData.do",
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
                        if(data[0].level == 0){
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

        function getCurentDateStart()
        {
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            return year + '-' + leftPad(month) + '-' + leftPad(day) + " 00:00:00";
        }

        function getCurentDateStr()
        {
            var now = new Date();
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
            var hour = now.getHours();
            var minute = now.getMinutes();
            var second = now.getSeconds();
            return year + '-' + leftPad(month) + '-' + leftPad(day) + " " + leftPad(hour) + ':' + leftPad(minute) + ':' + leftPad(second);
        }
        
        function leftPad(value) {
            return ('00' + value).substr(value.length);
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
    <input type="text" id="starttime" style="width: 146px;" class="easyui-datetimebox" value=""/>
    -
    <input type="text" id="endtime" style="width: 146px;" class="easyui-datetimebox" value=""/>
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