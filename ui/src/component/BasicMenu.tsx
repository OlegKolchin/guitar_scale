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

export default function BasicButtons() {
    const [rootNoteAnchorEl, setRootNoteAnchorEl] = useState<HTMLElement | null>(null);
    const [patternAnchorEl, setPatternAnchorEl] = useState<HTMLElement | null>(null);
    const [tuningAnchorEl, setTuningAnchorEl] = useState<HTMLElement | null>(null);
    const {defaultSettings, tuning, savedTunings, toggleSelectRootNote, toggleSelectPattern, toggleSelectTuning} = useDefaultSettings();


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

    const mainButton = new MainButton('#e0e0e0', '8px 8px 15px #a3a3a3, -8px -8px 15px #ffffff', 'black',
        '#d1d1d1', '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff');

    const StyledButton = mainButton.createStyledButton();

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
                <StyledButton variant="contained" endIcon={<MusicNoteOutlinedIcon color="success" />} onClick={handleNotePopoverOpen}>
                     {defaultSettings.coreNoteName}
                </StyledButton>
                <StyledButton variant="contained" endIcon={<QueueMusic color="success" />} onClick={handlePatternPopoverOpen}>{defaultSettings.patternName}</StyledButton>
                <StyledButton variant="contained" endIcon={<GuitarIcon />} onClick={handleTuningPopoverOpen} > {tuning?.tuningName} </StyledButton>
                <StyledButton variant="contained" endIcon={<BubbleChartIcon color="secondary" />}>Intervals</StyledButton>
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
