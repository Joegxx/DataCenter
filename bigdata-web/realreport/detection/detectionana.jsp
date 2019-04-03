<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/taglib.jsp"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://"
			+ request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<title>实时检测指标</title>
<%@ include file="/webmodules/console/css.jsp"%>
<%@ include file="/webmodules/console/js.jsp"%>
<script type="text/javascript">
	document.domain = "mychebao.com";
	var basePath = '<%=basePath%>';
	$(function() {
		$('#detectionana').treegrid({
			idField:'id',
	        treeField:'cityName',
			url : 'detection/detectionana.do',
			columns : [ [ {
				title : '分公司',
				field : 'cityName',
				align:'center',
				width:200
			}, {
				title : '到店检测次数',
				field : 'todayDtectionArr',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
					if (row.yesterdayDtectionArr < row.todayDtectionArr) {
						return '<font color=\'red\'>' + value + '</font>('+row.yesterdayDtectionArr+')';
					} else {
						return '<font color=\'blue\'>' + value + '</font>('+row.yesterdayDtectionArr+')';
					}
				}
			},{
				title : '已分配计划上门检测次数',
				field : 'todayDetectionOutPlan',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
					if (row.yesterdayDetectionOutPlan < row.todayDetectionOutPlan) {
						return '<font color=\'red\'>' + value + '</font>('+row.yesterdayDetectionOutPlan+')';
					} else {
						return '<font color=\'blue\'>' + value + '</font>('+row.yesterdayDetectionOutPlan+')';
					}
				}
			}, {
				title : '上门检测完成次数',
				field : 'todayDetectionOutFin',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
					if (row.yesterdayDetectionOutFin < row.todayDetectionOutFin) {
						return '<font color=\'red\'>' + value + '</font>('+row.yesterdayDetectionOutFin+')';
					} else {
						return '<font color=\'blue\'>' + value + '</font>('+row.yesterdayDetectionOutFin+')';
					}
				}
			}, {
				title : '已分配加单计划次数',
				field : 'todayDetectionAdd',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
					if (row.yesterdayDetectionAdd < row.todayDetectionAdd) {
						return '<font color=\'red\'>' + value + '</font>('+row.yesterdayDetectionAdd+')';
					} else {
						return '<font color=\'blue\'>' + value + '</font>('+row.yesterdayDetectionAdd+')';
					}
				}
			} , {
				title : '加单完成次数',
				field : 'todayDetectionAddFin',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
					if (row.yesterdayDetectionAddFin < row.todayDetectionAddFin) {
						return '<font color=\'red\'>' + value + '</font>('+row.yesterdayDetectionAddFin+')';
					} else {
						return '<font color=\'blue\'>' + value + '</font>('+row.yesterdayDetectionAddFin+')';
					}
				}
			} , {
				title : '计检完成率',
				field : 'todayFinishRate',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
					if (row.yesterdayFinishRate < row.todayFinishRate) {
						return '<font color=\'red\'>' + value + '%</font>('+row.yesterdayFinishRate+'%)';
					} else {
						return '<font color=\'blue\'>' + value + '%</font>('+row.yesterdayFinishRate+'%)';
					}
				}
			}  
			
			] ],onBeforeExpand :function(row,param){
				var slday = $('#slday').datetimebox('getValue');
    	    	// 展开数据操作
    	    	$(this).treegrid('options').url = basePath + 'detection/loadDetectioner.do?id=' + row.id + "&type=" + row.type +"&slday="+ slday;
    	    	
    	    }
		});
		$(".datagrid-toolbar").append($("#datagridsearch"));
	});
	function myReload(){
		var params = {slday: $('#slday').datetimebox('getValue')};
		$("#detectionana").treegrid('options').url = 'detection/detectionana.do';
		$("#detectionana").treegrid('options').queryParams = params;
		$('#detectionana').treegrid("reload");
	}
	
</script>
</head>
<body>
	<div id="datagridsearch" class="datagridsearch">
		<div style="height:30px;border-bottom: 1px solid #CCCCCC;padding: 5px;">
			<input type="text" id="slday" style="width: 146px;" 	class="easyui-datetimebox" value="" />
			<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-reload'" style="width:80px" onclick="myReload()">请刷新</a>
		</div>
		<div style="height:40px;line-height: 40px;font-size: 15px;font-weight: bold;">
			数据说明：括号内数据代表前一天当前时间的环比，<font color="red">红色</font>代表上升，<font
				color="blue">蓝色</font>代表下降。数据时间：实时
		</div>
	</div>
	<div id="detectionana" ></div>
</body>
</html>