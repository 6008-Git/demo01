function oldTableTrans(oldTable) {

//存放整个表格
    var allTable = ''
    var tableStart = '<sg-table\n' +
        '              :header-cell-style="{textAlign: \'center\'}"\n' +
        '              ref="multipleTable"\n' +
        '              :data="tableDataKKK"\n' +
        '              border\n' +
        '              stripe\n' +
        '              tooltip-effect="dark"\n' +
        '              :height="tableHeight"\n' +
        '              @selection-change="handleSelectionChange">'+'\n'
//表格内容
    var tableContent = ''
    var tableEnd = '\n'+'</sg-table>'

//存放分页代码
    var pagination = '<sg-pagination\n' +
        '              @size-change="handleSizeChangeTab"\n' +
        '              @current-change="handleCurrentChangeTab"\n' +
        '              :current-page="currentPageTab"\n' +
        '              :page-sizes="[10, 20, 30,100]"\n' +
        '              :page-size="pageSizeTab"\n' +
        '              layout="total, sizes, prev, pager, next, jumper"\n' +
        '              :total="allTableDataTab.length">\n' +
        '          </sg-pagination>'


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
        if(oldForm_split[0]==='<dw:columnText'){
            var oldTab = oldTable_Arr[i];
            if(!oldTab.match('action=')){
                for (let i = 0; i < oldForm_split.length; i++) {
                    //columnName标签内容
                    if(oldForm_split[i].match('^columnName')){
                        var label = oldForm_split[i].split("\"")[1]
                        //console.log(label)
                    }
                    //name标签内容
                    if(oldForm_split[i].match('^name')){
                        var prop = oldForm_split[i].split("\"")[1]
                        //console.log(prop)
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
                tableContent  = tableContent + line +'\n'
                //console.log(line1+line2)
            }
        }

        //2、判断code显示文本
        if(oldForm_split[0]==='<dw:columnSelect'){
            for (let i = 0; i < oldForm_split.length; i++) {
                //columnName标签内容
                if(oldForm_split[i].match('columnName')){
                    var label = oldForm_split[i].split("\"")[1]
                    //console.log(label)
                }
                //name标签内容
                if(oldForm_split[i].match('name')){
                    var prop = oldForm_split[i].split("\"")[1]
                    //console.log(prop)
                }
                //code标签内容
                if(oldForm_split[i].match('code')){
                    var code = oldForm_split[i].split("\"")[1]
                    //console.log(code)
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
            tableContent  = tableContent + line+'\n'
            //console.log(line1+line2)
        }

        //3、判断超链接文本
        if(oldForm_split[0]==='<dw:columnText'){
            var oldTab = oldTable_Arr[i];
            if(oldTab.match('action=')){
                for (let i = 0; i < oldForm_split.length; i++) {
                    //columnName标签内容
                    if(oldForm_split[i].match('columnName')){
                        var label = oldForm_split[i].split("\"")[1]
                        //console.log(label)
                    }
                    //name标签内容
                    if(oldForm_split[i].match('name')){
                        var prop = oldForm_split[i].split("\"")[1]
                        //console.log(prop)
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
                tableContent  = tableContent + line+'\n'
                //console.log(line)
            }
        }

        //4、可输入表格信息
        //暂未碰到
    }

    allTable = tableStart+tableContent+tableEnd+'\n'

//加上分页
    var allTableAddPagination = allTable + pagination
    console.log(allTableAddPagination)

    return allTableAddPagination
}
