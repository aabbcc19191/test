import url from 'url';
import WebSocket from 'ws';
import { SocksProxyAgent } from 'socks-proxy-agent';
import fs from 'fs'
import { resolve } from 'path'

const proxyFile = resolve('./') + '/s5proxy.txt'
const proxyURLs = fs.readFileSync(proxyFile, 'utf8')


let proxyList = proxyURLs.split('\n')
proxyList = []
// proxyList.push("218.205.185.25:7302")
// proxyList.push("122.193.10.184:7302")
// proxyList.push("111.33.26.171:7302")
// proxyList.push("219.132.136.254:7302")
// proxyList.push("61.191.149.44:7302")
// proxyList.push("115.56.240.254:7302")
// proxyList.push("117.190.245.124:7302")
// proxyList.push("180.168.152.206:7302")
// proxyList.push("60.12.215.23:7302")
// console.log(proxyList)
 proxyList.push("aabbcc1911:aabbcc1911@geo.iproyal.com:12325")

process.on("uncaughtException",function(e) {
    //console.log('出错了')
    //console.log(e.message)
})

for (let i = 0; i < proxyList.length; i++) {
	initConnection(i)
}

function initConnection(i) {
	try {
		const purl = proxyList[i];
		// SOCKS proxy to connect to
		var proxy = 'socks://' + purl;
		console.log('using proxy server %j', proxy);

		// WebSocket endpoint for the proxy to connect to
		var endpoint = 'ws://t1.tedet.cn/websocket/78/670945/78-670945';
		console.log('attempting to connect to WebSocket %j', endpoint);

		// create an instance of the `SocksProxyAgent` class with the proxy server information
		var agent = new SocksProxyAgent(proxy);

		// initiate the WebSocket connection
		var socket = new WebSocket(endpoint, { agent: agent, timeout: 10000 });

		socket.on('open', function () {
			// console.log('"open" event:' + i);
			console.log('"open" url:' + purl);
		});

		socket.on('message', function (data, flags) {
			console.log("收到数据:" + i);
			// socket.close();
		});

		socket.on('close', function () {
			console.log('close event:' + i);
			setTimeout(function() {
				initConnection(i)
			},1000)
		});
	} catch (error) {
		console.log(error)
	}
}

