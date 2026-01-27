// constants/ContextMenuOptions.ts

import { ChordPattern } from '../interface/ChordPattern';
// ========== NEW IMPORTS ==========
import {
    Language,
    getChordMenuOptions,
    getIntervalMenuOptions,
    getMenuLabel
} from './Translations';

/**
 * Submenu structure for context menu
 */
export interface SubMenu {
    label: string;
    subOptions: string[];
}

// ========== REMOVED: Static options (now dynamic) ==========

/**
 * Create context menu options with translations
 * ========== UPDATED: Now takes language parameter ==========
 */
export const createContextMenuOptions = (
    language: Language  // ← NEW PARAMETER
): SubMenu[] => {
    return [
        {
            label: getMenuLabel('intervals', language),  // ← NEW: Translated label
            subOptions: getIntervalMenuOptions(language)  // ← NEW: Translated options
        },
        {
            label: getMenuLabel('chords', language),  // ← NEW: Translated label
            subOptions: getChordMenuOptions(language)  // ← NEW: Translated options
        }
    ];
};