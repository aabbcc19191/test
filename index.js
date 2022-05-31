import WebSocket from 'ws';
import url from 'url';
import { SocksProxyAgent } from 'socks-proxy-agent';

let proxyList = []
let proxyIndex = 0
proxyList.push("127.0.0.1:8119")
proxyList.push("127.0.0.1:1334")
proxyList.push("127.0.0.1:1335")
proxyList.push("127.0.0.1:1336")
proxyList.push("127.0.0.1:1337")
proxyList.push("127.0.0.1:1338")
// proxyList.push("218.205.185.25:7302")
// proxyList.push("122.193.10.184:7302")
// proxyList.push("111.33.26.171:7302")
// proxyList.push("219.132.136.254:7302")
// proxyList.push("61.191.149.44:7302")
// proxyList.push("115.56.240.254:7302")
// proxyList.push("117.190.245.124:7302")
// proxyList.push("180.168.152.206:7302")
// proxyList.push("60.12.215.23:7302")
// proxyList.push("1.180.49.222:7302")
let wsIndex = 0
let maxWs = 200
let proxyCounts = {}

async function init() {
    process.on("uncaughtException",function(e) {
        console.log('出错了')
        console.log(e.message)
        proxyIndex++
        setTimeout(() => {
        }, 10000);
        init()
    })
    while(wsIndex < maxWs) {
        console.log('wsIndex:' + wsIndex)
        if(wsIndex > 0 && wsIndex % 100 == 0) {
            proxyIndex++
        }
        if(proxyIndex >= proxyList.length) {
            proxyIndex = 0
        }
        try {
            if(proxyIndex < proxyList.length) {
                await openConnection(wsIndex)
            }
            if(!proxyCounts[proxyList[proxyIndex]]) {
                proxyCounts[proxyList[proxyIndex]] = 1
            } else {
                proxyCounts[proxyList[proxyIndex]] = proxyCounts[proxyList[proxyIndex]] + 1
            }
            wsIndex++;
        } catch(e) {
            console.log(e)
        } 
    }
    console.log(proxyCounts)
}

function openConnection(i) {
    return new Promise((resolve) => {
        try {
            // http代理
            let proxy = 'socks://' + proxyList[proxyIndex];
            console.log('使用代理服务器 %j', proxy);
            // WebSocket地址
            let endpoint = 'ws://t1.tedet.cn/websocket/75/670777/75-670777';
            // 创建socks5代理
            let agent = new SocksProxyAgent(proxy);
            
            let ws = new WebSocket(endpoint, { agent: agent });
            ws.on('open', function open() {
                console.log(i + ' 链接成功')
                // ws.send("");
                resolve()
            });

            ws.on('message', function message(data) {
                console.log('收到 ' + i + '的数据');
            });

            ws.on('close', function message(data) {
                console.log('链接关闭:' + i);
                openConnection(i)
            });
        } catch(e) {
            resolve()
        }
    });
}


init()