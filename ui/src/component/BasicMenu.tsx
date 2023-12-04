import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import {MainButton} from '../domain/MainButton';
import MusicNoteOutlinedIcon from '@mui/icons-material/MusicNoteOutlined';
import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import {ReactComponent as GuitarIcon} from './icons/electric-guitar.svg';

export default function BasicButtons() {
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
                <MainButton variant="contained" endIcon ={<MusicNoteOutlinedIcon color={"success"}/>}>Scale</MainButton>
                <MainButton variant="contained" endIcon = {<GuitarIcon/>}>Tuning</MainButton>
                <MainButton variant="contained" endIcon = {<BubbleChartIcon color={"secondary"}/>}>Intervals</MainButton>
            </Stack>
        </Box>
    );
}
