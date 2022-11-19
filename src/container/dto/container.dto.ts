export enum Mode {
    Competitive = "COMPETITIVE",
    Wingman = "WINGMAN",
    DeathMatch = "DEATHMATCH",
    Casual = "CASUAL",
    ArmsRace = "ARMS_RACE",
    Demolition = "DEMOLITION",
    WeaponExpert = "WEAPON_EXPERT",
    Training = "TRAINING",
    Custom = "CUSTOM",
    Guardian = "GUARDIAN",
    Wargames = "WAR_GAMES",
    DangerZone = "DANGER_ZONE",
    CoopStrike = "COOP_STRIKE"
}

export enum Status {
    Starting = "STARTING",
    Started = "STARTED",
    Deleted = "DELETED"
}

export class CreateConDTO {
    maxplayersOverride: number;
    mode: Mode;
    token: string;
    map: string;
    webHook: string;
}