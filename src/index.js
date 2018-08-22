import React from 'react';
import { render } from 'react-snapshot';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-browser-router";
import registerServiceWorker from './registerServiceWorker';
import $ from 'jquery';
import {TweenMax} from "gsap/all";
import ScrollMagic from 'scrollmagic'; // eslint-disable-line no-unused-vars

render((
<BrowserRouter basename="ourisland">
	<App />
</BrowserRouter>), 
document.getElementById('root'));
registerServiceWorker();

$(document).ready(function(){
	// $(window).click(function(e) {
	//     console.log(e.target.className);
	// });
	// Disable Image dragging
	$('img').on('dragstart', function(event) { event.preventDefault(); });

	// Show hidden div on scroll
	$(window).scroll( function(){
	  $('.hide').each( function(i){
		var bottom_of_object = $(this).offset().top + $(this).outerHeight()/4;
		var bottom_of_window = $(window).scrollTop() + $(window).height();
		var $this = $(this);
		if( bottom_of_window > bottom_of_object ){
			TweenMax.to($this, .4, {opacity: 1, transform: "translate3d(0,0,0)"});
		} else {
			TweenMax.to($this, .4, {opacity: 0, transform: "translate3d(0,50px,0)"});
		}
	  });
	});

	// Prevent Click and Dragscroll
	$('.dragscroll').on('scroll', function() {
		$('.dragscroll .item').one('click touch', function( event ) {
			var $this = $(this);
			$this.addClass('noClick');
			if (event.isDefaultPrevented()) {
				$('.dragscroll .item').unbind('click touch').off(event);
				return true;
			} else {
				console.log( "blocked link" );
				event.preventDefault();
				setTimeout(function(){
					$this.removeClass('noClick');
				}, 100);
			}
		});
	});
	$('.dragscroll .item').on('click touch', function(event) {
		if (event.isDefaultPrevented()) {
			$('.dragscroll .item').unbind('click touch').off(event);
			return true;
		}
	});
});
