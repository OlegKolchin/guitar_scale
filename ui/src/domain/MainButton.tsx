import * as React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const MainButton = styled(Button)({
    backgroundColor: '#e0e0e0', // Soft grey background
    // borderRadius: '10px', // Rounded corners
    boxShadow: '8px 8px 15px #a3a3a3, -8px -8px 15px #ffffff', // Soft shadows for 3D effect
    color: 'black', // Text color
    '&:hover': {
        backgroundColor: '#d1d1d1', // Slightly darker on hover
        boxShadow: '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff', // Adjust shadow on hover
    },
});