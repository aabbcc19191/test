
import WebSocket from 'ws';
import fs  from 'fs';
fs.readFile("/root/apache-jmeter-5.4.3/lib/groovy-3.0.7.jar", {encoding: 'base64'}, (err, data) => {
    if (err) {
      throw err;
    }
    // console.log(`base64,${data}`);

    var endpoint = 'ws://t1.tedet.cn/examples/websocket/echoStreamAnnotation';

    var socket = new WebSocket(endpoint);

    socket.on('open', function () {
        console.log('"链接成功');
        socket.send(data);
        console.log('发送信息信息');
    });

    socket.on('message', function (data, flags) {
        console.log('收到信息');
        socket.send(data);
        console.log('发送信息信息');
    });
});
