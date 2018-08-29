import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js';
import $ from 'jquery';
import BeforeAfterSlider from 'react-before-after-slider';
import ImageGallery from 'react-image-gallery';

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
    $(document).ready(function(){
      $(window).scroll( function(){
        $('section').each( function(i){
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var top_of_window = $(window).scrollTop();
        var bottom_of_window = $(window).scrollTop() + $(window).height();
        var $this = $(this);
        if( top_of_window < bottom_of_object && bottom_of_object < bottom_of_window ){
          $this.find('.fixed-content').addClass('active');
          if($this.hasClass('video-content')){
            $this.find('video').get(0).play();
          }
        } else {
          $this.find('.fixed-content').removeClass('active');
          if($this.hasClass('video-content')){
            $this.find('video').get(0).pause();
          }
        }
        });
      });
    })
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
    <section className="cover" className="min-vh-100 flex aic">
      <div className="bg-gray w-100 h-100 fixed fixed-content"></div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white">
          <h1>{props.title}</h1>
          <h3 className="lh-copy">{props.content}</h3>
        </div>
      </div>
    </section>
  )
}

/* Components */
function Illustration(props) {
  return (
    <section className="cover" className="min-vh-100 flex aic">
      <div className="bg-white w-100 h-100 fixed fixed-content flex aic">
        <img src="https://fakeimg.pl/600x480/cccccc?text=Illustration&retina=1" width="50%" alt="Illustration" />
      </div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf black">
          <div className="w-50-l w-100 fr-l pa4-l bg-white">
            <p>總是人潮絡繹不絕的淡水河，是城市人們的出口，六百多萬人的生活和淡水河流域緊密相依。現在的你很難想像，1993年的淡水河畔，是滿天的垃圾和惡臭味，讓人想快速離開。</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Taiwan(props) {
  return (
    <section className="cover" className="min-vh-100 flex aic">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content"></div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white">
          <h1>Taiwan</h1>
        </div>
      </div>
    </section>
  )
}

function Steps(props) {
  return (
    <section className="cover" className="min-vh-100 flex aic">
      <div className="bg-gray w-100 h-100 fixed fixed-content"></div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white">
          <h1>Steps</h1>
        </div>
      </div>
    </section>
  )
}

function PhotoText(props) {
  var style = {
    backgroundImage: "url("+props.url+")",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
  return (
    <section className="cover" className="min-vh-100 flex aic">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content" style={style}></div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white ph4-ns">
          <h1>PhotoText</h1>
        </div>
      </div>
    </section>
  )
}

function PhotoSwitch(props) {
  var list = props.images;
  const images = [];
  for(var i = 0; i < list.length; i++) {
    var temp = {
      original: list[i],
      thumbnail: list[i]
    }
    images.push(temp);
  }
  return (
    <section className="cover" className="min-vh-100 flex aic w-100">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content">
        <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
      </div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white ph4-ns">
          <div className="fr-l w-50-l w-100">
            <h1>PhotoSwitch</h1>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoContrast(props) {
  return (
    <section className="cover" className="min-vh-100 flex aic relative">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content flex">
        <figure className="cd-image-container is-visible z4">
           <img src={props.images[1]} alt="Original Image" />
           <span className="cd-image-label" data-type="original">{props.images[1].split('(')[1].split('.')[0]}</span>
          
           <div className="cd-resize-img"> 
              <img src={props.images[0]} alt="Modified Image" />
              <span className="cd-image-label" data-type="modified">{props.images[0].split('(')[1].split('.')[0]}</span>
           </div>
          
           <span className="cd-handle"></span>
        </figure>
      </div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white ph4-ns">
          <h1>PhotoContrast</h1>
        </div>
      </div>
    </section>
  )
}

function CoverVideo(props) {
  return (
    <section className="cover" className="min-vh-100 flex aic relative video-content">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content active">
        <div className="videoBg">
          <video id="video" muted loop autoPlay playsInline>
            <source src={props.link} type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl black bg-white w-50-l w-100 pa4">
          <h1 className="f1 fw2 mv0">{props.title}</h1>
          <h3 className="f3 fw2 lh-copy mb0">{props.content}</h3>
        </div>
      </div>
    </section>
  )
}

function Video(props) {
  return (
    <section className="cover" className="min-vh-100 flex aic relative video-content">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content active">
        <div className="videoBg">
          <video id="video" muted loop playsInline>
            <source src={props.link} type="video/mp4"/>
          </video>
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
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.video[0]}/>
        <Illustration/>
        <Taiwan/>
        <PhotoSwitch images={this.props.data.imageswitch}/>
        <Video link={this.props.data.video[1]}/>
        <Steps/>
        <PhotoText url={this.props.data.photo[0]}/>
        <PhotoContrast images={this.props.data.imagecontrast}/>
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

