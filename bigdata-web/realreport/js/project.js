/**
 * 订单状态
 */
var _orderStatus = new Map();
_orderStatus.put("20", "预约");
_orderStatus.put("201", "待预约");
_orderStatus.put("202", "跟踪");
_orderStatus.put("200", "终止");
_orderStatus.put("30", "检测");
_orderStatus.put("301", "已约检测");
_orderStatus.put("314", "预检失败");
_orderStatus.put("302", "已分配检测");
_orderStatus.put("315", "计检失败");
_orderStatus.put("303", "正在检测");
_orderStatus.put("313", "检测完成");
_orderStatus.put("304", "上传完成");
_orderStatus.put("305", "数据作废");
_orderStatus.put("306", "检测中止");
_orderStatus.put("307", "改约检测");
_orderStatus.put("308", "等待作废");
_orderStatus.put("40", "审核");
_orderStatus.put("401", "初检待审");
_orderStatus.put("402", "报告已审");
_orderStatus.put("403", "重拍待审");
_orderStatus.put("404", "拒绝竞拍");
_orderStatus.put("50", "竞拍");
_orderStatus.put("501", "等待竞拍");
_orderStatus.put("502", "正在竞拍");
_orderStatus.put("503", "竞拍结束");
_orderStatus.put("500", "终止");
_orderStatus.put("60", "成交");
_orderStatus.put("601", "待约成交");
_orderStatus.put("602", "已约成交");
_orderStatus.put("603", "交易完成");
_orderStatus.put("604", "客户流拍");
_orderStatus.put("605", "商户流拍");
_orderStatus.put("606", "客户违约");
_orderStatus.put("607", "商户违约");
_orderStatus.put("608", "检测失误");
_orderStatus.put("609", "放弃成交");
_orderStatus.put("610", "等待流拍");
_orderStatus.put("615", "改约成交");
_orderStatus.put("620", "重约成交");
_orderStatus.put("630", "等待加价");
_orderStatus.put("640", "客户到店");
_orderStatus.put("644", "已分配复检");
_orderStatus.put("645", "正在复检");
_orderStatus.put("646", "复检完成");
_orderStatus.put("650", "查验手续");
_orderStatus.put("655", "交车完成");
_orderStatus.put("660", "已约提车");
_orderStatus.put("665", "商户到店");
_orderStatus.put("670", "商户验车");
_orderStatus.put("675", "提车完成");
_orderStatus.put("676", "过户完成");
_orderStatus.put("680", "渠道询价");
_orderStatus.put("690", "财务付款");
_orderStatus.put("S", "交易成功");
_orderStatus.put("F", "交易失败");
/**
 * 解析订单状态
 * 
 * @param code
 *            状态码
 */
function getOrderStatus(code) {
	return _orderStatus.get(code);
}
/**
 * 客户状态
 */
var _customerStatus = new Map();
_customerStatus.put("noContact", "未联系");
_customerStatus.put("follow", "跟进中");
_customerStatus.put("trading", "交易中");
_customerStatus.put("finish", "交易完成");
_customerStatus.put("failedFollow", "流拍跟进");
_customerStatus.put("ineffect", "无效");
_customerStatus.put("reserve", "储备客户");
_customerStatus.put("waitingInvalid", "等待作废");
_customerStatus.put("invalidReject", "作废驳回");
_customerStatus.put("sold", "客户车已卖");


/**
 * 解析客户状态
 * 
 * @param code
 *            状态码
 * @returns
 */
function getCustomerStatus(code) {
	return _customerStatus.get(code);
}
/**
 * 客户意向
 */
var _customerIntention = new Map();
_customerIntention.put(null, "无");
_customerIntention.put("immediately", "立即卖车");
_customerIntention.put("twoWeek", "两周内卖车");
_customerIntention.put("oneMonth", "一个月内卖车");
_customerIntention.put("threeMonth", "三个月内卖车");
_customerIntention.put("noSale", "暂不卖车");
_customerIntention.put("sold", "客户车已卖");
_customerIntention.put("disagree", "不同意成交");
_customerIntention.put("reAuction", "不满意重新竞拍");
_customerIntention.put("considering", "考虑成交");
_customerIntention.put("agree", "同意成交");
_customerIntention.put("finish", "交易完成");
_customerIntention.put("errorInfo", "错误数据");
_customerIntention.put("isBuyer", "二手车商数据");
_customerIntention.put("repetitionInfo", "重复数据");
_customerIntention.put("buyerCustomer", "个人买家");
_customerIntention.put("carModelDiscrepancy", "车型不符");
_customerIntention.put("yearDiscrepancy", "年份不符");
_customerIntention.put("outService", "超出服务地区");
_customerIntention.put("phoneOff", "用户关机");
_customerIntention.put("shieldingNumber", "屏蔽号码");
_customerIntention.put("busy", "用户忙音");
_customerIntention.put("phoneDisconnected", "用户未接");


/**
 * 解析客户意向
 * 
 * @param code
 *            状态码
 * @returns
 */
function getCustomerIntention(code) {
	return _customerIntention.get(code);
}

/**
 * 数据性质
 */
var _dataNature = new Map();
_dataNature.put(1,"正常数据");
_dataNature.put(2,"错误数据");
_dataNature.put(3,"重复数据");
_dataNature.put(4,"二手车商");
_dataNature.put(5,"超区数据");
_dataNature.put(6,"个人买家");
_dataNature.put(8,"年份不符");
_dataNature.put(7,"车型不符");
_dataNature.put(9,"失联数据");
_dataNature.put(10,"未确定");

/**
 * 解析数据性质
 * 
 * @param code
 *            状态码
 * @returns
 */
function getDataNature(code) {
	return _dataNature.get(code);
}

/**
 * 数据入口
 */
var _dataEntrance = new Map();
_dataEntrance.put(1,"网站评估");
_dataEntrance.put(2,"微信评估");
_dataEntrance.put(3,"M站评估");
_dataEntrance.put(4,"后台添加");
_dataEntrance.put(5,"门店添加");
_dataEntrance.put(6,"数据导入");
_dataEntrance.put(7,"数据爬取");
_dataEntrance.put(8,"手机下单");
_dataEntrance.put(9,"呼叫中心");
_dataEntrance.put(10,"老数据");

/**
 * 解析数据性质
 * 
 * @param code
 *            状态码
 * @returns
 */
function getDataEntrance(code) {
	return _dataEntrance.get(code);
}


/**
 * 地区数据
 */
var _regions = new Map();
_regions.put("2072", "南京市");
_regions.put("2073", "无锡市");
_regions.put("2076", "苏州市");
_regions.put("2053", "深圳市");
/**
 * 解析地区
 * 
 * @param code
 *            地区码
 */
function getRegion(code) {
	return _regions.get(code);
}
/**
 * 商户类型
 */
var _buyerKinds = new Map();
_buyerKinds.put(0, "经销商");
_buyerKinds.put(1, "4S店");
_buyerKinds.put(2, "个人");
/**
 * 解析商户类型
 * 
 * @param kind
 *            类型
 */
function getBuyerKind(kind) {
	return _buyerKinds.get(kind);
}
/**
 * 商户状态
 */
var _buyerStatus = new Map();
_buyerStatus.put(0, "关闭");
_buyerStatus.put(1, "开通");
_buyerStatus.put(2, "冻结");
/**
 * 解析商户状态
 * 
 * @param status
 *            状态码
 */
function getBuyerStatus(status) {
	return _buyerStatus.get(status);
}
/**
 * 检测得分评级
 * 
 * @param score
 *            检测得分
 * @param isSG
 *            是否事故， 0非事故车辆，1事故车辆，2浸水车辆
 * @returns {String}
 */
function detectionRate(score, isSG) {
	var result = "";
	if (isSG != 0) {
		result = "六级";
	} else {
		if (score >= 90) {
			result = "一级";
		} else if (score >= 75) {
			result = "二级";
		} else if (score >= 50) {
			result = "三级";
		} else if (score >= 28) {
			result = "四级";
		} else {
			result = "五级";
		}
	}
	return result;
}
/**
 * 查看车辆检测报告
 * 
 * @param orderId 订单编号
 * @param mod
 *            true表示支持修改
 * @returns
 */
function viewCarDetectionRes(orderId, mod, isOCSA) {
	if (mod != undefined && mod == true) {
		top.showWindow(null, "检测报告", "detection/jcjgmod.do?type=1&id=" + orderId,
				800, 600, true, true);
	} else {
		if(isOCSA != undefined && isOCSA == true){
			top.showWindow(null, "检测报告", "detection/jcjg.do?type=1&id=" + orderId + "&isOCSA=" + isOCSA,
					800, 600, true, true);
		}else{
			top.showWindow(null, "检测报告", "detection/jcjg.do?type=1&id=" + orderId,
					800, 600, true, true);
		}
	}
}
/**
 * 下载pdf报告
 * 
 * @param orderId
 *            订单编号
 * @param isFull
 *            true完整版，false简约版
 */
function downloadPDF(orderId, isFull) {
	$.get("pdf/loadpdf.do", {
		id : orderId,
		type : 1,
		isFull:isFull
	}, function(data) {
		if (data.isHas) {
			var url =  data.url;
			window.open(url);
		} else {
			top.showMsg("错误", "未找到相关报告！", true, "error");
		}
	}, "json");
}
/**
 * 下载html版pdf报告
 * 
 * @param orderId
 *            订单编号
 */
function viewPDF(orderId) {
	$.get("pdf/loadpdf.do", {
		id : orderId,
		type : 1
	}, function(data) {
		if (data.isHas) {
			downloadFile(data.html);
		} else {
			top.showMsg("错误", "未找到相关报告！", true, "error");
		}
	}, "json");
}
/**
 * 订单备注
 * 
 * @param oID
 *            订单编号
 */
function showCarBak(cID,disableAdd) {
	top.showWindow('orderBak', '备注', "order/showCarBak.do?cID=" + cID + "&disableAdd=" + disableAdd, 450,500, false);
}
/**
 * 业务日志查询
 * @param bizModule 业务模块
 * @param bizID 业务ID
 */
function logSearch(bizModule,bizID){
	var pathName=window.document.location.pathname;
	var projectName=pathName.substring(0,pathName.substr(1).indexOf('/')+1);
	top.showWindow(null,'日志查询','bizObjectHandler/list.do?bizCode=logByBizModule&modelType=1&bizModule='+bizModule+'&bizID='+bizID, 1000, 600);
}
/**
 * 业务日志查询
 * @param bizModule 业务模型
 * @param bizIDAttr 业务id字段名称
 */
function defaultLogSearch(bizModule,bizIDAttr){
	var rowData = getSelectedRow();
	if(rowData == null){
		return;
	}
	logSearch(bizModule,rowData[bizIDAttr]);
}
