// component/GuitarFretboard.tsx

import GuitarNeck from "../module/GuitarNeck";
import { NickelString } from "../domain/NickelString";
import Box from "@mui/material/Box";
import { StainlessFret } from "../domain/StainlessFret";
import MusicNote from "../domain/MusicNote";
import { MainNote } from "../domain/MainNote";
import { useDefaultSettings } from "../context/DefaultSettingsContext";
import LoadingElement from "./LoadingElement";
import { ScaleItem } from "../interface/ScaleItem";
import { FretDot } from "../domain/FretDot";
import {
    calculateStringPosition,
    calculateNotePosition,
    calculateFretDotPosition,
    calculateOpenStringPosition
} from "../utils/FretboardCalculations";
import {
    FRETBOARD_LAYOUT,
    STANDARD_FRET_MARKERS,
    getFretDotOffset,
    getNoteVerticalOffset
} from "../constants/FretboardLayout";

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

    // Show loading ONLY on initial load (when there's no data yet)
    if ((isLoading || isTuningLoading || isFretBoardLoading) && !fretBoard) {
        return <LoadingElement />;
    }

    console.log("tuning is : " + tuning);

    // Use constants instead of magic numbers
    const defNumberOfStrings = tuning!.length;
    const numberOfFrets = FRETBOARD_LAYOUT.DEFAULT_NUMBER_OF_FRETS;
    const stringOffset = FRETBOARD_LAYOUT.STRING_OFFSET_PERCENT;
    const dotFrets = [...STANDARD_FRET_MARKERS];
    const dotOffset = getFretDotOffset();

    console.log("defaultNumber of str:" + defNumberOfStrings);

    const calculatedScalePosition = (scale: ScaleItem[], noteName: string): string => {
        const rsl = scale.find(scaleItem => scaleItem.noteName === noteName);
        return rsl === undefined ? '' : rsl.scalePos;
    };

    const handleNoteClick = (noteName: string, noteScalePosition: string) => {
        if (showChordSequence && noteScalePosition.length > 0) {
            toggleChordRootNote(noteName);
        }
    };

    return (
        <GuitarNeck numberOfStrings={defNumberOfStrings}>
            <Box sx={{ marginLeft: `${FRETBOARD_LAYOUT.INITIAL_LEFT_MARGIN_PX}px` }} />

            {/* Render Frets */}
            {Array.from({ length: numberOfFrets }).map((_, index) => (
                <StainlessFret key={`fret-${index}`} />
            ))}

            {/* Render Strings */}
            {Array.from({ length: defNumberOfStrings }).map((_, stringIndex) => (
                <NickelString
                    key={`string-${stringIndex}`}
                    sx={{
                        position: 'absolute',
                        top: calculateStringPosition(stringIndex, defNumberOfStrings, stringOffset),
                        left: 0,
                        right: 0,
                        transform: 'translateY(-50%)',
                    }}
                />
            ))}

            {/* Render Notes on Frets */}
            {Array.from(fretBoard!.frets.entries()).map(([fretNo, frets]) =>
                frets
                    .filter(fret => fret.fretNo !== 0)
                    .map(fret => {
                        const scalePosition = calculatedScalePosition(scale as ScaleItem[], fret.note.noteName);
                        const { top, left } = calculateNotePosition(
                            fret.stringNo,
                            fret.fretNo,
                            defNumberOfStrings,
                            numberOfFrets,
                            stringOffset
                        );

                        return (
                            <MusicNote
                                key={`note-${fret.fretNo}-${fret.stringNo}`}
                                top={top}
                                left={left}
                                noteName={fret.note.noteName}
                                noteScalePosition={scalePosition}
                                absolutePosition={fret.note.absolutePos}
                                onClick={() => handleNoteClick(fret.note.noteName, scalePosition)}
                            />
                        );
                    })
            )}

            {/* Render Fret Dots (Numbers) */}
            {dotFrets.map(fret => {
                const { top, left } = calculateFretDotPosition(fret, numberOfFrets, dotOffset);

                return (
                    <FretDot
                        key={`dot-${fret}`}
                        left={left}
                        top={top}
                        digit={fret}
                    />
                );
            })}

            {/* Render Open String Notes */}
            {tuning?.map((tuningItem, stringIndex) => {
                const { top, left } = calculateOpenStringPosition(
                    stringIndex,
                    defNumberOfStrings,
                    stringOffset
                );

                return (
                    <MainNote
                        key={`open-string-note-${stringIndex}`}
                        top={top}
                        left={left}
                        noteName={tuningItem.noteName}
                    />
                );
            })}
        </GuitarNeck>
    );
}