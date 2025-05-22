import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function Whoops404() {
  let location = useLocation();
  console.log(location);

  return (
    <div>
      <Header />
      <h1>Resource Not Found at <code>{location.pathname}</code></h1>
      <Footer />
    </div>
  );
}
