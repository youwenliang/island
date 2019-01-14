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
<BrowserRouter basename="island20">
	<App />
</BrowserRouter>), 
document.getElementById('root'));
registerServiceWorker();

$(document).ready(function(){
  // Cookies
  // const cookies = new Cookies();
  // if(cookies.get('firstVisit') === undefined) {
  //   cookies.set('firstVisit', true, { path: '/' });
  //   window.location.reload();
  // }

	// $(window).click(function(e) {
	//     console.log(e.target.className);
	// });
	// Disable Image dragging
    var flag = false;
	$('img').on('dragstart', function(event) { event.preventDefault(); });

    
    $('.panorama .left').mouseenter(function(){
        // $('.panorama img').css('object-position', 0);
    });
    $('.panorama .right').mouseenter(function(){
        // $('.panorama img').css('object-position', '100%');
    });

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
      if($(window).scrollTop() >= 66){
        if(!flag) {
            flag = true;
            $('nav').addClass('fix');
        }
      } else {
        flag = false;
        $('nav').removeClass('fix');
      }
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

  // function initPlayers(num) {
  //   // pass num in if there are multiple audio players e.g 'player' + i

  //   for (var i = 0; i < num; i++) {
  //     (function() {

  //       // Variables
  //       // ----------------------------------------------------------
  //       // audio embed object
  //       var playerContainer = document.getElementById('player-container'), // eslint-disable-line no-unused-vars
  //         player = document.getElementById('player'),
  //         isPlaying = false, // eslint-disable-line no-unused-vars
  //         playBtn = document.getElementById('play-btn');

  //       // Controls Listeners
  //       // ----------------------------------------------------------
  //       if (playBtn != null) {
  //         playBtn.addEventListener('click', function() {
  //           togglePlay()
  //         });
  //       }

  //       // Controls & Sounds Methods
  //       // ----------------------------------------------------------
  //       function togglePlay() {
  //         if (player.paused === false) {
  //           player.pause();
  //           isPlaying = false;
  //           $('#play-btn').removeClass('pause');

  //         } else {
  //           player.play();
  //           $('#play-btn').addClass('pause');
  //           isPlaying = true;
  //         }
  //       }
  //     }());
  //   }
  // }
  // initPlayers(window.jQuery('#player-container').length);
});
