import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import * as dotenv from "dotenv";

import ServerInfo from "./container/container.entity";

dotenv.config();

export const options: TypeOrmModuleOptions = {
    type: "mysql",
    host:  process.env.DB_HOST || "localhost",
    port: Number(process.env.DOCKER) || 3306,
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "playstrike",
    entities: [ServerInfo],
    synchronize: true,
}  

const config = {
    ...options,
    migrationsRun: true,
    migrations: ["migrations/**/*{.ts,.js}"],
    migrationsTableName: "migrations",
};

export default new DataSource(config as MysqlConnectionOptions);