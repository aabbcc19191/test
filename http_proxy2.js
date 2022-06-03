import url from 'url';
import https from 'https';
import { SocksProxyAgent } from 'socks-proxy-agent';


// HTTPS endpoint for the proxy to connect to
const info = {
	hostname: 'geo.iproyal.com:12325',
	userId: 'aabbcc1911',
	password: 'aabbcc1911'
};
const agent = new SocksProxyAgent(info);

https.get('https://ipinfo.io', { agent }, (res) => {
	console.log(res.headers);
	res.pipe(process.stdout);
});
//  curl -v -x http://aabbcc1911:aabbcc1911@geo.iproyal.com:12325 -L https://ipinfo.io