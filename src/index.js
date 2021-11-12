import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Footer from './components/Footer';
import W3navbar from './w3navbar';
import { BrowserRouter } from 'react-router-dom';





ReactDOM.render(
    <BrowserRouter>
        <W3navbar />
        <Footer />
    </BrowserRouter>
    , document.getElementById('root')
    
);

serviceWorker.unregister();
