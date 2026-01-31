// context/DefaultSettingsContext.tsx

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { guitarApi } from '../service/GuitarApiService';
import { DefaultSettings } from '../interface/DefaultSettings';
import { TuningItem } from '../interface/TuningItem';
import { ScaleItem } from '../interface/ScaleItem';
import { FretBoard } from '../interface/FretBoard';
import { ChordPattern } from "../interface/ChordPattern";
import { BasicNote } from "../interface/BasicNote";
import { Language } from '../constants/Translations';

// ============================================================================
// CONTEXT INTERFACE
// ============================================================================

interface DefaultSettingsContextType {
    // Settings State
    defaultSettings: DefaultSettings;
    isLoading: boolean;

    // Tuning State
    tuning: TuningItem[] | null;
    isTuningLoading: boolean;
    savedTunings: { [key: string]: TuningItem[] } | null;
    isSavedTuningsLoading: boolean;

    // FretBoard State
    fretBoard: FretBoard | null;
    isFretBoardLoading: boolean;

    // Chord
    chordPatterns: ChordPattern[];
    isChordPatternsLoading: boolean;
    selectedChordNotes: number[];

    // Scale State
    scale: ScaleItem[] | null;
    isScaleLoading: boolean;
    showScalePosition: boolean;
    hideEmptyScaleNotes: boolean;

    // Chord State
    chordRootNote: string;
    showChordSequence: boolean;

    // Note & Pattern State
    highlightCoreNote: boolean;

    // Interval State
    intervalDestinationPos: number;
    intervalRootPos: number;

    // Language
    language: Language;

    // ========== NEW: Scale Filter ==========
    showOnlyScaleSuitable: boolean;

    // Actions
    toggleChordRootNote: (noteName: string) => void;
    toggleShowScalePosition: () => void;
    toggleHideEmptyScaleNotes: () => void;
    toggleSelectRootNote: (noteName: string) => void;
    toggleSelectPattern: (patternName: string) => void;
    toggleSelectTuning: (tuningName: string) => void;
    toggleHighlightCoreNote: () => void;
    toggleShowChordSequence: () => void;
    toggleIntervalDestinationPos: (absolutePos: number) => void;
    toggleIntervalRootPos: (absolutePos: number) => void;
    toggleChordSelection: (absolutePos: number, patternName: string) => void;
    toggleLanguage: () => void;

    // ========== NEW: Scale Filter Action ==========
    toggleShowOnlyScaleSuitable: () => void;
}

interface Props {
    children: ReactNode;
}

// ============================================================================
// CONTEXT SETUP
// ============================================================================

const DefaultSettingsContext = createContext<DefaultSettingsContextType | undefined>(undefined);

export const useDefaultSettings = () => {
    const context = useContext(DefaultSettingsContext);
    if (!context) {
        throw new Error('useDefaultSettings must be used within a DefaultSettingsProvider');
    }
    return context;
};

// ============================================================================
// PROVIDER COMPONENT
// ============================================================================

export const DefaultSettingsProvider: React.FC<Props> = ({ children }) => {

    // ------------------------------------------------------------------------
    // STATE DECLARATIONS
    // ------------------------------------------------------------------------

    // Settings
    const [defaultSettings, setDefaultSettings] = useState<DefaultSettings>({
        profileName: "MyProfile",
        tuningName: "E_STANDARD",
        numberOfStrings: 6,
        coreNoteName: "E",
        patternName: "Minor",
        activeInd: "Y"
    });
    const [isLoading, setIsLoading] = useState(true);

    // Tuning
    const [tuning, setTuning] = useState<TuningItem[] | null>(null);
    const [isTuningLoading, setIsTuningLoading] = useState(true);
    const [savedTunings, setSavedTunings] = useState<{ [key: string]: TuningItem[] } | null>(null);
    const [isSavedTuningsLoading, setIsSavedTuningsLoading] = useState(true);

    // FretBoard
    const [fretBoard, setFretBoard] = useState<FretBoard | null>(null);
    const [isFretBoardLoading, setIsFretBoardLoading] = useState(true);

    // Scale
    const [scale, setScale] = useState<ScaleItem[] | null>(null);
    const [isScaleLoading, setIsScaleLoading] = useState(true);
    const [showScalePosition, setShowScalePosition] = useState(false);
    const [hideEmptyScaleNotes, setHideEmptyScaleNotes] = useState(false);

    // Chord
    const [chordRootNote, setChordRootNote] = useState('');
    const [showChordSequence, setShowChordSequence] = useState(false);

    // Note & Pattern
    const [highlightCoreNote, setHighlightCoreNote] = useState(false);

    // Interval
    const [intervalDestinationPos, setIntervalDestinationPos] = useState(0);
    const [intervalRootPos, setIntervalRootPos] = useState(0);

    // Chords
    const [chordPatterns, setChordPatterns] = useState<ChordPattern[]>([]);
    const [isChordPatternsLoading, setIsChordPatternsLoading] = useState(false);
    const [selectedChordNotes, setSelectedChordNotes] = useState<number[]>([]);

    // Language
    const [language, setLanguage] = useState<Language>('ru');

    // ========== Scale Filter State ==========
    const [showOnlyScaleSuitable, setShowOnlyScaleSuitable] = useState(false);

    // ------------------------------------------------------------------------
    // TOGGLE FUNCTIONS (Actions)
    // ------------------------------------------------------------------------

    const toggleShowScalePosition = () => {
        setShowScalePosition(prev => !prev);
        if (showScalePosition) {
            setChordRootNote('');
        }
    };

    const toggleHideEmptyScaleNotes = () => {
        setHideEmptyScaleNotes(prev => !prev);
    };

    const toggleSelectRootNote = (noteName: string) => {
        setDefaultSettings(prev => ({
            ...prev,
            coreNoteName: noteName
        }));
    };

    const toggleSelectPattern = (patternName: string) => {
        setDefaultSettings(prev => ({
            ...prev,
            patternName: patternName
        }));
    };

    const toggleChordRootNote = (noteName: string) => {
        setChordRootNote(noteName);
    };

    const toggleSelectTuning = (tuningName: string) => {
        if (!savedTunings) return;

        const newTuning: TuningItem[] = savedTunings[tuningName];
        if (newTuning) {
            setTuning(newTuning);
        }
    };

    const toggleHighlightCoreNote = () => {
        setHighlightCoreNote(prev => !prev);
    };

    const toggleShowChordSequence = () => {
        setShowChordSequence(prev => !prev);
    };

    const toggleIntervalDestinationPos = (absolutePos: number) => {
        setIntervalDestinationPos(absolutePos);
    };

    const toggleIntervalRootPos = (absolutePos: number) => {
        setIntervalRootPos(absolutePos);
    };

    const toggleChordSelection = async (
        absolutePosition: number,
        patternName: string
    ) => {
        try {
            if (absolutePosition == 0) {
                setSelectedChordNotes([]);
                return;
            }

            const tuningName = tuning?.[0]?.tuningName || 'Standard';
            const chordNotes = await guitarApi.getChordNotes(
                absolutePosition,
                patternName,
                tuningName
            );

            const positions = chordNotes.map(note => note.absolutePos);
            setSelectedChordNotes(positions);
        } catch (error) {
            console.error('Failed to fetch chord notes:', error);
        }
    };

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'ru' : 'en');
    };

    // ========== Scale Filter Toggle ==========
    const toggleShowOnlyScaleSuitable = () => {
        setShowOnlyScaleSuitable(prev => !prev);
    };

    // ------------------------------------------------------------------------
    // API WRAPPER FUNCTIONS
    // ------------------------------------------------------------------------

    const fetchScale = async (coreNoteName: string, patternName: string) => {
        setIsScaleLoading(true);
        try {
            const data = await guitarApi.createScale(coreNoteName, patternName);
            setScale(data);
            setChordRootNote('');
        } catch (error) {
            console.error('Error fetching scale:', error);
        } finally {
            setIsScaleLoading(false);
        }
    };

    const fetchChordScale = async (coreNoteName: string, patternName: string, chordRootNote: string) => {
        setIsScaleLoading(true);
        try {
            const data = await guitarApi.createChordScale(coreNoteName, patternName, chordRootNote);
            setScale(data);
        } catch (error) {
            console.error('Error fetching chord scale:', error);
        } finally {
            setIsScaleLoading(false);
        }
    };

    const fetchFretBoard = async (tuningName: string) => {
        try {
            const data = await guitarApi.getFretBoard(tuningName);
            setFretBoard(data);
        } catch (error) {
            console.error('Error fetching fretBoard:', error);
        }
    };

    const fetchChordPatterns = async () => {
        setIsChordPatternsLoading(true);
        try {
            const patterns = await guitarApi.getAllChordPatterns();
            setChordPatterns(patterns);
        } catch (error) {
            console.error('Failed to fetch chord patterns:', error);
        } finally {
            setIsChordPatternsLoading(false);
        }
    };

    // ------------------------------------------------------------------------
    // EFFECTS
    // ------------------------------------------------------------------------

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                const settingsData = await guitarApi.getDefaultSettings();
                setDefaultSettings(settingsData);

                const tuningData = await guitarApi.getTuningByName(settingsData.tuningName);
                setTuning(tuningData);

                const tuningMap = await guitarApi.getAllTunings();
                setSavedTunings(tuningMap);

                const fretBoardData = await guitarApi.getFretBoard(settingsData.tuningName);
                setFretBoard(fretBoardData);

                const scaleData = await guitarApi.createScale(
                    settingsData.coreNoteName,
                    settingsData.patternName
                );
                setScale(scaleData);

                const chordData = await guitarApi.getAllChordPatterns();
                setChordPatterns(chordData);

            } catch (error) {
                console.error('Error loading initial data:', error);
            } finally {
                setIsLoading(false);
                setIsTuningLoading(false);
                setIsFretBoardLoading(false);
                setIsScaleLoading(false);
                setIsSavedTuningsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    useEffect(() => {
        if (defaultSettings.coreNoteName && defaultSettings.patternName) {
            fetchScale(defaultSettings.coreNoteName, defaultSettings.patternName);
        }
    }, [defaultSettings.coreNoteName, defaultSettings.patternName]);

    useEffect(() => {
        if (chordRootNote) {
            fetchChordScale(defaultSettings.coreNoteName, defaultSettings.patternName, chordRootNote);
        } else {
            fetchScale(defaultSettings.coreNoteName, defaultSettings.patternName);
        }
    }, [chordRootNote]);

    useEffect(() => {
        if (tuning?.[0]?.tuningName) {
            fetchFretBoard(tuning[0].tuningName);
        }
    }, [tuning]);

    useEffect(() => {
        fetchChordPatterns();
    }, []);

    // ------------------------------------------------------------------------
    // CONTEXT VALUE
    // ------------------------------------------------------------------------

    const contextValue: DefaultSettingsContextType = {
        // State
        defaultSettings,
        isLoading,
        tuning,
        isTuningLoading,
        savedTunings,
        isSavedTuningsLoading,
        fretBoard,
        isFretBoardLoading,
        scale,
        isScaleLoading,
        showScalePosition,
        hideEmptyScaleNotes,
        chordRootNote,
        showChordSequence,
        highlightCoreNote,
        intervalDestinationPos,
        intervalRootPos,
        chordPatterns,
        isChordPatternsLoading,
        selectedChordNotes,
        language,
        showOnlyScaleSuitable,

        // Actions
        toggleChordRootNote,
        toggleShowScalePosition,
        toggleHideEmptyScaleNotes,
        toggleSelectRootNote,
        toggleSelectPattern,
        toggleSelectTuning,
        toggleHighlightCoreNote,
        toggleShowChordSequence,
        toggleIntervalDestinationPos,
        toggleIntervalRootPos,
        toggleChordSelection,
        toggleLanguage,
        toggleShowOnlyScaleSuitable
    };

    return (
        <DefaultSettingsContext.Provider value={contextValue}>
            {children}
        </DefaultSettingsContext.Provider>
    );
};