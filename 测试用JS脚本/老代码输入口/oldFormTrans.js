//单页面表单转换
function oldFormTrans(oldForm) {
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
//去掉所有<dw:nextLine /> 与<dw:nextLine/>
    oldForm = oldForm.replace(/<dw:nextLine \/>/g,'').replace(/<dw:nextLine\/>/g,'')

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
        //console.log(oldForm_split)

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

        //判断String输入框表单
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
        //判断Number输入框表单
        if(oldForm_split[0]==='<dw:textInputWithLabel'){
            let oldForm_replace = oldForm_Arr[i];
            if(oldForm_replace.match('dataType="Number') && !oldForm_replace.match('<dw:lovWindow')){
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
                if(oldForm_split[i].match('code') || oldForm_split[i].match('dsCode')){
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
    // console.log(formContent)
    // console.log(allForm)
    return allForm
}
//双页面表单一转换
function oldFormTrans1(oldForm) {
//存放整个表单
    var allForm = ''
    var formStart = '<sg-form ref="formXXX1Ref"\n' +
        '                 :model="formXXX1Model"\n' +
        '                 :rules="formXXX1Rules"\n' +
        '                 label-width="150px" :inline="true"\n' +
        '                 label-position="right" size="small">'+'\n'
//表单内容
    var formContent = ''
    var formEnd = '<sg-row>\n' +
        '            <sg-form-item style="float: right">\n' +
        '              <!--<sg-button type="primary" @click="showMore">展示更多</sg-button>-->\n' +
        '              <sg-button type="primary" @click="queryXXX1(\'formXXX1Ref\')">查询</sg-button>\n' +
        '              <sg-button type="primary" @click="resetXXX1Form(\'formXXX1Ref\')">重置</sg-button>\n' +
        '            </sg-form-item>\n' +
        '          </sg-row>\n' +
        '        </sg-form>'
//存放表单绑定变量
    var modelArr = []
//去掉所有<dw:nextLine /> 与<dw:nextLine/>
    oldForm = oldForm.replace(/<dw:nextLine \/>/g,'').replace(/<dw:nextLine\/>/g,'')

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
        //console.log(oldForm_split)

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
            formContent = formContent+'<dw-org-tree label="'+label+'"'+' '+'prop="'+prop+'"'+' '+':value.sync="formXXX1Model.'+prop+'"'+'></dw-org-tree>\n'
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
                var threeLine = 'v-model="formXXX1Model.'+prop+'" '+'\n'
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

        //判断String输入框表单
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
                var twoLine = '<sg-input v-model="formXXX1Model.'+prop+'" '+'rows="1" ></sg-input>\n'
                var threeLine = '</sg-form-item>'
                var allLine = oneLine+twoLine+threeLine
                formContent = formContent+allLine+'\n'
                //console.log(allLine)
            }
        }
        //判断Number输入框表单
        if(oldForm_split[0]==='<dw:textInputWithLabel'){
            let oldForm_replace = oldForm_Arr[i];
            if(oldForm_replace.match('dataType="Number') && !oldForm_replace.match('<dw:lovWindow')){
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
                var twoLine = '<sg-input v-model="formXXX1Model.'+prop+'" '+'rows="1" ></sg-input>\n'
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
                if(oldForm_split[i].match('code') || oldForm_split[i].match('dsCode')){
                    var code = oldForm_split[i].split("\"")[1]
                }

            }
            var row1 = '<dw-dropdown code="'+code+'" '
            var row2 = 'label="'+label+'" '+'prop="'+prop+'" '
            var row3 = ':value.sync="formXXX1Model.'+prop+'"'
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
                var twoLine = '<sg-date-picker type="date" placeholder="'+label+'" '+'v-model="formXXX1Model.'+prop+'" '+'format="yyyy-MM-dd" value-format="yyyy-MM-dd"\n'
                var threeLine = 'style="width: 100%;" @change="judgeDateTab1"></sg-date-picker>\n'
                var fourLine = '</sg-form-item>'
                var allLine = oneLine+twoLine+threeLine+fourLine
                formContent = formContent+allLine+'\n'
                //console.log(allLine)
            }
        }
    }

//console.log(modelArr)
    allForm = formStart+formContent+formEnd
    // console.log(formContent)
    // console.log(allForm)
    return allForm
}
//双页面表单二转换
function oldFormTrans2(oldForm) {
//存放整个表单
    var allForm = ''
    var formStart = '<sg-form ref="formXXX2Ref"\n' +
        '                 :model="formXXX2Model"\n' +
        '                 :rules="formXXX2Rules"\n' +
        '                 label-width="150px" :inline="true"\n' +
        '                 label-position="right" size="small">'+'\n'
//表单内容
    var formContent = ''
    var formEnd = '<sg-row>\n' +
        '            <sg-form-item style="float: right">\n' +
        '              <!--<sg-button type="primary" @click="showMore">展示更多</sg-button>-->\n' +
        '              <sg-button type="primary" @click="queryXXX2(\'formXXX2Ref\')">查询</sg-button>\n' +
        '              <sg-button type="primary" @click="resetXXX2Form(\'formXXX2Ref\')">重置</sg-button>\n' +
        '            </sg-form-item>\n' +
        '          </sg-row>\n' +
        '        </sg-form>'
//存放表单绑定变量
    var modelArr = []
//去掉所有<dw:nextLine /> 与<dw:nextLine/>
    oldForm = oldForm.replace(/<dw:nextLine \/>/g,'').replace(/<dw:nextLine\/>/g,'')

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
        //console.log(oldForm_split)

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
            formContent = formContent+'<dw-org-tree label="'+label+'"'+' '+'prop="'+prop+'"'+' '+':value.sync="formXXX2Model.'+prop+'"'+'></dw-org-tree>\n'
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
                var threeLine = 'v-model="formXXX2Model.'+prop+'" '+'\n'
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

        //判断String输入框表单
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
                var twoLine = '<sg-input v-model="formXXX2Model.'+prop+'" '+'rows="1" ></sg-input>\n'
                var threeLine = '</sg-form-item>'
                var allLine = oneLine+twoLine+threeLine
                formContent = formContent+allLine+'\n'
                //console.log(allLine)
            }
        }
        //判断Number输入框表单
        if(oldForm_split[0]==='<dw:textInputWithLabel'){
            let oldForm_replace = oldForm_Arr[i];
            if(oldForm_replace.match('dataType="Number') && !oldForm_replace.match('<dw:lovWindow')){
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
                var twoLine = '<sg-input v-model="formXXX2Model.'+prop+'" '+'rows="1" ></sg-input>\n'
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
                if(oldForm_split[i].match('code') || oldForm_split[i].match('dsCode')){
                    var code = oldForm_split[i].split("\"")[1]
                }

            }
            var row1 = '<dw-dropdown code="'+code+'" '
            var row2 = 'label="'+label+'" '+'prop="'+prop+'" '
            var row3 = ':value.sync="formXXX2Model.'+prop+'"'
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
                var twoLine = '<sg-date-picker type="date" placeholder="'+label+'" '+'v-model="formXXX2Model.'+prop+'" '+'format="yyyy-MM-dd" value-format="yyyy-MM-dd"\n'
                var threeLine = 'style="width: 100%;" @change="judgeDateTab2"></sg-date-picker>\n'
                var fourLine = '</sg-form-item>'
                var allLine = oneLine+twoLine+threeLine+fourLine
                formContent = formContent+allLine+'\n'
                //console.log(allLine)
            }
        }
    }

//console.log(modelArr)
    allForm = formStart+formContent+formEnd
    // console.log(formContent)
    // console.log(allForm)
    return allForm
}


//单页面时的data
function oldFormDataExtract(oldForm){
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
    oldForm = oldForm.replace(/<dw:nextLine \/>/g,'').replace(/<dw:nextLine\/>/g,'')
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
        //console.log(oldForm_split)

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

        //判断String输入框表单
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
        //判断Number输入框表单
        if(oldForm_split[0]==='<dw:textInputWithLabel'){
            let oldForm_replace = oldForm_Arr[i];
            if(oldForm_replace.match('dataType="Number') && !oldForm_replace.match('<dw:lovWindow')){
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
    // console.log(formContent)
    // console.log(allForm)
    var model1 = 'formXXXModel:{'+'\n'
    var model2 = ''
    var model3 = '},'
    for (let i = 0; i < modelArr.length; i++) {
        model2 = model2+modelArr[i]+':'+"'',"+'\n'
    }
    var model = model1+model2+model3

    var allData = ''
    var startData = 'data() {\n' +
        '    return {'+'\n'
    //通用变量dataContent1
    var dataContent1 =
        '      titleTab: "CCC信息",\n' +
        '      tableHeight: null,\n' +
        '      formXXXRules: {\n' +
        '        startTime: [\n' +
        '          { required: true, message: \'请选择日期\', trigger: \'change\' }\n' +
        '        ],\n' +
        '      },\n' +
        '      tableData: [],\n' +
        '      allTableDataTab: [],\n' +
        '      multipleSelection:[],\n'+
        '      currentPageTab:1,\n' +
        '      pageSizeTab:10,\n' +
        '      /*注意，不止一个，可另行添加*/\n' +
        '      optionsYYYId:[],\n' +
        '      //明细页面Form表单展示更多\n' +
        '      showFormMore: false,\n' +
        '      //用于Lov模糊查询存放数据\n' +
        '      dataList: [],'+'\n'+
        '      //表单验证'+'\n'+
        '      // formXXXRules: {\n' +
        '      //   dataDate: [\n' +
        '      //     {required: true, message: \'请选择日期\', trigger: \'change\'}\n' +
        '      //   ],\n' +
        '      // },'+'\n'
    var dataContent = dataContent1+model+'\n'
    var endData = '\n}\n}'


    allData = startData+dataContent
    //console.log(allData)

    return allData
}

//双页面时的data
function oldFormDataExtract2(oldForm){
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
    oldForm = oldForm.replace(/<dw:nextLine \/>/g,'').replace(/<dw:nextLine\/>/g,'')
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
        //console.log(oldForm_split)

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

        //判断String输入框表单
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
        //判断Number输入框表单
        if(oldForm_split[0]==='<dw:textInputWithLabel'){
            let oldForm_replace = oldForm_Arr[i];
            if(oldForm_replace.match('dataType="Number') && !oldForm_replace.match('<dw:lovWindow')){
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
            console.log(prop)
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
    //debugger
    //console.log(modelArr)
    allForm = formStart+formContent+formEnd
    // console.log(formContent)
    // console.log(allForm)
    var model1 = 'formXXX1Model:{'+'\n'
    var model2 = ''
    var model3 = '},'
    for (let i = 0; i < modelArr.length; i++) {
        model2 = model2+modelArr[i]+':'+"'',"+'\n'
    }
    var model = model1+model2+model3

    var allData = ''
    var startData = 'data() {\n' +
        '    return {'+'\n'
    //通用变量dataContent1
    var dataContent1 = 'activeName:\'XXXXX\',\n'+
        '      titleTab1: "CCC信息1",\n' +
        '      titleTab2: "CCC信息2",\n' +
        '      tableHeight: null,\n' +
        '      formXXXRules: {\n' +
        '        startTime: [\n' +
        '          { required: true, message: \'请选择日期\', trigger: \'change\' }\n' +
        '        ],\n' +
        '      },\n' +
        '      tableData1: [],\n' +
        '      allTableDataTab1: [],\n' +
        '      multipleSelection:[],\n'+
        '      currentPageTab1:1,\n' +
        '      pageSizeTab1:10,\n' +
        '      tableData2: [],\n' +
        '      allTableDataTab2: [],\n' +
        '      currentPageTab2:1,\n' +
        '      pageSizeTab2:10,\n' +
        '      /*注意，不止一个，可另行添加*/\n' +
        '      optionsYYYId:[],\n' +
        '      //明细页面Form表单展示更多\n' +
        '      showFormMore: false,\n' +
        '      //用于Lov模糊查询存放数据\n' +
        '      dataList: [],'+'\n'+
    '      //表单验证'+'\n'+
    '      // formXXX1Rules: {\n' +
    '      //   dataDate: [\n' +
    '      //     {required: true, message: \'请选择日期\', trigger: \'change\'}\n' +
    '      //   ],\n' +
    '      // },'+'\n'+
    '      // formXXX2Rules: {\n' +
    '      //   dataDate: [\n' +
    '      //     {required: true, message: \'请选择日期\', trigger: \'change\'}\n' +
    '      //   ],\n' +
    '      // },'+'\n'
    var dataContent = dataContent1+model+'\n'+'formXXX2Model:{\n' +''+'\n'+
        '},'+'\n'
    var endData = '\n}\n}'


    allData = startData+dataContent
    //console.log(allData)

    return allData
}

//单页方法
function oldFormMethodsExtract(){
    var allMethods = ''
    var startMethod = '  mounted() {\n' +
        '    /*\n' +
        '    * 自动调整表格高度\n' +
        '    * heightName表格高度属性名 string\n' +
        '    * tableClass 表格外层div的类名（获取外层高度使用） string\n' +
        '    * */\n' +
        '    this._resizeHeight_("tableHeight");\n' +
        '  },\n' +
        '  methods:  {'+'\n'
    var methodContent = '//表格多选回调\n' +
        '    handleSelectionChange(val){\n' +
        '       this.multipleSelection = val;//实时保存表格选中数据\n' +
        '    },\n' +
        '    //明细页面--查询展示更多\n' +
        '    showMore() {\n' +
        '      if (this.showFormMore == false){\n' +
        '        this.showFormMore = true\n' +
        '        return\n' +
        '      }\n' +
        '      this.showFormMore = false\n' +
        '    },\n' +
        '    //获取日期\n' +
        '    getDay(day){\n' +
        '      let today = new Date();\n' +
        '      let targetDay_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;\n' +
        '      today.setTime(targetDay_milliseconds);\n' +
        '      let tYear = today.getFullYear();\n' +
        '      let tMonth = today.getMonth();\n' +
        '      let tDate = today.getDate();\n' +
        '      tMonth = this.doHandleMonth(tMonth + 1);\n' +
        '      tDate = this.doHandleMonth(tDate);\n' +
        '      return tYear + "-" + tMonth + "-" + tDate;\n' +
        '    },\n' +
        '    doHandleMonth(month){\n' +
        '      let m = month;\n' +
        '      if (month.toString().length == 1) {\n' +
        '        m = "0" + month;\n' +
        '      }\n' +
        '      return m;\n' +
        '    },\n' +
        '    //日期判断\n' +
        '    judgeDateTab(val) {\n' +
        '      let tmp = val\n' +
        '      let dateTmp = this.getDay(0)\n' +
        '      if (tmp > dateTmp){\n' +
        '        this.$message({\n' +
        '          showClose: true,\n' +
        '          message: \'所选日期不能大于当前日期\',\n' +
        '          type: \'error\'\n' +
        '        });\n' +
        '        this.formCollAbnormalDetailModel.dataDate = dateTmp\n' +
        '      }\n' +
        '    },\n' +
        '    //切换每页展示条数时回调\n' +
        '    handleSizeChangeTab(val) {\n' +
        '      this.pageSizeTab=val\n' +
        '      this.$showTable("allTableDataTab","tableData","currentPageTab","pageSizeTab")\n' +
        '    },\n' +
        '    //切换页码时触发的回调\n' +
        '    handleCurrentChangeTab(val) {\n' +
        '      this.currentPageTab=val\n' +
        '      this.$showTable("allTableDataTab","tableData","currentPageTab","pageSizeTab")\n' +
        '    },\n' +
        '    //查询子单位数据\n' +
        '    queryDetail(row){\n' +
        '      this.formXXXModel.orgNo = row.orgNo;\n' +
        '      this.queryXXX(\'formXXXRef\');\n' +
        '    },\n' +
        '    //YYY编号模糊查询\n' +
        '    queryYYYId(query) {\n' +
        '      if (query !== \'\'&&query.length>=3) {\n' +
        '        this.loading = true;\n' +
        '        setTimeout(() => {\n' +
        '          this.$post(this.globalAPI.queryYYYId.url, {terminalId:query})\n' +
        '              .then((res) =>{\n' +
        '                this.dataList=res\n' +
        '                this.loading = false;\n' +
        '                this.optionsYYYId = this.dataList.map(item => {\n' +
        '                  return { value: `${item.terminalId}`, label: `${item.terminalId}`+\'-\'+`${item.terminalName}`};\n' +
        '                });\n' +
        '              })\n' +
        '              .catch((error) =>{\n' +
        '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
        '              });\n' +
        '        }, 200);\n' +
        '      } else {\n' +
        '        this.optionsYYYId = [];\n' +
        '      }\n' +
        '    },\n' +
        '    //选择YYY编号时替换对应的其他表单的名称\n' +
        '    replaceOtherName(value){\n' +
        '      this.dataList.map(item =>{\n' +
        '        if(item.terminalId==value) {\n' +
        '          this.formXXXModel.terminalName = item.terminalName\n' +
        '        }\n' +
        '      })\n' +
        '    },\n' +
        '    //查询\n' +
        '    queryXXX(formName){\n' +
        '      this.$refs[formName].validate((valid) => {\n' +
        '        if (valid) {\n' +
        '          this.$post(this.globalAPI.queryXXX.url, this.formXXXModel)\n' +
        '              .then((res) =>{\n' +
        '                this.allTableDataTab=res\n' +
        '                this.$showTable("allTableDataTab","tableData","currentPageTab","pageSizeTab")\n' +
        '              })\n' +
        '              .catch((error) =>{\n' +
        '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
        '              });\n' +
        '        } else {\n' +
        '          console.log(\'查询错误!!\');\n' +
        '          return false;\n' +
        '        }\n' +
        '      });\n' +
        '    },\n' +
        '    //重置\n' +
        '    resetXXXForm(formName) {\n' +
        '      this.$refs[formName].resetFields();\n' +
        '    },'
    var endMethod = '\n'+'}'

    allMethods = startMethod + methodContent
    //console.log(allMethods)
    return allMethods
}

//双页方法
function oldFormMethodsExtract2(){
    var allMethods = ''
    var startMethod = '  mounted() {\n' +
        '    /*\n' +
        '    * 自动调整表格高度\n' +
        '    * heightName表格高度属性名 string\n' +
        '    * tableClass 表格外层div的类名（获取外层高度使用） string\n' +
        '    * */\n' +
        '    this._resizeHeight_("tableHeight");\n' +
        '  },\n' +
        '  methods:  {'+'\n'
    var methodContent = '//表格多选回调\n' +
        '    handleSelectionChange(val){\n' +
        '       this.multipleSelection = val;//实时保存表格选中数据\n' +
        '    },\n' +
        '    //明细页面--查询展示更多\n' +
        '    showMore() {\n' +
        '      if (this.showFormMore == false){\n' +
        '        this.showFormMore = true\n' +
        '        return\n' +
        '      }\n' +
        '      this.showFormMore = false\n' +
        '    },\n' +
        '    //获取日期\n' +
        '    getDay(day){\n' +
        '      let today = new Date();\n' +
        '      let targetDay_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;\n' +
        '      today.setTime(targetDay_milliseconds);\n' +
        '      let tYear = today.getFullYear();\n' +
        '      let tMonth = today.getMonth();\n' +
        '      let tDate = today.getDate();\n' +
        '      tMonth = this.doHandleMonth(tMonth + 1);\n' +
        '      tDate = this.doHandleMonth(tDate);\n' +
        '      return tYear + "-" + tMonth + "-" + tDate;\n' +
        '    },\n' +
        '    doHandleMonth(month){\n' +
        '      let m = month;\n' +
        '      if (month.toString().length == 1) {\n' +
        '        m = "0" + month;\n' +
        '      }\n' +
        '      return m;\n' +
        '    },\n' +
        '    //日期判断\n' +
        '    judgeDateTab1(val) {\n' +
        '      let tmp = val\n' +
        '      let dateTmp = this.getDay(0)\n' +
        '      if (tmp > dateTmp){\n' +
        '        this.$message({\n' +
        '          showClose: true,\n' +
        '          message: \'所选日期不能大于当前日期\',\n' +
        '          type: \'error\'\n' +
        '        });\n' +
        '        this.formCollAbnormalDetailModel.dataDate = dateTmp\n' +
        '      }\n' +
        '    },\n' +
        '    judgeDateTab2(val) {\n' +
        '      let tmp = val\n' +
        '      let dateTmp = this.getDay(0)\n' +
        '      if (tmp > dateTmp){\n' +
        '        this.$message({\n' +
        '          showClose: true,\n' +
        '          message: \'所选日期不能大于当前日期\',\n' +
        '          type: \'error\'\n' +
        '        });\n' +
        '        this.formCollAbnormalDetailModel.dataDate = dateTmp\n' +
        '      }\n' +
        '    },\n' +
        '    //切换每页展示条数时回调\n' +
        '    handleSizeChangeTab1(val) {\n' +
        '      this.pageSizeTab1=val\n' +
        '      this.$showTable("allTableDataTab1","tableData1","currentPageTab1","pageSizeTab1")\n' +
        '    },\n' +
        '    //切换页码时触发的回调\n' +
        '    handleCurrentChangeTab1(val) {\n' +
        '      this.currentPageTab1=val\n' +
        '      this.$showTable("allTableDataTab1","tableData1","currentPageTab1","pageSizeTab1")\n' +
        '    },\n' +
        '    //切换每页展示条数时回调\n' +
        '    handleSizeChangeTab2(val) {\n' +
        '      this.pageSizeTab2=val\n' +
        '      this.$showTable("allTableDataTab2","tableData2","currentPageTab2","pageSizeTab2")\n' +
        '    },\n' +
        '    //切换页码时触发的回调\n' +
        '    handleCurrentChangeTab2(val) {\n' +
        '      this.currentPageTab2=val\n' +
        '      this.$showTable("allTableDataTab2","tableData2","currentPageTab2","pageSizeTab2")\n' +
        '    },\n' +
        '    //查询子单位数据\n' +
        '    queryDetail(row){\n' +
        '      this.formXXXModel.orgNo = row.orgNo;\n' +
        '      this.queryXXX(\'formXXXRef\');\n' +
        '    },\n' +
        '    //YYY编号模糊查询\n' +
        '    queryYYYId(query) {\n' +
        '      if (query !== \'\'&&query.length>=3) {\n' +
        '        this.loading = true;\n' +
        '        setTimeout(() => {\n' +
        '          this.$post(this.globalAPI.queryYYYId.url, {terminalId:query})\n' +
        '              .then((res) =>{\n' +
        '                this.dataList=res\n' +
        '                this.loading = false;\n' +
        '                this.optionsYYYId = this.dataList.map(item => {\n' +
        '                  return { value: `${item.terminalId}`, label: `${item.terminalId}`+\'-\'+`${item.terminalName}`};\n' +
        '                });\n' +
        '              })\n' +
        '              .catch((error) =>{\n' +
        '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
        '              });\n' +
        '        }, 200);\n' +
        '      } else {\n' +
        '        this.optionsYYYId = [];\n' +
        '      }\n' +
        '    },\n' +
        '    //选择YYY编号时替换对应的其他表单的名称\n' +
        '    replaceOtherName(value){\n' +
        '      this.dataList.map(item =>{\n' +
        '        if(item.terminalId==value) {\n' +
        '          this.formXXXModel.terminalName = item.terminalName\n' +
        '        }\n' +
        '      })\n' +
        '    },\n' +
        '    //查询1\n' +
        '    queryXXX1(formName){\n' +
        '      this.$refs[formName].validate((valid) => {\n' +
        '        if (valid) {\n' +
        '          this.$post(this.globalAPI.queryXXX1.url, this.formXXX1Model)\n' +
        '              .then((res) =>{\n' +
        '                this.allTableDataTab1=res\n' +
        '                this.$showTable("allTableDataTab1","tableData1","currentPageTab1","pageSizeTab1")\n' +
        '              })\n' +
        '              .catch((error) =>{\n' +
        '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
        '              });\n' +
        '        } else {\n' +
        '          console.log(\'查询错误!!\');\n' +
        '          return false;\n' +
        '        }\n' +
        '      });\n' +
        '    },\n' +
        '    //重置1\n' +
        '    resetXXX1Form(formName) {\n' +
        '      this.$refs[formName].resetFields();\n' +
        '    },'+
        '    //查询2\n' +
        '    queryXXX2(formName){\n' +
        '      this.$refs[formName].validate((valid) => {\n' +
        '        if (valid) {\n' +
        '          this.$post(this.globalAPI.queryXXX2.url, this.formXXX2Model)\n' +
        '              .then((res) =>{\n' +
        '                this.allTableDataTab2=res\n' +
        '                this.$showTable("allTableDataTab2","tableData2","currentPageTab2","pageSizeTab2")\n' +
        '              })\n' +
        '              .catch((error) =>{\n' +
        '                this.$alert("数据有误"+error);       //请求失败返回的数据\n' +
        '              });\n' +
        '        } else {\n' +
        '          console.log(\'查询错误!!\');\n' +
        '          return false;\n' +
        '        }\n' +
        '      });\n' +
        '    },\n' +
        '    //重置\n' +
        '    resetXXX2Form(formName) {\n' +
        '      this.$refs[formName].resetFields();\n' +
        '    },'
    var endMethod = '\n'+'}'

    allMethods = startMethod + methodContent
    //console.log(allMethods)
    return allMethods
}
