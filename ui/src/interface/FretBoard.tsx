import * as React from "react";
import {Tuning} from "./Tuning";
import {Fret} from "./Fret";

export interface FretBoard {
    tuning:Tuning,
    frets: Map<number, Fret[]>;
}