import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { DefaultSettings } from '../interface/DefaultSettings'; // Adjust the import path as necessary
import { Tuning } from '../interface/Tuning'; // Adjust the import path as necessary
import {FretBoard} from "../interface/FretBoard";
import {ScaleItem} from "../interface/ScaleItem";


interface DefaultSettingsContextType {
    defaultSettings: DefaultSettings;
    isLoading: boolean;

    tuning: Tuning | null;
    isTuningLoading: boolean;

    savedTunings: { [key: string]: Tuning } | null;
    isSavedTuningsLoading: boolean;

    fretBoard: FretBoard | null;
    isFretBoardLoading: boolean;

    scale : ScaleItem[] | null;
    isScaleLoading: boolean;

    showScalePosition: boolean;

    toggleShowScalePosition: () => void;

    hideEmptyScaleNotes : boolean;
    toggleHideEmptyScaleNotes: () => void;

    toggleSelectRootNote: (noteName : string) => void;

    toggleSelectPattern: (patternName : string) => void;

    toggleSelectTuning : (tuningName : string) => void;

}

const DefaultSettingsContext = createContext<DefaultSettingsContextType | undefined>(undefined);

export const useDefaultSettings = () => {
    const context = useContext(DefaultSettingsContext);
    if (context === undefined) {
        throw new Error('useDefaultSettings must be used within a DefaultSettingsProvider');
    }
    return context;
};

interface Props {
    children: ReactNode;
}

export const DefaultSettingsProvider: React.FC<Props> = ({ children }) => {
    const [defaultSettings, setDefaultSettings] = useState<DefaultSettings>({
        profileName: "MyProfile",
        tuningName: "E_STANDARD",
        numberOfStrings: 6,
        coreNoteName: "E",
        patternName: "Minor",
        activeInd: "Y"
    });
    const [isLoading, setIsLoading] = useState(true);
    const [tuning, setTuning] = useState<Tuning | null>(null);
    const [isTuningLoading, setIsTuningLoading] = useState(true);
    const [savedTunings, setSavedTunings] = useState<{ [key: string]: Tuning } | null>(null);
    const [isSavedTuningsLoading, setIsSavedTuningsLoading] = useState(true);
    const [fretBoard, setFretBoard] = useState<FretBoard | null>(null);
    const [isFretBoardLoading, setIsFretBoardLoading] = useState(true);
    const [scale, setScale] = useState<ScaleItem[] | null>(null);
    const [isScaleLoading, setIsScaleLoading] = useState(true);
    const [showScalePosition, setShowScalePosition] = useState(false);
    const [hideEmptyScaleNotes, setHideEmptyScaleNotes] = useState(false);

    const toggleShowScalePosition = () => {
        setShowScalePosition(prevState => !prevState);
    }

    const toggleHideEmptyScaleNotes = () => {
        setHideEmptyScaleNotes(prevState => !prevState);
    }

    const toggleSelectRootNote = (noteName : string) => {
        setDefaultSettings(prevSettings => ({
            ...prevSettings,
            coreNoteName: noteName
        }))
    }

    const toggleSelectPattern = (patternName : string) => {
        setDefaultSettings(prevSettings => ({
            ...prevSettings,
            patternName: patternName
        }))
    }

    const toggleSelectTuning = (tuningName: string) => {
        if (savedTunings) {
            console.log(savedTunings)
            const newTuning: Tuning = savedTunings[tuningName];
            console.log('New Tuning is: ')
            console.log(newTuning);
            if (newTuning) {
                console.log('Setting number of strings')
                setTuning(newTuning);
                // setDefaultSettings(prevSettings => ({
                //     ...prevSettings,
                //     numberOfStrings: newTuning.numberOfStrings,
                //     tuningName: newTuning.tuningName
                // }));

            }
        }
        console.log(tuning)
    };

    // const fetchTuning = async (tuningName : string) => {
    //     setIsTuningLoading(true);
    //     try {
    //         const tuningResponse = await fetch(`http://localhost:8080/tuning/byName?tuningName=${tuningName}`);
    //         if (!tuningResponse.ok) {
    //             throw new Error('Failed to fetch tuning');
    //         }
    //         const tuningData: Tuning = await tuningResponse.json();
    //         setTuning(tuningData);
    //     } catch (error) {
    //         console.error(error)
    //     } finally {
    //         setIsTuningLoading(false);
    //     }
    // }

    const fetchScale = async (coreNoteName: string, patternName: string) => {
        setIsScaleLoading(true);
        try {
            const scaleResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scale/createScale?noteName=${encodeURIComponent(coreNoteName)}&patternName=${patternName}`);
            if (!scaleResponse.ok) {
                throw new Error('Failed to fetch scale');
            }
            const scaleData: ScaleItem[] = await scaleResponse.json();
            setScale(scaleData);
        } catch (error) {
            console.error(error);
        } finally {
            setIsScaleLoading(false);
        }
        console.log(scale)
    };

    const fetchFretBoard = async (tuningName : string) => {
        // setIsFretBoardLoading(true);
        try {
            const fretBoardResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tuning/fret?tuningName=${tuningName}`);
            if (!fretBoardResponse.ok) {
                throw new Error('Failed to fetch fretBoard');
            }
            const fretBoardData = await fretBoardResponse.json();

            const fretsMap = new Map(Object.entries(fretBoardData.frets).map(([key, value]) => [parseInt(key, 10), value]));
            const newFretBoard = {
                ...fretBoardData,
                frets: fretsMap
            };
            console.log(newFretBoard);
            setFretBoard(newFretBoard);
        } catch (error) {
            console.error(error);
        } finally {
            // setIsFretBoardLoading(false);
        }
        console.log(fretBoard)
    }

    useEffect(() => {
        const fetchDefaultSettings = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tuning/defaultSettings`);
                if (!response.ok) {
                    throw new Error('Failed to fetch default settings');
                }
                const data: DefaultSettings = await response.json();
                setDefaultSettings(data);
                setIsLoading(false);

                /* Fetching default tuning  */
                const tuningResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tuning/byName?tuningName=${data.tuningName}`);
                if (!tuningResponse.ok) {
                    throw new Error('Failed to fetch tuning');
                }
                const tuningData: Tuning = await tuningResponse.json();
                setTuning(tuningData);

                /* Fetching all saved tunings */
                const tuningsResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tuning`);
                if (!tuningsResponse.ok) {
                    throw new Error('Failed to fetch tunings!')
                }
                const tuningsArray : Tuning[] = await tuningsResponse.json();
                const tuningMap = tuningsArray.reduce((acc, tuning) => {
                    acc[tuning.tuningName] = tuning;
                    return acc;
                }, {} as { [key: string]: Tuning });
                setSavedTunings(tuningMap);

                const fretBoardResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/tuning/fret?tuningName=${data.tuningName}`);
                if (!fretBoardResponse.ok) {
                    throw new Error('Failed to fetch fretBoard');
                }
                const fretBoardData = await fretBoardResponse.json();

                const fretsMap = new Map(Object.entries(fretBoardData.frets).map(([key, value]) => [parseInt(key, 10), value]));
                const newFretBoard = {
                    ...fretBoardData,
                    frets: fretsMap
                };

                setFretBoard(newFretBoard);

                const scaleResponse = await fetch(`${process.env.REACT_APP_API_BASE_URL}/scale/createScale?noteName=${encodeURIComponent(data.coreNoteName)}&patternName=${data.patternName}`);
                const scaleData : ScaleItem[] = await scaleResponse.json();
                setScale(scaleData);

            } catch (error) {
                console.error(error);
            } finally {
                setIsTuningLoading(false);
                setIsFretBoardLoading(false);
                setIsScaleLoading(false);
                setIsSavedTuningsLoading(false);
            }
        };

        fetchDefaultSettings();
    }, []);

    useEffect(() => {
        if (defaultSettings.coreNoteName && defaultSettings.patternName) {
            fetchScale(defaultSettings.coreNoteName, defaultSettings.patternName);
        }
    }, [defaultSettings.coreNoteName, defaultSettings.patternName]);

    useEffect(() => {
        if (tuning) {
            fetchFretBoard(tuning.tuningName);
        }
    }, [tuning]);


    return (
        <DefaultSettingsContext.Provider value={{
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
            toggleShowScalePosition,
            hideEmptyScaleNotes,
            toggleHideEmptyScaleNotes,
            toggleSelectRootNote,
            toggleSelectPattern,
            toggleSelectTuning}}>
            {children}
        </DefaultSettingsContext.Provider>
    );
};
