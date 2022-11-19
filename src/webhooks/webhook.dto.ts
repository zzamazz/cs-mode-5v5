export enum EventType {
    ServerIsReady = "IS_READY",
    MatchEnd = "MATCH_IS_OVER",
    Error = "ERROR"
};

export class WebHookInfo {};

export class WebHookError {
    powerOff: boolean;
    error: any;
};

export class WebHookStats {};

export type EventData = WebHookStats | WebHookError | WebHookInfo;