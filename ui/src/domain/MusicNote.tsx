import React, { useMemo } from "react";
import { Avatar, Grow, Menu, MenuItem, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDefaultSettings } from "../context/DefaultSettingsContext";
import {
    getIntervalSemitones,
    getIntervalColor,
} from "../constants/MusicalIntervals";
import { getChordColor } from "../constants/ChordColors";
import { createContextMenuOptions, SubMenu } from "../constants/ContextMenuOptions";
import { NOTE_DISPLAY } from "../constants/FretboardLayout";
import { getChordDatabaseKey } from "../constants/Translations";

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
    width: NOTE_DISPLAY.SIZE_RESPONSIVE,
    height: NOTE_DISPLAY.SIZE_RESPONSIVE,
    fontSize: NOTE_DISPLAY.FONT_SIZE_RESPONSIVE,
    minWidth: `${NOTE_DISPLAY.MIN_SIZE_PX}px`,
    minHeight: `${NOTE_DISPLAY.MIN_SIZE_PX}px`,
    maxWidth: `${NOTE_DISPLAY.MAX_SIZE_PX}px`,
    maxHeight: `${NOTE_DISPLAY.MAX_SIZE_PX}px`,
    border: `${NOTE_DISPLAY.BORDER_WIDTH_PX}px solid ${NOTE_DISPLAY.BORDER_COLOR}`,
    boxShadow: NOTE_DISPLAY.BOX_SHADOW,
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
        selectedChordNotes,
        toggleIntervalDestinationPos,
        intervalRootPos,
        toggleIntervalRootPos,
        toggleChordSelection,
        language
    } = useDefaultSettings();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentSubOptions, setCurrentSubOptions] = React.useState<string[]>([]);
    const [activeMainOption, setActiveMainOption] = React.useState<string | null>(null);
    const open = Boolean(anchorEl);

    const mainOptions = useMemo(() => {
        return createContextMenuOptions(language);
    }, [language]);

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

    const handleSubMenuClick = (subOption: string) => {
        console.log(`Param Name: ${activeMainOption}`);
        console.log(`Param Value: ${subOption}`);
        console.log(`Note Name: ${noteName}`);
        console.log(`Absolute Position: ${absolutePosition}`);

        if (activeMainOption === 'Intervals' || activeMainOption === 'Интервалы') {
            handleIntervalSelection(subOption);
        } else if (activeMainOption === 'Chords' || activeMainOption === 'Аккорды') {
            handleChordSelection(absolutePosition, subOption);
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
     * ========== UPDATED: Handle chord selection with database key conversion ==========
     */
    const handleChordSelection = (absoluteNotePosition: number, displayChordName: string) => {
        // Convert display name (Russian or English) to database key
        const databaseKey = getChordDatabaseKey(displayChordName);

        console.log(`Display name: ${displayChordName}`);
        console.log(`Database key: ${databaseKey}`);

        // Send database key to backend
        toggleChordSelection(absoluteNotePosition, databaseKey);
    };

    const isNoteInChord = (absolutePosition: number): boolean => {
        for (const num of selectedChordNotes) {
            if (num === absolutePosition) return true;
        }
        return false;
    };

    if (hideEmptyScaleNotes && noteScalePosition === '') {
        return null;
    }

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
            : isNoteInChord(absolutePosition)
                ? '#9dbbff'
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
                {mainOptions.map((option) => (
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
                                        backgroundColor: (activeMainOption === 'Intervals' || activeMainOption === 'Интервалы')
                                            ? getIntervalColor(subOption)
                                            : getChordColor(subOption)
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