import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './components/pages/Home'
import { Profile } from './components/pages/Profile';
import { Products } from './components/pages/Products';
import { Contact } from './components/pages/Contact';
import { Portfolio } from './components/pages/Portfolio';
import { Games } from './components/pages/games/Games';
import { Whoops404 } from './components/pages/Whoops404';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/products"
          element={<Products />}
        />
        <Route
          path="/contact"
          element={<Contact />}
        />
        <Route
          path="/portfolio"
          element={<Portfolio />}
        />
        <Route
          path="/games"
          element={<Games />}
        />
        <Route path="*" element={<Whoops404 />} />
      </Routes>
    </div>
  );
}

export default App;
