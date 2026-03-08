import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { getUIText } from '../constants/Translations';
import { useDefaultSettings } from "../context/DefaultSettingsContext";

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#199383',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

export default function CustomizedSwitches() {
    const {
        toggleShowScalePosition,
        toggleHideEmptyScaleNotes,
        toggleHighlightCoreNote,
        toggleShowChordSequence,
        showScalePosition,
        hideEmptyScaleNotes,
        highlightCoreNote,
        showChordSequence,
        language,
        showOnlyScaleSuitable,
        toggleShowOnlyScaleSuitable,
    } = useDefaultSettings();

    // Stylish label styling with Poppins font
    const labelStyle = {
        '& .MuiFormControlLabel-label': {
            fontFamily: "'Poppins', 'Inter', sans-serif",
            fontWeight: 500,
            letterSpacing: '0.5px',
            fontSize: '15px',
            color: '#2c3e50'
        }
    };

    return (
        // <Stack direction="row" justifyContent="center" alignItems="center" sx={{ width: '100%', height: '45vh' }}>
            <FormGroup sx={{
                alignItems: 'flex-start',
                margin: '48px auto 24px',
                width: 'fit-content'
            }}>
                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 0.5 }} checked={hideEmptyScaleNotes} />}
                    label={getUIText('switches', 'show_scale_notes', language)}
                    onChange={toggleHideEmptyScaleNotes}
                    sx={labelStyle}
                />

                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 0.5 }} checked={highlightCoreNote} />}
                    label={getUIText('switches', 'highlight_tonic', language)}
                    onChange={toggleHighlightCoreNote}
                    sx={labelStyle}
                />

                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 0.5 }} checked={showScalePosition} />}
                    label={getUIText('switches', 'show_scale_degrees', language)}
                    onChange={toggleShowScalePosition}
                    sx={labelStyle}
                />

                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 0.5, ml: 3 }} checked={showChordSequence} disabled={!showScalePosition} />}
                    label={getUIText('switches', 'chord_mode', language)}
                    onChange={toggleShowChordSequence}
                    sx={labelStyle}
                />

                <FormControlLabel
                    control={<IOSSwitch sx={{ m: 0.5 }} checked={showOnlyScaleSuitable} />}
                    label={getUIText('switches', 'show_only_scale_suitable', language)}
                    onChange={toggleShowOnlyScaleSuitable}
                    sx={labelStyle}
                />
            </FormGroup>
        // </Stack>
    );
}