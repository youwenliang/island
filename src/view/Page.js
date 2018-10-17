/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js';
import $ from 'jquery';
import BeforeAfterSlider from 'react-before-after-slider';
import ImageGallery from 'react-image-gallery';
import Nav from '../component/Nav'
import Modal from 'react-responsive-modal';

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
    //Here ya go
    this.props.history.listen((location, action) => {
      var view = location.pathname.replace('/ourisland/','').replace('/','');
      $(document).scrollTop(0);
      this.setState({
        view: view,
        id: view
      })
    });
  }
  switchView = (view) => {
    $(document).scrollTop(0);
    this.setState({
      view: view,
      id: view
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
      // Autoscroll
      var scroll = 0;
      var add = 0;
      var k = 0;
      var interval = setInterval(function(){
          $('.auto-scroll .grid-container').scrollLeft(scroll + add)
          add+=k;
      },10);

      $('.auto-scroll .grid-container').hover(function(){
        add = 0;
        clearInterval(interval);
        console.log("????");
      }, function(){
        var $this = $(this);
        scroll = $(this).scrollLeft();
        interval = setInterval(function(){
          $this.scrollLeft(scroll + add)
          add+=k;
        },10);
      });

      // Scroll functions
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

        var top_of_window = $(window).scrollTop();
        var bottom_of_window = $(window).scrollTop()+ $(window).height();
        var center_of_window = $(window).scrollTop()+ $(window).height()/2;

        $('.auto-scroll').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          var $this = $(this);
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            k = 0.3
          } else {
            k = 0;
          }
        });

        $('.video-content').each( function(i){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          
          var $this = $(this);
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            if($this.find('video').get(0).paused) {
              if($this.find('video').hasClass('clicked')) ;
              else {
                $this.find('video').get(0).play();
                $this.find('.play').removeClass('pause');
              }
            }
          } else {
            if(!$this.find('video').get(0).paused) {
              $this.find('video').get(0).pause();
              $this.find('.play').addClass('pause');
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
            <title>{data.title + " - 我們的島二十週年"}</title>
        </Helmet>
        <Nav timeline={false}/>
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
  var gradient = {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.45) 100%)"
  }
  return (
    <section className="cover min-vh-100 flex aic relative video-content">
      <div className="w-100 h-100 absolute z4 pn" style={gradient}/>
      <div className="w-100 h-100 absolute top-left clipping">
      <div className="w-100 h-100 fixed fixed-content pn">
        <div className="videoBg">
          <video id="coverVideo" muted loop autoPlay playsInline>
            <source src={props.link} type="video/mp4"/>
          </video>
        </div>
      </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 tc">
        <img src={props.title} className="center" width="800" alt="title" />
        <div className="cf white w-80-ns w-100 center ph-ns">
          <h3 className="f3-ns f4 coverVideo-tag fw4 lh-copy mb0 pre-wrap text-shadow">{props.content}</h3>
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
    backgroundPosition: "76% center"
  }
  var position = {
    left: "75%",
    top: "50%",
    margin: 0,
    width: "88px",
    height: "80px",
    transform: "translate("+props.map+")"
  }
  var l = props.text1.split("的")[0];
  var r = (l.length-2) * 15 + 45 + "px";
  var label = {
    background: "rgba(0,0,0,.7)",
    color: "white",
    padding: "5px 20px 5px 10px",
    top: "48px",
    position: "relative",
    right: r,
    zIndex: "-1",
    whiteSpace: "nowrap"
  }
  return (
    <section className="cover min-vh-150 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="w-100 h-100 fixed fixed-content pn flex aic" style={bgStyle}>
          <figure className="absolute" style={position}>
            <label style={label}>{props.text1.split("的")[0]}</label>
            <img src="/images/icons/machinemap.svg" width="88" height="80" alt="Taiwan"/>
          </figure>
        </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="w-50-l mw500 mh3-l center w-100 fl-l pa4-l pa3 bg-near-white">
            <h2 className="f3 fw7 lh-copy mt0">{props.text1}</h2>
            <p className="f5 lh-copy mv0">{props.text2}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*03*/
function Illustration(props) {
  var text2 = null;
  var h = "min-vh-150"
  if(props.number === 2) {
    h = "min-vh-200"
    text2 = (
      <div className="cf black mt50vh">
        <div className="w-50-l mw500 mh3-l center w-100 fr-l pa4-l pa3 bg-white">
          <p className="f5 lh-copy mv0">{props.text2}</p>
        </div>
      </div>
    )
  }
  return (
    <section className={h+" flex aic relative"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
          <figure className="center mw80 w-100 pr5-l">
            <img className="w-60-l w-100" src={props.illustration} alt="illustration"/>
          </figure>
        </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="w-50-l mw500 mh3-l center w-100 fr-l pa4-l pa3 bg-white">
            <p className="f5 lh-copy mv0">{props.text1}</p>
          </div>
        </div>
        {text2}
      </div>
    </section>
  )
}

/*04*/
function PhotoTextFull(props) {
  var text = ""
  
  var fullImage = {
    height: "100vh",
    objectFit: "cover",
    width: "100%"
  }
  var bottomRight = {
    bottom: "0px",
    right: "0px",
    background: "rgba(0,0,0,.2)",
    padding: "20px"
  }

  var bgcolor = ""
  var textcolor = ""
  if(props.color === "dark") {
    bgcolor = "bg-dark-gray o-80";
    textcolor = "white";
  } else {
    bgcolor = "bg-white o-90";
    textcolor = "black";
  }

  var text2 = null;
  var h = "min-vh-200"
  if(props.number === 2) {
    h = "min-vh-300"
    text2 = (
      <div className="cf mt50vh">
        <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
          <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
          <p className={"f5 lh-copy mv0 z4 relative "+textcolor}>{props.text2}</p>
        </div>
      </div>
    )
  }
  return (
    <section className={h+" flex aic relative"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
          <figure className="w-100 ma0">
            <img className="w-100" style={fullImage} src={props.image} alt="background"/>
          </figure>
          <label className="white absolute" style={bottomRight}>{props.label}</label>
        </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 pre-wrap">
        <div className="cf">
          <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
            <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
            <p className={"f5 lh-copy mv0 z4 relative "+textcolor}>{props.text1}</p>
          </div>
        </div>
        {text2}
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
    <section className="min-vh-200 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className={color1+" w-100 h-100 fixed fixed-content pn flex aic"}>
          <figure className="center mw80 w-100">
            <img className={"w-50-l w-100 "+photo} src={props.image} alt="description"/>
          </figure>
        </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 "+color2+" "+text}>
            <p className="f5 lh-copy mv0">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*06*/
function PhotoSwitch(props) {
  var list = props.images;
  var title = props.label;
  const images = [];
  for(var i = 0; i < list.length; i++) {
    var temp = {
      original: list[i],
      thumbnail: list[i],
      description: title[i]
    }
    images.push(temp);
  }
  var text1 = null;
  if(props.text1 !== "") {
    text1 = (
      <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative "+props.position}>
        <div className="w-100 h-100 absolute bg-dark-gray o-80 top-left"></div>
        <p className="f5 lh-copy mv0 relative z4">{props.text1}</p>
      </div>
    )
  }
  var text2 = null;
  var h = "min-vh-200"
  if(props.number === 2) {
    h = "min-vh-300"
    text2 = (
      <div className="cf white mt50vh">
        <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative "+props.position}>
          <div className="w-100 h-100 absolute bg-dark-gray o-80 top-left"></div>
          <p className="f5 lh-copy mv0 relative z4">{props.text2}</p>
        </div>
      </div>
    )
  }
  return (
    <section className={h+" flex aic w-100 relative bvh"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-light-gray w-100 h-100 fixed fixed-content">
          <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} autoPlay={true} showBullets={true}/>
        </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 pre-wrap">
        <div className="cf white">
          {text1}
        </div>
        {text2}
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

  var w = "500px";

  for (var i = 0; i < props.images.length; i++){
    var item = {
      width: w,
      height: "320px",
      backgroundImage: "url("+props.images[i]+")",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }
    var bottomRight = {
      bottom: "0px",
      right: "0px",
      background: "rgba(0,0,0,.2)",
      padding: "20px"
    }
    console.log(props.images[i]);
    var photos = (
      <div className="grid-item bg-gray relative cp" style={item} key={i} onClick={(e) => props.onOpenModal(e.target.style.backgroundImage.split('\"')[1])}>
        <label className="absolute white" style={bottomRight}>{props.label[i]}</label>
      </div>
    )
    if(i%2 === 0) columns+=(w+" ");
    grid.push(photos);
  }

  var container = {
    gridTemplateColumns: columns,
    height: "690px",
    paddingBottom: "40px"
  }

  return (
    <section className="flex aic relative bg-white flex-column pv6 auto-scroll">      
      <div className="mw80 center cf black mb5 ph3 w-100">
        <div className="mw7 w-100 center bg-white">
          <p className="f5 lh-copy mv0">{props.text}</p>
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
  let text = null;
  if(props.text !== "") {
    text = (
      <div className="mw80 center cf black mb5">
        <div className="mw7 w-100 center bg-white">
          <p className="f5 lh-copy mv0">{props.text}</p>
        </div>
      </div>
    )
  }
  return (
    <section className="flex aic relative bg-white flex-column pv6">
        <div className="ph3 w-100 z4">
          {text}
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
  function playVideo(e) {
    var $video = $('#video'+props.videoID);
    if(e.target.classList.contains('pause')) {
      e.target.classList.remove('pause');
      $video.get(0).play();
      $video.removeClass('clicked');
    }
    else {
      e.target.classList.add('pause');
      $video.get(0).pause();
      $video.addClass('clicked');
    }
  }
  function soundVideo(e) {
    var $video = $('#video'+props.videoID);
    if(e.target.classList.contains('unmute')) {
      e.target.classList.remove('unmute');
      $video.prop('muted', true);
    }
    else {
      e.target.classList.add('unmute');
      $video.prop('muted', false);
    }
  }
  var text1 = null
  var bgcolor = ""
  var textcolor = ""
  if(props.color === "dark") {
    bgcolor = "bg-dark-gray o-80";
    textcolor = "white";
  } else {
    bgcolor = "bg-white o-90";
    textcolor = "black";
  }

  if(props.text1 !== "") {
    text1 = (
      
        <div className="cf">
          <div className={props.position+" w-50-l mw500 mh3-l mh3-l center w-100 pa4-l pa3 relative"}>
            <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
            <p className={"f5 lh-copy mv0 z4 relative "+textcolor}>{props.text1}</p>
          </div>
        </div>
      
    )
  }

  var text2 = null;
  var h = "min-vh-200"
  if(props.number === 2) {
    h = "min-vh-300"
    text2 = (
      <div className="cf mt50vh">
        <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
          <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
          <p className={"f5 lh-copy mv0 z4 relative "+textcolor}>{props.text2}</p>
        </div>
      </div>
    )
  }

  return (
    <section className={h+" flex aic relative video-content"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="fixed play cp z10" onClick={(e) => playVideo(e)}></div>
        <div className="fixed sound cp z10" onClick={(e) => soundVideo(e)}></div>
        <div className="bg-light-gray w-100 h-100 fixed fixed-content pn">
          <div className="videoBg">
            <video id={'video'+props.videoID} loop playsInline muted autoPlay>
              <source src={props.link} type="video/mp4"/>
            </video>
          </div>
        </div>
      </div>
      <div className="mw80 center ph3 w-100 z4 pre-wrap">
        {text1}
        {text2}
      </div>
    </section>
  )
}

/*09-1*/
function SmallVideo(props) {
  function playVideo(e) {
    var $video = $('#video'+props.videoID);
    if(e.target.classList.contains('pause')) {
      e.target.classList.remove('pause');
      $video.get(0).play();
      $video.removeClass('clicked');
    }
    else {
      e.target.classList.add('pause');
      $video.get(0).pause();
      $video.addClass('clicked');
    }
  }
  function soundVideo(e) {
    var $video = $('#video'+props.videoID);
    if(e.target.classList.contains('unmute')) {
      e.target.classList.remove('unmute');
      $video.prop('muted', true);
    }
    else {
      e.target.classList.add('unmute');
      $video.prop('muted', false);
    }
  }
  return (
    <section className="flex aic relative pv6 video-content smallVideo">
      <div className="mw80 w-100 center ph3 z4 relative">
        <div className="cf flex aic flex-column-s">
          <div className="fl-l w-100 w-50-l ph2 pv3 relative">
            <div className="absolute play cp z10" onClick={(e) => playVideo(e)}></div>
            <div className="absolute sound cp z10" onClick={(e) => soundVideo(e)}></div>
            <video id={'video'+props.videoID} className="w-100" loop playsInline muted autoPlay>
              <source src={props.link} type="video/mp4"/>
            </video>
          </div>
          <div className="fr-l w-100 w-50-l mw500 center ml5-l ph2 pv3">
            <p className="f5 lh-copy mv0 z4 relative black">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}


/*10*/
function EndingVideo(props) {
  return (
    <section className="cover min-vh-100 flex aic relative bg-near-white pv6">
      <div className="mw80 center ph3 z4 relative mb6">
        <div className="cf tc black w-50-l w-80-m w-100 center pa2 bg-white mb5">
          <h3>想知道{props.text}更多故事....</h3>
        </div>
        <iframe width="560" height="315" src={props.link} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
      </div>
    </section>
  )
}

/*11*/

/*12*/
function PhotoAudio(props) {
  function calculateTotalValue(length) {
    var minutes = Math.floor(length / 60),
      seconds_int = length - minutes * 60,
      seconds_str = seconds_int.toString(),
      seconds = seconds_str.substr(0, 2),
      time = minutes + ':' + seconds

    return time;
  }

  function calculateCurrentValue(currentTime) {
    var current_hour = parseInt(currentTime / 3600) % 24,
      current_minute = parseInt(currentTime / 60) % 60,
      current_seconds_long = currentTime % 60,
      current_seconds = current_seconds_long.toFixed(),
      current_time = (current_minute < 10 ? "0" + current_minute : current_minute) + ":" + (current_seconds < 10 ? "0" + current_seconds : current_seconds);

    return current_time;
  }
  function initProgressBar() {
    var player = document.getElementById('player');
    var length = player.duration
    var current_time = player.currentTime;

    // calculate total length of value
    var totalLength = calculateTotalValue(length)
    window.jQuery(".end-time").html('0'+totalLength);

    // calculate current value time
    var currentTime = calculateCurrentValue(current_time);
    window.jQuery(".start-time").html(currentTime);

    var progressbar = document.getElementById('seekObj');
    progressbar.value = (player.currentTime / player.duration);
    progressbar.addEventListener("click", seek);

    if (player.currentTime === player.duration) {
      $('#play-btn').removeClass('pause');
    }

    function seek(evt) {
      var percent = evt.offsetX / this.offsetWidth;
      player.currentTime = percent * player.duration;
      progressbar.value = percent / 100;
    }
  };

  return (
    <section className="flex aic relative bg-white pv6">
      <div className="mw80 w-100 center ph3 relative">
        <div className="cf ph2-ns">
          <div className="fl w-100 w-50-ns pa2">
            <div className="pv4">
              <figure className="mv0">
                <img src={props.image} alt="portrait"/>
              </figure>
            </div>
          </div>
          <div className="fl w-100 w-50-ns pa2 pre-wrap">
            <div className="pv4">
              <div className="audio-player">
                <div id="play-btn" className="cp"></div>
                <div className="audio-wrapper" id="player-container" href="javascript:;">
                  <audio id="player" onTimeUpdate={() => initProgressBar()}>
                    <source src={props.audio} type="audio/mp3"/>
                  </audio>
                </div>
                <div className="player-controls scrubber">
                  <p className="f5">某某某的錄音檔</p>
                  <span id="seekObjContainer">
                    <progress id="seekObj" value="0" max="1"></progress>
                  </span>
                  <br/>
                  <small className="fl start-time pt2">00:00</small>
                  <small className="fr end-time pt2">00:00</small>
                </div>
              </div>
              <p className="f5 lh-copy mv4">{props.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Transition(props) {
  var max = {
    maxWidth: "880px"
  }
  return (
    <section className="banner pv5-ns pv4 bg-white">
      <p className="lh-copy f5 center pre-wrap ph4-ns ph3" style={max}>{props.text}</p>
    </section>
  )
}

function Next(props) {
  return (
    <section className="banner pv6 bg-white">
      <div className="cf ph2-ns">
        <Link to={"../"+props.prev+"/"}> 
          <div className="fl w-100 w-50-ns pa2 tc" onClick={() => props.switchView(props.prev)}>Prev</div>
        </Link>
        <Link to={"../"+props.next+"/"}> 
          <div className="fr w-100 w-50-ns pa2 tc" onClick={() => props.switchView(props.next)}>Next</div>
        </Link>
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
          background = {"/images/taiwan.jpg"}
          map = {"-75px, -330px"}
        />

        <Illustration 
          number = {2}
          text1={this.props.data.illustrationText[0]}
          text2={this.props.data.illustrationText[1]}
          illustration = {this.props.data.illustration}
        />

        <PhotoSwitch
          number = {2} 
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          text2={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel}
        />

        {/*過場*/}

        <Video 
          videoID="01"
          link={this.props.data.video[1]}
          text1=""
        />

        {/*過場*/}

        <PhotoTextFull
          position={"fr-l"}
          color="dark"
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <PhotoText
          order="right"
          color="invert"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
        /> {/*圖表*/}

        {/*年代比較*/}

        <Video 
          videoID="02"
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[0]}
        />

        <Transition text={this.props.data.videoText[1]} />
        <Video 
          videoID="03"
          link={this.props.data.video[3]}
          text1=""
        />

        {/*過場*/}

        <PhotoTextFull
          position={"fl-l"}
          color="dark"
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

        <PhotoTextFull
          position={"fr-l"}
          color="dark"
          text1={this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <PhotoContrast 
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
        />

        {/*橫向移動背景大圖*/}

        <Video 
          videoID="04"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[2]}
        />

        <EndingVideo text="淡水河" link={"https://www.youtube.com/embed/GW71xsyJ8TY?rel=0"}/>
        <Next switchView={this.props.switchView} next={"reborn-erren-river"} prev={"reborn-erren-river"}/>
      </div>
    );
  }
}

class Event02 extends Component {
  state = {
    open: false,
    image: ""
  }
 
  onOpenModal = (img) => {
    this.setState({ open: true, image: img});
    console.log(this.state);
  };
 
  onCloseModal = () => {
    this.setState({ open: false });
  };
  render() {
    const { open } = this.state;
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-245px, 145px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <Video 
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
        />

        <Video 
          videoID="02"
          position="fr-l"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        {/*這是什麼？*/}

        <PhotoSwitch 
          number = {2} 
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          text2={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel}
        />

        <Video 
          videoID="03"
          link={this.props.data.video[2]}
          text1=""
        />

        <PhotoMultiple
          text={this.props.data.photoMultipleText}
          images={this.props.data.photoMultiple}
          label={this.props.data.photoMultipleLabel}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image}/>
        </Modal>

        <EndingVideo text={"二仁溪"} link={"https://youtube.com/embed/aeaNKyjoXcs?rel=0"}/>
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
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />
      </div>
    );
  }
}

class Event05 extends Component {
  render() {
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoTextFull
          position={"fr-l"}
          color={"dark"}
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />
        <SmallVideo 
          videoID="01"
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
        />

        <Video 
          videoID="02"
          color="dark"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        <SmallVideo 
          videoID="03"
          link={this.props.data.video[2]}
          text={this.props.data.videoText[2]}
        />

        <PhotoTextFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

         <PhotoSwitch 
          images={this.props.data.photoswitch} 
          label={this.props.data.photoswitchLabel}
          text1=""
        />

        <PhotoTextFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />
      </div>
    );
  }
}

class Event06 extends Component {
  render() {
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoTextFull
          position={"fr-l"}
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <Video 
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
        />

        <PhotoSwitch 
          position={"fr-l"}
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          label={this.props.data.photoswitchLabel}
        />

        <PhotoTextFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

        <Video 
          number={2}
          position={"fr-l"}
          color="dark"
          videoID="02"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
          text2={this.props.data.videoText[2]}
        />

        <Video 
          position={"fl-l"}
          videoID="03"
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[3]}
        />

        <Transition text={this.props.data.videoText[4]}/>
        <Video 
          videoID="04"
          link={this.props.data.video[3]}
          text1=""
        />

        <PhotoTextFull
          number={2}
          position={"fl-l"}
          color="dark"
          text1={this.props.data.photoFullText[2]}
          text2={this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <Video 
          videoID="05"
          position={"fr-l"}
          text1=""
        />

        <PhotoTextFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />

      </div>
    );
  }
}

class Event07 extends Component {
  render() {
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-110px, -110px"}
        />

        <Video 
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoTextFull
          position={"fr-l"}
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <Video 
          videoID="02"
          color="dark"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        <PhotoContrast 
          images={this.props.data.photocontrast}
          text=""
        />

        <Video 
          videoID="03"
          color="dark"
          position={"fr-l"}
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[2]}
        />
        <PhotoTextFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />
        <Transition text={this.props.data.videoText[3]}/>
        <Video 
          videoID="04"
          link={this.props.data.video[3]}
          text1=""
        />
        <Video 
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
        />
        
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
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />
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
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          background = {"/images/taiwan.jpg"}
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />
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

