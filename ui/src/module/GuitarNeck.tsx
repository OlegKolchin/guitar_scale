// module/GuitarNeck.tsx

import React from 'react';
import Box from '@mui/material/Box';
import woodTexture from '../assets/material/wooden-textured-background.jpg';
import lightWoodTexture from '../assets/material/natural-wooden-background.jpg';
import { GUITAR_NECK, calculateNeckHeight } from '../constants/FretboardLayout';

interface GuitarNeckProps {
    children?: React.ReactNode;
    numberOfStrings?: number;
}

const GuitarNeck: React.FC<GuitarNeckProps> = ({ children, numberOfStrings = 6 }) => {
    const heightBasedOnStrings = calculateNeckHeight(numberOfStrings);

    return (
        <Box
            sx={{
                width: {
                    xs: GUITAR_NECK.WIDTH.XS,
                    sm: GUITAR_NECK.WIDTH.SM,
                    md: GUITAR_NECK.WIDTH.MD,
                    lg: GUITAR_NECK.WIDTH.LG,
                    xl: GUITAR_NECK.WIDTH.XL,
                },
                [`@media (min-width:${GUITAR_NECK.ULTRA_WIDE_BREAKPOINT_PX}px)`]: {
                    width: GUITAR_NECK.WIDTH.XXL,
                },
                height: heightBasedOnStrings,
                position: 'relative',
                // backgroundImage: `url(${woodTexture})`,
                // backgroundImage: `url(${lightWoodTexture})`,
                backgroundColor: GUITAR_NECK.BACKGROUND_COLOR,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                borderRadius: `${GUITAR_NECK.BORDER_RADIUS_PX}px`,
                boxShadow: GUITAR_NECK.BOX_SHADOW,
                margin: 'auto',
                marginTop: `${GUITAR_NECK.TOP_MARGIN_PX}px`,
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