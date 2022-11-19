import { Module } from "@nestjs/common";

import { ContainerUtils } from "./container.service.utils";

@Module({
    controllers: [],
    providers: [ContainerUtils]
})

export class ContainerModule {};