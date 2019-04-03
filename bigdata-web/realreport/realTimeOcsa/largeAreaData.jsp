<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/taglib.jsp"%>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <base href="<%=basePath%>">
    <title>片区数据</title>
    <%@ include file="/webmodules/console/css.jsp"%>
    <%@ include file="/webmodules/console/js.jsp"%>
</head>

<body>
    <br>
    <b style="margin-left: 20px">片区数据</b>
    <span style="float:right; margin-right: 80px" >
        数据更新时间：<span id="updateTime"></span>
        <a href=" javascript:void(0)" onclick="refresh()">[刷新]</a>
    </span>
    <div style="margin:20px 0;"></div>
    <table id="report1" title="片区数据 - 1" class="easyui-treegrid" style="width:1250px;height:480px"
           data-options="
                url: 'realTimeOcsa/largeAreaDataT1.do',
                method: 'get',
                rownumbers: true,
                showFooter: true,
                idField: 'id',
                animate: 'true',
                treeField: 'region'
            ">
        <thead frozen="true">
            <tr>
                <th field="region" width="150"></th>
            </tr>
        </thead>
        <thead>
            <tr>
                <th field="suspending" width="100" align="right">今日待处理数据量</th>
                <th field="solved" width="100" align="right">今日已处理数据量</th>
                <th field="solvedPer" data-options="field:'progress',width:150,formatter:formatProgress">%数据处理完成率</th>
                <th field="newData" width="100" align="right">新数据总量</th>
                <th field="newDataAllot" width="100" align="right">新数据分配量</th>
                <th field="plantformAuction" width="100" align="right">平台竞拍量</th>
                <th field="serviceCharge" width="100" align="right">预约成交服务收入</th>

                <%--<th field="appointDetection" width="50" align="right">预约<br>检测量</th>
                <th field="appointDetectionPer" data-options="field:'progress',width:100,formatter:formatProgress">跟踪约检转化率</th>
                <th field="planDetection" width="60" align="right">计划检测<br>次数</th>
                <th field="detectionDone" width="60" align="right">检测完成<br>次数</th>
                <th field="detectionDonePer" data-options="field:'progress',width:100,formatter:formatProgress">%计划检测完成率</th>
                <th field="planToshop" width="70" align="right">计划到店<br>次数</th>
                <th field="arrival" width="70" align="right">客户到店<br>次数</th>
                <th field="arrivalPer" data-options="field:'progress',width:100,formatter:formatProgress">%到店转化率</th>
                <th field="transactionCount" width="70" align="right">预约<br>成交量</th>
                <th field="transactionCountPer" data-options="field:'progress',width:100,formatter:formatProgress">%预约成交率</th>--%>
            </tr>
        </thead>
    </table>

    <div style="margin:20px 0;"></div>
    <table id="report2" title="片区数据 - 2" class="easyui-treegrid" style="width:1250px;height:480px"
           data-options="
                url: 'realTimeOcsa/largeAreaDataT2.do',
                method: 'get',
                rownumbers: true,
                showFooter: true,
                fitColumns: true,
                idField: 'id',
                animate: 'true',
                treeField: 'region'
            ">
        <thead frozen="true">
        <tr>
            <th field="region" width="150"></th>
        </tr>
        </thead>
        <thead>
        <tr>
            <th field="appointDetection" width="70" align="right">预约检测量</th>
            <th field="appointDetectionPer" data-options="field:'progress',width:100,formatter:formatProgress">跟踪约检转化率</th>
            <th field="planDetection" width="90" align="right">计划检测次数</th>
            <th field="detectionDone" width="90" align="right">检测完成次数</th>
            <th field="detectionDonePer" data-options="field:'progress',width:100,formatter:formatProgress">%计划检测完成率</th>
            <th field="planToshop" width="90" align="right">计划到店次数</th>
            <th field="arrival" width="90" align="right">客户到店次数</th>
            <th field="arrivalPer" data-options="field:'progress',width:100,formatter:formatProgress">%到店转化率</th>
            <th field="transactionCount" width="70" align="right">预约成交量</th>
            <th field="transactionCountPer" data-options="field:'progress',width:100,formatter:formatProgress">%预约成交率</th>
        </tr>
        </thead>
    </table>
</body>



<script type="text/javascript">
    document.domain = "mychebao.com";

    <%-- 刷新页面 --%>
    function refresh() {
        location.reload();
    }

    function formatProgress(value){
        if (value){
            var s = '<div style="width:100%;border:1px solid #ccc">' +
                '<div style="width:' + value + '%;background:#5accc3;color:#ff0000">' + value + '%' + '</div></div>';
            return s;
        } else {
            return '';
        }
    }

    /* 合并所有 */
    function collapseAll(){
        $('#report1').treegrid('collapseAll');
        $('#report2').treegrid('collapseAll');
    }

    <%-- 页面初始化函数 --%>
    $(function () {
        $.post("realTimeOcsa/getLatestUpdateTime.do", null, function (data) {
//            alert(data.data);
            $("#updateTime").html(data.data);
        });
        collapseAll();
    });
</script>

</html>