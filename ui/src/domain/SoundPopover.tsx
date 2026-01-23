// domain/SoundPopover.tsx

import React from 'react';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import CheckIcon from '@mui/icons-material/Check';
import { InstrumentType } from '../types/instrument';

interface SoundPopoverProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    onClose: () => void;
    onSoundSelect: (instrument: InstrumentType) => void;
    selectedSound: InstrumentType;
}

interface SoundOption {
    value: InstrumentType;
    label: string;
    description: string;
}

const SOUND_OPTIONS: SoundOption[] = [
    {
        value: 'synth',
        label: 'Default',
        description: 'Standard synthesizer'
    },
    {
        value: 'pluck',
        label: 'Guitar',
        description: 'Plucked string (acoustic guitar-like)'
    },
    {
        value: 'mono',
        label: 'Electric',
        description: 'Electric guitar tone'
    }
];

const SoundPopover: React.FC<SoundPopoverProps> = ({
                                                       anchorEl,
                                                       open,
                                                       onClose,
                                                       onSoundSelect,
                                                       selectedSound
                                                   }) => {
    const handleSoundClick = (instrument: InstrumentType) => {
        onSoundSelect(instrument);
    };

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
        >
            <List sx={{ width: 280, padding: 0 }}>
                {SOUND_OPTIONS.map((option) => (
                    <ListItem key={option.value} disablePadding>
                        <ListItemButton
                            onClick={() => handleSoundClick(option.value)}
                            selected={selectedSound === option.value}
                        >
                            <ListItemIcon>
                                {selectedSound === option.value && (
                                    <CheckIcon color="success" />
                                )}
                            </ListItemIcon>
                            <ListItemText
                                primary={option.label}
                                secondary={option.description}
                                primaryTypographyProps={{
                                    fontWeight: selectedSound === option.value ? 'bold' : 'normal'
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Popover>
    );
};

export default SoundPopover;