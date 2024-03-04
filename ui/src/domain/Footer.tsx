import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface FooterProps {
    version: string;
}

const Footer: React.FC<FooterProps> = ({ version }) => {
    return (
        <Box
            component="footer"
            sx={{
                width: '100%',
                position: 'fixed',
                bottom: 0,
                backgroundColor: '#f0f0f0',
                padding: '10px 0',
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    © 2024 Guitar Scale | Version {version}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;