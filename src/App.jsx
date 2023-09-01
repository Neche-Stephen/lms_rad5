import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Analytics from './components/Analytics/Analytics';
import Tutors from './components/Tutors/Tutors';

export default function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path='/' element = {<Analytics />}/>
          </Routes>
      </BrowserRouter>
    </>
  )
}

