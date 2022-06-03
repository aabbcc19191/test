import url from 'url';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';
import axios from 'axios';

async function getHttpProxy() {
  let { data } = await axios.get("http://127.0.0.1:5555/random")

  return data;
}

async function sendRequest() {
  const httpProxyUrl = await getHttpProxy()
  //console.log(i + ":" + httpProxyUrl)
  let proxyHost = httpProxyUrl.split(':')[0]
  let proxyPort = httpProxyUrl.split(':')[1]
  let { data } = await axios.get("http://httpbin.org/get", {
    proxy: {
      host: proxyHost,
      port: proxyPort
    }
  })
  console.log(data)
}

sendRequest()
