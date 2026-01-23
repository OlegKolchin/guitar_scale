import * as React from "react";
import {Avatar, Grow, Menu, MenuItem, Typography} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useDefaultSettings } from "../context/DefaultSettingsContext";

interface MusicNoteProps {
    noteName: string;
    noteScalePosition: string;
    absolutePosition: number;
    top: string;
    left: string;
    onClick: () => void;
}

interface SubMenu {
    label: string;
    subOptions: string[];
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

const mainOptions: SubMenu[] = [
    { label: 'Intervals', subOptions: ['Прима', 'Секунда малая', 'Секунда большая', 'Терция малая', 'Терция большая', 'Кварта', 'Тритон',
                                       'Квинта', 'Секста малая', 'Секста большая', 'Септима малая',
                                       'Септима большая', 'Октава', 'Нона малая', 'Нона большая', 'Децима малая', 'Децима большая'] },
    { label: 'Chords', subOptions: ['Минорное трезвучие', 'Мажорное трезвучие'] },
    { label: 'Option 3', subOptions: ['Sub Option 5', 'Sub Option 6', 'Sub Option 7', 'Sub Option 9'] },
];

// const intervalColors: { [key: string]: string } = {
//     'Терция малая': '#FFCDD2',
//     'Терция большая': '#F8BBD0',
//     'Кварта': '#E1BEE7',
//     'Тритон': '#D1C4E9',
//     'Квинта': '#C5CAE9',
//     'Секста малая': '#BBDEFB',
//     'Секста большая': '#B3E5FC',
//     'Септима малая': '#B2EBF2',
//     'Септима большая': '#B2DFDB',
//     'Октава': '#C8E6C9',
//     'Нона малая': '#DCEDC8',
//     'Нона большая': '#F0F4C3',
//     'Децима малая': '#FFF9C4',
//     'Децима большая': '#FFECB3'
// };

const intervalColors: { [key: string]: string } = {
    'Прима': '#FFEBEE', // Lightest Red
    'Секунда малая': '#FFCDD2', // Light Red
    'Секунда большая': '#F8BBD0', // Light Pink
    'Терция малая': '#F48FB1', // Slightly darker Pink
    'Терция большая': '#F06292', // Darker Pink
    'Кварта': '#E1BEE7', // Light Purple
    'Тритон': '#D1C4E9', // Light Lavender
    'Квинта': '#C5CAE9', // Light Blue
    'Секста малая': '#BBDEFB', // Light Sky Blue
    'Секста большая': '#B3E5FC', // Light Cyan
    'Септима малая': '#B2EBF2', // Light Aqua
    'Септима большая': '#B2DFDB', // Light Teal
    'Октава': '#C8E6C9', // Light Green
    'Нона малая': '#DCEDC8', // Light Lime Green
    'Нона большая': '#F0F4C3', // Light Yellow Green
    'Децима малая': '#FFF9C4', // Light Yellow
    'Децима большая': '#FFECB3' // Light Orange
};
const MusicNote: React.FC<MusicNoteProps> = ({
                                                 noteName,
                                                 noteScalePosition,
                                                 absolutePosition,
                                                 top,
                                                 left,
                                                 onClick
                                             }) => {
    const { showScalePosition, hideEmptyScaleNotes, defaultSettings,
            highlightCoreNote, chordRootNote, intervalDestinationPos,
            toggleIntervalDestinationPos, intervalRootPos, toggleIntervalRootPos } = useDefaultSettings();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [subMenuAnchorEl, setSubMenuAnchorEl] = React.useState<null | HTMLElement>(null);
    const [currentSubOptions, setCurrentSubOptions] = React.useState<string[]>([]);
    const [activeMainOption, setActiveMainOption] = React.useState<string | null>(null);
    const open = Boolean(anchorEl);

    const handleRightClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault(); // Prevent the default context menu
        setAnchorEl(event.currentTarget); // Set the anchor element for the menu
    };

    const handleClose = () => {
        setAnchorEl(null); // Close the menu
        setSubMenuAnchorEl(null);
        setActiveMainOption(null);
    };

    const handleMainMenuClick = (event: React.MouseEvent<HTMLElement>, option: SubMenu) => {
        if (activeMainOption === option.label) {
            setSubMenuAnchorEl(null);
            setActiveMainOption(null);
        } else {
            setSubMenuAnchorEl(anchorEl); // Set to the same anchor as the main menu
            setCurrentSubOptions(option.subOptions);
            setActiveMainOption(option.label);
        }
    };

    const handleSubMenuClick = (subOption: string) => {
        console.log(`Param Name: ${activeMainOption}`);
        console.log(`Param Value: ${subOption}`);
        console.log(`Note Name: ${noteName}`);
        console.log(`Absolute Position: ${absolutePosition}`);

        // Add your custom logic here
        if (activeMainOption === 'Intervals') {
            if ('Прима' === subOption) {
                toggleIntervalDestinationPos(absolutePosition)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Секунда малая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 1)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Секунда большая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 2)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Терция малая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 3)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Терция большая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 4)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Кварта' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 5)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Тритон' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 6)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Квинта' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 7)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Секста малая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 8)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Секста большая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 9)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Септима малая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 10)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Септима большая' === subOption) {
                    toggleIntervalDestinationPos(absolutePosition + 11)
                    toggleIntervalRootPos(absolutePosition);
            } else if ('Октава' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 12)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Нона малая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 13)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Нона большая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 14)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Децима малая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 15)
                toggleIntervalRootPos(absolutePosition);
            } else if ('Децима большая' === subOption) {
                toggleIntervalDestinationPos(absolutePosition + 16)
                toggleIntervalRootPos(absolutePosition);
            }
        } else if (activeMainOption === 'Chords') {
            // Handle chords logic
        } else {
            // Handle other options
        }
        handleClose();
    };

    if (hideEmptyScaleNotes && noteScalePosition === '') {
        return null;
    }

    const noteNameStyle =
            (highlightCoreNote && noteName == defaultSettings.coreNoteName)
            ? { color: 'white', fontWeight: 'bold' }
            : noteName === chordRootNote
            ? { color: '#755139FF', fontWeight: 'bold' }
            : { color: 'black', fontWeight: 'bold' };

    const noteScalePositionStyle =
            (highlightCoreNote && noteName == defaultSettings.coreNoteName)
            ? { color: 'white', fontWeight: 'bolder', }
            : noteName === chordRootNote
            ? { color: '#755139FF', fontWeight: 'bolder', }
            : { color: 'green', fontWeight: 'bolder', };

    const noteColor =
            absolutePosition === intervalDestinationPos
            ? '#3cee98'
            : absolutePosition === intervalRootPos
            ? '#3ceedf'
            : highlightCoreNote && noteName === defaultSettings.coreNoteName
            ? '#CBCE91FF'
            : noteName === chordRootNote
            ? '#F2EDD7FF'
            : 'rgb(224,218,223)'

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
                                <MenuItem key={subOption} onClick={() => handleSubMenuClick(subOption)}
                                          sx={{
                                              backgroundColor: intervalColors[subOption] || 'inherit',
                                          }}>
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
