import React from 'react';
import { Link } from 'react-router-dom';


export function Home() {
  return (
    <>
      <h2>[Home]</h2>
      <nav>
        <Link to="about">About</Link>
      </nav>
    </>
  );
}
