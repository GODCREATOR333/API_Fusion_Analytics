import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Mainscreen from './Screens/Mainscreen';
import LoginScreen from './Screens/LoginScreen';

function App() {


  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<LoginScreen />} />
          <Route path='/home' element={<Mainscreen />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
