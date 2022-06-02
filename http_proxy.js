import url from 'url';
import http from 'http';
import HttpsProxyAgent from 'https-proxy-agent';


http.get("http://127.0.0.1:5555/random", fucntion(res) {
  console.log('"response" event!', res);
})

// HTTP/HTTPS proxy to connect to
var proxy = 'http://89.111.105.85:41258';
console.log('using proxy server %j', proxy);

// HTTPS endpoint for the proxy to connect to
var endpoint = 'http://httpbin.org/get';
console.log('attempting to GET %j', endpoint);
var options = url.parse(endpoint);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);
options.agent = agent;

http.get(options, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});