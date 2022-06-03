
import WebSocket from 'ws';
import fs  from 'fs';
fs.readFile("/root/go1.17.6.linux-amd64.tar.gz", {encoding: 'base64'}, (err, data) => {
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
