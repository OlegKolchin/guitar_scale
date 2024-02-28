import React, {useEffect, useState} from 'react';
import './App.css';
import BasicMenu from "./component/BasicMenu"
import GuitarFretboard from "./component/GuitarFretboard";
import TuningChip from "./domain/TuningChip";
import { useDefaultSettings } from './context/DefaultSettingsContext';

import {Tuning} from "./interface/Tuning";
import LoadingElement from "./component/LoadingElement";
import {FretBoard} from "./interface/FretBoard";
import CustomizedSwitches from "./component/Switches";
import {FretDot} from "./domain/FretDot";

function App() {

    const{defaultSettings, tuning, fretBoard, isLoading, isTuningLoading, isFretBoardLoading} = useDefaultSettings();
    const numberOfStrings = defaultSettings.numberOfStrings;
    const tuningName = defaultSettings.tuningName;

    if (isLoading || isTuningLoading || isFretBoardLoading) {
        return LoadingElement();
    }


    return (
    <div className="App">
      <BasicMenu></BasicMenu>
      <GuitarFretboard></GuitarFretboard>
        {/* Display the tuning name if the data has been fetched */}
        {/*<TuningChip tuningName={tuningName} />*/}
        {/*<TuningChip  tuningName={defaultSettings.coreNoteName + ' ' + defaultSettings.patternName} />*/}
        <CustomizedSwitches></CustomizedSwitches>
    </div>
  );
}

export default App;
