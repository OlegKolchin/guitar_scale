import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import QueueMusic from '@mui/icons-material/QueueMusic';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { ReactComponent as GuitarIcon } from './icons/electric-guitar.svg';
import { MainButton } from '../domain/MainButton';
import NotePopover from "../domain/NotesPopover";
import { useDefaultSettings } from "../context/DefaultSettingsContext";
import PatternPopover from "../domain/PatternPopover";
import TuningPopover from "../domain/TuningPopover";
import * as Tone from 'tone';
import { ScaleItem } from '../interface/ScaleItem';

// ============================================================================
// CONSTANTS
// ============================================================================

const NOTE_MAP = new Map<string, number>([
    ['C', 1],
    ['C#', 2],
    ['D', 3],
    ['D#', 4],
    ['E', 5],
    ['F', 6],
    ['F#', 7],
    ['G', 8],
    ['G#', 9],
    ['A', 10],
    ['A#', 11],
    ['B', 12]
]);

const MAIN_BUTTON_STYLE = new MainButton(
    '#e0e0e0',
    '8px 8px 15px #a3a3a3, -8px -8px 15px #ffffff',
    'black',
    '#d1d1d1',
    '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff'
);

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Converts scale items to note names with octaves
 */
const convertScaleToNotesWithOctaves = (scale: ScaleItem[]): string[] => {
    if (!scale || scale.length === 0) {
        return [];
    }

    let currentOctave = 3;
    const notesWithOctaves: string[] = [];

    scale.forEach((item, index) => {
        if (index === 0) {
            notesWithOctaves.push(item.noteName + currentOctave);
        } else {
            const prevNoteValue = NOTE_MAP.get(scale[index - 1].noteName) ?? -1;
            const currentNoteValue = NOTE_MAP.get(item.noteName) ?? -1;

            if (prevNoteValue > currentNoteValue) {
                currentOctave++;
            }

            notesWithOctaves.push(item.noteName + currentOctave);
        }
    });

    // Add final note (octave up)
    const finalNoteName = scale[0].noteName;
    notesWithOctaves.push(finalNoteName + '4');

    console.log('Scale notes with octaves:', notesWithOctaves);
    return notesWithOctaves;
};

/**
 * Plays a scale using Tone.js synthesizer
 */
const playScaleWithSynth = async (notes: string[]): Promise<void> => {
    if (notes.length === 0) {
        console.warn('No notes to play');
        return;
    }

    await Tone.start();

    // Stop any existing playback
    Tone.Transport.stop();
    Tone.Transport.cancel(0);

    // Create synthesizer
    const synth = new Tone.Synth().toDestination();

    // Create sequence
    const sequence = new Tone.Sequence(
        (time, note) => {
            synth.triggerAttackRelease(note, "8n", time);
        },
        notes,
        "8n"
    );

    sequence.loop = false;
    sequence.start(0);

    Tone.Transport.start();

    // Schedule cleanup after playback
    Tone.Transport.scheduleOnce(() => {
        sequence.stop();
        sequence.dispose();
    }, `+${notes.length * 0.5}`);
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function BasicMenu() {
    // ------------------------------------------------------------------------
    // STATE
    // ------------------------------------------------------------------------

    const [rootNoteAnchorEl, setRootNoteAnchorEl] = useState<HTMLElement | null>(null);
    const [patternAnchorEl, setPatternAnchorEl] = useState<HTMLElement | null>(null);
    const [tuningAnchorEl, setTuningAnchorEl] = useState<HTMLElement | null>(null);

    // Get context data
    const {
        defaultSettings,
        tuning,
        savedTunings,
        scale,
        toggleSelectRootNote,
        toggleSelectPattern,
        toggleSelectTuning
    } = useDefaultSettings();

    // ------------------------------------------------------------------------
    // POPOVER HANDLERS
    // ------------------------------------------------------------------------

    const handleNotePopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setRootNoteAnchorEl(event.currentTarget);
    };

    const handlePatternPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setPatternAnchorEl(event.currentTarget);
    };

    const handleTuningPopoverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setTuningAnchorEl(event.currentTarget);
    };

    const handleNotePopoverClose = () => {
        setRootNoteAnchorEl(null);
    };

    const handlePatternPopoverClose = () => {
        setPatternAnchorEl(null);
    };

    const handleTuningPopoverClose = () => {
        setTuningAnchorEl(null);
    };

    // ------------------------------------------------------------------------
    // SELECTION HANDLERS
    // ------------------------------------------------------------------------

    const handleNoteSelect = (note: string) => {
        toggleSelectRootNote(note);
        handleNotePopoverClose();
    };

    const handlePatternSelect = (pattern: string) => {
        toggleSelectPattern(pattern);
        handlePatternPopoverClose();
    };

    const handleTuningSelect = (tuningName: string) => {
        toggleSelectTuning(tuningName);
        handleTuningPopoverClose();
    };

    // ------------------------------------------------------------------------
    // SCALE PLAYBACK HANDLER
    // ------------------------------------------------------------------------

    const handlePlayScale = async () => {
        if (!scale || scale.length === 0) {
            console.warn('No scale available to play');
            return;
        }

        const notesWithOctaves = convertScaleToNotesWithOctaves(scale);
        await playScaleWithSynth(notesWithOctaves);
    };

    // ------------------------------------------------------------------------
    // COMPUTED VALUES
    // ------------------------------------------------------------------------

    const tuningsList = savedTunings ? Object.keys(savedTunings) : [];
    const currentTuningName = tuning?.[0]?.tuningName ?? '';
    const StyledButton = MAIN_BUTTON_STYLE.createStyledButton();

    // ------------------------------------------------------------------------
    // RENDER
    // ------------------------------------------------------------------------

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '20px'
            }}
        >
            <Stack spacing={2} direction="row">
                <StyledButton
                    variant="contained"
                    endIcon={<MusicNoteOutlinedIcon color="success" />}
                    onClick={handleNotePopoverOpen}
                >
                    {defaultSettings.coreNoteName}
                </StyledButton>

                <StyledButton
                    variant="contained"
                    endIcon={<QueueMusic color="success" />}
                    onClick={handlePatternPopoverOpen}
                >
                    {defaultSettings.patternName}
                </StyledButton>

                <StyledButton
                    variant="contained"
                    endIcon={<GuitarIcon />}
                    onClick={handleTuningPopoverOpen}
                >
                    {currentTuningName}
                </StyledButton>

                <StyledButton
                    variant="contained"
                    endIcon={<BubbleChartIcon color="secondary" />}
                    onClick={handlePlayScale}
                >
                    PLAY SCALE
                </StyledButton>
            </Stack>

            <NotePopover
                anchorEl={rootNoteAnchorEl}
                open={Boolean(rootNoteAnchorEl)}
                onClose={handleNotePopoverClose}
                onNoteSelect={handleNoteSelect}
                selectedNote={defaultSettings.coreNoteName}
            />

            <PatternPopover
                anchorEl={patternAnchorEl}
                open={Boolean(patternAnchorEl)}
                onClose={handlePatternPopoverClose}
                onPatternSelect={handlePatternSelect}
                selectedPattern={defaultSettings.patternName}
            />

            <TuningPopover
                anchorEl={tuningAnchorEl}
                open={Boolean(tuningAnchorEl)}
                onClose={handleTuningPopoverClose}
                onTuningSelect={handleTuningSelect}
                selectedTuning={currentTuningName}
                tunings={tuningsList}
            />
        </Box>
    );
}