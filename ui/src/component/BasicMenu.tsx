import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import QueueMusic from '@mui/icons-material/QueueMusic';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import { ReactComponent as GuitarIcon } from './icons/electric-guitar.svg';
import { MainButton } from '../domain/MainButton';
import NotePopover from "../domain/NotesPopover";
import {useDefaultSettings} from "../context/DefaultSettingsContext";
import PatternPopover from "../domain/PatternPopover";
import TuningPopover from "../domain/TuningPopover";
import * as Tone from 'tone';

// import C3 from './samples/C3.mp3';
// import Cs3 from './samples/C#.mp3'; // Corrected to Cs3 for C#3
// import D3 from './samples/D3.mp3';
// import Ds3 from './samples/D#.mp3'; // Corrected to Ds3 for D#3
// import E3 from './samples/E3.mp3';
// import F3 from './samples/F3.mp3';
// import Fs3 from './samples/F#.mp3'; // Corrected to Fs3 for F#3
// import G3 from './samples/G3.mp3';
// import Gs3 from './samples/G#.mp3'; // Corrected to Gs3 for G#3
// import A3 from './samples/A3.mp3';
// import As3 from './samples/A#.mp3'; // Corrected to As3 for A#3
// import C4 from './samples/C4.mp3';

export default function BasicButtons() {
    const [rootNoteAnchorEl, setRootNoteAnchorEl] = useState<HTMLElement | null>(null);
    const [patternAnchorEl, setPatternAnchorEl] = useState<HTMLElement | null>(null);
    const [tuningAnchorEl, setTuningAnchorEl] = useState<HTMLElement | null>(null);
    const {defaultSettings, tuning, savedTunings, scale, toggleSelectRootNote, toggleSelectPattern, toggleSelectTuning} = useDefaultSettings();


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
    }

    const handleNoteSelect = (note: string) => {
        toggleSelectRootNote(note);
        handleNotePopoverClose();
    };

    const handlePatternSelect = (pattern: string) => {
        toggleSelectPattern(pattern);
        handlePatternPopoverClose();
    }

    const handleTuningSelect = (tuningName : string) => {
        toggleSelectTuning(tuningName);
        handleTuningPopoverClose();
    }


    const tuningsConst = savedTunings ? Object.keys(savedTunings) : [];

    const noteMap = new Map<string, number>;
    noteMap.set('C', 1);
    noteMap.set('C#', 2);
    noteMap.set('D', 3);
    noteMap.set('D#', 4);
    noteMap.set('E', 5);
    noteMap.set('F', 6);
    noteMap.set('F#', 7);
    noteMap.set('G', 8);
    noteMap.set('G#', 9);
    noteMap.set('A', 10);
    noteMap.set('A#', 11);
    noteMap.set('B', 12);

    let currentOctave = 3;

    const scaleNotesWithOctaves = scale!.map((item, index) => {
        if (index == 0) {
            return item.noteName + currentOctave;
        } else {
            if (scale) {
                const prevNoteValue = noteMap.get(scale[index - 1].noteName) ?? -1;
                const currentNoteValue = noteMap.get(item.noteName) ?? -1;
                if (prevNoteValue > currentNoteValue) {
                    currentOctave++;
                }
            }
            console.log("CurrentOctave = " + currentOctave + "| Current note =" + item.noteName);

            return item.noteName + currentOctave;
        }

    });

    let finalNoteName = scale!.at(0) ? scale!.at(0)!.noteName : '';

    scaleNotesWithOctaves.push(finalNoteName + '4');


    console.log(scaleNotesWithOctaves);

    const mainButton = new MainButton('#e0e0e0', '8px 8px 15px #a3a3a3, -8px -8px 15px #ffffff', 'black',
        '#d1d1d1', '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff');

    const playScale = async () => {
        await Tone.start();

        Tone.Transport.stop();
        Tone.Transport.cancel(0);

        const synth = new Tone.Synth().toDestination();

        const notes = scaleNotesWithOctaves;

        const sequence = new Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, "8n", time);
        }, notes, "8n");

        sequence.loop = false;

        sequence.start(0);

        Tone.Transport.start();

        Tone.Transport.scheduleOnce(() => {
            sequence.stop();
            sequence.dispose();
        }, `+${notes.length * 0.5}`);
    };


    const StyledButton = mainButton.createStyledButton();

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                paddingTop: '20px'
                // paddingTop: '20px'
            }}
        >
            <Stack spacing={2} direction="row">
                <StyledButton variant="contained" endIcon={<MusicNoteOutlinedIcon color="success" />} onClick={handleNotePopoverOpen}>
                    {defaultSettings.coreNoteName}
                </StyledButton>
                <StyledButton variant="contained" endIcon={<QueueMusic color="success" />} onClick={handlePatternPopoverOpen}>{defaultSettings.patternName}</StyledButton>
                <StyledButton variant="contained" endIcon={<GuitarIcon />} onClick={handleTuningPopoverOpen} > {tuning?.tuningName} </StyledButton>
                <StyledButton variant="contained" endIcon={<BubbleChartIcon color="secondary" />} onClick={playScale}>PLAY SCALE</StyledButton>
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
                selectedPattern={defaultSettings.patternName}/>
            <TuningPopover
                anchorEl={tuningAnchorEl}
                open={Boolean(tuningAnchorEl)}
                onClose={handleTuningPopoverClose}
                onTuningSelect={handleTuningSelect}
                selectedTuning={tuning!.tuningName}
                tunings={tuningsConst}/>
        </Box>
    );
}
