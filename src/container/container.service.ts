import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Status } from "./dto/container.dto";
import ServerInfo from "./container.entity";

@Injectable()
export class ConService {
    constructor(
        @InjectRepository(ServerInfo)
        private serversRepository: Repository<ServerInfo>) {}

    async addServerInfo(name: string, port: number, status: Status, webHook: string, container_id: string) : Promise<ServerInfo> {
        const serverEntity: ServerInfo = this.serversRepository.create();
        
        serverEntity.name = name;
        serverEntity.port = port;
        serverEntity.status = status;
        serverEntity.webhook_url = webHook;
        serverEntity.container_id = container_id;

        await this.serversRepository.save(serverEntity);

        return serverEntity;
    }
    
    async getLastPort(): Promise<ServerInfo> {
        return this.serversRepository.findOne({
            order: {
                id: "DESC"
            },
            where: {}
        });
    }

    async getContainerId(name: string): Promise<ServerInfo> {
        return this.serversRepository.findOne({
            where: {
                name: name
            }
        })
    }

    async updateContainer(name_: string, status: Status) {
        return await this.serversRepository.createQueryBuilder()
        .update(ServerInfo)
        .set({ status: status })
        .where({ name: name_ })
        .execute();
    }
}