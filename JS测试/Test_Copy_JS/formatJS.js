//右侧事件报警数据
function getEventWarning() {
    doAction("/index/getEventWarning",data,getEventWarningCallback);
}
function getEventWarningCallback(xmlRequest){
    var returninfo = eval("("+xmlRequest.responseText+")");

}

data = [{
    "1": "开关门检测",
    "2": "厅内客流信息检测",
    "3": "突发事件检测",
    "4": "客户行为检测",
    "5": "客户状态检测",
    "6": "业务办理限时检测",
    "7": "员工行为检测",
    "8": "事件升级处置机制",
    "客户状态检测": "40",
    "事件升级处置机制": "80",
    "突发事件检测": "10",
    "开关门检测": "30",
    "厅内客流信息检测": "100",
    "员工行为检测": "60",
    "业务办理限时检测": "50",
    "客户行为检测": "20"
}];