#! /bin/bash
while true 
do
    node_procnum=`ps -ef|grep "http_proxy"|grep -v grep|wc -l`
	
    if [ $node_procnum -eq 0 ] 
    then
        echo "start http-proxy-script..."
        node ./http_proxy.js --unhandled-rejections=strict >> ./log.log 2>&1
    fi
    sleep 1 #每30秒检查一轮
done