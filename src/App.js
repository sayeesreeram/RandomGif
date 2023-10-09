import logo from './logo.svg';
import './App.css';
import HomeGifPageComponent from './Components/HomeGifPageComponent';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Trendings from "./Components/Trendings/Index"
import { createContext, useState } from 'react';
import styled from "styled-components";

export const DarkModeSwitcherContext = createContext(null);

const ParentAppContainer = styled.div`
background-color: ${props => !props.darkMode ? "ffff" : "black"};
text-align: center;
min-height:100vh;
height:100%;
`

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <DarkModeSwitcherContext.Provider value={{ darkMode, setDarkMode }}>
      {console.log("dark", darkMode)}
      <ParentAppContainer darkMode={darkMode}>
        <Router>
          <Routes>
            <Route element={<HomeGifPageComponent />} path='/' />
            <Route element={<Trendings />} path='/trendings' />
          </Routes>
        </Router>
      </ParentAppContainer>
    </DarkModeSwitcherContext.Provider>
  );
}

export default App;
