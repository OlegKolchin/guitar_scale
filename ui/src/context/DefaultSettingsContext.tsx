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

    const fetchScale = async (coreNoteName: string, patternName: string) => {
        setIsScaleLoading(true);
        try {
            const scaleResponse = await fetch(`http://localhost:8080/scale/createScale?noteName=${encodeURIComponent(coreNoteName)}&patternName=${patternName}`);
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
    };



    useEffect(() => {
        const fetchDefaultSettings = async () => {
            try {
                const response = await fetch('http://localhost:8080/tuning/defaultSettings');
                if (!response.ok) {
                    throw new Error('Failed to fetch default settings');
                }
                const data: DefaultSettings = await response.json();
                setDefaultSettings(data);
                setIsLoading(false);

                const tuningResponse = await fetch(`http://localhost:8080/tuning/byName?tuningName=${data.tuningName}`);
                if (!tuningResponse.ok) {
                    throw new Error('Failed to fetch tuning');
                }
                const tuningData: Tuning = await tuningResponse.json();
                setTuning(tuningData);

                const fretBoardResponse = await fetch(`http://localhost:8080/tuning/fret?tuningName=${data.tuningName}`);
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

                const scaleResponse = await fetch(`http://localhost:8080/scale/createScale?noteName=${encodeURIComponent(data.coreNoteName)}&patternName=${data.patternName}`);
                const scaleData : ScaleItem[] = await scaleResponse.json();
                setScale(scaleData);

            } catch (error) {
                console.error(error);
            } finally {
                setIsTuningLoading(false);
                setIsFretBoardLoading(false);
                setIsScaleLoading(false);
            }
        };

        fetchDefaultSettings();
    }, []);

    useEffect(() => {
        if (defaultSettings.coreNoteName && defaultSettings.patternName) {
            fetchScale(defaultSettings.coreNoteName, defaultSettings.patternName);
        }
    }, [defaultSettings.coreNoteName, defaultSettings.patternName]);

    return (
        <DefaultSettingsContext.Provider value={{
            defaultSettings,
            isLoading,
            tuning,
            isTuningLoading,
            fretBoard,
            isFretBoardLoading,
            scale,
            isScaleLoading,
            showScalePosition,
            toggleShowScalePosition,
            hideEmptyScaleNotes,
            toggleHideEmptyScaleNotes,
            toggleSelectRootNote,
            toggleSelectPattern}}>
            {children}
        </DefaultSettingsContext.Provider>
    );
};
