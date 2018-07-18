import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js';
import $ from 'jquery';
import mousewheel from 'jquery-mousewheel';
import {TweenMax, CSSPlugin, ScrollToPlugin, Draggable, Elastic} from "gsap/all";

// Event Data
const pageEvent_data = data.pageEvents;

class Page extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      id: params.id
    };
  }

  componentDidMount(){
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
    var data = pageEvent_data[this.state.id];

    return (
      <section id={data.id} className="bg-near-white pv6-l pv4">
        <Helmet>
            <title>{data.title}</title>
        </Helmet>
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <p>{data.title}</p>
          </div>
        </div>
      </section>
    );
  }
}

export default Page;
