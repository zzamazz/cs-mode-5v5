#!/bin/bash

mkdir /home/steam/steamcmd && mkdir /home/steam/server
cd /home/steam/steamcmd
wget http://media.steampowered.com/client/steamcmd_linux.tar.gz
tar xvfz *.tar.gz

./steamcmd.sh +login anonymous +quit