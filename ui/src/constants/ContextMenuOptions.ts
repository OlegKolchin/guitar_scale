// constants/ContextMenuOptions.ts

import { ChordPattern } from '../interface/ChordPattern';
import {useDefaultSettings} from "../context/DefaultSettingsContext";

/**
 * Submenu structure for context menu
 */
export interface SubMenu {
    label: string;
    subOptions: string[];
}

/**
 * Static interval options for the context menu
 */
const INTERVAL_OPTIONS = [
    'Прима',
    'Секунда малая',
    'Секунда большая',
    'Терция малая',
    'Терция большая',
    'Кварта',
    'Тритон',
    'Квинта',
    'Секста малая',
    'Секста большая',
    'Септима малая',
    'Септима большая',
    'Октава',
    'Нона малая',
    'Нона большая',
    'Децима малая',
    'Децима большая',
];

/**
 * Placeholder chord options (can be removed when using dynamic loading)
 */
const DEFAULT_CHORD_OPTIONS = [
    'Major Triad',
    'Minor Triad',
    'Diminished Triad',
    'Augmented Triad',
    'Major Seventh Chord',
    'Dominant Seventh Chord',
    'Minor Seventh Chord',
    'Half-Diminished Seventh Chord',
    'Fully Diminished Seventh Chord',
    'Suspended Second Chord',
    'Suspended Fourth Chord'

];


// Seventh Chords
// INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Major Seventh Chord', 'WW-WH-WW', 'Maj7');
// INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Dominant Seventh Chord', 'WW-WH-WH', '7');
// INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Minor Seventh Chord', 'WH-WW-WH', 'm7');
// INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Half-Diminished Seventh Chord', 'WH-WH-WH', 'm7b5');
// INSERT INTO chord_pattern (pattern_name, pattern, short_name) VALUES ('Fully Diminished Seventh Chord', 'WH-WH-WH', 'dim7');

/**
 * Create context menu options with dynamic chord patterns
 *
 * @param chordPatterns - Array of chord patterns from API (optional)
 * @returns Array of menu options with submenus
 */
export const createContextMenuOptions = (
    chordPatterns?: ChordPattern[]
): SubMenu[] => {
    // Use chord patterns from API if available, otherwise use defaults
    const chordOptions = chordPatterns && chordPatterns.length > 0
        ? chordPatterns.map(pattern => pattern.patternName)
        : DEFAULT_CHORD_OPTIONS;

    return [
        {
            label: 'Intervals',
            subOptions: INTERVAL_OPTIONS
        },
        {
            label: 'Chords',
            subOptions: chordOptions
        }
    ];
};

/**
 * Static context menu options (for backwards compatibility)
 * Use this if you don't want dynamic chord loading
 */
export const CONTEXT_MENU_OPTIONS: SubMenu[] = [
    {
        label: 'Intervals',
        subOptions: INTERVAL_OPTIONS
    },
    {
        label: 'Chords',
        subOptions: DEFAULT_CHORD_OPTIONS
    },
    
];