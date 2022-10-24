var jsonObj =     [{
    "ORGNAME": "***长耀售电有限责任公司",
    "ORGNO": "50471",
    "TMNLMANUCALLSUCCESSRATE": "0.00",
    "TMNLCHIPCALLSUCCESSRATE": "0.00",
    "METERMANUCALLSUCCESSRATE": "0.00",
    "METERCHIPCALLSUCCESSRATE": "0.00",
    "TMNLMANUCALLSUCCESSNUM": "0",
    "TMNLCHIPCALLSUCCESSNUM": "0",
    "METERMANUCALLSUCCESSNUM": "0",
    "METERCHIPCALLSUCCESSNUM": "0",
    "TMNLMANUFAILNUM": "0",
    "TMNLCHIPFAILNUM": "0",
    "METERMANUFAILNUM": "0",
    "METERCHIPFAILNUM": "0",
    "TMNLMANUCALLNUM": "0",
    "TMNLCHIPCALLNUM": "0",
    "METERMANUCALLNUM": "0",
    "METERCHIPCALLNUM": "0",
    "TMNLMANUCALLFAILNUM": "0",
    "TMNLCHIPCALLFAILNUM": "0",
    "METERMANUCALLFAILNUM": "0",
    "METERCHIPCALLFAILNUM": "0"
},{
    "ORGNAME": "***长耀售电有限责任公司",
    "ORGNO": "50471",
    "TMNLMANUCALLSUCCESSRATE": "0.00",
    "TMNLCHIPCALLSUCCESSRATE": "0.00",
    "METERMANUCALLSUCCESSRATE": "0.00",
    "METERCHIPCALLSUCCESSRATE": "0.00",
    "TMNLMANUCALLSUCCESSNUM": "0",
    "TMNLCHIPCALLSUCCESSNUM": "0",
    "METERMANUCALLSUCCESSNUM": "0",
    "METERCHIPCALLSUCCESSNUM": "0",
    "TMNLMANUFAILNUM": "0",
    "TMNLCHIPFAILNUM": "0",
    "METERMANUFAILNUM": "0",
    "METERCHIPFAILNUM": "0",
    "TMNLMANUCALLNUM": "0",
    "TMNLCHIPCALLNUM": "0",
    "METERMANUCALLNUM": "0",
    "METERCHIPCALLNUM": "0",
    "TMNLMANUCALLFAILNUM": "0",
    "TMNLCHIPCALLFAILNUM": "0",
    "METERMANUCALLFAILNUM": "0",
    "METERCHIPCALLFAILNUM": "0"
}]

function resToLower(jsonObj){
    var newObj = JSON.parse(JSON.stringify(jsonObj))
    for (let i = 0; i < newObj.length; i++) {
        for (var key in newObj[i]){
            newObj[i][key.toLowerCase()] = newObj[i][key];
            delete(newObj[i][key]);
        }
    }
    return newObj
}


console.log(resToLower(jsonObj));
console.log(jsonObj);