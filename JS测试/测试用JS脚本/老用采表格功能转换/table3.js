//表格超链接文本转换
var oldTab = '<dw:columnText columnName="对时历史" dataType="String"\n' +
    '\t\t\t\t\tname="checkHistory" align="center" hrefSign="true"\n' +
    '\t\t\t\t\taction="btncheckHistoryDetail_1()"></dw:columnText>'

var newTab = '<sg-table-column label="对时历史" prop="checkHistory" width="" align="left">\n' +
    '              <template slot-scope="scope">\n' +
    '                <sg-link type="primary" style="text-decoration:underline;cursor:pointer;" @click="btncheckHistoryDetail_1()(scope.row,scope.column)">{{scope.row.checkHistory}}</sg-link>\n' +
    '              </template>\n' +
    '            </sg-table-column>'

//转为单行
oldTab = oldTab.replace(/\n/g,' ').replace(/\t/g,'');
//console.log(oldTab)

oldTab_arr = oldTab.split(' ')
console.log(oldTab_arr)

if(oldTab_arr[0]==='<dw:columnText'){
    if(oldTab.match('action=')){
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
        var line1 = '<sg-table-column label="'+label+'" prop="'+prop+'" align="left" width="'+width+'">\n'
        var line2 = '<template slot-scope="scope">\n'
        var line3 = '<sg-link type="primary" style="text-decoration:underline;cursor:pointer;" \n'
        var line4 = '@click="btnMMM()(scope.row,scope.column)">\n'
        var line5 = '{{scope.row.'+prop+'}}\n'
        var line6 = '</sg-link>\n'
        var line7 = '</template>\n'
        var line8 = '</sg-table-column>'
        line = line1+line2+line3+line4+line5+line6+line7+line8
        console.log(line)
    }
}

var newTab = '<sg-table-column label="对时历史" prop="checkHistory" width="" align="left">\n' +
    '              <template slot-scope="scope">\n' +
    '                <sg-link type="primary" style="text-decoration:underline;cursor:pointer;" ' +
    '                         @click="btncheckHistoryDetail_1()(scope.row,scope.column)">' +
    '                                 {{scope.row.checkHistory}}' +
    '               </sg-link>\n' +
    '              </template>\n' +
    '            </sg-table-column>'

