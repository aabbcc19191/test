import url from 'url';
import WebSocket from 'ws';
import HttpsProxyAgent from 'https-proxy-agent';

// HTTP/HTTPS proxy to connect to
var proxy = 'http://127.0.0.1:8118';
console.log('using proxy server %j', proxy);

// WebSocket endpoint for the proxy to connect to
var endpoint = 'ws://t1.tedet.cn/websocket/75/670777/75-670777';
var parsed = url.parse(endpoint);
console.log('attempting to connect to WebSocket %j', endpoint);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var options = url.parse(proxy);

var agent = new HttpsProxyAgent(options);

// finally, initiate the WebSocket connection
var socket = new WebSocket(endpoint, { agent: agent });

socket.on('open', function () {
  console.log('"open" event!');
  // socket.send('hello world');
});

socket.on('message', function (data, flags) {
  console.log('"message" event! %j %j', data, flags);
  socket.close();
});