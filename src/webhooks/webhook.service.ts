import { Injectable, LoggerService, Inject } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";

import { EventType, EventData } from "./webhook.dto";

@Injectable()

export class WebHookService {
    constructor(private readonly httpService: HttpService, 
        @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
        ) {}

    async send (url: string, type: EventType, body: EventData) {
        const event = { 
            event: type, 
            data: body,
            timestamp: Math.floor(Date.now() / 1000),
        };

        this.httpService.post(url, event).subscribe({
            complete: async () => {
                this.logger.log(`Webhook sent to this address: ${url}`)
            }, error: (err) => {
                this.logger.error(event);
            }
        });
    }
}