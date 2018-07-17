import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-browser-router";
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";
import ScrollMagic from 'scrollmagic';

render((
<BrowserRouter basename="ourisland">
	<App />
</BrowserRouter>), 
document.getElementById('root'));
registerServiceWorker();

$(document).ready(function(){
	$(window).scroll( function(){
	  $('.hide').each( function(i){
		var bottom_of_object = $(this).offset().top + $(this).outerHeight()/4;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		var $this = $(this);
		if( bottom_of_window > bottom_of_object ){
			TweenMax.to($this, .4, {opacity: 1, transform: "translate3d(0,-20px,0)"});
		} else {
			TweenMax.to($this, .4, {opacity: 0, transform: "translate3d(0,0,0)"});
		}
	  });
	});
});
