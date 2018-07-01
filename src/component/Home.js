import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import Cover from './Cover'
import Timeline from './Timeline'
import Events from './Events'
import $ from 'jquery';

class Home extends Component {
  componentDidMount(){
    function setHeight() {
      var windowHeight = $(window).height(),
        $block = $('#cover, #timeline');
        if(windowHeight > 550) { // 550px is your css min-height for this block
          $block.css('min-height', windowHeight + 'px') 
        } else {
          $block.css('min-height': '') 
        }
    }
    setHeight();
    $(window).on('resize orientationchange', setHeight);
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
