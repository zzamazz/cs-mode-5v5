import { Injectable } from "@nestjs/common";

import { EMode } from "../container/dto/container.dto";

@Injectable()

export class ContainerUtils {
    setMode(name: string) {
        switch(name) {
            case EMode.Competitive: return { type: 0, mode: 1 };
            case EMode.Wingman: return { type: 0, mode: 2 };
            case EMode.DeathMatch: return { type: 1, mode: 2 };
            case EMode.Casual: return { type: 0, mode: 0 };
            case EMode.ArmsRace: return { type: 1, mode: 0 };
            case EMode.Demolition: return { type: 1, mode: 1 };
            case EMode.WeaponExpert: return { type: 0, mode: 3 };
            case EMode.Training: return { type: 2, mode: 0 };
            case EMode.Guardian: return { type: 4, mode: 0 };
            case EMode.Custom: return { type: 3, mode: 0 };
            case EMode.Wargames: return { type: 5, mode: 0 };
            case EMode.DangerZone: return { type: 6, mode: 0 };
            case EMode.CoopStrike: return { type: 4, mode: 1 };
            default: return { type: 0, mode: 0 }
        }
    }

    portBinding(entry: number, count: number) {
        let bind = {};
    
        for (const port of Array(count).fill(0).map((_, i) => entry + i)) {
            bind[`${port}/tcp`] = [{ "HostPort": String(port) }];
            bind[`${port}/udp`] = [{ "HostPort": String(port) }];
        }
    
       return bind;
    }

    portExpose(entry: number, count: number) {
        let expose = {};
    
        for (const port of Array(count).fill(0).map((_, i) => entry + i)) {
            expose[`${port}/tcp`] = {};
            expose[`${port}/udp`] = {};
        }
    
        return expose;
    }

    generateCWConfig(name: string, webhook: string, ct: string[], t: string[]) {
        const cts = ct.map(s => {
            return {
                steamid64: s,
                team: "ct",
            };
        });

        const tts = t.map(s => {
            return {
                steamid64: s,
                team: "t",
            };
        });

        return {
            name: name,
            api: webhook,
            players: cts.concat(tts),
        }
    }
}