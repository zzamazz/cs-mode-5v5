import { MigrationInterface, QueryRunner } from "typeorm"

export class Server1668278583768 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE DATABASE IF NOT EXISTS `playstrike` USE `playstrike`;CREATE TABLE IF NOT EXISTS `server_info` (`id` int NOT NULL AUTO_INCREMENT,`name` varchar(255) NOT NULL,`port` int NOT NULL,`status` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,`webhook_url` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,`container_id` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,PRIMARY KEY (`id`)) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;",);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE IF EXISTS `server_info`;");
    }

}