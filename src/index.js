import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './styles.scss';
import './dark-leaflet.css';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
