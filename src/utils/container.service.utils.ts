import { Injectable } from "@nestjs/common";

import { Mode } from "../container/dto/container.dto";

@Injectable()

export class ContainerUtils {
    setMode(name: string) {
        switch(name) {
            case Mode.Competitive: return { type: 0, mode: 1 };
            case Mode.Wingman: return { type: 0, mode: 2 };
            case Mode.DeathMatch: return { type: 1, mode: 2 };
            case Mode.Casual: return { type: 0, mode: 0 };
            case Mode.ArmsRace: return { type: 1, mode: 0 };
            case Mode.Demolition: return { type: 1, mode: 1 };
            case Mode.WeaponExpert: return { type: 0, mode: 3 };
            case Mode.Training: return { type: 2, mode: 0 };
            case Mode.Guardian: return { type: 4, mode: 0 };
            case Mode.Custom: return { type: 3, mode: 0 };
            case Mode.Wargames: return { type: 5, mode: 0 };
            case Mode.DangerZone: return { type: 6, mode: 0 };
            case Mode.CoopStrike: return { type: 4, mode: 1 };
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