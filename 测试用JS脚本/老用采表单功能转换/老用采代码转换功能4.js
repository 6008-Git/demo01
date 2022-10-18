
//日期表单格式转换


console.log("开始转换.....")
//原复制的格式代码
var oldForm='<dw:textInputWithLabel dataType="date" labelValue="登记日期" required="true"\n' +
    '\t\t\tname="registDate" value="<%=registDate%>">\n' +
    '\t\t</dw:textInputWithLabel>'
var newForm='<sg-form-item label="登记日期" prop="registDate" >\n' +
    '          <sg-date-picker type="date" placeholder="登记日期" v-model="formSiteSurveyModel.registDate"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"\n' +
    '                          style="width: 100%;" @change="judgeDateTab"></sg-date-picker>\n' +
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
    if(oldForm_replace.match('dataType="date')){
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
        var twoLine = '<sg-date-picker type="date" placeholder="'+label+'" '+'v-model="formXXXModel.'+prop+'" '+'format="yyyy-MM-dd" value-format="yyyy-MM-dd"\n'
        var threeLine = 'style="width: 100%;" @change="judgeDateTab"></sg-date-picker>\n'
        var fourLine = '</sg-form-item>'
        var allLine = oneLine+twoLine+threeLine+fourLine
        console.log(allLine)
    }
}

var newForm1='<sg-form-item label="登记日期" prop="registDate" >\n' +
    '          <sg-date-picker type="date" placeholder="登记日期" v-model="formSiteSurveyModel.registDate"  format="yyyy-MM-dd" value-format="yyyy-MM-dd"\n' +
    '                          style="width: 100%;" @change="judgeDateTab"></sg-date-picker>\n' +
    '        </sg-form-item>'