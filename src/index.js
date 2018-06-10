import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-browser-router";
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
<BrowserRouter basename="island">
	<App />
</BrowserRouter>), 
document.getElementById('root'));
registerServiceWorker();
