import React from 'react';
import Box from '@mui/material/Box';
import woodTexture from '../assets/material/wooden-textured-background.jpg';

interface GuitarNeckTempProps {
    children?: React.ReactNode;
    numberOfStrings?: number; // New prop for the number of strings
}

const GuitarNeck: React.FC<GuitarNeckTempProps> = ({ children, numberOfStrings = 6 }) =>  {
    const heightBasedOnStrings = `${numberOfStrings * 3.5}vh`; // Example calculation, adjust as needed

    return (
        <Box
            sx={{
                width: '60%',
                height: heightBasedOnStrings, // Dynamic height based on the number of strings
                position: 'relative',
                backgroundImage: `url(${woodTexture})`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                margin: 'auto',
                marginTop: '70px',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}
        >
            {children}
        </Box>
    );
};

export default GuitarNeck;
