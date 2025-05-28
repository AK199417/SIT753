#!/bin/bash
cd /home/ec2-user/jukebox-app
npm install -g pm2
pm2 kill
pm2 start server.js -i 2
