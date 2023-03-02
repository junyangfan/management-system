#!/bin/sh
curl -o iconfontTemp.json -s 'https://www.iconfont.cn/api/project/detail.json?pid=3823319&t=1670898483153&ctoken=DaKZHg5Dx_2om7-AFAthSYj4' \
  -H 'authority: www.iconfont.cn' \
  -H 'sec-ch-ua: "Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"' \
  -H 'accept: application/json, text/javascript, */*; q=0.01' \
  -H 'x-requested-with: XMLHttpRequest' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36' \
  -H 'sec-ch-ua-platform: "Windows"' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-dest: empty' \
  -H 'referer: https://www.iconfont.cn/manage/index?spm=a313x.7781069.1998910419.23&manage_type=myprojects&projectId=3823319&keyword=&project_type=&page=' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cookie: cna=k/yqG8OhIRcCAbcPsuK/C1di; EGG_SESS_ICONFONT=LwyPfFe9mdLtPg5kAyRM2oKTWe0dYQN45w0qN-zVhK6dp-njsVT2v8vj0y7Na1xO_qxR0Q5yn44fvFMYv4dAbFkkPN7Q2SIT7WFQ5FO2LlKpjRzf-su-DYJY0OkuteTEiZXO8U_0HVJND78wwADWRwaC4CnsW8pWMn5FptOOdqrfjh6knI5VMA8PVijKxixtuCBQYvocbRgRwK8f06vx5yCN-Cew7Yq3qR7FdYh1rwlfqHHuQGEnAwA4TM8xgvA9_ogm16-a3u1QBlQ1mihsQ1FQeBgRHeupXAu00Nj93Weoj544fXSiGScgcQDUeusmjZ8dw2RQD0yECHJcVe0lOZip7QI9x7pxs21Ws3xRWKe9ZWkVY6bq1E7lDQ5I43MTiaXRD6BSlCmKxGTEwyedBBiMDe9s6uxBYvQBYM2hkPQ=; locale=zh-cn; u=6304610; u.sig=MwAxs6MX_w9fQduPC6NS6-8vhXFdJ4emPWiUwOXXXaM; ctoken=DaKZHg5Dx_2om7-AFAthSYj4; xlly_s=1; isg=BFtbbv8WvHW6XcCl9IN5hwnV6r_FMG8yQ_4M6E2aONpTLHwO1QO-goC-wIyiF8cq' \

cd './script' || exit

node updateIconfont.js
