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
//import thumbnail from '../assets/thumbnail/home.png';

var id = ['cover','topic-1','topic-2','topic-3','timeline-preview', 'cta'];

class Home extends Component {
  componentDidMount(){
    $(document).scrollTop(0);
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

    
    $('#section-nav a').click(function(){
      $('html, body').animate({
          scrollTop: $( $.attr(this, 'href') ).offset().top - 66
      }, 800);
      return false;
    });
    $(window).scroll( function(){
      for (var i = 0; i < 6; i++) {
        if($('#'+id[i]).length >= 1) {
          if($(window).scrollTop() >= $('#'+id[i]).offset().top - $(window).height()/2) {
            $('.active').removeClass('active');
            $('a[href="#'+id[i]+'"]').addClass('active');
          }
        }
      }
    });

    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    var images  = [];
    loadImage(images)
    .then(function (allImgs) {
      console.log(allImgs.length, 'images loaded!', allImgs);

      var p = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (p >= 100) {
          clearInterval(id);
          setTimeout(function(){
            document.getElementById('loading').classList.add('fade');
            document.body.classList.remove('ds');
          },600);
        } else {
          p++; 
          $('.progress-view').text(p+'%');
        }
      }
    })
    .catch(function (err) {
      console.error('One or more images have failed to load :(');
      console.error(err.errored);
      console.info('But these loaded fine:');
      console.info(err.loaded);
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
          {/*<meta property="og:image" content={thumbnail} />*/}
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
