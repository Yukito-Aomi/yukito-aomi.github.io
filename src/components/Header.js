import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';
import './Header.css';

export function Header() {
  return (
    <header className="page-header wrapper">
      <h1><Link to="/"><img src={logo} className="logo" alt="logo" /></Link></h1>
      <nav>
        <ul className="main-nav">
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/products">Products</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
