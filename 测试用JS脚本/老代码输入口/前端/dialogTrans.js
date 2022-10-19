function dialogTrans(inputNameChinese,inputNameEnglish){
    // var inputNameChinese = ''
    // var inputNameEnglish= ''
    var comments = '<!--'+inputNameChinese+'对话框-->'+'\n'
    var dialog = '<sg-dialog\n' +
        '            title="'+inputNameChinese+'"\n' +
        '            :visible.sync="dialogVisible'+inputNameEnglish+'"\n' +
        '            width="62%">\n' +
        '            <sg-card>'+inputNameChinese+'</sg-card>\n' +
        '        </sg-dialog>'
    var allDialog = comments+dialog
    //console.log(comments+dialog)
    return allDialog
}
//对话框用到的data变量
function dialogTransUseData(inputNameChinese,inputNameEnglish){
    // var inputNameChinese = ''
    // var inputNameEnglish= ''
    var comments = '<!--'+inputNameChinese+'对话框-->'+'\n'
    var dialog = '<sg-dialog\n' +
        '            title="'+inputNameChinese+'"\n' +
        '            :visible.sync="dialogVisible'+inputNameEnglish+'"\n' +
        '            width="62%">\n' +
        '            <sg-card>'+inputNameChinese+'</sg-card>\n' +
        '        </sg-dialog>'
    var allDialog = comments+dialog
    var dialogData = '//' +inputNameChinese+'对话框标志位'+'\n'+
                     'dialogVisible'+inputNameEnglish+':false,\n'
    //console.log(comments+dialog)
    return dialogData
}