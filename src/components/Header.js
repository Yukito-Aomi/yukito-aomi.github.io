import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header>
      <h1><Link to="">Aomi's Website</Link></h1>
      <nav>
        <ul>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="products">Products</Link></li>
          <li><Link to="contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}
