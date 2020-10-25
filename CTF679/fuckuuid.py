import http.client
import uuid
import random


def fuck(flag):
    conn = http.client.HTTPSConnection("security.bilibili.com")
    payload = "{\"flag\":\"" + flag + "\",\"ctf_id\":6}"
    headers = {
        'Host': ' security.bilibili.com',
        'Connection': ' keep-alive',
        'Accept': ' application/json, text/plain, */*',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) '
                      'Chrome/86.0.4240.111 Safari/537.36',
        'Content-Type': ' application/json;charset=UTF-8',
        'Origin': ' https://security.bilibili.com',
        'Sec-Fetch-Site': ' same-origin',
        'Sec-Fetch-Mode': ' cors',
        'Sec-Fetch-Dest': ' empty',
        'Referer': ' https://security.bilibili.com/sec1024/',
        'Accept-Encoding': ' gzip, deflate, br',
        'Accept-Language': ' zh-CN,zh;q=0.9',
        'Cookie': ''
    }
    conn.request("POST", "/sec1024/api/v1/flag", payload, headers)
    res = conn.getresponse()
    data = res.read()
    if data.decode("utf-8").find("Flag错误，请继续努力") == -1:
        print(data.decode("utf-8") + " " + payload)
        exit()
    else:
        print(data.decode("utf-8") + " " + payload)


def get_flag():
    flag = str(uuid.uuid4()).replace("-", "")
    temp = []
    length = len(flag)
    for n in range(length):
        if n % 8 == 0:
            temp.append(flag[n:n + 8])
    return '-'.join(temp)


while True:
    fuck(get_flag())
