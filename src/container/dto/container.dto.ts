import { ArrayMaxSize, IsArray, IsEnum, IsNumber, IsString, IsUrl } from "class-validator";

export enum EMode {
    Competitive = "competitive",
    Wingman = "wingman",
    DeathMatch = "deathmatch",
    Casual = "casual",
    ArmsRace = "arms_race",
    Demolition = "demolition",
    WeaponExpert = "weapon_expert",
    Training = "training",
    Custom = "custom",
    Guardian = "guardian",
    Wargames = "war_gamse",
    DangerZone = "danger_zone",
    CoopStrike = "coop_strike"
}

export enum EStatus {
    Starting = "starting",
    Started = "started",
    Deleted = "deleted"
}

export class CreateConDTO {
    @IsNumber()
    slots: number;
    @IsEnum(EMode)
    mode: EMode;
    @IsString()
    token: string;
    @IsString()
    map: string;
    @IsUrl()
    webhook: string;
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(32)
    ct: string[];
    @IsArray()
    @IsString({ each: true })
    @ArrayMaxSize(32)
    t: string[];
}