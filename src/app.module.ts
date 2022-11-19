import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { WinstonModule } from "nest-winston";
import { ConfigModule } from "@nestjs/config";

import { options } from "./ormconfig";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ContainerController } from "./container/container.controller";
import { ConService } from './container/container.service';
import ServerInfo from "./container/container.entity";
import { ContainerUtils } from "./utils/container.service.utils";
import * as winston from "winston";
import { WebHookService } from "./webhooks/webhook.service";
import { EventController } from "./event/event.controller";

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(options),
    TypeOrmModule.forFeature([ServerInfo]),
    WinstonModule.forRoot({
      level: "level",
      format: winston.format.json(),
      transports: [
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ]
    }),
  ],
  controllers: [AppController, ContainerController, EventController],
  providers: [AppService, ConService, ContainerUtils, WebHookService],
})
export class AppModule {}
