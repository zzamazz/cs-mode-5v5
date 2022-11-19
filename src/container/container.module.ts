import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";

import { ConService } from "./container.service";
import { ContainerController } from "./container.controller";
import { ContainerUtils } from "../utils/container.service.utils";
import { WebHookModule } from "../webhooks/webhook.module";
import { ContainerModule } from "../utils/container.module.utils";


@Module({
    imports: [WebHookModule, ContainerModule, ConfigModule],
    controllers: [ContainerController],
    providers: [ConService, ContainerUtils]
})

export class ContModule {};