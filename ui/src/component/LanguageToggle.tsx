
import React from 'react';
import { Button } from '@mui/material';
import { useDefaultSettings } from '../context/DefaultSettingsContext';

const LanguageToggle: React.FC = () => {
    const { language, toggleLanguage } = useDefaultSettings();

    return (
        <Button
            onClick={toggleLanguage}
            variant="contained"
            sx={{
                position: 'fixed',
                top: 16,
                right: 16,
                minWidth: '80px',
                fontWeight: 'bold',
                zIndex: 1000,
                backgroundColor: '#4169E1',
                '&:hover': {
                    backgroundColor: '#1E90FF',
                },
            }}
        >
            {language === 'en' ? '🇷🇺 RU' : '🇬🇧 EN'}
        </Button>
    );
};

export default LanguageToggle;