import url from 'url';
import WebSocket from 'ws';
import { SocksProxyAgent } from 'socks-proxy-agent';

let proxyList = []
proxyList.push("218.205.185.25:7302")
proxyList.push("122.193.10.184:7302")
proxyList.push("111.33.26.171:7302")
proxyList.push("219.132.136.254:7302")
proxyList.push("61.191.149.44:7302")
proxyList.push("115.56.240.254:7302")
proxyList.push("117.190.245.124:7302")
proxyList.push("180.168.152.206:7302")
proxyList.push("60.12.215.23:7302")
proxyList.push("1.180.49.222:7302")

// SOCKS proxy to connect to
var proxy = 'socks://' + proxyList[proxyList.length - 1];
console.log('using proxy server %j', proxy);

// WebSocket endpoint for the proxy to connect to
var endpoint = 'ws://t1.tedet.cn/websocket/78/670945/78-670945';
console.log('attempting to connect to WebSocket %j', endpoint);

// create an instance of the `SocksProxyAgent` class with the proxy server information
var agent = new SocksProxyAgent(proxy);

// initiate the WebSocket connection
var socket = new WebSocket(endpoint, { agent: agent });

socket.on('open', function () {
	console.log('"open" event!');
});

socket.on('message', function (data, flags) {
	console.log('"message" event! %j %j', data, flags);
	socket.close();
});
