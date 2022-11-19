import { Module } from "@nestjs/common";

import { EventController } from "./event.controller";

@Module({
    controllers: [EventController],
    providers: []
})

export default class EventModule {}