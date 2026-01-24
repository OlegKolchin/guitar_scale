// App.tsx

import React, { useEffect } from 'react';
import './App.css';
import BasicMenu from "./component/BasicMenu"
import GuitarFretboard from "./component/GuitarFretboard";
import { useDefaultSettings } from './context/DefaultSettingsContext';
import LoadingElement from "./component/LoadingElement";
import CustomizedSwitches from "./component/Switches";
import Footer from "./domain/Footer";

function App() {
    const {
        isLoading,
        isTuningLoading,
        isFretBoardLoading,
        toggleIntervalRootPos,
        toggleIntervalDestinationPos
    } = useDefaultSettings();

    // Global Ctrl+Click handler to reset interval colors
    useEffect(() => {
        const handleGlobalClick = (event: MouseEvent) => {
            // Check if Ctrl key (or Cmd on Mac) is pressed
            if (event.ctrlKey || event.metaKey) {
                console.log('Ctrl+Click detected - resetting interval colors');

                // Reset interval highlighting by setting both positions to -1
                // -1 means "no interval selected"
                toggleIntervalRootPos(-1);
                toggleIntervalDestinationPos(-1);
            }
        };

        // Add event listener to window for global click detection
        window.addEventListener('click', handleGlobalClick);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            window.removeEventListener('click', handleGlobalClick);
        };
    }, [toggleIntervalRootPos, toggleIntervalDestinationPos]);

    if (isLoading || isTuningLoading || isFretBoardLoading) {
        return LoadingElement();
    }

    const version = '0.5';

    return (
        <div className="App">
            <BasicMenu />
            <GuitarFretboard />
            <CustomizedSwitches />
            <Footer version={version} />
        </div>
    );
}

export default App;