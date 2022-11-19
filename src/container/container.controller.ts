import { Controller, Post, Body, Res, UsePipes, ValidationPipe, HttpException, HttpStatus, Get, Param } from "@nestjs/common";
import { Response } from "express";
import Docker = require('dockerode');
import { v4 as uuidv4 } from 'uuid';

import { WebHookService } from "../webhooks/webhook.service";
import { ConService } from "./container.service";
import { EventType } from "../webhooks/webhook.dto";
import { CreateConDTO, Status } from "./dto/container.dto";
import { ContainerUtils } from "../utils/container.service.utils";
import { NameDTO } from "./dto/name.dto";

@Controller("container")
export class ContainerController {
    constructor(private conService: ConService, private readonly utils: ContainerUtils, private readonly webHook: WebHookService) {}

    docker = new Docker({
        protocol: "http",
        host: process.env.DOCKER_HOST,
        port: process.env.DOCKER_PORT
    });

    async errorHandler(url: string, err: any) {
        this.webHook.send(url, EventType.Error, err);
    }

    @Post("create")
    async create(@Body() conDTO: CreateConDTO, @Res() res: Response) {
        const { token, map, maxplayersOverride, webHook } = conDTO;
        const { PORT_STEP, GAME_PORT } = process.env;
        const { mode, type } = this.utils.setMode(conDTO.mode);
        const result = await this.conService.getLastPort();
        
        const port = (result?.port || Number(GAME_PORT)) + Number(PORT_STEP);
        const name = uuidv4();

        const container = await this.docker.createContainer({
            Image: process.env.IMAGE,
            AttachStdin: true,
            AttachStdout: true,
            AttachStderr: true,
            OpenStdin: true,
            Tty: true,
            User: "steam",
            Env: [
                `CSGO_MAXPLAYERS=${maxplayersOverride}`,
                `CSGO_GAME_MODE=${mode}`,
                `CSGO_GAME_TYPE=${type}`,
                `CSGO_TOKEN=${token}`,
                `CSGO_PORT=${port}`,
                `CSGO_HOST_PORT=${port + 1}`,
                `CSGO_CLIENT_PORT=${port + 2}`,
                `CSGO_MAP=${map}`,
            ],
            name: `${name}`,
            HostConfig: {
                Memory: 4294967296,
                MemoryReservation: 4294967296,
                MemorySwap: -1,
                CpuQuota: -1,
                CpuPeriod: 100000,
                CpuShares: 1024,
                NetworkMode: "host",
                Mounts: [{
                    Target: "/home/steam/server",
                    Source: "/home/server",
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

        stream.on("error", this.errorHandler.bind(this, webHook));

        const add = await this.conService.addServerInfo(name, port, Status.Starting, webHook, container.id);
        
        return res.status(200).json({
            success: true,
            data: {
                ...add,
                ip: process.env.DOCKER_HOST
            },
        });
    }

    @Post("/delete")
    async delete(@Body() { name }: NameDTO, @Res() res: Response) {
        const id = await this.conService.getContainerId(name);
        if(!id)
            throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND);

        const containers = this.docker.getContainer(id.container_id);

        await containers.stop();
        await containers.remove();
        //await this.conService.updateContainer(name);

        return res.status(200).json({
            success: true,
            data: {
                update: await this.conService.updateContainer(name, Status.Deleted),
            }
        });
    }

    @UsePipes(new ValidationPipe())
    @Get("/:name")
    async info(@Param() { name }: NameDTO, @Res() res: Response) {
        const info = await this.conService.getContainerId(name);
        //const container = await docker.getContainer(info.container_id);
        if(!info)
            throw new HttpException("NOT_FOUND", HttpStatus.NOT_FOUND); 

        return res.status(200).json({
            success: true,
            data: {
                ...info,
                ip: process.env.DOCKER_HOST
            },
            //info: await container.inspect(),
        })
    }
}