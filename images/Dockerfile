FROM ubuntu:18.04

RUN apt update \
    && apt upgrade -y \
    && apt install -y tar wget lib32stdc++6 \
    && useradd -m steam

USER steam
WORKDIR /home/steam

COPY ./install.sh ./install.sh
COPY ./update.sh ./update.sh
COPY ./entry.sh ./entry.sh

RUN ./install.sh
#RUN ./update.sh # uncomment for update on the build stage

CMD ["./entry.sh"]