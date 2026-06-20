import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch, { SwitchProps } from '@mui/material/Switch';
import {
    IconMusic,
    IconFocus2,
    IconList,
    IconPointer,
    IconFilter,
} from '@tabler/icons-react';
import { getUIText } from '../constants/Translations';
import { useDefaultSettings } from "../context/DefaultSettingsContext";

const ACCENT = '#199383';

const IOSSwitch = styled((props: SwitchProps) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 38,
    height: 22,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : ACCENT,
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
        width: 18,
        height: 18,
    },
    '& .MuiSwitch-track': {
        borderRadius: 22 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#d8dce3' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

interface SwitchRowProps {
    icon: React.ReactNode;
    label: string;
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
    divider?: boolean;
}

function SwitchRow({ icon, label, checked, onChange, disabled = false, divider = true }: SwitchRowProps) {
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                py: 1.1,
                borderBottom: divider ? '1px solid #f2f3f5' : 'none',
                opacity: disabled ? 0.4 : 1,
                transition: 'opacity 200ms ease',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flex: 'none',
                    width: 20,
                    justifyContent: 'center',
                    color: checked && !disabled ? ACCENT : '#b6bcc6',
                    transition: 'color 200ms ease',
                }}
            >
                {icon}
            </Box>
            <FormControlLabel
                control={<IOSSwitch checked={checked} disabled={disabled} />}
                label={label}
                onChange={onChange}
                labelPlacement="start"
                sx={{
                    flex: 1,
                    justifyContent: 'space-between',
                    ml: 0,
                    mr: 0,
                    gap: 2,
                    '& .MuiFormControlLabel-label': {
                        fontFamily: "'Poppins', 'Inter', sans-serif",
                        fontWeight: 500,
                        letterSpacing: '0.3px',
                        fontSize: '14px',
                        color: '#2c3e50',
                    },
                }}
            />
        </Box>
    );
}

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

    const iconProps = { size: 18, stroke: 1.75 };

    return (
        <Paper
            elevation={0}
            sx={{
                width: 'fit-content',
                minWidth: 360,
                maxWidth: 500,
                margin: '40px auto 24px',
                px: 2.75,
                py: 0.5,
                borderRadius: '14px',
                border: '1px solid #ebedf0',
                backgroundColor: '#fff',
                boxShadow: 'none',
            }}
        >
            <FormGroup>
                <SwitchRow
                    icon={<IconMusic {...iconProps} />}
                    label={getUIText('switches', 'show_scale_notes', language)}
                    checked={hideEmptyScaleNotes}
                    onChange={toggleHideEmptyScaleNotes}
                />
                <SwitchRow
                    icon={<IconFocus2 {...iconProps} />}
                    label={getUIText('switches', 'highlight_tonic', language)}
                    checked={highlightCoreNote}
                    onChange={toggleHighlightCoreNote}
                />
                <SwitchRow
                    icon={<IconList {...iconProps} />}
                    label={getUIText('switches', 'show_scale_degrees', language)}
                    checked={showScalePosition}
                    onChange={toggleShowScalePosition}
                />
                <SwitchRow
                    icon={<IconPointer {...iconProps} />}
                    label={getUIText('switches', 'chord_mode', language)}
                    checked={showChordSequence}
                    onChange={toggleShowChordSequence}
                    disabled={!showScalePosition}
                />
                <SwitchRow
                    icon={<IconFilter {...iconProps} />}
                    label={getUIText('switches', 'show_only_scale_suitable', language)}
                    checked={showOnlyScaleSuitable}
                    onChange={toggleShowOnlyScaleSuitable}
                    divider={false}
                />
            </FormGroup>
        </Paper>
    );
}
