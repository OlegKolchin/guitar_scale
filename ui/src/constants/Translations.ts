// constants/Translations.ts

/**
 * Language type
 */
export type Language = 'en' | 'ru';

/**
 * Chord translations mapped to backend database names
 * dbKey must match exactly with database pattern_name column
 */
export const CHORD_TRANSLATIONS = {
    'Major Triad': {
        dbKey: 'Major Triad',
        en: 'Major Triad',
        ru: 'Мажорное трезвучие'
    },
    'Minor Triad': {
        dbKey: 'Minor Triad',
        en: 'Minor Triad',
        ru: 'Минорное трезвучие'
    },
    'Diminished Triad': {
        dbKey: 'Diminished Triad',
        en: 'Diminished Triad',
        ru: 'Уменьшённое трезвучие'
    },
    'Augmented Triad': {
        dbKey: 'Augmented Triad',
        en: 'Augmented Triad',
        ru: 'Увеличенное трезвучие'
    },
    'Major Seventh Chord': {
        dbKey: 'Major Seventh Chord',
        en: 'Major Seventh Chord',
        ru: 'Большой мажорный септаккорд'
    },
    'Dominant Seventh Chord': {
        dbKey: 'Dominant Seventh Chord',
        en: 'Dominant Seventh Chord',
        ru: 'Доминантсептаккорд'
    },
    'Minor Seventh Chord': {
        dbKey: 'Minor Seventh Chord',
        en: 'Minor Seventh Chord',
        ru: 'Малый минорный септаккорд'
    },
    'Half-Diminished Seventh Chord': {
        dbKey: 'Half-Diminished Seventh Chord',
        en: 'Half-Diminished Seventh Chord',
        ru: 'Полууменьшённый септаккорд'
    },
    'Fully Diminished Seventh Chord': {
        dbKey: 'Fully Diminished Seventh Chord',
        en: 'Fully Diminished Seventh Chord',
        ru: 'Уменьшённый септаккорд'
    },
    'Suspended Second Chord': {
        dbKey: 'Suspended Second Chord',
        en: 'Suspended Second Chord',
        ru: 'Аккорд с задержанием секунды'
    },
    'Suspended Fourth Chord': {
        dbKey: 'Suspended Fourth Chord',
        en: 'Suspended Fourth Chord',
        ru: 'Аккорд с задержанием кварты'
    }
} as const;

/**
 * Interval translations
 */
export const INTERVAL_TRANSLATIONS = {
    'unison': {
        en: 'Unison',
        ru: 'Прима'
    },
    'minor_second': {
        en: 'Minor Second',
        ru: 'Секунда малая'
    },
    'major_second': {
        en: 'Major Second',
        ru: 'Секунда большая'
    },
    'minor_third': {
        en: 'Minor Third',
        ru: 'Терция малая'
    },
    'major_third': {
        en: 'Major Third',
        ru: 'Терция большая'
    },
    'perfect_fourth': {
        en: 'Perfect Fourth',
        ru: 'Кварта'
    },
    'tritone': {
        en: 'Tritone',
        ru: 'Тритон'
    },
    'perfect_fifth': {
        en: 'Perfect Fifth',
        ru: 'Квинта'
    },
    'minor_sixth': {
        en: 'Minor Sixth',
        ru: 'Секста малая'
    },
    'major_sixth': {
        en: 'Major Sixth',
        ru: 'Секста большая'
    },
    'minor_seventh': {
        en: 'Minor Seventh',
        ru: 'Септима малая'
    },
    'major_seventh': {
        en: 'Major Seventh',
        ru: 'Септима большая'
    },
    'octave': {
        en: 'Octave',
        ru: 'Октава'
    },
    'minor_ninth': {
        en: 'Minor Ninth',
        ru: 'Нона малая'
    },
    'major_ninth': {
        en: 'Major Ninth',
        ru: 'Нона большая'
    },
    'minor_tenth': {
        en: 'Minor Tenth',
        ru: 'Децима малая'
    },
    'major_tenth': {
        en: 'Major Tenth',
        ru: 'Децима большая'
    }
} as const;

/**
 * UI text translations
 */
export const UI_TRANSLATIONS = {
    menu: {
        intervals: {
            en: 'Intervals',
            ru: 'Интервалы'
        },
        chords: {
            en: 'Chords',
            ru: 'Аккорды'
        }
    },
    switches: {
        show_scale_notes: {
            en: 'Show only scale notes',
            ru: 'Отображать только ноты гаммы'
        },
        highlight_tonic: {
            en: 'Highlight tonic',
            ru: 'Выделить тонику гаммы'
        },
        show_scale_degrees: {
            en: 'Show scale degrees',
            ru: 'Отображать ступени гаммы'
        },
        chord_mode: {
            en: 'Switch to chord mode on click',
            ru: 'По клику переключаться на ступени аккорда'
        },
        show_only_scale_suitable: {
            en: 'Show only suitable intervals and chords for scale',
            ru: 'Показывать только подходящие интервалы и аккорды для гаммы'
        }
    }
} as const;

/**
 * Get database key from chord display name (Russian or English)
 * CRITICAL: Use this before sending chord name to backend!
 */
export const getChordDatabaseKey = (displayName: string): string => {
    for (const [key, value] of Object.entries(CHORD_TRANSLATIONS)) {
        if (value.en === displayName || value.ru === displayName) {
            return value.dbKey;
        }
    }
    return displayName;
};

/**
 * Get all chord display names for menu
 */
export const getChordMenuOptions = (language: Language): string[] => {
    return Object.values(CHORD_TRANSLATIONS).map(chord => chord[language]);
};

/**
 * Get all interval display names for menu
 */
export const getIntervalMenuOptions = (language: Language): string[] => {
    return Object.values(INTERVAL_TRANSLATIONS).map(interval => interval[language]);
};

/**
 * Get menu label translations
 */
export const getMenuLabel = (menu: 'intervals' | 'chords', language: Language): string => {
    return UI_TRANSLATIONS.menu[menu][language];
};

/**
 * Get UI text translation
 */
export const getUIText = (category: keyof typeof UI_TRANSLATIONS, key: string, language: Language): string => {
    const category_obj = UI_TRANSLATIONS[category];
    // @ts-ignore
    return category_obj?.[key]?.[language] || key;
};

/**
 * Convert interval display name (Russian or English) to backend interval name (English)
 * Backend only understands English interval names
 *
 * @param displayName - Interval name in Russian or English
 * @returns English interval name for backend
 */
export const getIntervalBackendName = (displayName: string): string => {
    for (const [key, value] of Object.entries(INTERVAL_TRANSLATIONS)) {
        if (value.en === displayName || value.ru === displayName) {
            return value.en;
        }
    }
    return displayName;
};

/**
 * Convert array of interval display names to backend names
 *
 * @param displayNames - Array of interval names (RU or EN)
 * @returns Array of English interval names for backend
 */
export const convertIntervalsToBackendNames = (displayNames: string[]): string[] => {
    return displayNames.map(name => getIntervalBackendName(name));
};

/**
 * Convert array of backend interval names to display names for current language
 *
 * @param backendNames - Array of English interval names from backend
 * @param language - Current display language
 * @returns Array of interval names in the specified language
 */
export const convertIntervalsToDisplayNames = (backendNames: string[], language: Language): string[] => {
    return backendNames.map(backendName => {
        for (const [key, value] of Object.entries(INTERVAL_TRANSLATIONS)) {
            if (value.en === backendName) {
                return value[language];
            }
        }
        return backendName;
    });
};

/**
 * Convert array of backend chord names to display names for current language
 *
 * @param backendNames - Array of English chord names from backend
 * @param language - Current display language
 * @returns Array of chord names in the specified language
 */
export const convertChordsToDisplayNames = (backendNames: string[], language: Language): string[] => {
    return backendNames.map(backendName => {
        // Find the translation for this backend name
        for (const [key, value] of Object.entries(CHORD_TRANSLATIONS)) {
            if (value.dbKey === backendName) {
                return value[language];  // Return in requested language
            }
        }
        // If not found, return as-is
        return backendName;
    });
};