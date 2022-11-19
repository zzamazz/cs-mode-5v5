#!/bin/bash

mkdir -p /home/steam/steamcmd && mkdir -p /home/steam/server && mkdir -p /home/steam/addons
cd /home/steam/steamcmd
wget http://media.steampowered.com/client/steamcmd_linux.tar.gz
tar xvfz *.tar.gz

./steamcmd.sh +login anonymous +quit
