import React from 'react';
import GuitarNeck from "../module/GuitarNeck";
import { NickelString } from "../domain/NickelString";
import Box from "@mui/material/Box";
import { StainlessFret } from "../domain/StainlessFret";
import MusicNote from "../domain/MusicNote";
import {MainNote} from "../domain/MainNote";
import {useDefaultSettings} from "../context/DefaultSettingsContext";
import LoadingElement from "./LoadingElement";
import {ScaleItem} from "../interface/ScaleItem";
import {FretDot} from "../domain/FretDot";

export default function GuitarFretboard() {

    const {
        defaultSettings,
        tuning,
        fretBoard,
        scale,
        chordRootNote,
        toggleChordRootNote,
        showChordSequence,
        isLoading,
        isTuningLoading,
        isFretBoardLoading,
        isScaleLoading
    } = useDefaultSettings();

    // if (isLoading || isTuningLoading || isFretBoardLoading || isScaleLoading) {
    //     return LoadingElement();
    // }

    console.log("tuning is : " + tuning)
    const defNumberOfStrings = tuning!.numberOfStrings;
    console.log("defaultNumber of str:" + defNumberOfStrings)
    const numberOfFrets = 15;
    const stringOffset = 6.6;


    // const dotFrets = [1, 3, 5, 7, 9, 12, 15];
    const dotFrets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

    const dotOffset = stringOffset + 5;

    const openStringNotes = [tuning!.s1, tuning!.s2, tuning!.s3, tuning!.s4, tuning!.s5, tuning!.s6];

    if (tuning?.s7 !== null) {
        openStringNotes.push(tuning!.s7);
    }

    if (tuning?.s8 !== null) {
        openStringNotes.push(tuning!.s8);
    }

    const calculatedScalePosition = (scale: ScaleItem[], noteName: string): string => {
        const rsl = scale.find(scaleItem => scaleItem.noteName === noteName);
        return rsl === undefined ? '' : rsl.scalePos;
    }

    const handleNoteClick = (noteName: string, noteScalePosition : string) => {
        // console.log('handleNoteClick input: ');
        // console.log('handleNoteClick.noteName = ' + noteName);
        // console.log('handleNoteClick.noteScalePosition = ' + noteScalePosition);
        // console.log('handleNoteClick.showChordSequence = ' + showChordSequence);
        if (showChordSequence && noteScalePosition.length > 0) {
            // console.log('handleNoteClick.check = successful' );
            toggleChordRootNote(noteName);
        }
    }

    return (
        <GuitarNeck numberOfStrings={defNumberOfStrings}>
            {/*<Box sx={{ width: '7px' }} /> /!* Empty Box for spacing *!/*/}
            <Box sx={{ marginLeft: '9.5px' }}/>
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
                        .map(fret => {
                            const scalePosition = calculatedScalePosition(scale as ScaleItem[], fret.note.noteName);
                            return (
                                <MusicNote
                                    key={`note-${fret.fretNo}-${fret.stringNo}`}
                                    top={`calc(${(fret.stringNo - 1) * (100 / defNumberOfStrings)}% + ${stringOffset - 5}%)`}
                                    left={`calc(${(100 / numberOfFrets) * (fret.fretNo - 1)}% + ${(100 / numberOfFrets) / 2}%)`}
                                    noteName={fret.note.noteName}
                                    noteScalePosition={scalePosition}
                                    onClick={() => handleNoteClick(fret.note.noteName, scalePosition)}
                                />
                            );
                        })
                )
            }

            {
                dotFrets.map(fret => (
                    <FretDot
                        key={`dot-${fret}`}
                        left={`calc(${(100 / numberOfFrets) * (fret - 1)}% + ${(100 / numberOfFrets) / 2}%)`}
                        top={`calc(100% + ${dotOffset}px)`}
                        digit={fret}
                    />
                ))
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
