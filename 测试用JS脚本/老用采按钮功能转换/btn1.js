var oldBtn = '<dw:button name="queryButton" value="查询"\n' +
    '\t\t\t\tonclick="querySiteSurvey()" keyAssist="Q"></dw:button>\n' +
    '\t\t\t<dw:button name="resetButton" value="清空"\n' +
    '\t\t\t\tonclick="resetSiteSurvey()" keyAssist="P"></dw:button>'

//去掉所有制表符
oldBtn = oldBtn.replace(/\t/g,'')
//console.log(oldBtn)

//去掉所有换行符,并以空格代替
oldBtn = oldBtn.replace(/\n/g,' ')
//console.log(oldBtn)

//在所有’></‘的><添加空格
oldBtn = oldBtn.replace(/><\//g,'> <\/')
//console.log(oldBtn)

//第1种方法，遍历数组
//只在标签末尾添加换行符
//1、以空格分割字符，得到数组
let oldBtn_Arr = oldBtn.split(" ");
//console.log(oldBtn_Arr)

//2、遍历数组，拿到含有结尾标签的元素内容
for (let i = 0; i < oldBtn_Arr.length; i++) {
    if(oldBtn_Arr[i].match('</dw:')){
        //console.log(oldBtn_Arr[i])
//3、除了</dw:lovWindow>外，在末尾全加上换行符
        if(!oldBtn_Arr[i].match('</dw:lovWindow')){
            oldBtn_Arr[i]=oldBtn_Arr[i].replace('>','>'+'\n')
        }
    }
}
//console.log(oldBtn_Arr)

//数组变回字符串---得到一行为单位的标签数据
oldBtn  = oldBtn_Arr.join(' ');
//console.log(oldBtn)

//以换行符重新分割---得到新数组
oldBtn_Arr = oldBtn.split('\n')
//console.log(oldBtn_Arr)

//存放新的btn标签
var newBtn1 = ''
var newBtn2 = ''
var newBtn3 = ''
var newBtn = ''
//遍历数组，提取内容，得到新的方法与对应button标签
for (let i = 0; i < oldBtn_Arr.length; i++) {
    //每条数据以空格分割
    let oldForm_split = oldBtn_Arr[i].split(" ");
    //console.log(oldForm_split)
    //去除数组的空元素
    oldForm_split=oldForm_split.filter((item)=>{
        return item && item.trim();
    })
    //oldForm_split就是单个数据标签，输出多个是因为在循环里面
    //console.log(oldForm_split)

    //判断button
    if(oldForm_split[0]==='<dw:button'){
        for (let i = 0; i < oldForm_split.length; i++) {
            //onclick标签内容
            if(oldForm_split[i].match('onclick')){
                var methodsName = oldForm_split[i].split("\"")[1]
                //新的btn标签
                // <sg-button type="primary" @click="addSiteCheck()" size="small">现场对时人工登记</sg-button>
                newBtn1 = '<sg-button type="primary" @click="'
                newBtn2 = '" size="small">'
                newBtn3 = '</sg-button>'
            }
            //value标签内容
            if(oldForm_split[i].match('value')){
                var btnName = oldForm_split[i].split("\"")[1]
            }
        }
        newBtn = newBtn1+methodsName+newBtn2+btnName+newBtn3
        console.log(newBtn)
        //console.log(methodsName+' :'+btnName)
    }
}