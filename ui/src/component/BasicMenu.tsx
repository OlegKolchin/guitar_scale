import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {MainButtonOld} from '../domain/MainButtonOld';
import {MainButton} from '../domain/MainButton';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {ReactComponent as GuitarIcon} from './icons/electric-guitar.svg';

export default function BasicButtons() {

    const mainButton = new MainButton('#e0e0e0', '8px 8px 15px #a3a3a3, -8px -8px 15px #ffffff', 'black',
        '#d1d1d1', '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff');

    const StyledButton = mainButton.createStyledButton();


    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                width: '100%', // Take full width of the container
                paddingTop: '20px' // Adjust this value as needed for some spacing from the top
            }}
        >
            <Stack spacing={2} direction="row">
                <StyledButton variant="contained" endIcon ={<MusicNoteOutlinedIcon color={"success"}/>}>Scale</StyledButton>
                <StyledButton variant="contained" endIcon = {<GuitarIcon/>}>Tuning</StyledButton>
                <StyledButton variant="contained" endIcon = {<BubbleChartIcon color={"secondary"}/>}>Intervals</StyledButton>
            </Stack>
        </Box>
    );
}
