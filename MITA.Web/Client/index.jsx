import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { App } from './containers/App.jsx';
import { BrowserRouter } from "react-router-dom";

const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
ReactDOM.render(app, document.getElementById("content"));
module.hot.accept();