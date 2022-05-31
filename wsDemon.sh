#! /bin/bash
while true 
do
    node_procnum=`ps -ef|grep "index2"|grep -v grep|wc -l`
	
    if [ $node_procnum -eq 0 ] 
    then
        echo "start ws-script..."
        node ./index2.js >> ./log.log 2>&1
    fi
    sleep 30 #每30秒检查一轮
done