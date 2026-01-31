import {DefaultSettings} from "../interface/DefaultSettings";
import {FretBoard} from "../interface/FretBoard";
import {ScaleItem} from "../interface/ScaleItem";
import {TuningItem} from "../interface/TuningItem";
import {ChordPattern} from "../interface/ChordPattern";
import {BasicNote} from "../interface/BasicNote";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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

    // ========== BATCH FILTER ENDPOINT ==========
    /**
     * Filter multiple intervals at once (BATCH endpoint)
     */
    async filterIntervalsForScale(
        rootNoteName: string,
        patternName: string,
        intervalRootNoteName: string,
        intervalNames: string[]
    ): Promise<string[]> {
        const params = new URLSearchParams({
            rootNoteName,
            patternName,
            intervalRootNoteName
        });

        const response = await fetch(
            `${API_BASE_URL}/scale/filterIntervalsForScale?${params}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(intervalNames)
            }
        );

        if (!response.ok) {
            throw new Error('Failed to filter intervals');
        }

        return await response.json();
    }

    // ------------------------------------------------------------------------
    // CHORD ENDPOINTS
    // ------------------------------------------------------------------------

    async getAllChordPatterns(): Promise<ChordPattern[]> {
        const response = await fetch(
            `${API_BASE_URL}/chords`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch chordPatterns');
        }
        return await response.json();
    }

    async getChordPatternByName(chordName: string): Promise<ChordPattern> {
        const response = await fetch(
            `${API_BASE_URL}/chords?chordName=${encodeURIComponent(chordName)}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch chordPattern');
        }
        return await response.json();
    }

    async getChordNotes(
        rootNoteAbsolutePosition: number,
        patternName: string,
        currentTuningName: string
    ): Promise<BasicNote[]> {
        const response = await fetch(
            `${API_BASE_URL}/chords/chordNotes?rootNoteAbsolutePosition=${encodeURIComponent(rootNoteAbsolutePosition)}&patternName=${encodeURIComponent(patternName)}&currentTuningName=${encodeURIComponent(currentTuningName)}`
        );

        if (!response.ok) {
            throw new Error('Failed to fetch chordNotes');
        }
        return await response.json();
    }

    /**
     * Filter chords for scale
     * Backend fetches all chords from DB and filters them
     *
     * @param rootNoteName - Scale root note (e.g., "D")
     * @param patternName - Scale pattern (e.g., "Minor")
     * @param chordRootNoteName - Clicked note (e.g., "E")
     * @returns Promise with filtered chord names (English)
     */
    async filterChordsForScale(
        rootNoteName: string,
        patternName: string,
        chordRootNoteName: string
    ): Promise<string[]> {
        const params = new URLSearchParams({
            rootNoteName,
            patternName,
            chordRootNoteName
        });

        const response = await fetch(
            `${API_BASE_URL}/scale/filterChordsForScale?${params}`,
            {
                method: 'GET'
            }
        );

        if (!response.ok) {
            throw new Error('Failed to filter chords');
        }

        return await response.json();
    }
}

export const guitarApi = new GuitarApiService();