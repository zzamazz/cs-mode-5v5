export enum Mode {
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

export enum Status {
    Starting = "starting",
    Started = "started",
    Deleted = "deleted"
}

export class CreateConDTO {
    slots: number;
    mode: Mode;
    token: string;
    map: string;
    webhook: string;
    ct: string[];
    t: string[];
}