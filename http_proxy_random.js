import url from 'url';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';
import axios from 'axios';
import WebSocket from 'ws';

async function getRandomIP() {
  return await axios.get("http://127.0.0.1:5555/random")
}



let endpoint = 'ws://t1.tedet.cn/websocket/78/670945/78-670945';
let { data } = await getRandomIP()
let httpProxyUrl = data
console.log(data)
var httpsAgent = new HttpsProxyAgent(`http://${httpProxyUrl}`);

// finally, initiate the WebSocket connection
var socket = new WebSocket(endpoint, { agent: httpsAgent });

socket.on('open', function () {
  console.log('"open" event!');
  // socket.send('hello world');
});

socket.on('message', function (data, flags) {
  console.log('"message" event! %j %j', data, flags);
  socket.close();
});

