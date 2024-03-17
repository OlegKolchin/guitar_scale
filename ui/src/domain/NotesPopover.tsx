// NotePopover.tsx
import React from 'react';
import { Popover, Typography, Button, styled } from '@mui/material';

interface NotePopoverProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onNoteSelect: (note: string) => void;
    selectedNote: string;
}

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const NotesContainer = styled('div')(({ theme }) => ({
    // padding: '20px',
    // backgroundColor: '#e0e0e0',

    display: 'flex', // Enable flexbox
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#e0e0e0',
}));

const NoteButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    margin: '5px',
    backgroundColor: isSelected ? '#199383' : undefined,
    color: isSelected ? 'white' : undefined,
    '&:hover': {
        backgroundColor: isSelected ? '#199383' : theme.palette.grey[300], // Adjust hover color as needed
    },
}));

const NotePopover: React.FC<NotePopoverProps> = ({ anchorEl, open, onClose, onNoteSelect, selectedNote }) => {
    return (
        <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            sx={{
                marginTop: '100px',
                marginLeft: '45%',
            }}
        >
            <NotesContainer>
                {notes.map((note) => (
                    <NoteButton
                        key={note}
                        onClick={() => onNoteSelect(note)}
                        isSelected={note === selectedNote}
                    >
                        {note}
                    </NoteButton>
                ))}
            </NotesContainer>
        </Popover>
    );
};

export default NotePopover;
