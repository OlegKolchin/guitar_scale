import * as React from "react";
import {DefaultSettings} from "../interface/DefaultSettings";

export async function getDefaultSettings(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Can not find default settings');
        }
        const data : DefaultSettings = await response.json();
        return data;
    } catch (error) {
        console.error('Can not get default settings:', error);
    }
}


// export function getAllNotes(tuningName:string) {
//     const [fretBoard, setFretBoard] = useState<FretBoard | null>(null);
//
//
// }