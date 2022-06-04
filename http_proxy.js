import url from 'url';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';
import axios from 'axios';

async function getHttpProxy() {
  let { data } = await axios.get("http://127.0.0.1:5555/random")

  return data;
}

async function sendRequest(i) {
  const httpProxyUrl = await getHttpProxy()
  console.log(i + ":" + httpProxyUrl)
  let proxyHost = httpProxyUrl.split(':')[0]
  let proxyPort = httpProxyUrl.split(':')[1]
  let { data } = await axios.get("http://basett.n2.xcvbba.art/api/v1/group/getmsg?token=d6dab28e0a2a786555a0cc45fbdb31f4&type=getmsg&data=null&index=null&reverse=false&count=40&_=" + new Date().getTime() + "&page=" + Math.floor(Math.random() * 1423) + "&tt=" + Math.random() , {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-CN,zh;q=0.9",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "SWOFT_SESSION_ID=te6c6lqufbsmac5kplv276qlf5",
      "Referer": "http://basett.n2.xcvbba.art/?token=d6dab28e0a2a786555a0cc45fbdb31f4",
      "Referrer-Policy": "strict-origin-when-cross-origin"
    },
    proxy: {
      host: proxyHost,
      port: proxyPort
    },
    timeout: 10000
  })
  console.log(data)
}

// while(true) {
//   try {
    
//   } catch (error) {
//     console.log(error)
//   }
// }

function init() {
  for (let i = 0; i < 100; i++) {
    try {
      sendRequest(i)
    } catch (error) {
      console.log(error)
    }
  }
}


init()

