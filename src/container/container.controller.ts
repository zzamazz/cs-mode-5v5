import { Controller, Post, Body, Res, UsePipes, ValidationPipe, HttpException, HttpStatus, Get, Param, Delete } from "@nestjs/common";
import { Response } from "express";
import Docker = require("dockerode");
import { v4 as uuidv4 } from "uuid";

import { WebHookService } from "../webhooks/webhook.service";
import { ConService } from "./container.service";
import { EventType } from "../webhooks/webhook.dto";
import { CreateConDTO, EStatus } from "./dto/container.dto";
import { ContainerUtils } from "../utils/container.service.utils";
import { NameDTO } from "./dto/name.dto";

@Controller("container")
export class ContainerController {
    constructor(private conService: ConService, private readonly utils: ContainerUtils, private readonly webHook: WebHookService) { }

    docker = new Docker({
        protocol: "http",
        host: process.env.DOCKER_HOST,
        port: process.env.DOCKER_PORT
    });

    async errorHandler(url: string, err: any) {
        console.log("container error");
        this.webHook.send(url, EventType.Error, err);
    }

    @Post("/")
    async create(@Body() conDTO: CreateConDTO, @Res() res: Response) {
        const { token, map, slots, webhook, ct, t } = conDTO;
        const { PORT_STEP, GAME_PORT } = process.env;

        const { mode, type } = this.utils.setMode(conDTO.mode);
        const result = await this.conService.getLastPort();

        const port = (result?.port || Number(GAME_PORT)) + Number(PORT_STEP);
        const name = uuidv4();

        const clanwar_cfg = this.utils.generateCWConfig(name, webhook, ct, t);

        const container = await this.docker.createContainer({
            Image: process.env.IMAGE,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            OpenStdin: true,
            Tty: true,
            User: "steam",
            Env: [
                `CSGO_MAXPLAYERS=${slots}`,
                `CSGO_GAME_MODE=${mode}`,
                `CSGO_GAME_TYPE=${type}`,
                `CSGO_TOKEN=${token}`,
                `CSGO_PORT=${port}`,
                `CSGO_HOST_PORT=${port + 1}`,
                `CSGO_CLIENT_PORT=${port + 2}`,
                `CSGO_MAP=${map}`,
                `CLANWAR_CONFIG=${JSON.stringify(clanwar_cfg)}`
            ],
            name: `${name}`,
            HostConfig: {
                Memory: 2147483648,
                MemoryReservation: 2147483648,
                MemorySwap: -1,
                CpuQuota: -1,
                CpuPeriod: 100000,
                CpuShares: 1024,
                NetworkMode: "host",
                Mounts: [{
                    Target: "/home/steam/server",
                    Source: `/home/server`,
                    Type: "bind",
                }],
                PortBindings: this.utils.portBinding(port, Number(PORT_STEP)),
            },
            ExposedPorts: this.utils.portExpose(port, Number(PORT_STEP)),
        });

        await container.start();

        const stream = await container.logs({
            follow: true,
            stdout: true,
            stderr: true
        });

        stream.on("error", this.errorHandler.bind(this, webhook));

        const add = await this.conService.addServerInfo(name, port, webhook, container.id);

        return res.status(200).json({
            success: true,
            data: {
                ...add,
                ip: process.env.DOCKER_HOST
            },
        });
    }

    @Delete("/:name")
    async delete(@Param() { name }: NameDTO, @Res() res: Response) {
        const id = await this.conService.getContainerId(name);
        if (!id)
            throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);

        const container = this.docker.getContainer(id.container_id);
        container.stop().then(() => container.remove()).catch(() => container.remove());

        const update = await this.conService.updateContainer(name, EStatus.Deleted);

        return res.status(200).json({
            success: true,
            data: {
                ...update,
            }
        });
    }

    @Get("/:name")
    async info(@Param() { name }: NameDTO, @Res() res: Response) {
        const info = await this.conService.getContainerId(name);
        if (!info)
            throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);

        return res.status(200).json({
            success: true,
            data: {
                ...info,
                ip: process.env.DOCKER_HOST
            },
        })
    }
}