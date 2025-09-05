import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import { Header } from './components/layouts/Header';
import { Footer } from './components/layouts/Footer';

import { About } from './components/pages/About';
import { Home } from './components/pages/Home';


function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
