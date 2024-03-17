import React from 'react';
import { Popover, Button, styled } from '@mui/material';

interface TuningPopoverProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onTuningSelect: (tuning: string) => void;
    selectedTuning: string;
    tunings: string[]
}

// const tunings = ['Minor', 'Major', 'Dorian', 'Phrygian', 'Mixolydian', 'Locrian', 'Harmonic Minor', 'Melodic Minor', 'Pentatonic Major', 'Pentatonic Minor', 'Blues'];

const TuningContainer = styled('div')(({ theme }) => ({
    display: 'flex', // Enable flexbox
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#e0e0e0',
}));

const TuningButton = styled(Button, {
    shouldForwardProp: (prop) => prop !== 'isSelected',
})<{ isSelected: boolean }>(({ theme, isSelected }) => ({
    margin: '5px',
    backgroundColor: isSelected ? '#199383' : undefined,
    color: isSelected ? 'white' : undefined,
    '&:hover': {
        backgroundColor: isSelected ? '#199383' : theme.palette.grey[300],
    },
}));

const TuningPopover: React.FC<TuningPopoverProps> = ({ anchorEl, open, onClose, onTuningSelect, selectedTuning, tunings }) => {
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
            <TuningContainer>
                {tunings.map((tuning) => (
                    <TuningButton
                        key={tuning}
                        onClick={() => onTuningSelect(tuning)}
                        isSelected={tuning === selectedTuning}
                    >
                        {tuning}
                    </TuningButton>
                ))}
            </TuningContainer>
        </Popover>
    );
};

export default TuningPopover;
