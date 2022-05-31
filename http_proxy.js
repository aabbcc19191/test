import url from 'url';
import https from 'https';
import HttpsProxyAgent from 'https-proxy-agent';

// HTTP/HTTPS proxy to connect to
var proxy = process.env.http_proxy || 'http://127.0.0.1:8118';
console.log('using proxy server %j', proxy);

// HTTPS endpoint for the proxy to connect to
var endpoint = process.argv[2] || 'https://graph.facebook.com/tootallnate';
console.log('attempting to GET %j', endpoint);
var options = url.parse(endpoint);

// create an instance of the `HttpsProxyAgent` class with the proxy server information
var agent = new HttpsProxyAgent(proxy);
options.agent = agent;

https.get(options, function (res) {
  console.log('"response" event!', res.headers);
  res.pipe(process.stdout);
});