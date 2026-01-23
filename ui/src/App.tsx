import React, {useEffect, useState} from 'react';
import './App.css';
import BasicMenu from "./component/BasicMenu"
import GuitarFretboard from "./component/GuitarFretboard";
import { useDefaultSettings } from './context/DefaultSettingsContext';
import LoadingElement from "./component/LoadingElement";
import CustomizedSwitches from "./component/Switches";
import Footer from "./domain/Footer";
import Line from "./domain/Line";
import LineDrawingComponent from "./domain/LineDrawingComponent";

function App() {

    const{isLoading, isTuningLoading, isFretBoardLoading} = useDefaultSettings();

    if (isLoading || isTuningLoading || isFretBoardLoading) {
        return LoadingElement();
    }

    const version = '0.5';

    return (
    <div className="App">
        {/*<LineDrawingComponent></LineDrawingComponent>*/}
      <BasicMenu></BasicMenu>
      <GuitarFretboard></GuitarFretboard>
        <CustomizedSwitches></CustomizedSwitches>
        <Footer version={version}/>
    </div>

  );
}

export default App;
