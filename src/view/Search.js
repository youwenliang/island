import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import $ from 'jquery';

class Search extends Component {
  componentDidMount() {
    $(document).scrollTop(0);
    
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
      <section id="timeline" className="min-vh-100 bg-light-gray pv5-l pv3">
        <Helmet>
            <title>Timeline</title>
        </Helmet>
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <p>Search</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
