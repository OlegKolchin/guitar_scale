import {DefaultSettings} from "../interface/DefaultSettings";
import {FretBoard} from "../interface/FretBoard";
import {ScaleItem} from "../interface/ScaleItem";
import {TuningItem} from "../interface/TuningItem";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;


// API SERVICE
// ============================================================================

class GuitarApiService {

    // ------------------------------------------------------------------------
    // SETTINGS ENDPOINTS
    // ------------------------------------------------------------------------

    async getDefaultSettings(): Promise<DefaultSettings> {
        const response = await fetch(`${API_BASE_URL}/tuning/defaultSettings`);
        if (!response.ok) {
            throw new Error('Failed to fetch default settings');
        }
        return await response.json();
    }

    // ------------------------------------------------------------------------
    // TUNING ENDPOINTS
    // ------------------------------------------------------------------------

    async getTuningByName(tuningName: string): Promise<TuningItem[]> {
        const response = await fetch(
            `${API_BASE_URL}/tuning/newTuning?tuningName=${tuningName}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch tuning');
        }
        return await response.json();
    }

    async getAllTunings(): Promise<{ [key: string]: TuningItem[] }> {
        const response = await fetch(`${API_BASE_URL}/tuning/getAllTunings`);
        if (!response.ok) {
            throw new Error('Failed to fetch all tunings');
        }
        return await response.json();
    }

    async getFretBoard(tuningName: string): Promise<FretBoard> {
        const response = await fetch(
            `${API_BASE_URL}/tuning/fret?tuningName=${tuningName}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch fretboard');
        }
        const data = await response.json();

        // Convert frets object to Map
        const fretsMap = new Map(
            Object.entries(data.frets).map(([key, value]) => [parseInt(key, 10), value])
        );

        return {
            ...data,
            frets: fretsMap
        };
    }

    // ------------------------------------------------------------------------
    // SCALE ENDPOINTS
    // ------------------------------------------------------------------------

    async createScale(coreNoteName: string, patternName: string): Promise<ScaleItem[]> {
        const response = await fetch(
            `${API_BASE_URL}/scale/createScale?noteName=${encodeURIComponent(coreNoteName)}&patternName=${patternName}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch scale');
        }
        return await response.json();
    }

    async createChordScale(
        coreNoteName: string,
        patternName: string,
        chordRootNote: string
    ): Promise<ScaleItem[]> {
        const response = await fetch(
            `${API_BASE_URL}/scale/createChordScale?noteName=${encodeURIComponent(coreNoteName)}&patternName=${patternName}&chordRootNote=${encodeURIComponent(chordRootNote)}`
        );
        if (!response.ok) {
            throw new Error('Failed to fetch chord scale');
        }
        return await response.json();
    }
}

export const guitarApi = new GuitarApiService();