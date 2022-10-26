//表格普通文本转换
var oldTab = '<dw:columnText columnName="终端编号" dataType="String" name="terminalId"\n' +
    '\t\t\t\t\talign="left"></dw:columnText>'

var newTab = '<sg-table-column label="终端编号" prop="terminalId" align="left" width="180">\n' +
    '            </sg-table-column>'

//转为单行
oldTab = oldTab.replace(/\n/g,' ').replace(/\t/g,'');
//console.log(oldTab)

oldTab_arr = oldTab.split(' ')
console.log(oldTab_arr)

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

