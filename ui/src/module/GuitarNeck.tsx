import React from 'react';
import Box from '@mui/material/Box';
import woodTexture from '../assets/material/wooden-textured-background.jpg';
import lightWoodTexture from '../assets/material/natural-wooden-background.jpg';

interface GuitarNeckProps {
    children?: React.ReactNode;
    numberOfStrings?: number;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({ children, numberOfStrings = 6 }) =>  {
    const heightBasedOnStrings = `${numberOfStrings * 3.7}vh`;

    return (
        <Box
            sx={{
                width: {
                    xs: '100%', // Full width on extra-small screens
                    sm: '75%', // 75% width starting from small screens
                    md: '50%', // 50% width starting from medium screens
                },
                height: heightBasedOnStrings,
                position: 'relative',
                // backgroundImage: `url(${woodTexture})`,
                // backgroundImage: `url(${lightWoodTexture})`,
                backgroundColor:'salmon',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: '8px',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                margin: 'auto',
                marginTop: '100px',
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
