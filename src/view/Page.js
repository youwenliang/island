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
        var top_of_object = $(this).offset().top;
        var center_of_window = $(window).scrollTop() + $(window).height()/2;
        var top_of_window = $(window).scrollTop();
        // var bottom_of_window = $(window).scrollTop() + $(window).height();
        var $this = $(this);

        if( center_of_window >= top_of_object ){
          if(!$this.find('.fixed-content').hasClass('active')) {
            $('.fixed-content.active').removeClass('active');
            $this.find('.fixed-content').addClass('active');
            if($this.hasClass('video-content')){
              $this.find('video').get(0).play();
            }
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
        <nav className="pv2 w-100 top0 z10">
          <div className="bg-dark-gray w-100 h-100 absolute top0"></div>
          <div className="mw8 center ph3 relative z4">
            <div className="ph2-ns flex space-between aic white">
              <p>我們的島</p>
            </div>
          </div>
        </nav>
        {container}
      </section>
    );
  }
}
export default Page;

/* Components */
function Cover(props) {
  return (
    <section className="cover min-vh-100 flex aic">
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
    <section className="min-vh-200 flex aic">
      <div className="bg-white w-100 h-100 fixed fixed-content flex aic">
        <figure className="w-100">
          <img className="w-50-l w-100" src={props.illustration} alt="illustration"/>
        </figure>
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="w-50-l w-100 fr-l pa4-l pa3 bg-white">
            <p className="f4 lh-copy mv0">{props.text1}</p>
          </div>
        </div>
        <div className="cf black mt50vh">
          <div className="w-50-l w-100 fr-l pa4-l pa3 bg-white">
            <p className="f4 lh-copy mv0">{props.text2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Taiwan(props) {
  var bgStyle = {
    backgroundImage: "url("+ props.background +")",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
  return (
    <section className="cover min-vh-100 flex aic">
      <div className="w-100 h-100 fixed fixed-content flex aic" style={bgStyle}>
        <figure className="w-100">
          <img className="fr-l w-50-l w-100 taiwan" src={props.illustration} alt="illustration"/>
        </figure>
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="w-50-l w-100 fl-l pa4-l pa3 bg-near-white">
            <h2 className="fw7 lh-copy mt0">{props.text1}</h2>
            <p className="f4 lh-copy mv0">{props.text2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Steps(props) {
  return (
    <section className="cover min-vh-100 flex aic">
      <div className="bg-white w-100 h-100 fixed fixed-content flex aic">
        <figure className="w-100">
          <img className="w-50-l w-100" src={props.image} alt="illustration"/>
        </figure>
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="w-50-l w-100 fr-l pa4-l pa3 bg-near-white">
            <h2 className="mt0 mb4"><span>2002</span>-<span>2018</span></h2>
            <p className="f4 lh-copy mv0">{props.text1.split(':')[1]}</p>
          </div>
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
    <section className="cover min-vh-100 flex aic">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content" style={style}></div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tl white ph4-ns">
          <h1>PhotoText</h1>
        </div>
      </div>
    </section>
  )
}

function PhotoTextRight(props) {
  return (
    <section className="min-vh-200 flex aic">
      <div className="bg-white w-100 h-100 fixed fixed-content flex aic">
        <figure className="w-100">
          <img className="w-50-l w-100" src={props.image} alt="illustration"/>
        </figure>
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="w-50-l w-100 fr-l pa4-l pa3 bg-near-white">
            <p className="f4 lh-copy mv0">{props.text}</p>
          </div>
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
    <section className="min-vh-200 flex aic w-100">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content">
        <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf white">
          <div className="w-50-l w-100 fr-l pa4-l pa3 relative">
            <div className="w-100 h-100 absolute bg-dark-gray o-70 top-left"></div>
            <p className="f4 lh-copy mv0 relative z4">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function PhotoContrast(props) {
  return (
    <section className="cover min-vh-100 flex aic relative bg-white flex-column">
        <div className="w-100 h-100 fixed-content flex">
          <figure className="cd-image-container is-visible z4">
             <img src={props.images[1]} alt="Original" />
             <span className="cd-image-label" data-type="original">{props.images[1].split('(')[1].split('.')[0]}</span>
             <div className="cd-resize-img"> 
                <img src={props.images[0]} alt="Modified" />
                <span className="cd-image-label" data-type="modified">{props.images[0].split('(')[1].split('.')[0]}</span>
             </div>
             <span className="cd-handle"></span>
          </figure>
        </div>
        <div className="mw8 center ph3 w-100 z4 absolute-ns absolute-center bottom-200">
          <div className="cf black">
            <div className="mw7 w-100 center pa4-l pa3 bg-white">
              <p className="f4 lh-copy mv0">{props.text}</p>
            </div>
          </div>
        </div>
    </section>
  )
}

function CoverVideo(props) {
  return (
    <section className="cover min-vh-100 flex aic relative video-content">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content active">
        <div className="bg-gray o-20 w-100 h-100 absolute z4"/>
        <div className="videoBg">
          <video id="video" muted loop autoPlay playsInline>
            <source src={props.link} type="video/mp4"/>
          </video>
        </div>
      </div>
      <div className="mw8 center ph3 w-100 z4">
        <div className="cf tc white w-80 center pa4">
          <img src={props.title} alt="title" />
          <h3 className="coverVideo-tag fw4 lh-copy mb0 pre-wrap">{props.content}</h3>
        </div>
      </div>
    </section>
  )
}

function Video(props) {
  return (
    <section className="cover min-vh-100 flex aic relative video-content">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content">
        <div className="videoBg">
          <video id="video" muted loop playsInline>
            <source src={props.link} type="video/mp4"/>
          </video>
        </div>
      </div>
    </section>
  )
}

function EndingVideo(props) {
  return (
    <section className="cover min-vh-100 flex aic relative video-content">
      <div className="bg-white w-100 h-100 fixed fixed-content">
        <video id="video" className="absolute absolute-center bottom-200 w-50-ns w-100" muted loop autoPlay playsInline>
          <source src={props.link} type="video/mp4"/>
        </video>
      </div>
      <div className="mw8 center ph3 w-30-ns w-100 z4 relative mb6">
        <div className="cf tc black w-80 center pa2 bg-near-white">
          <h3>想知道淡水河更多故事....</h3>
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
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {this.props.data.taiwanBG}
        />
        <Illustration 
          text1={this.props.data.illustrationText[0]}
          text2={this.props.data.illustrationText[1]}
          illustration = {this.props.data.illustration}
        />
        <PhotoSwitch 
          images={this.props.data.photoswitch} 
          text={this.props.data.photoswitchText}
        />
        <Video link={this.props.data.video[1]}/>
        <PhotoTextRight 
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage}
        />
        <Steps
          text1={this.props.data.stepText[0]}
          text2={this.props.data.stepText[1]}
          image = {this.props.data.stepImage}
        />
        <PhotoContrast 
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
        />
        
        <PhotoTextRight 
          text={this.props.data.photoText[1]}
          image = {this.props.data.photoImage}
        />
        <EndingVideo link={this.props.data.video[1]}/>
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

