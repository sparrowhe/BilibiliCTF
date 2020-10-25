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

function fuck(flag) {
    var request = require('request');
    var options = {
        'method': 'POST',
        'url': 'https://security.bilibili.com/sec1024/api/v1/flag',
        'headers': {
            'Host': ' security.bilibili.com',
            'Connection': ' keep-alive',
            'Accept': ' application/json, text/plain, */*',
            'User-Agent': ' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36',
            'Content-Type': ' application/json;charset=UTF-8',
            'Origin': ' https://security.bilibili.com',
            'Sec-Fetch-Site': ' same-origin',
            'Sec-Fetch-Mode': ' cors',
            'Sec-Fetch-Dest': ' empty',
            'Referer': ' https://security.bilibili.com/sec1024/',
            'Accept-Encoding': ' gzip, deflate, br',
            'Accept-Language': ' zh-CN,zh;q=0.9',
        },
        body: "{\"flag\":\"" + flag + "\",\"ctf_id\":1}"
    };
    request(options, function(error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}


for (;;) {
    var fuckUUID = uuid()
    fuck(fuckUUID.substring(0, 35))
}