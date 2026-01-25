// constants/ChordColors.ts

/**
 * Color scheme for chord notes
 * Uses brightness gradients to distinguish chord tones
 */
export const CHORD_NOTE_COLORS = {
    // Option 1: Same color, different brightness
    ROOT: '#4169E1',      // Royal Blue (brightest)
    THIRD: '#6495ED',     // Cornflower Blue (medium)
    FIFTH: '#87CEEB',     // Sky Blue (lightest)

    // Option 2: Green gradient
    // ROOT: '#00C853',      // Bright green
    // THIRD: '#69F0AE',     // Medium green
    // FIFTH: '#B9F6CA',     // Light green

    // Option 3: Purple gradient
    // ROOT: '#9C27B0',      // Deep purple
    // THIRD: '#BA68C8',     // Medium purple
    // FIFTH: '#E1BEE7',     // Light purple
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

export const getChordColor = (chordName: string): string => {
    const result = '';
    if (chordName === 'Major Triad') {
        return '#FFEBEE';
    }

    if (chordName === 'Minor Triad') {
        return '#FFCDD2';
    }

    if (chordName === 'Diminished Triad') {
        return '#F8BBD0';
    }

    if (chordName === 'Augmented Triad') {
        return '#f5aaaa';
    }

    if (chordName === 'Major Seventh Chord') {
        return '#3ceedf';
    }

    if (chordName === 'Dominant Seventh Chord') {
        return '#3ceedf';
    }

    if (chordName === 'Minor Seventh Chord') {
        return '#29f5e2';
    }

    if (chordName === 'Half-Diminished Seventh Chord') {
        return '#51f1e1';
    }

    if (chordName === 'Fully Diminished Seventh Chord') {
        return '#51f1e1';
    }

    if (chordName === 'Suspended Second Chord') {
        return '#ffdbf8';
    }

    if (chordName === 'Suspended Fourth Chord') {
        return '#ffdbf8';
    }

    return result;
}