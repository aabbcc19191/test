import WebSocket from 'ws';


let wsIndex = 0
let maxWs = 1
// github.com-aabbcc19191:aabbcc19191/test.git


async function init() {
    process.on("uncaughtException",function(e) {
        console.log('出错了')
        console.log(e.message)
        setTimeout(() => {
        }, 10000);
        init()
    })
    while(wsIndex < maxWs) {
        console.log('wsIndex:' + wsIndex)
        
        try {
            await openConnection(wsIndex)
            wsIndex++;
        } catch(e) {
            console.log(e)
        } 
    }
}

function openConnection(i) {
    return new Promise((resolve) => {
        try {
            // WebSocket地址
            let endpoint = 'ws://t1.tedet.cn/websocket/75/670777/75-670777';

            let ws = new WebSocket(endpoint);
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