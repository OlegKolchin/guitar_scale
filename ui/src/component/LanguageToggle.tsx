import React, { useEffect } from 'react';
import { Button } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { useDefaultSettings } from '../context/DefaultSettingsContext';
import { UI_FONT_FAMILY } from '../constants/Typography';

const LanguageToggle: React.FC = () => {
    const { language, toggleLanguage } = useDefaultSettings();

    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    return (
        <Button
            onClick={toggleLanguage}
            variant="contained"
            startIcon={<LanguageIcon />}
            sx={{
                position: 'fixed',
                top: 16,
                right: 16,
                minWidth: '80px',
                fontWeight: 'bold',
                zIndex: 1000,
                backgroundColor: '#4169E1',
                fontFamily: UI_FONT_FAMILY,
                letterSpacing: '0.5px',
                '&:hover': {
                    backgroundColor: '#1E90FF',
                },
            }}
        >
            {language === 'en' ? 'RU' : 'EN'}
        </Button>
    );
};

export default LanguageToggle;