#!/bin/sh

docker login --username=txg5214 registry-vpc.cn-shenzhen.aliyuncs.com

npm run build

docker build -t vinda-web .

docker tag vinda-web:latest registry-vpc.cn-shenzhen.aliyuncs.com/vinda/vinda-web:1.0.0

docker push registry-vpc.cn-shenzhen.aliyuncs.com/vinda/vinda-web:1.0.0