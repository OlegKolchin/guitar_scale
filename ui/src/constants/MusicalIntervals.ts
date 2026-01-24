/**
 * Musical intervals mapped to semitone distances
 * Used for displaying interval relationships on the fretboard
 */
export const INTERVALS = {
    'Прима': 0,                    // Unison / Perfect Prime
    'Секунда малая': 1,            // Minor 2nd
    'Секунда большая': 2,          // Major 2nd
    'Терция малая': 3,             // Minor 3rd
    'Терция большая': 4,           // Major 3rd
    'Кварта': 5,                   // Perfect 4th
    'Тритон': 6,                   // Tritone / Augmented 4th
    'Квинта': 7,                   // Perfect 5th
    'Секста малая': 8,             // Minor 6th
    'Секста большая': 9,           // Major 6th
    'Септима малая': 10,           // Minor 7th
    'Септима большая': 11,         // Major 7th
    'Октава': 12,                  // Octave
    'Нона малая': 13,              // Minor 9th
    'Нона большая': 14,            // Major 9th
    'Децима малая': 15,            // Minor 10th
    'Децима большая': 16,          // Major 10th
} as const;

/**
 * Type for interval names
 */
export type IntervalName = keyof typeof INTERVALS;

/**
 * Get semitone distance for an interval
 */
export const getIntervalSemitones = (intervalName: string): number | undefined => {
    return INTERVALS[intervalName as IntervalName];
};

/**
 * Check if a string is a valid interval name
 */
export const isValidInterval = (intervalName: string): intervalName is IntervalName => {
    return intervalName in INTERVALS;
};

/**
 * Color scheme for visualizing intervals
 * Colors progress through spectrum: red → pink → purple → blue → cyan → teal → green → yellow
 */
export const INTERVAL_COLORS: Record<IntervalName, string> = {
    'Прима': '#FFEBEE',                // Lightest Red - Unison
    'Секунда малая': '#FFCDD2',        // Light Red - Minor 2nd
    'Секунда большая': '#F8BBD0',      // Light Pink - Major 2nd
    'Терция малая': '#F48FB1',         // Pink - Minor 3rd
    'Терция большая': '#F06292',       // Darker Pink - Major 3rd
    'Кварта': '#E1BEE7',               // Light Purple - Perfect 4th
    'Тритон': '#D1C4E9',               // Lavender - Tritone
    'Квинта': '#C5CAE9',               // Light Blue - Perfect 5th
    'Секста малая': '#BBDEFB',         // Sky Blue - Minor 6th
    'Секста большая': '#B3E5FC',       // Cyan - Major 6th
    'Септима малая': '#B2EBF2',        // Aqua - Minor 7th
    'Септима большая': '#B2DFDB',      // Teal - Major 7th
    'Октава': '#C8E6C9',               // Light Green - Octave
    'Нона малая': '#DCEDC8',           // Lime Green - Minor 9th
    'Нона большая': '#F0F4C3',         // Yellow Green - Major 9th
    'Децима малая': '#FFF9C4',         // Light Yellow - Minor 10th
    'Децима большая': '#FFECB3',       // Light Orange - Major 10th
};

/**
 * Get color for an interval
 */
export const getIntervalColor = (intervalName: string): string => {
    return INTERVAL_COLORS[intervalName as IntervalName] || 'inherit';
};