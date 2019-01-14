/*global FB*/ // eslint-disable-line no-unused-vars
import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import Cover from '../component/Cover'
import Timeline from '../component/Timeline' // eslint-disable-line no-unused-vars
import Events from '../component/Events'
import CTA from '../component/CTA'
import Nav from '../component/Nav'
import $ from 'jquery';
import loadImage from 'image-promise';
import thumbnail from '../assets/thumbnail/home.jpg';

// var id = ['cover','topic-1','topic-2','topic-3','timeline-preview', 'cta'];

class Home extends Component {
  componentDidUpdate(){
    $(document).ready(function(){
      let vh = window.innerHeight * 0.01;
      $('.vh-100').css('height', 100 * vh+'px');
      $('.min-vh-100').css('min-height', 100 * vh+'px');
      $('.min-vh-150').css('min-height', 150 * vh+'px');
      $('.min-vh-180').css('min-height', 180 * vh+'px');
      $('.min-vh-200').css('min-height', 240 * vh+'px');
      $('.min-vh-300').css('min-height', 340 * vh+'px');
    });
  }
  componentDidMount(){
    $(document).scrollTop(0);
    
    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    var images  = [];
    // var images  = ["/island20/images/1-1_A22.jpg","/island20/images/1-2_B6.jpg","/island20/images/1-3_C1.jpg","/island20/images/1-4_D32.jpg","/island20/images/1-5_E7.jpg"];
    var loaded = false;
    var p = 0;
    var id = setInterval(frame, 10);
    
    function frame() {
      console.log(loaded)
      if (p >= 100) {
        if(loaded) {
          setTimeout(function(){
            document.getElementById('loading').classList.add('fade');
            document.body.classList.remove('ds');
          },400);
          clearInterval(id);
        }
      } else {
        p++; 
        $('.progress-view').text(p+'%');
      }
    }
    // var images  = [];
    loadImage(images)
    .then(function (allImgs) {
      console.log(allImgs.length, 'images loaded!', allImgs);
      loaded = true;

      if(p >= 100) {
        clearInterval(id);
        setTimeout(function(){
          document.getElementById('loading').classList.add('fade');
          document.body.classList.remove('ds');
        },400);
      }
    })
    .catch(function (err) {
      console.error('One or more images have failed to load :(');
      console.error(err.errored);
      console.info('But these loaded fine:');
      console.info(err.loaded);
    });
      
    $(document).ready(function(){
      let vh = window.innerHeight * 0.01;
      $('.vh-100').css('height', 100 * vh+'px');
      $('.min-vh-100').css('min-height', 100 * vh+'px');
      $('.min-vh-150').css('min-height', 150 * vh+'px');
      $('.min-vh-180').css('min-height', 180 * vh+'px');
      $('.min-vh-200').css('min-height', 240 * vh+'px');
      $('.min-vh-300').css('min-height', 340 * vh+'px');
      // function setHeight() {
      //   var windowHeight = $(window).height(),
      //     $block = $('#cover, .cover');
      //     if(windowHeight > 550) { // 550px is your css min-height for this block
      //       $block.css('min-height', windowHeight + 'px') 
      //     } else {
      //       $block.css('min-height': '') 
      //     }
      // }
      // setHeight();
      // $(window).on('resize orientationchange', setHeight);

      
      // $('#section-nav a').click(function(){
      //   $('html, body').animate({
      //       scrollTop: $( $.attr(this, 'href') ).offset().top - 66
      //   }, 800);
      //   return false;
      // });
      // $(window).scroll( function(){
      //   for (var i = 0; i < 6; i++) {
      //     if($('#'+id[i]).length >= 1) {
      //       if($(window).scrollTop() >= $('#'+id[i]).offset().top - $(window).height()/2) {
      //         $('.active').removeClass('active');
      //         $('a[href="#'+id[i]+'"]').addClass('active');
      //       }
      //     }
      //   }
      // });
    });
    
  }

  render() {
    return (
      <div>
        <Helmet>
          <title>穿梭島嶼時光機 - 我們的島二十週年</title>
          <meta name="description" content="還記得二十年前，你是什麼模樣嗎？走出家門口，熟悉的街頭巷尾改變了多少？想要知道這二十年來，台灣環境經歷了什麼樣的變遷？現在就坐上小島號，和「我們的島」一起搭乘時光機，穿梭時空，回顧河流、海洋、山林以及污染開發現場。" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:title" content="穿梭島嶼時光機 - 我們的島二十週年" />
          <meta property="og:description" content="還記得二十年前，你是什麼模樣嗎？走出家門口，熟悉的街頭巷尾改變了多少？想要知道這二十年來，台灣環境經歷了什麼樣的變遷？現在就坐上小島號，和「我們的島」一起搭乘時光機，穿梭時空，回顧河流、海洋、山林以及污染開發現場。" />
          <meta property="og:image" content={thumbnail} />
        </Helmet>
        <Nav timeline={true}/>
        <Cover/>
        <Events/>
        {/*<Timeline/>*/}
        <CTA/>
        {/*
        <div id="section-nav">
          <a className="nav-link active" href="#cover">穿梭島嶼時光機</a>
          <a className="nav-link" href="#topic-1">水線</a>
          <a className="nav-link"href="#topic-2">山線</a>
          <a className="nav-link"href="#topic-3">污染線</a>
          <a className="nav-link"href="#timeline-preview">大事紀</a>
          <a className="nav-link"href="#cta">相關連結</a>
        </div>
        */}
      </div>
    );
  }
}

export default Home;
