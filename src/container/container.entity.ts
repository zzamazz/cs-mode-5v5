import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

import { Status } from "./dto/container.dto";

@Entity()
export default class ServerInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    port: number;

    @Column()
    status: Status
    
    @Column()
    webhook_url: string

    @Column()
    container_id: string
}