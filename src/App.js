import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './components/pages/Home'
import { Profile } from './components/pages/Profile';
import { Products } from './components/pages/Products';
import { Contact } from './components/pages/Contact';
import { Whoops404 } from './components/pages/Whoops404';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
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
        <Route path="*" element={<Whoops404 />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
