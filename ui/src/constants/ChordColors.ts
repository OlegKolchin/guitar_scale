// constants/ChordColors.ts

import { getChordDatabaseKey } from './Translations';

/**
 * Color scheme for chord notes
 * Uses brightness gradients to distinguish chord tones
 */
export const CHORD_NOTE_COLORS = {
    ROOT: '#4169E1',      // Royal Blue (brightest)
    THIRD: '#6495ED',     // Cornflower Blue (medium)
    FIFTH: '#87CEEB',     // Sky Blue (lightest)
} as const;

/**
 * Get color for chord note by index
 */
export const getChordNoteColor = (index: number): string => {
    switch (index) {
        case 0: return CHORD_NOTE_COLORS.ROOT;
        case 1: return CHORD_NOTE_COLORS.THIRD;
        case 2: return CHORD_NOTE_COLORS.FIFTH;
        default: return CHORD_NOTE_COLORS.ROOT;
    }
};

/**
 * Get color for chord menu item
 * Supports both English and Russian chord names
 *
 * @param chordName - Chord name in English or Russian
 * @returns Hex color string
 */
export const getChordColor = (chordName: string): string => {
    // Convert Russian name to English if needed
    const englishName = getChordDatabaseKey(chordName);

    // Color mapping (using English names)
    const colorMap: { [key: string]: string } = {
        'Major Triad': '#FFEBEE',
        'Minor Triad': '#FFCDD2',
        'Diminished Triad': '#F8BBD0',
        'Augmented Triad': '#f5aaaa',
        'Major Seventh Chord': '#3ceedf',
        'Dominant Seventh Chord': '#3ceedf',
        'Minor Seventh Chord': '#29f5e2',
        'Half-Diminished Seventh Chord': '#51f1e1',
        'Fully Diminished Seventh Chord': '#51f1e1',
        'Suspended Second Chord': '#ffdbf8',
        'Suspended Fourth Chord': '#ffdbf8'
    };

    return colorMap[englishName] || '';
};