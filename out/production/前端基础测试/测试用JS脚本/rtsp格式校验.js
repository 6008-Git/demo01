var Rtsp = 'rtsp://admin:hik12345@10.1.82.127:8080/h265/ch1/main/av_stream'
var channel = 'ch1'
var device_ip = '10.1.82.127'
var device_port = '8080'
var user_name = "admin"
var password = 'hik12345'
var regExp = new RegExp("^rtsp:\\/\\/"+user_name+":"+password+"@"+device_ip+":"+device_port+"\\/.{0,10}\\/"+channel+"\\/main\\/av_stream$")
var rtsp_reg = ""
//‘rtsp://’ + ‘0-40位任意字符(用户名)’ +‘:’+ ‘0-100位任意字符(密码)’ +'@'+ ‘IP地址’ + ':' + '端口(0-65535)' + '/' + '10位解码方式'+ ‘通道’
console.log(regExp.test(Rtsp))
console.log(Rtsp.toString().length>0)
