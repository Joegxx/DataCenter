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
<title>参拍率</title>
<%@ include file="/webmodules/console/css.jsp"%>
<%@ include file="/webmodules/console/js.jsp"%>
<script type="text/javascript">
	document.domain = "mychebao.com";
	$(function(){
            $.ajax({
                url: "auction/sessions.do",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if (data.status === 200) {
                        let data1 = data.data;
                        console.log(data1);
                        var dataOpt = [];
                        dataOpt.push({ "text": '所有场次', "id": 'all','selected': 'true' });
                        for (let item of data1) {
                            console.log(item);
                            dataOpt.push({ "text": item, "id": item });
                        }
                        $("#session").combobox("loadData", dataOpt);
                    }
                }
            });
	    $('#carave').treegrid({
	        url:'auction/bidratio.do?session=all',
	    	idField:'id',
	        treeField:'cityName',
	        columns:[[
	            {title:'分公司',field:'cityName',	width:200},
	            {title:'维护商户数',field:'buyerNum',align:'center',	width:200},
	            {title:'出价商户数',field:'today_buyer',align:'center',	width:200,formatter: function(value,row,index){
					if (row.yesterday_buyer <row.today_buyer ){
						return '<font color=\'red\'>'+value+'</font>('+row.yesterday_buyer+')';
					} else {
						return '<font color=\'blue\'>'+value+'</font>('+row.yesterday_buyer+')';
					}
				}},
	            {title:'参拍率(%)',field:'today_ratio',align:'center',	width:200,formatter: function(value,row,index){
					if (row.yesterday_ratio <row.today_ratio ){
						return '<font color=\'red\'>'+value+'</font>('+row.yesterday_ratio+')';
					} else {
						return '<font color=\'blue\'>'+value+'</font>('+row.yesterday_ratio+')';
					}
				}}
	        ]]
	    });
	    $(".datagrid-toolbar").append($("#datagridsearch"));
	});
	function myReload(){
		var params = {slday: $('#slday').datetimebox('getValue'),
            session: $('#session').datetimebox('getValue'),
			auctionType:$('#auctionType').combobox('getValue')};
		$("#carave").treegrid('options').url = 'auction/bidratio.do';
		$("#carave").treegrid('options').queryParams = params;
		$('#carave').treegrid("reload");
	}
</script>
</head>
<body>
	<div id="datagridsearch" class="datagridsearch">
		<div style="height:30px;border-bottom: 1px solid #CCCCCC;padding: 5px;">
			<select class="easyui-combobox" name="session" id="session" style="width: 146px;"
					data-options="valueField:'id', textField:'text', panelHeight:'auto'">
			</select>
			<select class="easyui-combobox" name="auctionType"  id="auctionType" style="width: 146px;" data-options="editable:false">
				<option value="1" selected="selected">易拍</option>
				<option value="2">抢拍</option>
			</select>
			<input type="text" id="slday" style="width: 146px;" 	class="easyui-datetimebox" value=""  data-options="editable:false"/>
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-reload'" style="width:80px" onclick="myReload()">请刷新</a>
		</div>
		<div style="height:40px;line-height: 40px;font-size: 15px;font-weight: bold;">
			数据说明：括号内数据代表前一天当前时间的环比，<font color="red">红色</font>代表上升，<font
				color="blue">蓝色</font>代表下降。数据时间：实时
		</div>
	</div>
<div id="carave" ></div>
</body>
</html>