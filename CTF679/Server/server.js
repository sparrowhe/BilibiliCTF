function uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010  
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01  
    s[8] = s[17] = s[26] = s[36] = "-";

    var uuid = s.join("");
    return uuid;
}

const ws = require('nodejs-websocket'); //引入依赖包
const POST = 8080; //定义端口
// 创建一个server
const server = ws.createServer(connect => {
    //每次只要有新的用户加入，就会为当前用户创建一个connect对象，同时调用一下这个回调函数。
    console.log("新连接");

    // text事件：接收用户请求，得到用户传输进来的数据。
    connect.on("text", data => {
        // 每当接受到用户请求事件，这个回调函数就会被触发。
        console.log("Received " + data);
        // sendText/send 方法：接受到请求后，响应一个数据给用户。因为是connect调用，所以只给当前connet对应的用户发送，如果需要给所有用户发送（广播），需要connections这个数组
        //connect.sendText(data.toUpperCase() + "!!!"); //如果直接返回一个data，就会像echo那个服务器一样的功能，接收到什么就返回什么
        connect.sendText(uuid())
    });

    // 连接断开 触发close事件
    connect.on("close", (code, reason) => {
        console.log("connection closed");
        code && console.log(code);
        reason && console.log(reason);
    });

    // error：监听服务异常事件，放置因报错而断掉整个服务。
    connect.on('error', () => {
        // 如果触发了close事件，就会走error异常事件(刷新也会)，所以必须加error
        console.log('连接出现异常');
    });
});
server.listen(POST, () => {
    console.log('webSocket服务启动成功了，监听了端口' + POST);
    console.log('干翻Bilibili');
});