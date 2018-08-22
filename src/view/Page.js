import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js';
import $ from 'jquery';
// import mousewheel from 'jquery-mousewheel';
// import {TweenMax} from "gsap/all";

// Event Data
const pageEvent_data = data.pageEvents;

class Page extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = this.props;
    this.state = {
      id: params.id,
      view: params.id
    };
  }
  switchView = (view) => {
    this.setState({
      view: view
    })
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
    const viewContainerMapping = {
      'event01': <Event01 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event02': <Event02 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event03': <Event03 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event04': <Event04 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event05': <Event05 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event06': <Event06 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event07': <Event07 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event08': <Event08 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event09': <Event09 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event10': <Event10 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event11': <Event11 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event12': <Event12 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event13': <Event13 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />
    }
    let container = viewContainerMapping[this.state.view];
    return (
      <section id={data.id}>
        <Helmet>
            <title>{data.title}</title>
        </Helmet>
        {container}
      </section>
    );
  }
}
export default Page;

/* Components */
function Cover(props) {
  return (
    <section className="cover" className="min-vh-100 bg-gray flex aic">
      <div className="mw8 center ph3 w-100">
        <div className="cf tl white">
          <h1>{props.title}</h1>
          <h3>{props.content}</h3>
        </div>
      </div>
    </section>
  )
}

function Taiwan(props) {
  return (
    <section className="cover" className="min-vh-100 bg-light-gray flex aic">
      <div className="mw8 center ph3 w-100">
        <div className="cf tl white">
          <h1>Taiwan</h1>
        </div>
      </div>
    </section>
  )
}

function Steps(props) {
  return (
    <section className="cover" className="min-vh-100 bg-gray flex aic">
      <div className="mw8 center ph3 w-100">
        <div className="cf tl white">
          <h1>Steps</h1>
        </div>
      </div>
    </section>
  )
}

function PhotoText(props) {
  return (
    <section className="cover" className="min-vh-100 bg-light-gray flex aic">
      <div className="mw8 center ph3 w-100">
        <div className="cf tl white">
          <h1>PhotoText</h1>
        </div>
      </div>
    </section>
  )
}

function PhotoSwitch(props) {
  return (
    <section className="cover" className="min-vh-100 bg-gray flex aic">
      <div className="mw8 center ph3 w-100">
        <div className="cf tl white">
          <h1>PhotoSwitch</h1>
        </div>
      </div>
    </section>
  )
}

function PhotoContrast(props) {
  return (
    <section className="cover" className="min-vh-100 bg-white flex aic">
      <div className="center w-100">
          <figure className="cd-image-container">
            <img src="https://fakeimg.pl/600x480/?text=Original&retina=1"/>
            <span className="cd-image-label" data-type="original">Original</span>

            <div className="cd-resize-img">
              <img src="https://fakeimg.pl/600x480/?text=Modified&retina=1"/>
              <span className="cd-image-label" data-type="modified">Modified</span>
            </div>
            <span className="cd-handle"></span>
          </figure>
      </div>
    </section>
  )
}

function Video(props) {
  return (
    <section className="cover" className="min-vh-100 bg-gray flex aic">
      <div className="mw8 center ph3 w-100">
        <div className="cf tl white">
          <h1>Video</h1>
        </div>
      </div>
    </section>
  )
}


/* Views */
class Event01 extends Component {
  render() {
    return (
      <div>
        <Cover title={this.props.data.coverTitle} content={this.props.data.coverDescription}/>
        <Taiwan/>
        <Steps/>
        <PhotoText/>
        <PhotoSwitch/>
        <PhotoContrast/>
        <Video/>
      </div>
    );
  }
}

class Event02 extends Component {
  render() {
    return (
      <div>
        <p>event02</p>
      </div>
    );
  }
}

class Event03 extends Component {
  render() {
    return (
      <div>
        <p>event03</p>
      </div>
    );
  }
}

class Event04 extends Component {
  render() {
    return (
      <div>
        <p>event04</p>
      </div>
    );
  }
}

class Event05 extends Component {
  render() {
    return (
      <div>
        <p>event05</p>
      </div>
    );
  }
}

class Event06 extends Component {
  render() {
    return (
      <div>
        <p>event06</p>
      </div>
    );
  }
}

class Event07 extends Component {
  render() {
    return (
      <div>
        <p>event07</p>
      </div>
    );
  }
}

class Event08 extends Component {
  render() {
    return (
      <div>
        <p>event08</p>
      </div>
    );
  }
}

class Event09 extends Component {
  render() {
    return (
      <div>
        <p>event09</p>
      </div>
    );
  }
}

class Event10 extends Component {
  render() {
    return (
      <div>
        <p>event10</p>
      </div>
    );
  }
}

class Event11 extends Component {
  render() {
    return (
      <div>
        <p>event11</p>
      </div>
    );
  }
}

class Event12 extends Component {
  render() {
    return (
      <div>
        <p>event12</p>
      </div>
    );
  }
}

class Event13 extends Component {
  render() {
    return (
      <div>
        <p>event13</p>
      </div>
    );
  }
}

