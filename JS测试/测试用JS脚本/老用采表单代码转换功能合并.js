//表单格式及内容转换
var oldForm = '<dw:treeSelect name="orgNo" rootID="root" labelValue="单位名称" required="true"  dsSource="orgNoVds" isDynamic="true" hasDefaultValue="true" ></dw:treeSelect>\n' +
    '\t\t<dw:dropdown name="checkobjtype" labelValue="对时对象类型" required="true" defaultSelect="<%=checkObjType %>"\n' +
    '\t\t\t\tcode="CHECKOBJTYPE"></dw:dropdown>\n' +
    '\t\t<dw:dropdown name="handlingType" labelValue="处理方式" defaultSelect="<%=handlingType%>"\n' +
    '\t\t\t\tcode="HANDLETYPECODE" required="true"></dw:dropdown>\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="对时工作单编号" required="false" hidden="true" value="<%=chkno%>"\n' +
    '\t\t\tname="chkno" >\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="电能表编号"\n' +
    '\t\t\tname="meterId"  value="<%=meterId%>" >\n' +
    '\t\t\t<dw:lovWindow name="lovMeter" actionUrl="lov.do?method=queryRunMeter"\n' +
    '\t\t\t\tlabelValue="查询运行电能表">\n' +
    '\t\t\t</dw:lovWindow>\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="SG186电能表编号"\n' +
    '\t\t\tname="meterIdMis" value="<%=meterIdMis%>"  readonly="true">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:textInputWithLabel dataType="Number" labelValue="对时前时钟偏差（秒）" required="true" value="<%=timeDeviation%>"\n' +
    '\t\t\tname="timeDeviation" mask="#####">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="终端编号"\n' +
    '\t\t\tname="terminalId" value="<%=terminalId%>"  >\n' +
    '\t\t\t<dw:lovWindow name="lovSubsOrg"\n' +
    '\t\t\t\tactionUrl="lov.do?method=queryTerminal" labelValue="查询终端">\n' +
    '\t\t\t</dw:lovWindow>\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="终端名称"\n' +
    '\t\t\tname="terminalName"  value="<%=terminalName%>" readonly="true">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:textInputWithLabel dataType="Date" labelValue="处理日期"\n' +
    '\t\t\tname="handlDate" required="true" value="<%=handlDate%>">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:textInputWithLabel dataType="Date" labelValue="登记日期" hidden="true"\n' +
    '\t\t\tname="registDate" readonly="true" value="<%=registDate%>">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="处理人员ID"\n' +
    '\t\t\tname="handleId" value="<%=handleId%>" readonly="true" hidden="true">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="处理人员名称"\n' +
    '\t\t\tname="handleName" readonly="true" value="<%=handleName%>" hidden="true">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="电能表安装位置" value="<%=instLoc%>"\n' +
    '\t\t\tname="instLoc" maxLength="256" colspan="6">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="终端安装位置"\n' +
    '\t\t\tname="terminalLoc" value="<%=terminalLoc%>" maxLength="256" colspan="6">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\t\t<dw:textInputWithLabel dataType="String" labelValue="处理备注"\n' +
    '\t\t\tname="chkRemark" value="<%=chkRemark%>" maxLength="256" colspan="6">\n' +
    '\t\t</dw:textInputWithLabel>\n' +
    '\t\t<dw:nextLine />\n' +
    '\n' +
    '\t\t<dw:buttons border="false" name="btns" colspan="9"\n' +
    '\t\t\tresponseSign="response">\n' +
    '\t\t\t<dw:button name="btnSave" value="保  存" onclick="SaveSiteSurvey()" width="5"></dw:button>\n' +
    '\t\t</dw:buttons>'
//存放整个表单
var allForm = ''
var formStart = '<sg-form ref="formXXXRef"\n' +
    '                 :model="formXXXModel"\n' +
    '                 :rules="formXXXRules"\n' +
    '                 label-width="150px" :inline="true"\n' +
    '                 label-position="right" size="small">'+'\n'
//表单内容
var formContent = ''
var formEnd = '<sg-row>\n' +
    '            <sg-form-item style="float: right">\n' +
    '              <!--<sg-button type="primary" @click="showMore">展示更多</sg-button>-->\n' +
    '              <sg-button type="primary" @click="queryXXX(\'formXXXRef\')">查询</sg-button>\n' +
    '              <sg-button type="primary" @click="resetXXXForm(\'formXXXRef\')">重置</sg-button>\n' +
    '            </sg-form-item>\n' +
    '          </sg-row>\n' +
    '        </sg-form>'
//存放表单绑定变量
var modelArr = []
//去掉所有<dw:nextLine />
oldForm = oldForm.replace(/<dw:nextLine \/>/g,'')
//console.log(oldForm)

//去掉所有制表符
oldForm = oldForm.replace(/\t/g,'')
//console.log(oldForm)

//去掉所有换行符,并以空格代替
oldForm = oldForm.replace(/\n/g,' ')
//console.log(oldForm)

//在所有’></‘的><添加空格
oldForm = oldForm.replace(/><\//g,'> <\/')
//console.log(oldForm)


//第1种方法，遍历数组
//只在标签末尾添加换行符
//1、以空格分割字符，得到数组
let oldForm_Arr = oldForm.split(" ");
//console.log(oldForm_Arr)
//2、遍历数组，拿到含有结尾标签的元素内容
for (let i = 0; i < oldForm_Arr.length; i++) {
    if(oldForm_Arr[i].match('</dw:')){
        //console.log(oldForm_Arr[i])
        //除了</dw:lovWindow>外，在末尾全加上换行符
        if(!oldForm_Arr[i].match('</dw:lovWindow')){
            oldForm_Arr[i]=oldForm_Arr[i].replace('>','>'+'\n')
        }
    }
}
//console.log(oldForm_Arr)
//数组变回字符串---得到一行为单位的标签数据
oldForm  = oldForm_Arr.join(' ');
//console.log(oldForm)

//以换行符重新分割---得到新数组
oldForm_Arr = oldForm.split('\n')
//console.log(oldForm_Arr)


//遍历数组，提取内容，得到newForm
for (let i = 0; i < oldForm_Arr.length; i++) {
    //每条数据以空格分割
    let oldForm_split = oldForm_Arr[i].split(" ");
    //console.log(oldForm_split)
    //去除数组的空元素
    oldForm_split=oldForm_split.filter((item)=>{
        return item && item.trim();
    })
    //oldForm_split就是单个数据标签，输出多个是因为在循环里面
    console.log(oldForm_split)

    //判断树型表单
    if(oldForm_split[0]==='<dw:treeSelect'){
        for (let i = 0; i < oldForm_split.length; i++) {
            //labelValue标签内容
            if(oldForm_split[i].match('labelValue')){
                var label = oldForm_split[i].split("\"")[1]
                //console.log(oldForm_split[i].split("\"")[1])
            }
            //name标签内容
            if(oldForm_split[i].match('name')){
                var prop = oldForm_split[i].split("\"")[1]
                //存放表单绑定变量
                modelArr.push(prop)
            }
        }
        formContent = formContent+'<dw-org-tree label="'+label+'"'+' '+'prop="'+prop+'"'+' '+':value.sync="formXXXModel.'+prop+'"'+'></dw-org-tree>\n'
        //console.log('<dw-org-tree label="'+label+'"'+' '+'prop="'+prop+'"'+' '+':value.sync="formXXXModel.'+prop+'"'+'></dw-org-tree>')
    }

    //判断Lov表单
    var labelArr=[];
    if(oldForm_split[0]==='<dw:textInputWithLabel'){
        let oldForm_replace = oldForm_Arr[i];
        if(oldForm_replace.match('<dw:lovWindow')){
            for (let i = 0; i < oldForm_split.length; i++) {
                //labelValue标签内容
                if(oldForm_split[i].match('labelValue')){
                    var label = oldForm_split[i].split("\"")[1]
                    labelArr.push(label)
                    //console.log(oldForm_split[i].split("\"")[1])
                }
                //name标签内容
                if(oldForm_split[i].match('name')){
                    var prop = oldForm_split[i].split("\"")[1]
                    //存放表单绑定变量
                    modelArr.push(prop)
                }
                //code标签内容
                if(oldForm_split[i].match('code')){
                    var code = oldForm_split[i].split("\"")[1]
                }
            }
            var oneLine = '<sg-form-item label="'+labelArr[0]+'" '+'prop="'+prop+'" '+'>\n'
            var twoLine = '<sg-select filterable remote reserve-keyword placeholder="请输入"\n'
            var threeLine = 'v-model="formXXXModel.'+prop+'" '+'\n'
            var fourLine = '@change="replaceOtherName"\n'
            var line5 = ':remote-method="queryYYYId"\n'
            var line6 = ':loading="loading">\n'
            var line7 = '<sg-option\n'
            var line8 = 'v-for="item in optionsYYYId"\n'
            var line9 = ':label="item.label"\n'
            var line10 = ':value="item.value"\n'
            var line11 = ':key="item.value"\n'
            var line12 = '></sg-option>\n'
            var line13 = '</sg-select>\n'
            var line14 = '</sg-form-item>'
            var allLine = oneLine+twoLine+threeLine+fourLine+line5+line6+line7+line8+line9+line10+line11+line12+line13+line14
            formContent = formContent+allLine+'\n'
            //console.log(allLine)
        }
    }

    //判断输入框表单
    if(oldForm_split[0]==='<dw:textInputWithLabel'){
        let oldForm_replace = oldForm_Arr[i];
        if(oldForm_replace.match('dataType="String') && !oldForm_replace.match('<dw:lovWindow')){
        for (let i = 0; i < oldForm_split.length; i++) {
            //labelValue标签内容
            if(oldForm_split[i].match('labelValue')){
                var label = oldForm_split[i].split("\"")[1]
                //console.log(oldForm_split[i].split("\"")[1])
            }
            //name标签内容
            if(oldForm_split[i].match('name')){
                var prop = oldForm_split[i].split("\"")[1]
                //存放表单绑定变量
                modelArr.push(prop)
            }
            //code标签内容
            if(oldForm_split[i].match('code')){
                var code = oldForm_split[i].split("\"")[1]
            }

        }
        var oneLine = '<sg-form-item label="'+label+'" '+'prop="'+prop+'" '+'>\n'
        var twoLine = '<sg-input v-model="formXXXModel.'+prop+'" '+'rows="1" ></sg-input>\n'
        var threeLine = '</sg-form-item>'
        var allLine = oneLine+twoLine+threeLine
        formContent = formContent+allLine+'\n'
        //console.log(allLine)
        }
    }

    //判断下拉框表单
    if(oldForm_split[0]==='<dw:dropdown'){
        for (let i = 0; i < oldForm_split.length; i++) {
            //labelValue标签内容
            if(oldForm_split[i].match('labelValue')){
                var label = oldForm_split[i].split("\"")[1]
                //console.log(oldForm_split[i].split("\"")[1])
            }
            //name标签内容
            if(oldForm_split[i].match('name')){
                var prop = oldForm_split[i].split("\"")[1]
                //存放表单绑定变量
                modelArr.push(prop)
            }
            //code标签内容
            if(oldForm_split[i].match('code')){
                var code = oldForm_split[i].split("\"")[1]
            }

        }
        var row1 = '<dw-dropdown code="'+code+'" '
        var row2 = 'label="'+label+'" '+'prop="'+prop+'" '
        var row3 = ':value.sync="formXXXModel.'+prop+'"'
        var row4 = '></dw-dropdown>'
        allLine=row1+row2+row3+row4
        formContent = formContent+allLine+'\n'
        //console.log(row1+row2+row3+row4)
    }

    //判断日期表单
    if(oldForm_split[0]==='<dw:textInputWithLabel'){
        let oldForm_replace = oldForm_Arr[i];
        if(oldForm_replace.match('dataType="date') || oldForm_replace.match('dataType="Date')){
            for (let i = 0; i < oldForm_split.length; i++) {
                //labelValue标签内容
                if(oldForm_split[i].match('labelValue')){
                    var label = oldForm_split[i].split("\"")[1]
                    //console.log(oldForm_split[i].split("\"")[1])
                }
                //name标签内容
                if(oldForm_split[i].match('name')){
                    var prop = oldForm_split[i].split("\"")[1]
                    //存放表单绑定变量
                    modelArr.push(prop)
                }
                //code标签内容
                if(oldForm_split[i].match('code')){
                    var code = oldForm_split[i].split("\"")[1]
                }
            }
            var oneLine = '<sg-form-item label="'+label+'" '+'prop="'+prop+'" '+'>\n'
            var twoLine = '<sg-date-picker type="date" placeholder="'+label+'" '+'v-model="formXXXModel.'+prop+'" '+'format="yyyy-MM-dd" value-format="yyyy-MM-dd"\n'
            var threeLine = 'style="width: 100%;" @change="judgeDateTab"></sg-date-picker>\n'
            var fourLine = '</sg-form-item>'
            var allLine = oneLine+twoLine+threeLine+fourLine
            formContent = formContent+allLine+'\n'
            //console.log(allLine)
        }
    }

}

//console.log(modelArr)
allForm = formStart+formContent+formEnd
//console.log(formContent)
//console.log(allForm)

var model1 = 'formXXXModel:{'+'\n'
var model2 = ''
var model3 = '},'
for (let i = 0; i < modelArr.length; i++) {
    model2 = model2+modelArr[i]+':'+"'',"+'\n'
}
var model = model1+model2+model3
//console.log(model)
