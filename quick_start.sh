#!/bin/sh
echo "开始启动程序"

cd NodejsServer
node server.js&

cd ..
ionic serve


echo "启动结束!"