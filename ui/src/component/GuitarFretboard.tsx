import React from 'react';
import GuitarNeck from "../module/GuitarNeck";
import { NickelString } from "../domain/NickelString";
import Box from "@mui/material/Box";
import { StainlessFret } from "../domain/StainlessFret";
import MusicNote from "../domain/MusicNote";
import {MainNote} from "../domain/MainNote";
import {Tuning} from "../interface/Tuning";
import {FretBoard} from "../interface/FretBoard";
import {Scale} from "../interface/Scale";
import {useDefaultSettings} from "../context/DefaultSettingsContext";
import LoadingElement from "./LoadingElement";




export default function GuitarFretboard() {

    const {
        defaultSettings,
        tuning,
        fretBoard,
        scale,
        isLoading,
        isTuningLoading,
        isFretBoardLoading,
        isScaleLoading
    } = useDefaultSettings();

    if (isLoading || isTuningLoading || isFretBoardLoading || isScaleLoading) {
        return LoadingElement();
    }


    const defNumberOfStrings = defaultSettings.numberOfStrings;
    const numberOfFrets = 15;
    const stringOffset = 6.6; // z

    const notePositions = Array.from({ length: numberOfFrets }).map((_, index) =>
        `calc(${(100 / numberOfFrets) * index}% + ${(100 / numberOfFrets) / 2}% + 15px)`
    );

    const openStringNotes = [tuning!.s1, tuning!.s2, tuning!.s3, tuning!.s4, tuning!.s5, tuning!.s6];

    const calculatedScalePosition = (scale: Scale, noteName: string): string => {
        const degrees = [
            scale.degree1, scale.degree2, scale.degree3,
            scale.degree4, scale.degree5, scale.degree6,
            scale.degree7
        ];
        const index = degrees.findIndex(degree => degree === noteName);
        return index !== -1 ? (index + 1).toString() : '';
    }

    return (
        <GuitarNeck numberOfStrings={defNumberOfStrings}>
            <Box sx={{ width: '1%' }} /> {/* Empty Box for spacing */}
            {Array.from({ length: numberOfFrets }).map((_, index) => (
                <StainlessFret key={`fret-${index}`}/>
            ))}
            {Array.from({ length: defNumberOfStrings }).map((_, stringIndex) => (
                <NickelString
                    key={`string-${stringIndex}`}
                    sx={{
                        position: 'absolute',
                        top: `calc(${stringIndex * (100 / defNumberOfStrings)}% + ${stringOffset}%)`,
                        left: 0,
                        right: 0,
                        transform: 'translateY(-50%)',
                    }}
                />
            ))}
            {
                Array.from(fretBoard!.frets.entries()).map(([fretNo, frets]) =>
                    frets
                        .filter(fret => fret.fretNo !== 0)
                        .map(fret => (
                            <MusicNote
                                key={`note-${fret.fretNo}-${fret.stringNo}`}
                                top={`calc(${(fret.stringNo - 1) * (100 / defNumberOfStrings)}% + ${stringOffset - 5}%)`}
                                left={`calc(${(100 / numberOfFrets) * (fret.fretNo - 1)}% + ${(100 / numberOfFrets) / 2}% + 15px)`}
                                noteName={fret.note.noteName}
                                // noteScalePosition={'s'}
                                noteScalePosition={calculatedScalePosition(scale as Scale, fret.note.noteName)}
                            />
                        ))
                )
            }

            {openStringNotes.map((note, stringIndex) => (
                <MainNote
                    key={`open-string-note-${stringIndex}`}
                    top={`calc(${stringIndex * (100 / defNumberOfStrings)}% + ${stringOffset - 5}%)`}
                    left={'-2%'}
                    noteName={note}/>
            ))}
        </GuitarNeck>
    );
}
