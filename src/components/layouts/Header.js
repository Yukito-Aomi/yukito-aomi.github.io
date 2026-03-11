import React from 'react';
import { Link } from 'react-router-dom';

import './Header.css';


export function Header() {
  return (
    <header className="header wrapper">
      <h1><Link to="">Aomi Web</Link></h1>
      <nav className="header-nav" aria-label="Header Navigation">
        <ul>
          <li><Link to="">Top</Link></li>
          <li><Link to="about">About</Link></li>
          <li><Link to="games">Games</Link></li>
        </ul>
      </nav>
    </header>
  );
}
