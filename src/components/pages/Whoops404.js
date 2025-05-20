import React from 'react';
import { useLocation } from 'react-router-dom';

export function Whoops404() {
  let location = useLocation();
  console.log(location);

  return (
    <div>
      <h1>Resource Not Found at <code>{location.pathname}</code></h1>
    </div>
  );
}
