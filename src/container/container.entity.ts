import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { EStatus } from "./dto/container.dto";

@Entity()
export default class ServerInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    port: number;

    @Column()
    status: EStatus
    
    @Column()
    webhook_url: string

    @Column()
    container_id: string
}