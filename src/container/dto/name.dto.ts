import { IsUUID } from "class-validator";

export class NameDTO {
    @IsUUID()
    name: string;
}