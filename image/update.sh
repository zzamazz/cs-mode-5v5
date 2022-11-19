#!/bin/bash

cd /home/steam/steamcmd
./steamcmd.sh +login anonymous +force_install_dir /home/steam/server +app_update 740 +quit

mkdir -p /home/steam/.steam/sdk32
ln -s /home/steam/steamcmd/linux32/steamclient.so /home/steam/.steam/sdk32/
