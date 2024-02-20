import * as React from "react";
import * as TuningHook from "../hook/TuningHook";
import * as FretBoardSerivce from "../hook/FretBoardService";

export function getDefaultSettings (url: string) {
    return FretBoardSerivce.getDefaultSettings(url);
}

export function GetTuning(tuningName : string) {
    return TuningHook.useTuning(tuningName);
}