var org_no = '5010501'

console.log(org_no.slice(0,5))

var data =[
    {
        "aaa105": "1",
        "aaa102": "0101",
        "aaa103": "提前开门"
    },
    {
        "aaa105": "1",
        "aaa102": "0102",
        "aaa103": "晚开门"
    },
    {
        "aaa105": "1",
        "aaa102": "0103",
        "aaa103": "提前关门"
    },
    {
        "aaa105": "1",
        "aaa102": "0104",
        "aaa103": "晚关门"
    },
    {
        "aaa105": "2",
        "aaa102": "02",
        "aaa103": "排队异常"
    },
    {
        "aaa105": "3",
        "aaa102": "03",
        "aaa103": "打架斗殴"
    },
    {
        "aaa105": "4",
        "aaa102": "04",
        "aaa103": "上访聚集"
    },
    {
        "aaa105": "5",
        "aaa102": "05",
        "aaa103": "堆积倒地 "
    },
    {
        "aaa105": "6",
        "aaa102": "06",
        "aaa103": "业务办理超时"
    },
    {
        "aaa105": "7",
        "aaa102": "07",
        "aaa103": "离岗"
    },
    {
        "aaa105": "8",
        "aaa102": "08",
        "aaa103": "服务质量不满"
    }
]


var parentToChil={}
var subChange={}
for (let i = 0; i < data.length; i++) {
     parentToChil[data[i].aaa102]=data[i].aaa105
     subChange[data[i].aaa102]=data[i].aaa103
}
console.log(parentToChil)
console.log(subChange)


