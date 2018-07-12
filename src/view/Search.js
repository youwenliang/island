import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js'
import $ from 'jquery';

class Search extends Component {
  componentDidMount() {
    $(document).scrollTop(0);
    function setHeight() {
      var windowHeight = $(window).height(),
        $block = $('#timeline');
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
  story = () => {
    return (
      <div className="h5 w5 dib bg-dark-gray white mh3">
        Hey
      </div>
    )
  }

  render() {
    let list = [];
    for (var i = 0; i < 20; i++) {
      list.push(this.story());
    }
    return (
      <section id="timeline" className="min-vh-100 bg-light-gray pv5-l pv3">
        <Helmet>
            <title>Timeline</title>
        </Helmet>
        <div className="mw8 center ph3 mv4">
          <div className="cf ph2-ns">
            <p>Search</p>
            <input id="search_input"></input>
             <select name="areas">
              <option value="north">北部地區</option>
              <option value="central">中部地區</option>
              <option value="south">南部地區</option>
              <option value="others">其他</option>
            </select>
            <ul className="list pa0">
              <li className="dib pa2 mr2 bg-white">topic_river</li>
              <li className="dib pa2 mr2 bg-white">topic_mountain</li>
              <li className="dib pa2 mr2 bg-white">topic_pollution</li>
            </ul> 
            <ul className="list pa0">
              <li className="dib pv2 ph5 mr2 bg-white">1970</li>
              <li className="dib pv2 ph5 mr2 bg-white">1980</li>
              <li className="dib pv2 ph5 mr2 bg-white">1990</li>
              <li className="dib pv2 ph5 mr2 bg-white">2000</li>
              <li className="dib pv2 ph5 mr2 bg-white">2010</li>
            </ul> 
          </div>
        </div>
        <div className="nowrap overflow-x-scroll">
          {list}
        </div>
      </section>
    );
  }
}

export default Search;
