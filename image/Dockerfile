FROM ubuntu:18.04

RUN apt update \
    && apt upgrade -y \
    && apt install -y sudo tar wget lib32stdc++6 \
    && useradd -m steam

USER steam
WORKDIR /home/steam

COPY ./addons ./addons

COPY ./install.sh ./install.sh
COPY ./update.sh ./update.sh
COPY ./entry.sh ./entry.sh
COPY ./addons.sh ./addons.sh
COPY ./config.sh ./config.sh

RUN ./install.sh
#RUN ./update.sh # uncomment for update on the build stage

CMD ["/bin/bash", "./entry.sh"]