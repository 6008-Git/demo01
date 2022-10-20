
function oldParamTrans(oldParamCode){
    // var oldParamCode ='\t\tString orgNo = para.getString("orgNo", "");//单位编号\n' +
    //     '\t\tString tmnlType = para.getString("tmnlType", "");//终端类型\n' +
    //     '\t\tString dataDate = para.getString("dataDate", "");//查询日期'
    //
    // var newCode = '        //前端参数获取\n' +
    //     '        String orgNo= PubTool.getValueNotEmpty(param,"orgNo");//单位编号--即供电单位\n' +
    //     '        String tmnlType=PubTool.getValueNotEmpty(param,"tmnlType");//终端类型\n' +
    //     '        Date dataDate= PubTool.getDateValue(param,"dataDate");//查询日期'

//去掉所有中文与//
    oldParamCode = oldParamCode.replace(/\/\//g,'').
    replace(/[\u4e00-\u9fa5]/g,'')
//去掉所有制表符
    oldParamCode = oldParamCode.replace(/\t/g,'')
//console.log(oldParamCode)

//去掉所有换行符
    oldParamCode = oldParamCode.replace(/\n/g,'')
//console.log(oldParamCode)

//以;分割，得到单行数组
    oldParamCodeArr= oldParamCode.split(';')
//console.log(oldParamCodeArr)

//去掉数组空元素
    oldParamCodeArr=oldParamCodeArr.filter((item)=>{
        return item && item.trim();
    })
//console.log(oldParamCodeArr)

//存放变量名称
    var nameArr = []
//遍历得到每行数据
    for (let i = 0; i < oldParamCodeArr.length; i++) {
        var oldParamCodeArrOne = oldParamCodeArr[i];
        //再以空格分割
        oldParamCodeArrOne=oldParamCodeArrOne.split(' ')
        //console.log(oldParamCodeArrOne)
        //拿到变量名称

        nameArr.push(oldParamCodeArrOne[1])
    }

    console.log(nameArr)

    var newCodeParam = ''
    for (let i = 0; i < nameArr.length; i++) {
        if(nameArr[i].match('dataDate') || nameArr[i].match('Date') || nameArr[i].match('data')){
            var line1 = 'Date '+nameArr[i]+'= PubTool.getDateValue(param,"'+nameArr[i]+'");\n'
            newCodeParam  =newCodeParam + line1
        }else{
            var line2 = 'String '+nameArr[i]+'= PubTool.getValueNotEmpty(param,"'+nameArr[i]+'");\n'
            newCodeParam  =newCodeParam + line2
        }

    }
    var otherCode = '//单位非空判断\n' +
        '        if(StringUtils.isEmpty(orgNo)){\n' +
        '            orgNo = TOP_ORG_NO;\n' +
        '        }'
   // console.log(newCodeParam)
    return newCodeParam+'\n\n\n\n\n\n\n'+otherCode
}