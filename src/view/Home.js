import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import Cover from '../component/Cover'
import Timeline from '../component/Timeline'
import Events from '../component/Events'
import $ from 'jquery';
import loadImage from 'image-promise';

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
            <title>Our Island</title>
        </Helmet>
        <Cover/>
        <Events/>
        <Timeline/>
      </div>
    );
  }
}

export default Home;
