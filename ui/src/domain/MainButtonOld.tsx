import * as React from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const MainButtonOld = styled(Button)({
    backgroundColor: '#e0e0e0',
    boxShadow: '8px 8px 15px #a3a3a3, -8px -8px 15px #ffffff',
    color: 'black', // Text color
    '&:hover': {
        backgroundColor: '#d1d1d1',
        boxShadow: '5px 5px 10px #a3a3a3, -5px -5px 10px #ffffff',
    },
});

