import React from 'react';
import * as ReactDOMClient from 'react-dom/client';

//component
import ParentContainer from "./classes/App"

//stylesheet
import "./classes/App.css"

const root = ReactDOMClient.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ParentContainer />
  </React.StrictMode>
);