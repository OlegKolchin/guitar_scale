import React, { useState, useEffect } from "react";
import { Avatar, Grow, Menu, MenuItem, Typography, CircularProgress, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDefaultSettings } from "../context/DefaultSettingsContext";
import {
    getIntervalSemitones,
    getIntervalColor,
} from "../constants/MusicalIntervals";
import { getChordColor } from "../constants/ChordColors";
import { createContextMenuOptions, SubMenu } from "../constants/ContextMenuOptions";
import { NOTE_DISPLAY } from "../constants/FretboardLayout";
import {
    Language,
    convertChordsToDisplayNames,
    convertIntervalsToDisplayNames,
    getMenuLabel,
    getUIText,
} from "../constants/Translations";
import { UI_FONT_FAMILY } from "../constants/Typography";
import {filterChordsForScale, filterIntervalsForScale} from "../utils/ScaleIntervalFilter";

type MenuKey = 'intervals' | 'chords';

interface MenuOption {
    key: MenuKey;
    subOptions: SubMenu['subOptions'];
}

// Options hold canonical names, which are the English ones, and are translated only when rendered.
const CANONICAL_LANGUAGE: Language = 'en';
const [INTERVAL_MENU, CHORD_MENU] = createContextMenuOptions(CANONICAL_LANGUAGE);
const BASE_MENU_OPTIONS: MenuOption[] = [
    { key: 'intervals', subOptions: INTERVAL_MENU.subOptions },
    { key: 'chords', subOptions: CHORD_MENU.subOptions },
];

const getOptionDisplayName = (menu: MenuKey, name: string, language: Language): string => {
    const toDisplayNames = menu === 'intervals' ? convertIntervalsToDisplayNames : convertChordsToDisplayNames;
    return toDisplayNames([name], language)[0];
};

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

// Menus are portalled out of the app, so they set the UI font themselves
const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    '& .MuiMenuItem-root': {
        fontFamily: UI_FONT_FAMILY,
        fontWeight: 500,
        letterSpacing: '0.5px',
        fontSize: '15px',
        padding: '10px 16px',
        transition: 'background-color 0.2s ease',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
        '&.Mui-selected': {
            backgroundColor: '#b0c4de',
            fontWeight: 600,
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
        language,
        showOnlyScaleSuitable
    } = useDefaultSettings();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentSubOptions, setCurrentSubOptions] = React.useState<string[]>([]);
    const [activeMainOption, setActiveMainOption] = React.useState<MenuKey | null>(null);
    const open = Boolean(anchorEl);

    const [filteredMenuOptions, setFilteredMenuOptions] = useState<MenuOption[]>([]);
    const [isFilteringIntervals, setIsFilteringIntervals] = useState(false);

    useEffect(() => {
        if (!open) {
            return;
        }

        const filterMenu = async () => {
            // If filter is OFF, use base options
            if (!showOnlyScaleSuitable) {
                setFilteredMenuOptions(BASE_MENU_OPTIONS);
                return;
            }

            setIsFilteringIntervals(true);

            try {
                const intervalOptions = INTERVAL_MENU.subOptions; // All intervals

                // Filter intervals (parallel API calls for speed)
                const [filteredIntervals, filteredChords] = await Promise.all([
                    filterIntervalsForScale(
                        defaultSettings.coreNoteName,
                        defaultSettings.patternName,
                        noteName,
                        intervalOptions,
                        CANONICAL_LANGUAGE
                    ),
                    filterChordsForScale(
                        defaultSettings.coreNoteName,
                        defaultSettings.patternName,
                        noteName,
                        CANONICAL_LANGUAGE
                    )
                ]);

                // Create filtered menu with BOTH intervals and chords filtered
                const filtered: MenuOption[] = [
                    {
                        key: 'intervals',
                        subOptions: filteredIntervals     // Filtered intervals
                    },
                    {
                        key: 'chords',
                        subOptions: filteredChords        // Filtered chords
                    }
                ];

                setFilteredMenuOptions(filtered);
            } catch (error) {
                console.error('Error filtering menu:', error);
                setFilteredMenuOptions(BASE_MENU_OPTIONS);
            } finally {
                setIsFilteringIntervals(false);
            }
        };

        filterMenu();
    }, [open, showOnlyScaleSuitable, noteName, defaultSettings.coreNoteName, defaultSettings.patternName]);

    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSubMenuAnchorEl(null);
        setActiveMainOption(null);
    };

    const handleMainMenuClick = (event: React.MouseEvent<HTMLElement>, option: MenuOption) => {
        if (activeMainOption === option.key) {
            setSubMenuAnchorEl(null);
            setActiveMainOption(null);
        } else {
            setSubMenuAnchorEl(anchorEl);
            setCurrentSubOptions(option.subOptions);
            setActiveMainOption(option.key);
        }
    };

    const handleSubMenuClick = (subOption: string) => {
        if (activeMainOption === 'intervals') {
            handleIntervalSelection(subOption);
        } else if (activeMainOption === 'chords') {
            handleChordSelection(absolutePosition, subOption);
        }

        handleClose();
    };

    const handleIntervalSelection = (intervalName: string) => {
        const semitones = getIntervalSemitones(intervalName);

        if (semitones !== undefined) {
            toggleIntervalRootPos(absolutePosition);
            toggleIntervalDestinationPos(absolutePosition + semitones);
        } else {
            console.warn(`Unknown interval: ${intervalName}`);
        }
    };

    const handleChordSelection = (absoluteNotePosition: number, chordName: string) => {
        toggleChordSelection(absoluteNotePosition, chordName);
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
                {isFilteringIntervals ? (
                    <MenuItem disabled>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={16} />
                            <Typography variant="inherit">{getUIText('note_menu', 'loading', language)}</Typography>
                        </Box>
                    </MenuItem>
                ) : (
                    filteredMenuOptions.map((option) => (
                        <MenuItem
                            key={option.key}
                            onClick={(event) => handleMainMenuClick(event, option)}
                            selected={activeMainOption === option.key}
                            aria-haspopup="true"
                            aria-controls="simple-menu-submenu"
                        >
                            <Typography variant="inherit">{getMenuLabel(option.key, language)}</Typography>
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
                                            backgroundColor: option.key === 'intervals'
                                                ? getIntervalColor(subOption)
                                                : getChordColor(subOption)
                                        }}
                                    >
                                        <Typography variant="inherit">{getOptionDisplayName(option.key, subOption, language)}</Typography>
                                    </MenuItem>
                                ))}
                            </StyledMenu>
                        </MenuItem>
                    ))
                )}
            </StyledMenu>
        </React.Fragment>
    );
};

export default MusicNote;