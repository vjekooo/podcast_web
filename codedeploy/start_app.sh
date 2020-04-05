#!/bin/bash
# Start up the app

cd /home/ubuntu/podcast/web

docker-compose up -d --build

docker image prune -f