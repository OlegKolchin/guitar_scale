// NotePopover.tsx
import React from 'react';
import { Popover, Button, styled } from '@mui/material';

interface PatternPopoverProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onPatternSelect: (pattern: string) => void;
    selectedPattern: string;
}

const patterns = ['Minor', 'Major', 'Dorian', 'Phrygian', 'Mixolydian', 'Locrian', 'Harmonic Minor', 'Melodic Minor', 'Pentatonic Major', 'Pentatonic Minor', 'Blues'];

const PatternContainer = styled('div')(({ theme }) => ({
    display: 'flex', // Enable flexbox
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#e0e0e0',
}));

const PatternButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    margin: '5px',
    backgroundColor: isSelected ? '#199383' : undefined,
    color: isSelected ? 'white' : undefined,
    '&:hover': {
        backgroundColor: isSelected ? '#199383' : theme.palette.grey[300],
    },
}));

const PatternPopover: React.FC<PatternPopoverProps> = ({ anchorEl, open, onClose, onPatternSelect, selectedPattern }) => {
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
            <PatternContainer>
                {patterns.map((pattern) => (
                    <PatternButton
                        key={pattern}
                        onClick={() => onPatternSelect(pattern)}
                        isSelected={pattern === selectedPattern}
                    >
                        {pattern}
                    </PatternButton>
                ))}
            </PatternContainer>
        </Popover>
    );
};

export default PatternPopover;
