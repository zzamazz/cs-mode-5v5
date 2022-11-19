#!/bin/bash

cd /home/steam
./update.sh

cd /home/steam/server

./srcds_run -console -game csgo +hostport ${CSGO_HOSTPORT} -port ${CSGO_PORT} +game_type ${CSGO_GAME_TYPE} +game_mode ${CSGO_GAME_MODE} +clientport ${CSGO_CLIENT_PORT} +map ${CSGO_MAP} -strictportbind -norestart -maxplayers_override ${CSGO_MAXPLAYERS} +sv_setsteamaccount ${CSGO_TOKEN}