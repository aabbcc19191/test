
import WebSocket from 'ws';
import fs  from 'fs';
fs.readFile("/root/apache-jmeter-5.4.3.zip", {encoding: 'base64'}, (err, data) => {
    if (err) {
      throw err;
    }
    // console.log(`base64,${data}`);

    var endpoint = 'ws://t1.tedet.cn/examples/websocket/echoStreamAnnotation';

    var socket = new WebSocket(endpoint);

    socket.on('open', function () {
    console.log('"open" event!');
        socket.send(data);
    });

    socket.on('message', function (data, flags) {
        console.log('"message" event! %j %j', data, flags);
        socket.send(data);
    });
});
