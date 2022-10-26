//文件总结，先从整体下手，在确定各模块需要什么
//比如此文件，应该先从整体遍历下手，一点点往内层测试

/*真实数据库联查数据*/
var dataDB=[
    {
        "aaa102": "0103",
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:05:31】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATX6AGlTgAABHFsmCuA067.jpeg",
        "alarm_time": "2022-08-30 11:05:31",
        "alarm_type": "01",
        "alarm_type_sum": "1",
        "alarm_vdo": null,
        "eventcount": 6,
        "eventsub": "提前关门",
        "fileid": "group1",
        "typecode": "1"
    },
    {
        "aaa102": "02",
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:07:07】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATd6ABrQxAABH7rfHRJg55.jpeg",
        "alarm_time": "2022-08-30 11:05:31",
        "alarm_type": "02",
        "alarm_type_sum": "2",
        "alarm_vdo": null,
        "eventcount": 8,
        "eventsub": "排队异常",
        "fileid": "group1",
        "typecode": "2"
    },
    {
        "aaa102": "02",
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:07:01】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATdiAVO1BAABFyc8NItw93.jpeg",
        "alarm_time": "2022-08-30 11:05:31",
        "alarm_type": "02",
        "alarm_type_sum": "2",
        "alarm_vdo": null,
        "eventcount": 8,
        "eventsub": "排队异常",
        "fileid": "group1",
        "typecode": "2"
    },
    {
        "aaa102": "0102",
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 00:00:00】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATX2ASNnsAABGRPIklYU50.jpeg",
        "alarm_time": "2022-08-30 00:00:00",
        "alarm_type": "0102",
        "alarm_type_sum": "1",
        "alarm_vdo": null,
        "eventcount": 6,
        "eventsub": "晚开门",
        "fileid": "group1",
        "typecode": "1"
    },
    {
        "aaa102": "02",
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:07:00】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATdeAVoKPAAABrecjhcI79.jpeg",
        "alarm_time": "2022-08-30 11:05:31",
        "alarm_type": "02",
        "alarm_type_sum": "2",
        "alarm_vdo": null,
        "eventcount": 8,
        "eventsub": "排队异常",
        "fileid": "group1",
        "typecode": "2"
    },
    {
        "aaa102": "0104",
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:59:59】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATZOAKNE6AABGcNyv-1M00.jpeg",
        "alarm_time": "2022-08-30 11:59:59",
        "alarm_type": "0104",
        "alarm_type_sum": "1",
        "alarm_vdo": null,
        "eventcount": 6,
        "eventsub": "晚关门",
        "fileid": "group1",
        "typecode": "1"
    }
];


//add by lk 2022/08/25  start
var totalDB = dataDB.length;//数据总数
//测试1，渲染全部数据，不加条件，先都是黄色---成功
//测试2，渲染全部数据，根据数量条件，渲染不同颜色---成功
//1.遍历所有数据
//单条数据

var oneDataDB=
    {
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:59:59】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATZOAKNE6AABGcNyv-1M00.jpeg",
        "alarm_time": null,
        "alarm_type": "0104",
        "alarm_vdo": null,
        "org_no":"504020501"
    }
var oneDataDB1=
    {
        "alarm_hall": null,
        "alarm_msg": "单位【重庆市总公司】于【2022-08-30 11:59:59】疑似有物品遗留，请核实！",
        "alarm_org": null,
        "alarm_pic": "M00/02/AE/CgE88WMATZOAKNE6AABGcNyv-1M00.jpeg",
        "alarm_time": "2022-08-30 11:59:59",
        "alarm_type": "02",
        "alarm_vdo": null,
        "org_no":"504020401"
    }
//前端对应子类型解析
var subChange={
    "0101":"提前开门",
    "0102":"晚开门",
    "0103":"提前关门",
    "0104":"晚关门",
    "02":"排队异常",
    "03":"打架斗殴",
    "04":"上访聚集",
    "05":"堆积倒地 ",
    "06":"业务办理超时",
    "07":"离岗",
    "08":"服务质量不满",
}
//前端大类与小类映射
//前端大类与小类映射
var parentToChil={
    "0101":"1",
    "0102":"1",
    "0103":"1",
    "0104":"1",
    "02":"2",
    "03":"3",
    "04":"4",
    "05":"5 ",
    "06":"6",
    "07":"7",
    "08":"8",
}



//单条数据分类
function getOneEvent(data) {
    let rightDom = document.getElementById("right_list");
    /*if (oneDataDB.eventcount <= 20) {*/
        //2.根据数量，为列节点创建颜色子节点(内含间隔子节点)
        /*更换颜色子节点为li*/
        let yellowDiv = document.createElement("li");
        //7.为颜色子节点增加点击事件
        yellowDiv.onclick=function () {
            //单条数据显示
            openDialog(data);
        };
        rightDom.appendChild(yellowDiv);
        //3.更改颜色节点的样式
        yellowDiv.className = "right_row_yellow";
        //4.为颜色子节点创建上下两个文本子节点
        let textDivLeftTop = document.createElement("div");
        yellowDiv.appendChild(textDivLeftTop);
        let textDivRightTop = document.createElement("div");
        yellowDiv.appendChild(textDivRightTop);
        let textDivButtom = document.createElement("div");
        yellowDiv.appendChild(textDivButtom);
        //5.更改文本子节点的样式
        textDivLeftTop.className = "right_col_leftTop";
        textDivRightTop.className = "right_col_rightTop";
        textDivButtom.className = "right_col_buttom";
        //6.文本子节点赋值
        var alarmTypeSub = data.alarm_type;
        textDivLeftTop.innerText = subChange[alarmTypeSub];
        debugger;
        textDivRightTop.innerText = checkInner(data.alarm_time).length>3?checkInner(data.alarm_time).slice(10,16):checkInner(data.alarm_time)
        textDivButtom.innerText = data.alarm_msg;
        //将新增的颜色li放到第一位
        ul.insertBefore(yellowDiv,ul.firstElementChild)
    /*}
    else if (oneDataDB.eventcount > 20 && oneDataDB.eventcount <= 60) {
        /!*颜色子节点*!/
        let orangeDiv = document.createElement("li");
        //7.为颜色子节点增加点击事件
        orangeDiv.onclick=function () {
            //单条数据显示
            openDialog(oneDataDB);
        };
        rightDom.appendChild(orangeDiv);
        //3.更改颜色节点的样式
        orangeDiv.className = "right_row_orange";
        //4.为颜色子节点创建上下两个文本子节点
        let textDivLeftTop = document.createElement("div");
        orangeDiv.appendChild(textDivLeftTop);
        let textDivRightTop = document.createElement("div");
        orangeDiv.appendChild(textDivRightTop);
        let textDivButtom = document.createElement("div");
        orangeDiv.appendChild(textDivButtom);
        //5.更改文本子节点的样式
        textDivLeftTop.className = "right_col_leftTop";
        textDivRightTop.className = "right_col_rightTop";
        textDivButtom.className = "right_col_buttom";
        //6.文本子节点赋值
        textDivLeftTop.innerText = oneDataDB.alarm_type_sub;
        textDivRightTop.innerText = oneDataDB.alarm_time.slice(10,16);
        textDivButtom.innerText = oneDataDB.alarm_msg;
        //将新增的颜色li放到第一位
        ul.insertBefore(orangeDiv,ul.firstElementChild)
    }
    else if (oneDataDB.eventcount >= 60) {
        /!*颜色子节点*!/
        let redDiv = document.createElement("li");
        //7.为颜色子节点增加点击事件
        redDiv.onclick=function () {
            //单条数据显示
            openDialog(oneDataDB);
        };
        rightDom.appendChild(redDiv);
        //3.更改颜色节点的样式
        redDiv.className = "right_row_red";
        //4.为颜色子节点创建左上、右上、下方三个文本子节点
        let textDivLeftTop = document.createElement("div");
        redDiv.appendChild(textDivLeftTop);
        let textDivRightTop = document.createElement("div");
        redDiv.appendChild(textDivRightTop);
        let textDivButtom = document.createElement("div");
        redDiv.appendChild(textDivButtom);
        //5.更改文本子节点的样式
        textDivLeftTop.className = "right_col_leftTop";
        textDivRightTop.className = "right_col_rightTop";
        textDivButtom.className = "right_col_buttom";
        //6.文本子节点赋值
        textDivLeftTop.innerText = oneDataDB.alarm_type_sub;
        textDivRightTop.innerText = oneDataDB.alarm_time.slice(10,16);
        textDivButtom.innerText = oneDataDB.alarm_msg;
        //将新增的颜色li放到第一位
        ul.insertBefore(redDiv,ul.firstElementChild)
    }*/
}
//全部数据分类
function getEvent() {
    for (let i = 0; i < totalDB; i++) {
        let rightDom = document.getElementById("right_list");
        /*if (dataDB[i].eventcount <= 20) {*/
            /*更换颜色子节点为li*/
            let yellowDiv = document.createElement("li");
            //7.为颜色子节点增加点击事件
            yellowDiv.onclick=function () {
                //单条数据显示
                openDialog(dataDB[i]);
            };
            rightDom.appendChild(yellowDiv);
            //3.更改颜色节点的样式
            yellowDiv.className = "right_row_yellow";
            //4.为颜色子节点创建上下两个文本子节点
            let textDivLeftTop = document.createElement("div");
            yellowDiv.appendChild(textDivLeftTop);
            let textDivRightTop = document.createElement("div");
            yellowDiv.appendChild(textDivRightTop);
            let textDivButtom = document.createElement("div");
            yellowDiv.appendChild(textDivButtom);
            //5.更改文本子节点的样式
            textDivLeftTop.className = "right_col_leftTop";
            textDivRightTop.className = "right_col_rightTop";
            textDivButtom.className = "right_col_buttom";
            //6.文本子节点赋值
            var alarmTypeSub = dataDB[i].alarm_type;
        textDivLeftTop.innerText =((!alarmTypeSub || alarmTypeSub===null)?"--":(!subChange[alarmTypeSub]?"--":subChange[alarmTypeSub]));

        //textDivLeftTop.innerText = subChange[alarmTypeSub];
            textDivRightTop.innerText = dataDB[i].alarm_time.slice(10,16);
            textDivButtom.innerText = dataDB[i].alarm_msg;
       /* }
        else if (dataDB[i].eventcount > 20 && dataDB[i].eventcount <= 60) {
            /!*颜色子节点*!/
            let orangeDiv = document.createElement("li");
            //7.为颜色子节点增加点击事件
            orangeDiv.onclick=function () {
                //单条数据显示
                openDialog(dataDB[i]);
            };
            rightDom.appendChild(orangeDiv);
            //3.更改颜色节点的样式
            orangeDiv.className = "right_row_orange";
            //4.为颜色子节点创建上下两个文本子节点
            let textDivLeftTop = document.createElement("div");
            orangeDiv.appendChild(textDivLeftTop);
            let textDivRightTop = document.createElement("div");
            orangeDiv.appendChild(textDivRightTop);
            let textDivButtom = document.createElement("div");
            orangeDiv.appendChild(textDivButtom);
            //5.更改文本子节点的样式
            textDivLeftTop.className = "right_col_leftTop";
            textDivRightTop.className = "right_col_rightTop";
            textDivButtom.className = "right_col_buttom";
            //6.文本子节点赋值
            textDivLeftTop.innerText = dataDB[i].alarm_type_sub;
            textDivRightTop.innerText = dataDB[i].alarm_time.slice(10,16);
            textDivButtom.innerText = dataDB[i].alarm_msg;
        }
        else if (dataDB[i].eventcount >= 60) {
            /!*颜色子节点*!/
            let redDiv = document.createElement("li");
            //7.为颜色子节点增加点击事件
            redDiv.onclick=function () {
                //单条数据显示
                openDialog(dataDB[i]);
            };
            rightDom.appendChild(redDiv);
            //3.更改颜色节点的样式
            redDiv.className = "right_row_red";
            //4.为颜色子节点创建左上、右上、下方三个文本子节点
            let textDivLeftTop = document.createElement("div");
            redDiv.appendChild(textDivLeftTop);
            let textDivRightTop = document.createElement("div");
            redDiv.appendChild(textDivRightTop);
            let textDivButtom = document.createElement("div");
            redDiv.appendChild(textDivButtom);
            //5.更改文本子节点的样式
            textDivLeftTop.className = "right_col_leftTop";
            textDivRightTop.className = "right_col_rightTop";
            textDivButtom.className = "right_col_buttom";
            //6.文本子节点赋值
            textDivLeftTop.innerText = dataDB[i].alarm_type_sub;
            textDivRightTop.innerText = dataDB[i].alarm_time.slice(10,16);
            textDivButtom.innerText = dataDB[i].alarm_msg;
        }*/
    }
}
//获取并分类所有数据
getEvent();

//打开弹窗事件
function openDialog(oneData){
    //打开弹窗
    $("#warn_alert").css('display','inline');
    //弹窗赋值

    //var alarmTypeSub = oneData.alarm_type;
    document.getElementById("alarm_type").innerText=
        ((!oneData.alarm_type || oneData.alarm_type===null)?"--":(!subChange[oneData.alarm_type]?"--":subChange[oneData.alarm_type]));
    document.getElementById("alarm_time").innerText=
        ((!oneData.alarm_time || oneData.alarm_time===null)?"--":oneData.alarm_time);
    document.getElementById("alarm_org").innerText=
        ((!oneData.alarm_org || oneData.alarm_org===null)?"--":oneData.alarm_org);
    document.getElementById("alarm_hall").innerText=
        ((!oneData.alarm_hall || oneData.alarm_hall===null)?"--":oneData.alarm_hall);
    //document.getElementById("alarm_pic").innerText=((!oneData.alarm_pic || oneData.alarm_pic===null)?"--":oneData.alarm_pic);
    //document.getElementById("alarm_vdo").innerText=((!oneData.alarm_vdo || oneData.alarm_vdo===null)?"--":oneData.alarm_vdo);
    document.getElementById("alarm_msg").innerText=
        ((!oneData.alarm_msg || oneData.alarm_msg===null)?"--":oneData.alarm_msg);
    //图片地址
    document.getElementById("warnEvent").src="http://10.1.60.241/"+oneData.fileid+"/"+oneData.alarm_pic+"?random="+Math.floor(Math.random()*10000+99999)-10000;
}
function checkInner(data){
    if(!data || data===null){
        return "--"
    }else{
        return data;
    }
}

//格式化所有数据，等待下一次重新渲染
function formatData() {
    //拿到ul标签
    $("#right_list").find("li").remove();
}
//add by lk 2022/08/25  end

//0902
