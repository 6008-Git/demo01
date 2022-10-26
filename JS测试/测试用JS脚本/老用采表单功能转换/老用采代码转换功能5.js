
//Lov表单格式转换


console.log("开始转换.....")
//原复制的格式代码
var oldForm='<dw:textInputWithLabel dataType="String" labelValue="处理人员ID"\n' +
    '\t\t\tname="handleId">\n' +
    '\t\t\t<dw:lovWindow name="lovHandleId"\n' +
    '\t\t\t\tactionUrl="lov.do?method=queryHandleId" labelValue="处理人员查询">\n' +
    '\t\t\t</dw:lovWindow>\n' +
    '\t\t</dw:textInputWithLabel>'
var newForm='<sg-form-item label="处理人员ID" prop="terminalId">\n' +
    '          <sg-select filterable remote reserve-keyword placeholder="请输入"\n' +
    '              v-model="formSiteSurveyModel.handleId"\n' +
    '              @change="replaceTerminalName"\n' +
    '              :remote-method="queryTerminalId"\n' +
    '              :loading="loading">\n' +
    '            <sg-option\n' +
    '                v-for="item in optionsTerminalId"\n' +
    '                :label="item.label"\n' +
    '                :value="item.value"\n' +
    '                :key="item.value"\n' +
    '            ></sg-option>\n' +
    '          </sg-select>\n' +
    '        </sg-form-item>'

//变为一行的代码
let oldForm_replace = oldForm.replace('\n',' ').replace(/\t/g,'');
console.log(oldForm_replace)
//console.log(oldForm_replace.split(" "))

//以空格分开oldForm的字符串，返回数组
let oldForm_split = oldForm_replace.split(" ");
console.log(oldForm_split)


//提取具体标签内容
for (let i = 0; i < oldForm_split.length; i++) {
    //labelValue标签内容
    if(oldForm_split[i].match('^labelValue')){
        console.log(oldForm_split[i].split("\"")[1])
    }
    //name标签内容
    if(oldForm_split[i].match('^name')){
        console.log(oldForm_split[i].split("\"")[1])
    }
    //code标签内容
    if(oldForm_split[i].match('code')){
        console.log(oldForm_split[i].split("\"")[1])
    }

}
var labelArr=[];
if(oldForm_split[0]==='<dw:textInputWithLabel'){
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
        console.log(allLine)
    }
}

var newForm1='<sg-form-item label="处理人员ID" prop="handleId">\n' +
    '          <sg-select filterable remote reserve-keyword placeholder="请输入"\n' +
    '              v-model="formSiteSurveyModel.handleId"\n' +
    '              @change="replaceTerminalName"\n' +
    '              :remote-method="queryTerminalId"\n' +
    '              :loading="loading">\n' +
    '            <sg-option\n' +
    '                v-for="item in optionsTerminalId"\n' +
    '                :label="item.label"\n' +
    '                :value="item.value"\n' +
    '                :key="item.value"\n' +
    '            ></sg-option>\n' +
    '          </sg-select>\n' +
    '        </sg-form-item>'