
//单位树代码转换
console.log("开始转换(dw:treeSelect)标签.....")
var oldForm='<dw:treeSelect name="orgNo" rootID="root" labelValue="单位名称" required="false"  dsSource="orgNoVds" isDynamic="true" hasDefaultValue="true"></dw:treeSelect>'
var newForm='<dw-org-tree label="单位名称" prop="orgNo" :value.sync="formSiteSurveyModel.orgNo"></dw-org-tree>'


//以空格分开oldForm的字符串，返回数组
let oldForm_split = oldForm.split(" ");
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

}
if(oldForm_split[0]==='<dw:treeSelect'){
    for (let i = 0; i < oldForm_split.length; i++) {
        //labelValue标签内容
        if(oldForm_split[i].match('^labelValue')){
            var label = oldForm_split[i].split("\"")[1]
            //console.log(oldForm_split[i].split("\"")[1])
        }
        //name标签内容
        if(oldForm_split[i].match('^name')){
            var prop = oldForm_split[i].split("\"")[1]
        }
    }
    console.log('<dw-org-tree label="'+label+'"'+' '+'prop="'+prop+'"'+' '+':value.sync="formXXXModel.'+prop+'"'+'></dw-org-tree>')
}
