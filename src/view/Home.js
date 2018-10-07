/*global FB*/
import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import Cover from '../component/Cover'
import Timeline from '../component/Timeline'
import Events from '../component/Events'
import CTA from '../component/CTA'
import Nav from '../component/Nav'
import $ from 'jquery';
import loadImage from 'image-promise';

var id = ['cover','topic-1','topic-2','topic-3','timeline-preview', 'cta'];

class Home extends Component {
  componentDidMount(){
    $(document).scrollTop(0);
    function setHeight() {
      var windowHeight = $(window).height(),
        $block = $('#cover, .cover');
        if(windowHeight > 550) { // 550px is your css min-height for this block
          $block.css('min-height', windowHeight + 'px') 
        } else {
          $block.css('min-height': '') 
        }
    }
    setHeight();
    $(window).on('resize orientationchange', setHeight);

    
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
      setTimeout(function(){
        document.getElementById('loading').classList.add('fade');
        document.body.classList.remove('ds');
      },600);
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
        </Helmet>
        <Nav timeline={true}/>
        <Cover/>
        <Events/>
        <Timeline/>
        <CTA/>
        {/*Progress Bar*/}
        <div id="section-nav">
          <a className="nav-link active" href="#cover">首頁</a>
          <a className="nav-link" href="#topic-1">主題一</a>
          <a className="nav-link"href="#topic-2">主題二</a>
          <a className="nav-link"href="#topic-3">主題三</a>
          <a className="nav-link"href="#timeline-preview">大事紀</a>
          <a className="nav-link"href="#cta">CTA</a>
        </div>
      </div>
    );
  }
}

export default Home;
