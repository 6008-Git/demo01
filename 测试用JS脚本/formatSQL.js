
var sql='select * from(\n' +
    'SELECT TO_NUMBER(CBH.SN) ID, TO_NUMBER(CBH.AGENC_NO) PID, CBH.HALL_NAME name\n' +
    '  FROM C_BUSINESS_HALL CBH UNION ALL SELECT TO_NUMBER(O.ORG_NO) ID,\n' +
    '       TO_NUMBER(O.P_ORG_NO) PID,\n' +
    '       O.ORG_NAME name\n' +
    '  FROM O_ORG O\n' +
    ' WHERE O.ORG_TYPE != \'06\'\n' +
    '   AND O.ORG_TYPE != \'04\') t\n' +
    '   order by t.pid asc'
let split = sql.split("\n");
//console.log(split)
for (let i = 0; i < split.length; i++) {
    console.log("sb.append(\""+" "+split[i]+" "+"\");")
}


var newForm1='<sg-form-item label="处理人员ID" prop="handleId">\n' +
    '          <sg-select filterable remote reserve-keyword placeholder="请输入"\n' +
    '              v-model="formSiteSurveyModel.handleId"\n' +
    '              @change="replaceTerminalName"\n' +
    '              :remote-method="queryTerminalId"\n' +
    '              :loading="loading">\n' +
    '            <sg-option\n' +
    '                v-for="item in optionsTerminalId"\n' +
    '                :label="item.label"\n' +
    '                :value="item.value"\n' +
    '                :key="item.value"\n' +
    '            ></sg-option>\n' +
    '          </sg-select>\n' +
    '        </sg-form-item>'



