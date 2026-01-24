// domain/MusicNote.tsx

import React from "react";
import { Avatar, Grow, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDefaultSettings } from "../context/DefaultSettingsContext";
import {
    getIntervalSemitones,
    getIntervalColor,
    isValidInterval
} from "../constants/MusicalIntervals";
import { CONTEXT_MENU_OPTIONS, SubMenu } from "../constants/ContextMenuOptions";

interface MusicNoteProps {
    noteName: string;
    noteScalePosition: string;
    absolutePosition: number;
    top: string;
    left: string;
    onClick: () => void;
}

const StyledAvatar = styled(Avatar)({
    backgroundColor: 'rgb(224,218,223)',
    color: 'white',
    width: 'min(2vw, 2vh)',
    height: 'min(2vw, 2vh)',
    fontSize: 'clamp(7px, 1.1vw, 10px)',
    minWidth: '19px',
    minHeight: '19px',
    maxWidth: '24px',
    maxHeight: '24px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3), 0 6px 20px rgba(0, 0, 0, 0.19)',
});

const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#e0e0e0',
    },
    '& .MuiMenuItem-root': {
        '&:hover': {
            backgroundColor: 'lightgray',
        },
        '&.Mui-selected': {
            backgroundColor: '#b0c4de',
        },
        '&.Mui-focusVisible': {
            backgroundColor: 'transparent',
        }
    }
}));

const MusicNote: React.FC<MusicNoteProps> = ({
                                                 noteName,
                                                 noteScalePosition,
                                                 absolutePosition,
                                                 top,
                                                 left,
                                                 onClick
                                             }) => {
    const {
        showScalePosition,
        hideEmptyScaleNotes,
        defaultSettings,
        highlightCoreNote,
        chordRootNote,
        intervalDestinationPos,
        toggleIntervalDestinationPos,
        intervalRootPos,
        toggleIntervalRootPos
    } = useDefaultSettings();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentSubOptions, setCurrentSubOptions] = React.useState<string[]>([]);
    const [activeMainOption, setActiveMainOption] = React.useState<string | null>(null);
    const open = Boolean(anchorEl);

    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSubMenuAnchorEl(null);
        setActiveMainOption(null);
    };

    const handleMainMenuClick = (event: React.MouseEvent<HTMLElement>, option: SubMenu) => {
        if (activeMainOption === option.label) {
            setSubMenuAnchorEl(null);
            setActiveMainOption(null);
        } else {
            setSubMenuAnchorEl(anchorEl);
            setCurrentSubOptions(option.subOptions);
            setActiveMainOption(option.label);
        }
    };

    // ========================================================================
    // REFACTORED: Clean interval handling
    // ========================================================================
    const handleSubMenuClick = (subOption: string) => {
        console.log(`Param Name: ${activeMainOption}`);
        console.log(`Param Value: ${subOption}`);
        console.log(`Note Name: ${noteName}`);
        console.log(`Absolute Position: ${absolutePosition}`);

        if (activeMainOption === 'Intervals') {
            handleIntervalSelection(subOption);
        } else if (activeMainOption === 'Chords') {
            handleChordSelection(subOption);
        } else {
            // Handle other options
        }

        handleClose();
    };

    /**
     * Handle interval selection using data structure
     */
    const handleIntervalSelection = (intervalName: string) => {
        const semitones = getIntervalSemitones(intervalName);

        if (semitones !== undefined) {
            toggleIntervalRootPos(absolutePosition);
            toggleIntervalDestinationPos(absolutePosition + semitones);
        } else {
            console.warn(`Unknown interval: ${intervalName}`);
        }
    };

    /**
     * Handle chord selection (placeholder for future implementation)
     */
    const handleChordSelection = (chordName: string) => {
        // TODO: Implement chord logic
        console.log(`Chord selected: ${chordName}`);
    };

    // Early return if note should be hidden
    if (hideEmptyScaleNotes && noteScalePosition === '') {
        return null;
    }

    // ========================================================================
    // Styling logic
    // ========================================================================

    const noteNameStyle =
        (highlightCoreNote && noteName === defaultSettings.coreNoteName)
            ? { color: 'white', fontWeight: 'bold' }
            : noteName === chordRootNote
                ? { color: '#755139FF', fontWeight: 'bold' }
                : { color: 'black', fontWeight: 'bold' };

    const noteScalePositionStyle =
        (highlightCoreNote && noteName === defaultSettings.coreNoteName)
            ? { color: 'white', fontWeight: 'bolder' }
            : noteName === chordRootNote
                ? { color: '#755139FF', fontWeight: 'bolder' }
                : { color: 'green', fontWeight: 'bolder' };

    const noteColor =
        absolutePosition === intervalDestinationPos
            ? '#3cee98'
            : absolutePosition === intervalRootPos
                ? '#3ceedf'
                : highlightCoreNote && noteName === defaultSettings.coreNoteName
                    ? '#CBCE91FF'
                    : noteName === chordRootNote
                        ? '#F2EDD7FF'
                        : 'rgb(224,218,223)';

    const avatarContent = showScalePosition ? (
        <React.Fragment>
            <span style={noteNameStyle}>{noteName}</span>
            <span style={noteScalePositionStyle}>{noteScalePosition}</span>
        </React.Fragment>
    ) : (
        <span style={noteNameStyle}>{noteName}</span>
    );

    return (
        <React.Fragment>
            <StyledAvatar
                sx={{
                    position: 'absolute',
                    backgroundColor: noteColor,
                    top: top,
                    left: left,
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onClick={onClick}
                onContextMenu={handleRightClick}
            >
                {avatarContent}
            </StyledAvatar>

            <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                TransitionComponent={Grow}
            >
                {CONTEXT_MENU_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.label}
                        onClick={(event) => handleMainMenuClick(event, option)}
                        selected={activeMainOption === option.label}
                        aria-haspopup="true"
                        aria-controls="simple-menu-submenu"
                    >
                        <Typography variant="inherit">{option.label}</Typography>
                        <StyledMenu
                            id="simple-menu-submenu"
                            anchorEl={subMenuAnchorEl}
                            open={Boolean(subMenuAnchorEl) && currentSubOptions === option.subOptions}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            MenuListProps={{
                                'aria-labelledby': 'submenu-button',
                            }}
                        >
                            {currentSubOptions.map((subOption) => (
                                <MenuItem
                                    key={subOption}
                                    onClick={() => handleSubMenuClick(subOption)}
                                    sx={{
                                        backgroundColor: getIntervalColor(subOption),
                                    }}
                                >
                                    <Typography variant="inherit">{subOption}</Typography>
                                </MenuItem>
                            ))}
                        </StyledMenu>
                    </MenuItem>
                ))}
            </StyledMenu>
        </React.Fragment>
    );
};

export default MusicNote;