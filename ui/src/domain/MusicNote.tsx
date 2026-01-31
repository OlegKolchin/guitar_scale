import React, { useMemo, useState, useEffect } from "react";
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
import { getChordDatabaseKey } from "../constants/Translations";
import {filterChordsForScale, filterIntervalsForScale} from "../utils/ScaleIntervalFilter";

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

// ========== UPDATED: Apply Poppins font to menus ==========
const StyledMenu = styled(Menu)(({ theme }) => ({
    '& .MuiPaper-root': {
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    },
    '& .MuiMenuItem-root': {
        fontFamily: "'Poppins', 'Inter', sans-serif",
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
    const [activeMainOption, setActiveMainOption] = React.useState<string | null>(null);
    const open = Boolean(anchorEl);

    const [filteredMenuOptions, setFilteredMenuOptions] = useState<SubMenu[]>([]);
    const [isFilteringIntervals, setIsFilteringIntervals] = useState(false);

    const baseMenuOptions = useMemo(() => {
        return createContextMenuOptions(language);
    }, [language]);

    useEffect(() => {
        if (!open) {
            return;
        }

        const filterMenu = async () => {
            // If filter is OFF, use base options
            if (!showOnlyScaleSuitable) {
                setFilteredMenuOptions(baseMenuOptions);
                return;
            }

            setIsFilteringIntervals(true);

            try {
                const intervalOptions = baseMenuOptions[0].subOptions; // All intervals
                const chordOptions = baseMenuOptions[1].subOptions;     // All chords

                // Filter intervals (parallel API calls for speed)
                const [filteredIntervals, filteredChords] = await Promise.all([
                    filterIntervalsForScale(
                        defaultSettings.coreNoteName,
                        defaultSettings.patternName,
                        noteName,
                        intervalOptions,
                        language
                    ),
                    filterChordsForScale(
                        defaultSettings.coreNoteName,
                        defaultSettings.patternName,
                        noteName,
                        language
                    )
                ]);

                // Create filtered menu with BOTH intervals and chords filtered
                const filtered: SubMenu[] = [
                    {
                        label: baseMenuOptions[0].label,  // "Intervals" or "Интервалы"
                        subOptions: filteredIntervals     // Filtered intervals
                    },
                    {
                        label: baseMenuOptions[1].label,  // "Chords" or "Аккорды"
                        subOptions: filteredChords        // Filtered chords
                    }
                ];

                setFilteredMenuOptions(filtered);
            } catch (error) {
                console.error('Error filtering menu:', error);
                setFilteredMenuOptions(baseMenuOptions);
            } finally {
                setIsFilteringIntervals(false);
            }
        };

        filterMenu();
    }, [open, showOnlyScaleSuitable, language, noteName, defaultSettings.coreNoteName, defaultSettings.patternName, baseMenuOptions]);

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
        if (activeMainOption === 'Intervals' || activeMainOption === 'Интервалы') {
            handleIntervalSelection(subOption);
        } else if (activeMainOption === 'Chords' || activeMainOption === 'Аккорды') {
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

    const handleChordSelection = (absoluteNotePosition: number, displayChordName: string) => {
        const databaseKey = getChordDatabaseKey(displayChordName);
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
                {isFilteringIntervals ? (
                    <MenuItem disabled>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircularProgress size={16} />
                            <Typography variant="inherit">Loading...</Typography>
                        </Box>
                    </MenuItem>
                ) : (
                    filteredMenuOptions.map((option) => (
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
                    ))
                )}
            </StyledMenu>
        </React.Fragment>
    );
};

export default MusicNote;