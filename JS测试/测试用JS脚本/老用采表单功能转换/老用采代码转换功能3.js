
//输入框表单格式转换


console.log("开始转换.....")
//原复制的格式代码
var oldForm='<dw:textInputWithLabel dataType="String" labelValue="处理人员名称"\n' +
    '\t\t\tname="handleName" readonly="true">'
var newForm='<sg-form-item label="处理人员名称" prop="handleName">\n' +
    '          <sg-input v-model="formSiteSurveyModel.handleName" rows="1" disabled="false"></sg-input>\n' +
    '        </sg-form-item>'

//变为一行的代码
let oldForm_replace = oldForm.replace('\n',' ').replace('\t\t\t',' ');
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
if(oldForm_split[0]==='<dw:textInputWithLabel'){
    for (let i = 0; i < oldForm_split.length; i++) {
        //labelValue标签内容
        if(oldForm_split[i].match('labelValue')){
            var label = oldForm_split[i].split("\"")[1]
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
    var oneLine = '<sg-form-item label="'+label+'" '+'prop="'+prop+'" '+'>\n'
    var twoLine = '<sg-input v-model="formXXXModel.'+prop+'" '+'rows="1" disabled="false"></sg-input>\n'
    var threeLine = '</sg-form-item>'
    var allLine = oneLine+twoLine+threeLine
    console.log(allLine)
}

var newForm='<sg-form-item label="处理人员名称" prop="handleName">\n' +
    '          <sg-input v-model="formSiteSurveyModel.handleName" rows="1" disabled="false"></sg-input>\n' +
    '        </sg-form-item>'