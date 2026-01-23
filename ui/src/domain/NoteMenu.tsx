import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import {Grow, Slide} from "@mui/material";

interface NoteMenuProps {
    anchorEl: null | HTMLElement;
    open: boolean;
    onClose: () => void;
    onSubMenuClickAction: (paramName :string, paramValue: string, noteName: string, absolutePosition : number) => void;
    noteName: string;
    absolutePosition: number;
}

interface SubMenu {
    label: string;
    subOptions: string[];
}

// Create a styled version of the Menu component
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
    { label: 'Intervals', subOptions: ['Малая терция', 'Большая терция', 'Квинта', 'Кварта', 'Тритон'] },
    { label: 'Chords', subOptions: ['Минорное трезвучие', 'Мажорное трезвучие'] },
    { label: 'Option 3', subOptions: ['Sub Option 5', 'Sub Option 6', 'Sub Option 7', 'Sub Option 9'] },
];

const NoteMenu: React.FC<NoteMenuProps> = ({ anchorEl, open,  onClose, onSubMenuClickAction, noteName, absolutePosition}) => {
    const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<null | HTMLElement>(null);
    const [currentSubOptions, setCurrentSubOptions] = useState<string[]>([]);
    const [activeMainOption, setActiveMainOption] = useState<string | null>(null);

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

    const handleSubMenuClose = () => {
        setSubMenuAnchorEl(null);
        setActiveMainOption(null);
    };

    const handleSubMenuClick = (supOption : string) => {
        onSubMenuClickAction(activeMainOption!, supOption, noteName, absolutePosition); // Replace with actual parameters
        setSubMenuAnchorEl(null);
        setActiveMainOption(null);
        onClose();
    };



    return (
        <StyledMenu
            anchorEl={anchorEl}
            open={open}
            onClose={onClose}
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
                        onClose={handleSubMenuClose}
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
                            <MenuItem key={subOption} onClick={() => handleSubMenuClick(subOption)}>
                                <Typography variant="inherit">{subOption}</Typography>
                            </MenuItem>
                        ))}
                    </StyledMenu>
                </MenuItem>
            ))}
        </StyledMenu>
    );
};

export default NoteMenu;
