var inputNameChinese = ''
var inputNameEnglish= ''
var comments = '<!--'+inputNameChinese+'对话框-->'+'\n'
var dialog = '<sg-dialog\n' +
    '            title="'+inputNameChinese+'"\n' +
    '            :visible.sync="dialogVisible'+inputNameEnglish+'"\n' +
    '            width="62%">\n' +
    '            <sg-card>'+inputNameChinese+'</sg-card>\n' +
    '        </sg-dialog>'

console.log(comments+dialog)


