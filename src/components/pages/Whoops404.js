import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../Header';
import { Footer } from '../Footer';
import './Whoops404.css';

export function Whoops404() {
  let location = useLocation();
  console.log(location);

  return (
    <div>
      <div id="whoops404" className="big-bg">
        <Header />
        <div className="wrapper">
          <h2 className="page-title">Resource Not Found</h2>
        </div>
      </div>
      <div className="whoops404-content wrapper">
        <article>
          <p>お探しのページ（<code>{location.pathname}</code>）は，移動または削除された削除された可能性があります．</p>
        </article>
      </div>
      <Footer />
    </div>
  );
}
