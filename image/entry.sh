#!/bin/bash

cd /home/steam
./update.sh

# addons & config
./addons.sh
./config.sh

# start server
cd /home/steam/server

./srcds_run -console -game csgo +hostport ${CSGO_HOSTPORT} -port ${CSGO_PORT} -norestart +game_type ${CSGO_GAME_TYPE} +game_mode ${CSGO_GAME_MODE} +clientport ${CSGO_CLIENT_PORT} +map ${CSGO_MAP} -strictportbind -norestart -maxplayers_override ${CSGO_MAXPLAYERS} -tickrate 128 +sv_setsteamaccount ${CSGO_TOKEN}