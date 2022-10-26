var date = '2022-10-24'

function getMonthDates(date){
    var year = date.split('-')[0]
    var month = date.split('-')[1]
    var d = new Date(year, month, 0);
    let daysNum = d.getDate();
    var daysArr = [];
    for (let i = 0; i < daysNum; i++) {
        daysArr.push(i+'日')
    }
    return daysArr
}

let monthDates = getMonthDates(date);
//console.log(monthDates)
function getWeeks(date) {
    var year = date.split('-')[0]
    var month = date.split('-')[1]
    var d = new Date();
    // 该月第一天
    d.setFullYear(year, month-1, 1);
    var w1 = d.getDay();
    if (w1 === 0) w1 = 7;
    // 该月天数
    d.setFullYear(year, month, 0);
    var dd = d.getDate();
    // 第一个周一
    let d1;
    if (w1 !== 1) d1 = 7 - w1 + 2;
    else d1 = 1;
    let week_count = Math.ceil((dd-d1+1)/7);
    var weeksArr = [];
    for (let i = 1; i <=week_count; i++) {
        weeksArr.push(i+'周')
    }
    return weeksArr
}

let weeks = getWeeks('2020-10-02');
console.log(weeks)
