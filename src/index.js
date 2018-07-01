import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-browser-router";
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';

render((
<BrowserRouter basename="ourisland">
	<App />
</BrowserRouter>), 
document.getElementById('root'));
registerServiceWorker();
