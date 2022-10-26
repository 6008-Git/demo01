//全部以代码为一行为基础转换
//所以要先把代码变为一行

//下拉框代码转换
console.log("开始转换.....")
//原复制的格式代码
var oldForm='<dw:dropdown name="checkobjtype" labelValue="对时对象类型"\n' +
    '\t\t\t\tcode="CHECKOBJTYPE"></dw:dropdown>'
var newForm='<dw-dropdown code="HANDLETYPECODE" label="处理方式" prop="handlingType"\n' +
    '                     :value.sync="formSiteSurveyModel.handlingType"></dw-dropdown>'

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
        }
        //code标签内容
        if(oldForm_split[i].match('code')){
            var code = oldForm_split[i].split("\"")[1]
        }

    }
    console.log('<dw-dropdown code="'+code+'" '+'label="'+label+'" '+'prop="'+prop+'" '+':value.sync="formXXXModel.'+prop+'"'+'></dw-dropdown>')
}
