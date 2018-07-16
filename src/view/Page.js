import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import $ from 'jquery';

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
    var title = this.state.id
    return (
      <div>
        {title}
        test
        <Helmet>
            <title>{title}</title>
        </Helmet>
      </div>
    );
  }
}

export default Page;
