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
  let { data } = await axios.get("http://wap3.jfsshi.com//api/v1/group/getmsg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9/eyJnaWQiOjg5LCJ1aWQiOjU3NzIsInZhbCI6Ijk2MDlkOTBhYjg5MTRiZDAwYzMyZmU1N2IwNTgxYTBhIiwiZXh0IjoxNjU1MDMyNTkzfQ/YfX-ljpCOgTfF3py0c4fhp7AVi_1HuKhZquaLBMKfoU&type=getmsg&data=null&index=null&reverse=false&count=40&_=1654267942989&page=580", {
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
let i = 0;

function init() {
  while (true) {
    console.log(i)
    try {
      sendRequest(i)
      i++
    } catch (error) {
      console.log(error)
    }
  }
}


init()

