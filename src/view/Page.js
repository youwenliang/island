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

    // $('.dragscroll').scrollLeft(0);
    // // Horizontal Scroll
    // $('.dragscroll').mousewheel(function(event, change) {
    //   this.scrollLeft -= (change * 1); //need a value to speed up the change
    //   event.preventDefault();
    // });

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
        var th = $(document).height()-$(window).height();
        var ch = $(window).scrollTop();
        var x = 100*ch/th;
        $('.progress .bar').css('height', x + '%');

        if(ch >= $(window).height()) {
          $('.progress').addClass('active');
        } else {
          $('.progress').removeClass('active');
        }

        $('.video-content').each( function(i){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          var top_of_window = $(window).scrollTop();
          var bottom_of_window = $(window).scrollTop()+ $(window).height();
          var $this = $(this);
          if( bottom_of_window >= top_of_object && top_of_window <= bottom_of_object ){
            if($this.find('video').get(0).paused) {
              $this.find('video').get(0).play();
            }
          } else {
            if(!$this.find('video').get(0).paused) {
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
      'changing-tamsui-river': <Event01 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'reborn-erren-river': <Event02 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'land-crabs-survival': <Event03 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'dawu-fishing-port': <Event04 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'kinmen-Hou-feng-kang': <Event05 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'lishan-high-mountain-farms': <Event06 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'lushan-hotspring-risk': <Event07 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'hushan-reservoir-lost-water': <Event08 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'asia-cement-cost': <Event09 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'science-park-landuse': <Event10 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'petrochemical-kingdom': <Event11 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'soil-pollution-tainan': <Event12 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />,
      'event13': <Event13 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />
    }
    let container = viewContainerMapping[this.state.view];
    return (
      <section id={data.id}>
        <Helmet>
            <title>{data.title}</title>
        </Helmet>
        {/*Navigation Bar*/}
        <nav className="pv2 w-100 top0 z10">
          <div className="bg-dark-gray w-100 h-100 absolute top0"></div>
          <div className="mw8 center ph3 relative z4">
            <div className="ph2-ns flex space-between aic white">
              <p>我們的島</p>
            </div>
          </div>
        </nav>
        {/*Progress Bar*/}
        <div className="progress z10">
          <div className="bar"></div>
        </div>
        {container}
      </section>
    );
  }
}
export default Page;


/* Components */

/*01*/
function CoverVideo(props) {
  return (
    <section className="cover min-vh-100 flex aic relative video-content">
      <div className="w-100 h-100 absolute top-left clipping">
      <div className="bg-light-gray w-100 h-100 fixed fixed-content active">
        <div className="bg-gray o-20 w-100 h-100 absolute z4"/>
        <div className="videoBg">
          <video id="video" muted loop autoPlay playsInline>
            <source src={props.link} type="video/mp4"/>
          </video>
        </div>
      </div>
      </div>
      <div className="mw8 center ph3 w-100 z4 tc">
        <img src={props.title} className="center" width="800" alt="title" />
        <div className="cf white w-80-ns w-100 center ph-ns">
          <h3 className="f3-ns f4 coverVideo-tag fw4 lh-copy mb0 pre-wrap">{props.content}</h3>
        </div>
      </div>
    </section>
  )
}

/*02*/
function Taiwan(props) {
  var bgStyle = {
    backgroundImage: "url("+ props.background +")",
    backgroundSize: "cover",
    backgroundPosition: "center center"
  }
  return (
    <section className="cover min-vh-150 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="w-100 h-100 fixed fixed-content flex aic" style={bgStyle}>
          <figure className="w-100">
            <img className="fr-l w-50-l w-100 taiwan" src={props.illustration} alt="Taiwan"/>
          </figure>
        </div>
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

/*03*/
function Illustration(props) {
  return (
    <section className="min-vh-200 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-white w-100 h-100 fixed fixed-content flex aic">
          <figure className="center mw80 w-100">
            <img className="w-50-l w-100" src={props.illustration} alt="illustration"/>
          </figure>
        </div>
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

/*04*/
function PhotoTextFull(props) {
  var text = ""
  if(props.order === "right") {
    text = "fr-l"
  }
  var fullImage = {
    height: "100vh",
    objectFit: "cover",
    width: "100%"
  }
  return (
    <section className="min-vh-200 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-white w-100 h-100 fixed fixed-content flex aic">
          <figure className="w-100 ma0">
            <img className="w-100" style={fullImage} src={props.image} alt="photo"/>
          </figure>
        </div>
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className={"w-50-l w-100 pa4-l pa3 bg-near-white "+text}>
            <p className="f4 lh-copy mv0">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*05*/
function PhotoText(props) {
  var photo, text = "";
  var color1 = "bg-white"
  var color2 = "bg-near-white";
  if(props.color === "invert") {
    color1 = "bg-near-white";
    color2 = "bg-white";
  }
  if(props.order === "right") {
    text = "fr-l"
  } else {
    photo = "fr-l"
  }
  return (
    <section className="min-vh-150 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className={color1+" w-100 h-100 fixed fixed-content flex aic"}>
          <figure className="center mw80 w-100">
            <img className={"w-50-l w-100 "+photo} src={props.image} alt="photo"/>
          </figure>
        </div>
      </div>
      <div className="mw8 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className={"w-50-l w-100 pa4-l pa3 "+color2+" "+text}>
            <p className="f4 lh-copy mv0">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*06*/
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
    <section className="min-vh-200 flex aic w-100 relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-light-gray w-100 h-100 fixed fixed-content">
          <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} />
        </div>
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

/*07*/
function PhotoMultiple(props) {
  let grid = [];
  var columns = "";
  
  var height = {
    height: "650px"
  }

  for (var i = 0; i < props.image.length; i++){
    var item = {
      width: "480px",
      height: "320px",
      backgroundImage: "url("+props.image[i]+")",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }
    var photos = (
      <div className="grid-item bg-gray" style={item}></div>
    )
    if(i%2 == 0) columns+="480px ";
    grid.push(photos);
  }

  var container = {
    gridTemplateColumns: columns,
    height: "690px",
    paddingBottom: "40px"
  }

  return (
    <section className="flex aic relative bg-white flex-column pv6">      
      <div className="mw8 center cf black mb5 ph3 w-100">
        <div className="mw7 w-100 center bg-white">
          <p className="f4 lh-copy mv0">{props.text}</p>
        </div>
      </div>
      <div className="w-100 overflow-hidden" style={height}>
       <div className="grid-container nowrap dragscroll" style={container}>
          {grid}
        </div> 
      </div>
    </section>
  )
}


/*08*/
function PhotoContrast(props) {
  return (
    <section className="flex aic relative bg-white flex-column pv6">
        <div className="ph3 w-100 z4">
          <div className="mw8 center cf black mb5">
            <div className="mw7 w-100 center bg-white">
              <p className="f4 lh-copy mv0">{props.text}</p>
            </div>
          </div>
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
    </section>
  )
}

/*09*/
function Video(props) {
  return (
    <section className="cover min-vh-200 flex aic relative video-content">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-light-gray w-100 h-100 fixed fixed-content">
          <div className="videoBg">
            <video id="video" muted loop playsInline>
              <source src={props.link} type="video/mp4"/>
            </video>
          </div>
        </div>
      </div>
    </section>
  )
}

/*10*/
function EndingVideo(props) {
  return (
    <section className="cover min-vh-100 flex aic relative video-content bg-near-white pv6">
      <div className="mw8 center ph3 z4 relative mb6">
        <div className="cf tc black w-30-l w-60-m w-100 center pa2 bg-white mb5">
          <h3>想知道淡水河更多故事....</h3>
        </div>
        <video id="video" className="center w-100" muted loop autoPlay playsInline>
          <source src={props.link} type="video/mp4"/>
        </video>
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

        <PhotoMultiple
          text={this.props.data.photoMultipleText}
          image={this.props.data.photoMultiple}
        />

        <Video link={this.props.data.video[1]}/>
        
        <PhotoText
          order="right"
          color="invert"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage}
        />

        <PhotoContrast 
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
        />

        <PhotoTextFull
          order="right"
          text={this.props.data.photoText[1]}
          image = {this.props.data.photoImage}
        />
        
        <PhotoText
          order="left"
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

