//表格下拉框code文本转换
var oldTab = '<dw:columnSelect columnName="召测成功标识" name="callflag"\n' +
    '\t\t\t\t\tdataType="String" code="CALLFLAG" readonly="true" align="center"></dw:columnSelect>'

var newTab = '<dw-code-column label="召测成功标识" prop="callflag" code="CALLFLAG" width="120" align="left">' +
    '</dw-code-column>'

//转为单行
oldTab = oldTab.replace(/\n/g,' ').replace(/\t/g,'');
//console.log(oldTab)

oldTab_arr = oldTab.split(' ')
console.log(oldTab_arr)

if(oldTab_arr[0]==='<dw:columnSelect'){
    for (let i = 0; i < oldTab_arr.length; i++) {
        //columnName标签内容
        if(oldTab_arr[i].match('columnName')){
            var label = oldTab_arr[i].split("\"")[1]
            console.log(label)
        }
        //name标签内容
        if(oldTab_arr[i].match('name')){
            var prop = oldTab_arr[i].split("\"")[1]
            console.log(prop)
        }
        //code标签内容
        if(oldTab_arr[i].match('code')){
            var code = oldTab_arr[i].split("\"")[1]
            console.log(code)
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
    var line1 = '<dw-code-column label="'+label+'" prop="'+prop+'" code="'+code+'" width="'+width+'" align="left">'
    var line2 = '</dw-code-column>'
    line = line1+line2
    console.log(line1+line2)
}

