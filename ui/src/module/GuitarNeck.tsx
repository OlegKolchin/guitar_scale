import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import woodTexture from '../assets/material/wooden-textured-background.jpg'; // Ensure the path is correct

export default function GuitarNeck() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center', // Center horizontally
                alignItems: 'center', // Center vertically
                height: '100vh', // Full viewport height
                marginTop: '-10%', // Move up from the center
            }}
        >
            <Grid
                container
                spacing={10}
                sx={{
                    width: '70%',
                    minHeight: '25%',
                    backgroundImage: `url(${woodTexture})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: 'seashell', // This will be covered by the image
                    borderRadius: '16px', // Rounded corners
                }}
            >
                {/* Your grid content */}
            </Grid>
        </Box>
    );
}