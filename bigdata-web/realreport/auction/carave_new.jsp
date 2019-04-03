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
<title>车均</title>
<%@ include file="/webmodules/console/css.jsp"%>
<%@ include file="/webmodules/console/js.jsp"%>
<script type="text/javascript">
	document.domain = "mychebao.com";
	$(function() {
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
			idField:'id',
	        treeField:'cityName',
			url : 'auction/carave_new.do?session=all',
			columns : [ [ {
				title : '分公司',
				field : 'cityName',
				width : 200
			}, {
				title : '车辆数',
				field : 'today_car',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
				    /* 无数据的处理 */
				    if(row.yesterday_car==undefined){
                        row.yesterday_car = 0;
					}
					if(row.today_car==undefined){
                        row.today_car = 0;
					}
					/*列表样式*/
					if (row.yesterday_car < row.today_car) {
						return '<font color=\'red\'>' + row.today_car + '</font>('+row.yesterday_car+')';
					} else {
						return '<font color=\'blue\'>' + row.today_car + '</font>('+row.yesterday_car+')';
					}
				}
			},{
				title : '出价数',
				field : 'today_bid',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
                    /* 无数据的处理 */
                    if(row.yesterday_bid==undefined){
                        row.yesterday_bid = 0;
                    }
                    if(row.today_bid==undefined){
                        row.today_bid = 0;
                    }
					if (row.yesterday_bid < row.today_bid) {
						return '<font color=\'red\'>' + row.today_bid + '</font>('+row.yesterday_bid+')';
					} else {
						return '<font color=\'blue\'>' + row.today_bid + '</font>('+row.yesterday_bid+')';
					}
				}
			},{
                title : '本地维护商户出价数',
                field : 'today_curr_bid',
                align:'center',
                width:200,
                formatter : function(value, row, index) {
					/* 无数据的处理 */
                    if(row.yesterday_curr_bid==undefined){
                        row.yesterday_curr_bid = 0;
                    }
                    if(row.today_curr_bid==undefined){
                        row.today_curr_bid = 0;
                    }
                    if (row.yesterday_curr_bid < row.today_curr_bid) {
                        return '<font color=\'red\'>' + row.today_curr_bid + '</font>('+row.yesterday_curr_bid+')';
                    } else {
                        return '<font color=\'blue\'>' + row.today_curr_bid + '</font>('+row.yesterday_curr_bid+')';
                    }
                }
            },{
                title : '异地维护商户出价数',
                field : 'today_other_bid',
                align:'center',
                width:200,
                formatter : function(value, row, index) {
					/* 无数据的处理 */
                    if(row.yesterday_other_bid==undefined){
                        row.yesterday_other_bid = 0;
                    }
                    if(row.today_other_bid==undefined){
                        row.today_other_bid = 0;
                    }
                    if (row.yesterday_other_bid < row.today_other_bid) {
                        return '<font color=\'red\'>' + row.today_other_bid + '</font>('+row.yesterday_other_bid+')';
                    } else {
                        return '<font color=\'blue\'>' + row.today_other_bid + '</font>('+row.yesterday_other_bid+')';
                    }
                }
            }, {
				title : '车均',
				field : 'today_ave',
				align:'center',
				width:200,
				formatter : function(value, row, index) {
                    /* 无数据的处理 */
                    if(row.yesterday_ave==undefined){
                        row.yesterday_ave = 0;
                    }
                    if(row.today_ave==undefined){
                        row.today_ave = 0;
                    }
					if (row.yesterday_ave < row.today_ave) {
						return '<font color=\'red\'>' + row.today_ave + '</font>('+row.yesterday_ave+')';
					} else {
						return '<font color=\'blue\'>' + row.today_ave + '</font>('+row.yesterday_ave+')';
					}
				}
			}] ]
		});
		$(".datagrid-toolbar").append($("#datagridsearch"));
	});
	function myReload(){
		var params = {
		    slday: $('#slday').datetimebox('getValue'),
            session: $('#session').datetimebox('getValue'),
			auctionType:$('#auctionType').combobox('getValue')
		};
		$("#carave").treegrid('options').url = 'auction/carave_new.do';
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