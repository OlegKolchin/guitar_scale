import * as React from "react";
import {BasicNote} from "./BasicNote";

export interface Fret {
    stringNo: number,
    fretNo: number,
    note : BasicNote
}