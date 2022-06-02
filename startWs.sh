#!/usr/bin/env bash
#for i in {1..2}
#do
#   nohup node index2.js --unhandled-rejections=strict >> "./log$i.log" 2>&1
#done
node index2.js --unhandled-rejections=strict >> "./log1.log" 2>&1
node index2.js --unhandled-rejections=strict >> "./log2.log" 2>&1