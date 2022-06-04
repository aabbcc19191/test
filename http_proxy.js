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
  let { data } = await axios.get("http://t1.tedet.cn/Users_getMsgData.do?aa=" + Math.floor(Math.random() * 1423) + "&tt=" + Math.random() , {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "zh-CN,zh;q=0.9",
      "cache-control": "max-age=0",
      "upgrade-insecure-requests": "1",
      "cookie": "username=1212121212; webtomcat1788=24B1320156196F0DA3218A3E5201BA6C"
    },
    proxy: {
      host: proxyHost,
      port: proxyPort
    },
    timeout: 10000
  })
  console.log(data)
}

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

