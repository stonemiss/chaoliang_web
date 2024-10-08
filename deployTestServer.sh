#!/bin/bash
npm run build:development

if [[ "$1" == "-rsync" ]];
then
    echo "开始使用rsync同步"
    rsync  -rv  dist  root@39.104.83.23:/www/dev/chaoliang_web/
else
    echo "开始使用scp同步"
    scp  -r  dist  root@39.104.83.23:/www/dev/chaoliang_web/
fi
