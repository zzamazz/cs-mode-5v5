import { IsString, Matches } from "class-validator";

export class NameDTO {
    @Matches(/^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89AB][0-9a-f]{3}-[0-9a-f]{12}$/)
    @IsString()
    name: string;
}