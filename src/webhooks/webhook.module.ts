import { Module } from "@nestjs/common";

import { WebHookService } from "./webhook.service";

@Module({
    controllers: [],
    providers: [WebHookService]
})

export class WebHookModule {}