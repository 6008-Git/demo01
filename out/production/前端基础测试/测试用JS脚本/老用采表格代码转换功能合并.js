var oldTable = '<dw:columnText columnName="终端编号" dataType="String" name="terminalId"\n' +
    '\t\t\t\t\talign="left"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnText columnName="终端名称" dataType="String"\n' +
    '\t\t\t\t\tname="terminalName" align="left"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnText columnName="最后一次召测时间" dataType="String"\n' +
    '\t\t\t\t\tname="lastcalltime" align="center"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnSelect columnName="召测成功标识" name="callflag"\n' +
    '\t\t\t\t\tdataType="String" code="CALLFLAG" readonly="true" align="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnText columnName="最后一次召测成功时间" dataType="String"\n' +
    '\t\t\t\t\tname="lastcallscutime" align="center" width="12"></dw:columnText>\n' +
    '\n' +
    '\t\t\t\t<dw:columnText columnName="最后一次对时时间" dataType="String"\n' +
    '\t\t\t\t\tname="lastChkTime" align="center"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnSelect columnName="对时结果" name="lastChkFlag"\n' +
    '\t\t\t\t\tdataType="String" code="CHKSUCCFLAG" readonly="true" align="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnText columnName="最后一次对时成功时间" dataType="String"\n' +
    '\t\t\t\t\tname="lastSuccTime" align="center" width="12"></dw:columnText>\n' +
    '\n' +
    '\t\t\t\t<dw:columnText columnName="对时前时间" dataType="String"\n' +
    '\t\t\t\t\tname="beforeChkTime" align="center"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnText columnName="时钟偏差（秒）" dataType="String"\n' +
    '\t\t\t\t\tname="timeDeviation" align="right"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnSelect columnName="对时类型" name="isAuto" dataType="String"\n' +
    '\t\t\t\t\tcode="DSLX" readonly="true" align="center"></dw:columnSelect>\n' +
    '\n' +
    '\t\t\t\t<dw:columnSelect columnName="终端类型" dataType="String"\n' +
    '\t\t\t\t\tname="terminalTypeCode" code="TERMINALTYPECODE" readonly="true"\n' +
    '\t\t\t\t\talign="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnSelect columnName="终端规约" dataType="String"\n' +
    '\t\t\t\t\tname="protocolCode" code="PROTOCOLCODE" readonly="true"\n' +
    '\t\t\t\t\talign="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnSelect columnName="采集点类型" dataType="String"\n' +
    '\t\t\t\t\tname="cpTypeCode" code="CPTYPE" readonly="true" align="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnSelect columnName="通讯介质" dataType="String"\n' +
    '\t\t\t\t\tname="channelUp" code="COMMMEDIA" readonly="true" align="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnSelect columnName="终端厂家" dataType="String"\n' +
    '\t\t\t\t\tname="factoryCode" code="LCDEVFACTURER" readonly="true"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnSelect columnName="终端状态" dataType="String"\n' +
    '\t\t\t\t\tname="tmnlStatus" code="TMNLRUNSTATUS" readonly="true" align="center"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnText columnName="单位名称" dataType="String" name="orgName"\n' +
    '\t\t\t\t\talign="left"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnText columnName="对时历史" dataType="String"\n' +
    '\t\t\t\t\tname="checkHistory" align="center" hrefSign="true"\n' +
    '\t\t\t\t\taction="btncheckHistoryDetail_1()"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnSelect columnName="单位编号" dataType="String" name="orgNo"\n' +
    '\t\t\t\t\thidden="true"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnInput dataType="String" name="msg" columnName="是否显示信息"\n' +
    '\t\t\t\t\thidden="true"></dw:columnInput>\n' +
    '\t\t\t\t<dw:columnInput dataType="String" name="terminalChkBegintime"\n' +
    '\t\t\t\t\tcolumnName="起始日期" hidden="true"></dw:columnInput>\n' +
    '\t\t\t\t<dw:columnInput dataType="String" name="terminalChkEndtime"\n' +
    '\t\t\t\t\tcolumnName="终止日期" hidden="true"></dw:columnInput>\n' +
    '\t\t\t\t<dw:columnText columnName="终端时钟" dataType="String" name="terminalclock"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnText columnName="召测时钟" dataType="String" name="callclock"></dw:columnText>\n' +
    '\t\t\t\t<dw:columnSelect dataType="string" name="terminaltype" columnName="终端型号" code="LCMODELCODE" readonly="true"></dw:columnSelect>\n' +
    '\t\t\t\t<dw:columnText columnName="终端资产号" dataType="String" name="assetNo" width="10"></dw:columnText>'


//去掉所有制表符
oldTable = oldTable.replace(/\t/g,'')
//console.log(oldTable)

//去掉所有换行符,并以空格代替
oldTable = oldTable.replace(/\n/g,' ')
//console.log(oldTable)

//在所有’></‘的><添加空格
oldTable = oldTable.replace(/><\//g,'> <\/')
//console.log(oldTable)

//第1种方法，遍历数组
//只在标签末尾添加换行符
//1、以空格分割字符，得到数组
let oldTable_Arr = oldTable.split(" ");
//console.log(oldTable_Arr)

//2、遍历数组，拿到含有结尾标签的元素内容
for (let i = 0; i < oldTable_Arr.length; i++) {
    if(oldTable_Arr[i].match('</dw:')){
        //console.log(oldForm_Arr[i])
        //除了</dw:lovWindow>外，在末尾全加上换行符
        if(!oldTable_Arr[i].match('</dw:lovWindow')){
            oldTable_Arr[i]=oldTable_Arr[i].replace('>','>'+'\n')
        }
    }
}
//console.log(oldTable_Arr)

//3、数组变回字符串---得到以行为单位的标签数据
oldTable  = oldTable_Arr.join(' ');
//console.log(oldTable)

//4、以换行符重新分割---得到新数组
oldTable_Arr = oldTable.split('\n')
//console.log(oldTable_Arr)

//遍历数组，提取内容，得到newTable
for (let i = 0; i < oldTable_Arr.length; i++) {
    //每条数据以空格分割
    let oldForm_split = oldTable_Arr[i].split(" ");
    //console.log(oldForm_split)
    //去除数组的空元素
    oldForm_split=oldForm_split.filter((item)=>{
        return item && item.trim();
    })
    //console.log(oldForm_split)

    //开始以行为单位判断
    //1、判断普通显示文本
    if(oldTab_arr[0]==='<dw:columnText'){
        if(!oldTab.match('action=')){
            for (let i = 0; i < oldTab_arr.length; i++) {
                //columnName标签内容
                if(oldTab_arr[i].match('^columnName')){
                    var label = oldTab_arr[i].split("\"")[1]
                    console.log(label)
                }
                //name标签内容
                if(oldTab_arr[i].match('^name')){
                    var prop = oldTab_arr[i].split("\"")[1]
                    console.log(prop)
                }
            }
            //根据label的长度设定width
            var width = ''
            if(label.length<=4){
                width =120
            }else if(label.length<=8 && label.length>4){
                width =150
            }
            else if(label.length>8){
                width =180
            }
            var line1 = '<sg-table-column label="'+label+'" prop="'+prop+'" align="left" width="'+width+'">'
            var line2 = '</sg-table-column>'
            line = line1+line2
            console.log(line1+line2)
        }
    }
}