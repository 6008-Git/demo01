
var sql='SELECT T.AAA102, T.AAA105\n' +
    '  FROM AA10 T\n' +
    ' WHERE T.AAA105 IS NOT NULL\n' +
    '   AND 1 = 1'
let split = sql.split("\n");
//console.log(split)
for (let i = 0; i < split.length; i++) {
    console.log("sb.append(\""+split[i]+"\");")
}
