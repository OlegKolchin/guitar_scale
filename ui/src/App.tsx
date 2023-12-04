import React from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from "./component/Sidebar";
import BasicMenu from "./component/BasicMenu"
import GuitarFretboard from "./component/GuitarFretboard";


function App() {
  return (
    <div className="App">
      <BasicMenu></BasicMenu>
      {/*<SimpleContainer></SimpleContainer>*/}
      <GuitarFretboard></GuitarFretboard>
      {/*<NickelString></NickelString>*/}
      {/*<Sidebar></Sidebar>*/}
      {/*<header className="App-header">*/}
      {/*  <img src={logo} className="App-logo" alt="logo" />*/}
      {/*  <p>*/}
      {/*    Edit <code>src/App.tsx</code> and save to reload.*/}
      {/*  </p>*/}
      {/*  <a*/}
      {/*    className="App-link"*/}
      {/*    href="https://reactjs.org"*/}
      {/*    target="_blank"*/}
      {/*    rel="noopener noreferrer"*/}
      {/*  >*/}
      {/*    Learn React*/}
      {/*  </a>*/}
      {/*</header>*/}
    </div>
  );
}

export default App;
