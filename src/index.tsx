import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';


import 'typeface-roboto'
import './index.css';
import App from './components/App/';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, Link, RouterProvider, createHashRouter, HashRouter } from "react-router-dom";
import styled from 'styled-components';


const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <React.StrictMode>
     <HashRouter>
      <Routes>
        <Route path={'/*'} element={<NotFoundContainer />} />
        <Route path={'/algo'} element={<App />} />
       </Routes>
     </HashRouter>
  </React.StrictMode>
);

const NotFound = styled.span`
    color: white;
    display:block;
    padding: 10px;
    font-weight: bold;
    margin-left:30px;
    letter-spacing: 1px;
    text-transform: uppercase;
`;

function NotFoundContainer() {
  return (
    <div>
      <NotFound>Not Found</NotFound>
    </div>
  );
}


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
