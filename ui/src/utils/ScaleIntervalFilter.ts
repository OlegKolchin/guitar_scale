// utils/ScaleIntervalFilter.ts

import { guitarApi } from '../service/GuitarApiService';
import {
    convertIntervalsToBackendNames,
    convertIntervalsToDisplayNames,
    convertChordsToDisplayNames,
    Language
} from '../constants/Translations';

/**
 * Filter interval names to only those that fit within the current scale
 * Handles language conversion: Display (RU/EN) → Backend (EN) → Display (RU/EN)
 *
 * @param rootNoteName - The scale root note (e.g., "D")
 * @param patternName - The scale pattern (e.g., "Minor")
 * @param intervalRootNoteName - The clicked note (e.g., "E")
 * @param displayIntervalNames - Array of interval names in current display language
 * @param language - Current display language (for converting response back)
 * @returns Promise<string[]> - Filtered array of interval names in display language
 */
export const filterIntervalsForScale = async (
    rootNoteName: string,
    patternName: string,
    intervalRootNoteName: string,
    displayIntervalNames: string[],
    language: Language
): Promise<string[]> => {
    if (!displayIntervalNames || displayIntervalNames.length === 0) {
        return [];
    }

    try {
        // Convert display names to backend names (always English)
        const backendIntervalNames = convertIntervalsToBackendNames(displayIntervalNames);

        // Call backend with English names
        const filteredBackendNames = await guitarApi.filterIntervalsForScale(
            rootNoteName,
            patternName,
            intervalRootNoteName,
            backendIntervalNames
        );

        // Convert backend names back to display names
        const filteredDisplayNames = convertIntervalsToDisplayNames(
            filteredBackendNames,
            language
        );

        return filteredDisplayNames;
    } catch (error) {
        console.error('Error filtering intervals for scale:', error);
        return displayIntervalNames;
    }
};

/**
 * Filter chord names to only those that fit within the current scale
 * Backend fetches all chords from DB and filters them
 * Handles language conversion: Display (RU/EN) → Backend (EN) → Display (RU/EN)
 *
 * @param rootNoteName - The scale root note (e.g., "D")
 * @param patternName - The scale pattern (e.g., "Minor")
 * @param chordRootNoteName - The clicked note (e.g., "E")
 * @param language - Current display language (for converting response back)
 * @returns Promise<string[]> - Filtered array of chord names in display language
 */
export const filterChordsForScale = async (
    rootNoteName: string,
    patternName: string,
    chordRootNoteName: string,
    language: Language
): Promise<string[]> => {
    try {
        // Backend returns English chord names
        const filteredBackendNames = await guitarApi.filterChordsForScale(
            rootNoteName,
            patternName,
            chordRootNoteName
        );

        // Convert backend names (English) to display names (RU/EN)
        const filteredDisplayNames = convertChordsToDisplayNames(
            filteredBackendNames,
            language
        );

        return filteredDisplayNames;
    } catch (error) {
        console.error('Error filtering chords for scale:', error);
        return []; // Return empty array on error
    }
};