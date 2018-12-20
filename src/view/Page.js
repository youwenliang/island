/*global FB*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js';
import $ from 'jquery';
import BeforeAfterSlider from 'react-before-after-slider'; // eslint-disable-line no-unused-vars
import ReactCompareImage from 'react-compare-image';

import ImageGallery from 'react-image-gallery';
import Nav from '../component/Nav'
import Phone from '../component/Phone'
import Modal from 'react-responsive-modal';
import Cookies from 'universal-cookie';

import endingV from '../assets/images/endingVideo.png';
import messengerIcon from '../assets/images/messenger.png';
import hand from '../assets/images/hand.svg';
import timemachine from '../assets/images/timemachine.svg';
import taiwanMap from '../assets/images/taiwan.jpg';
import tvLine from '../assets/images/tvline-4.png';
import ship from '../assets/images/machinemap.svg';

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
      view: params.id,
      drag: false,
      interval: null,
      scrollprogress: null
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
  // componentDidUpdate(){
  //   console.log('update');
  //   $('.dragscroll').mousewheel(function(event, change) {
  //     if($(this).hasClass('dragscroll')) {
  //       var newScrollLeft = $(this).scrollLeft(),
  //           width = $(this).outerWidth(),
  //           scrollWidth = $(this).get(0).scrollWidth;
  //       if(newScrollLeft === 0 && change > 0) ;
  //       else if (scrollWidth - newScrollLeft === width && change < 0) ;
  //       else {
  //         this.scrollLeft -= (change * .5); //need a value to speed up the change
  //         event.preventDefault();
  //       }
  //     }
  //   });
  // }

  componentDidMount(){
    var $t = this;
    console.log('mount');
    
    $(document).scrollTop(0);
    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    var scrolling = false;
    $t.state.scrollprogress = setInterval(function(){
      if(!$('.progress.active').hasClass('scrolling')) {
        $('.progress.active').addClass('scrolling');
        scrolling = false;
        console.log("false scroll");
      }
    },1000)

    $('.dragscroll').scrollLeft(0);
    // Horizontal Scroll
    // $('.dragscroll').mousewheel(function(event, change) {
    //   console.log("scrollingmount");
    //   var newScrollLeft = $(this).scrollLeft(),
    //       width = $(this).outerWidth(),
    //       scrollWidth = $(this).get(0).scrollWidth;
    //   if(newScrollLeft === 0 && change > 0) ;
    //   else if (scrollWidth - newScrollLeft === width && change < 0) ;
    //   else {
    //     this.scrollLeft -= (change * .5); //need a value to speed up the change
    //     event.preventDefault();
    //   }
    // });

    var images  = [];
    loadImage(images)
    .then(function (allImgs) {
      console.log(allImgs.length, 'images loaded!', allImgs);
      var vid = document.getElementById("coverVideo");
      vid.onloadstart = function() {
        setTimeout(function(){
          document.getElementById('loading').classList.add('fade');
          document.body.classList.remove('ds');
        },600);
      };
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
      $t.state.interval = setInterval(function(){
          $('.auto-scroll .grid-container').scrollLeft(scroll + add)
          add+=k;
      },10);

      $('.auto-scroll .grid-container').hover(function(){
        add = 0;
        clearInterval($t.state.interval);
        console.log("????");
      }, function(){
        var $this = $(this);
        scroll = $(this).scrollLeft();
        $t.state.interval = setInterval(function(){
          $this.scrollLeft(scroll + add)
          add+=k;
        },10);
      });

      // Scroll functions
      $(window).scroll( function(){
        scrolling = true;
        $('.progress.active').removeClass('scrolling');
        var th = $(document).height()-$(window).height();
        var ch = $(window).scrollTop();
        var x = 100*ch/th;
        $('.progress .bar').css('height', x + '%');

        if(ch >= $(window).height()) {
          $('.progress').addClass('active');
          $('.messenger').addClass('active');
        } else {
          $('.progress').removeClass('active');
          $('.messenger').removeClass('active');
        }

        var top_of_window = $(window).scrollTop(); // eslint-disable-line no-unused-vars
        var bottom_of_window = $(window).scrollTop()+ $(window).height(); // eslint-disable-line no-unused-vars
        var center_of_window = $(window).scrollTop()+ $(window).height()/2; 

        $('.auto-scroll').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            k = 0.3
          } else {
            k = 0;
          }
        });

        $('.timeChange').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( top_of_window > top_of_object && top_of_window < bottom_of_object){
            $(this).find('.time-clipping').removeClass('fade');
          } else {
            $(this).find('.time-clipping').addClass('fade');
          }
        });

        // $('.dragscroll-content').each(function(){
        //   var top_of_object = $(this).offset().top;
        //   if( top_of_window >= top_of_object - 20 && top_of_window <= top_of_object + 20){
        //     $(window).scrollTop(top_of_object);
        //     $(this).find('.grid-container').addClass('dragscroll');
        //     if(!$t.state.drag) $t.setState({drag:true});
        //   } else {
        //     $(this).find('.grid-container').removeClass('dragscroll');
        //     if($t.state.drag) $t.setState({drag:false});
        //   }
        // });

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

  componentWillUnmount(){
    clearInterval(this.state.interval);
    clearInterval(this.state.scrollprogress);
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
      <section id={data.id} className="overflow-x-hidden">
        <Helmet>
            <title>{data.title + " - 我們的島二十週年"}</title>
        </Helmet>
        <Nav timeline={false}/>
        {/*Progress Bar*/}
        <div className="progress z10">
          <div className="bar"></div>
        </div>
        {container}
        {/*<Messenger/>*/}
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
  // Cookies
  const cookies = new Cookies();
  var phone = null;
  var top = null;
  var h = (1000 - $(window).height()) / 4
  if(cookies.get('firstVisit') === undefined) {
    cookies.set('firstVisit', true, { path: '/' });
    phone = (<Phone/>);
    top = {
      top: '-'+h+'px'
    }
  }

  return (
    <section id="cover" className="vh-100 flex aic relative video-content relative">
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
      <div className="mw80 center ph4-ns ph3 w-100 z4 tc relative" style={top}>
        <img src={props.title} className="center mb3" height="150" alt="title" />
        <div className="cf white w-80-ns w-100 center ph-ns">
          <h3 className="f3-ns f4 coverVideo-tag fw4 lh-copy mb0 pre-wrap text-shadow">{props.content}</h3>
        </div>
      </div>
      {phone}
    </section>
  )
}

/*02*/
function Taiwan(props) {
  var bgStyle = {
    backgroundImage: "url("+taiwanMap+")",
    backgroundSize: "1680px",
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
  var r = (l.length-2) * 15 + 60 + "px";
  var label = {
    background: "#222222",
    color: "white",
    padding: "5px 10px 5px 10px",
    top: "48px",
    position: "relative",
    right: r,
    zIndex: "-1",
    whiteSpace: "nowrap"
  }
  return (
    <section className="cover min-vh-150 flex aic relative bg-black">
      <div className="w-100 h-100 absolute top-left clipping bg-dark-gray">
        <div className="w-100 h-100 fixed fixed-content pn flex aic" style={bgStyle}>
          <TvLine />
          <figure className="absolute" style={position}>
            <label className="taiwan-label" style={label}>{props.text1.split("的")[0]}</label>
            <img src={ship} width="88" height="80" alt="Taiwan"/>
          </figure>
        </div>
      </div>
      <div className="mw80 center ph4-ns ph3 w-100 z4 pre-wrap">
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
          <figure className="center mw70 w-100 ph4-ns">
            <img className="w-50-l w-100" src={props.illustration} alt="illustration"/>
          </figure>
        </div>
      </div>
      <div className="mw70 center ph4-ns ph3 w-100 z4 pre-wrap">
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
    bgcolor = "bg-black o-60";
    textcolor = "white";
  } else {
    bgcolor = "bg-white o-85";
    textcolor = "black";
  }
  var text1 = null;
  var h = "min-vh-150"
  if(props.text1 !== "") {
    h = "min-vh-200"
    text1 = (
      <div className="cf">
        <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
          <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
          <p className={"f5 lh-copy mv0 z4 relative "+textcolor} dangerouslySetInnerHTML={{__html:props.text1}}></p>
        </div>
      </div>
    )
  }
  var text2 = null;
  
  if(props.number === 2) {
    h = "min-vh-300"
    text2 = (
      <div className="cf mt50vh">
        <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
          <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
          <p className={"f5 lh-copy mv0 z4 relative "+textcolor} dangerouslySetInnerHTML={{__html:props.text2}}></p>
        </div>
      </div>
    )
  }
  return (
    <section className={h+" flex aic relative bg-black"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
          <figure className="w-100 ma0">
            <img className="w-100" style={fullImage} src={props.image} alt="background"/>
          </figure>
          <label className="white absolute" style={bottomRight}>{props.label}</label>
        </div>
      </div>
      <div className="mw80 center ph4-ns ph3 w-100 z4 pre-wrap">
        {text1}
        {text2}
      </div>
    </section>
  )
}

function PhotoCenterTextFull(props) {
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
  var max = {
    maxWidth: "800px"
  }
  var textShadow = "text-shadow f4";
  var bgColor = "";
  var mask = "bg-dark-gray o-40";
  if(props.bg) {
    textShadow = "f5";
    bgColor = "bg-black o-60";
    mask = "";
  }
  return (
    <section className="min-vh-200 flex aic relative bg-black">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
          <figure className="w-100 ma0">
            <img className="w-100" style={fullImage} src={props.image} alt="background"/>
          </figure>
          <div className={mask+" w-100 h-100 absolute pn top-left z4"}/>
          <label className="white absolute z10" style={bottomRight}>{props.label}</label>
        </div>
      </div>
      <div className="w-100 center ph4-ns ph3 z4 relative">
        <div className="cf flex aic">
          <div className="w-100 w-50-l center pa4-l pa3 relative" style={max}>
            <div className={bgColor+" w-100 h-100 absolute pn top-left"}/>
            <p className={"pre-wrap lh-copy mv0 z4 relative white "+textShadow}>{props.text1}</p>
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
  var h = "min-vh-150";
  if(props.multiple) {
    h = "";
  }
  return (
    <section className={h+" flex aic relative"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className={color1+" w-100 h-100 fixed fixed-content pn flex aic"}>
          <figure className="center mw70 w-100">
            <img className={"w-50-l w-100 "+photo} src={props.image} alt="description"/>
          </figure>
        </div>
      </div>
      <div className="mw70 center ph4-ns ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 "+color2+" "+text}>
            <p className="f5 lh-copy mv0">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*05-2*/
function PhotoTextFix(props) {
  var photo, text = "";
  var color1 = "bg-white"
  var color2 = "bg-near-white";
  if(props.color === "invert") {
    color1 = "bg-near-white";
    color2 = "bg-white";
  }
  if(props.order === "right") {
    text = "order-1"
    photo = "order-0"
  } else {
    text = "order-0"
    photo = "order-1"
  }
  var h = "min-vh-150";
  if(props.multiple) {
    h = "";
  }

  var p = "pb6";
  if(props.top) {
    p = "pt6";
  }

  return (
    <section className={h+" flex aic relative "+p+" "+color1}>
      <div className="mw80 w-100 center ph4-ns ph3 z4 relative">
        <div className="cf flex aic flex-column-s">
          <div className={"w-100 w-50-l ph2 pv3 relative "+photo}>
            <figure className="center mw70 w-100">
              <img className="w-100" src={props.image} alt="description"/>
            </figure>
            <p className="f7 o-50 tc">{props.label}</p>
          </div>
          <div className={"w-100 w-50-l mw500 center ml5-l ph2 pv3 "+color1+" "+text}>
            <p className="pre-wrap f5 lh-copy mv0 z4 relative black">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*05-1*/
function MapText(props) {
  return (
    <section className="min-vh-150 flex aic relative">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="w-100 h-100 fixed fixed-content pn flex aic">
          <figure className="center w-100 h-100">
            <img className="w-50-l w-100 h-100 map" src={props.image} alt="description"/>
          </figure>
        </div>
      </div>
      <div className="mw70 center ph4-ns ph3 w-100 z4 pre-wrap">
        <div className="cf black">
          <div className="fr-l w-50-l mw500 mh3-l center w-100 pa4-l pa3 bg-white">
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
  var h = "min-vh-150"
  if(props.text1 !== "") {
    h = "min-vh-200"
    text1 = (
      <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative "+props.position}>
        <div className="w-100 h-100 absolute bg-black o-60 top-left"></div>
        <p className="f5 lh-copy mv0 relative z4">{props.text1}</p>
      </div>
    )
  }
  var text2 = null;
  if(props.number === 2) {
    h = "min-vh-300"
    text2 = (
      <div className="cf white mt50vh">
        <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative "+props.position}>
          <div className="w-100 h-100 absolute bg-black o-60 top-left"></div>
          <p className="f5 lh-copy mv0 relative z4">{props.text2}</p>
        </div>
      </div>
    )
  }
  return (
    <section className={h+" flex aic w-100 relative bvh bg-black"}>
      <div className="w-100 h-100 absolute top-left clipping">
        <div className="bg-light-gray w-100 h-100 fixed fixed-content">
          <ImageGallery items={images} showFullscreenButton={false} showPlayButton={false} autoPlay={true} showBullets={true} slideInterval={7000}/>
        </div>
      </div>
      <div className="mw80 center ph4-ns ph3 w-100 z4 pre-wrap pn">
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
    height: "640px"
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
      <div className="grid-item bg-gray relative cp" alt={props.label[i]} style={item} key={i} onClick={(e) => props.onOpenModal(e.target.style.backgroundImage.split('"')[1], e.target.getAttribute("alt"))}>
        <label className="absolute white" style={bottomRight}>{props.label[i]}</label>
      </div>
    )
    if(i%2 === 0) columns+=(w+" ");
    grid.push(photos);
  }

  var container = {
    gridTemplateColumns: columns,
    height: "680px",
    paddingBottom: "40px"
  }

  return (
    <section className="flex aic relative bg-white flex-column pv6-l pv4 auto-scroll">      
      <div className="mw80 center cf black mb5 ph4-ns ph3 w-100">
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
        <div className="mw7 w-100 center pre-wrap">
          <p className="f5 lh-copy mv0">{props.text}</p>
        </div>
      </div>
    )
  }
  return (
    <section className={"flex aic relative flex-column pv6-l pv5 "+props.bg}>
        <div className="ph4-ns ph3 w-100 z4">
          {text}
          <div className="relative" style={{ maxWidth: '1024px', margin: '0 auto 2.5rem auto' }}>
            <ReactCompareImage
              leftImage={props.images[0]}
              rightImage={props.images[1]}
              sliderLineWidth={2}
              handleSize={40}
              sliderPositionPercentage={0.8}
            />
            <span className="mt3 right-20 absolute white top f3 fw5" data-type="original">{props.year[1]}</span>
            <span className="mt3 left-20 absolute white top f3 fw5" data-type="modified">{props.year[0]}</span>
          </div>
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
  var h = "min-vh-150"
  if(props.color === "dark") {
    bgcolor = "bg-black o-60";
    textcolor = "white";
  } else {
    bgcolor = "bg-white o-85";
    textcolor = "black";
  }

  if(props.text1 !== "") {
    h = "min-vh-200"
    text1 = (
      
        <div className="cf">
          <div className={props.position+" w-50-l mw500 mh3-l mh3-l center w-100 pa4-l pa3 relative"}>
            <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
            <p className={"pre-wrap f5 lh-copy mv0 z4 relative "+textcolor}>{props.text1}</p>
          </div>
        </div>
      
    )
  }

  var text2 = null;
  if(props.number === 2) {
    h = "min-vh-300"
    text2 = (
      <div className="cf mt50vh">
        <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
          <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
          <p className={"pre-wrap f5 lh-copy mv0 z4 relative "+textcolor}>{props.text2}</p>
        </div>
      </div>
    )
  }

  return (
    <section className={h+" flex aic relative video-content full-video bg-black"}>
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
      <div className="mw80 center ph4-ns ph3 w-100 z4 pre-wrap">
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
    <section className={"min-vh-100 flex aic relative pv6-l pv4 video-content smallVideo "+props.bg}>
      <div className="mw80 w-100 center ph4-ns ph3 z4 relative">
        <div className="cf flex aic flex-column-s">
          <div className="fl-l w-100 w-50-l ph2 pv3 relative">
            <video id={'video'+props.videoID} className="w-100" controls loop playsInline muted autoPlay>
              <source src={props.link} type="video/mp4"/>
            </video>
          </div>
          <div className="fr-l w-100 w-50-l mw500 center ml5-l ph2 pv3">
            <p className="pre-wrap f5 lh-copy mv0 z4 relative black mt0-ns mt4">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*09-2*/
function CenterVideo(props) {
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
  var max = {
    maxWidth: "800px"
  }
  var textShadow = "text-shadow f4";
  var bgColor = "";
  var mask = "bg-dark-gray o-40";
  if(props.bg) {
    textShadow = "f5";
    bgColor = "bg-black o-60";
    mask = "";
  }

  return (
    <section className="min-vh-200 flex aic relative pv6-l pv4 video-content bg-black">
      <div className="w-100 h-100 absolute top-left clipping">
        <div className={mask+" w-100 h-100 absolute pn top-left z4"}/>
        {/*<div className="fixed play cp z10" onClick={(e) => playVideo(e)}></div>*/}
        <div className="fixed sound cp z10" onClick={(e) => soundVideo(e)}></div>
        <div className="bg-light-gray w-100 h-100 fixed fixed-content pn">
          <div className="videoBg">
            <video id={'video'+props.videoID} loop playsInline muted autoPlay>
              <source src={props.link} type="video/mp4"/>
            </video>
          </div>
        </div>
      </div>
      <div className="w-100 center ph4-ns ph3 z4 relative">
        <div className="cf flex aic">
          <div className="w-100 w-50-l center pa4-l pa2 relative" style={max}>
            <div className={bgColor+" w-100 h-100 absolute pn top-left"}/>
            <p className={"pre-wrap f4 lh-copy mv0 z4 relative white "+textShadow}>{props.text1}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*09-2*/
function CenterSmallVideo(props) {
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
  var max = {
    maxWidth: "800px"
  }
  var top = {
    top: "40px"
  }
  var color = "";
  if(props.color === "invert") color = "bg-near-white"

  let text = null;
  if(props.text !== "") {
    text = (
      <div className="mw80 center cf black mb5 pre-wrap">
        <div className="mw7 w-100 center">
          <p className={"f5 lh-copy mv0 "+props.align}>{props.text}</p>
        </div>
      </div>
    )
  }

  return (
    <section className={"min-vh-100 flex aic relative pv6-l pv4 video-content "+color}>
      <div className="w-100 center ph4-ns ph3 z4 relative">
        {text}
        <div className="cf flex aic jcc w-100">
          <div className="center relative">
            <video className="w-100" id={'video'+props.videoID} controls loop playsInline muted autoPlay style={max}>
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
  var machineStyle = {
    bottom: "-28px",
    width: "90vw",
    maxWidth: "400px",
    zIndex: 10
  }
  var handStyle = {
    bottom: "-20px",
    width: "30.375vw",
    maxWidth: "135px",
    transform: "translateX(70px)",
    zIndex: 10
  }

  var bgTV = {
    backgroundImage: 'url('+endingV+')',
    backgroundSize: '100% 100%',
    backgroundPosition: 'center 0',
    backgroundRepeat: 'no-repeat'
  }

  return (
    <section className="flex aic relative bg-white pv6-l pv5 overflow-y-hidden">
      <div className="center ph3-ns ph0 z4 relative mb6 mb5-l">
        <div className="cf tc black w-60-l w-80-m w-100 center pv2 ph4 bg-white mb2">
          <h3>{props.text}</h3>
        </div>
        <div className="bg-white pa5-ns pa0 pb6-ns pb0" style={bgTV}>
          <iframe className="iframe" title="playlist" width="100%" height="315" src={props.link} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
        </div>
      </div>
      <img className="absolute absolute-center" style={machineStyle} width="400px" src={timemachine} alt="timemachine"/>
      <img className="absolute absolute-center" style={handStyle} width="135px" src={hand} alt="hand"/>
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
    var current_hour = parseInt(currentTime / 3600, 10) % 24, // eslint-disable-line no-unused-vars
      current_minute = parseInt(currentTime / 60, 10) % 60,
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
    <section className="flex aic relative bg-white pv6-l pv4">
      <div className="mw80 w-100 center ph4-ns ph3 relative">
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

/*13*/
function Timeline(props) {
  let grid = [];
  var columns = "";
  
  var height = {
    height: "560px"
  }

  var w = "480px";

  for (var i = 0; i < props.images.length; i++){
    var photoGridStyle = {
      width: w,
      height: "320px",
      backgroundImage: "url("+props.images[i]+")",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }
    var textGridStyle = {
      height: "240px",
      maxWidth: "440px",
      whiteSpace: "normal"
    }
    var photos = (
      <div className="grid-item bg-white relative" key={i}>
        <div style={photoGridStyle}></div>
        <div style={textGridStyle} className="pa4 center">
          <p className="f5 fw6 lh-copy mv2 bg-white dib z4 relative pr2">
            {"• "+props.year[i]}
          </p>
          <p className="f6 lh-copy mv0">
            {props.text[i]}
          </p>
        </div>
      </div>
    )
    columns+=(w+" ");
    grid.push(photos);
  }

  var container = {
    gridTemplateColumns: columns,
    gridGap: "10px",
    height: "600px",
    paddingBottom: "40px"
  }

  var line = {
    top: "376px",
    left: 0,
    width: "100%",
    height: "2px",
    backgroundColor: "rgb(0, 0, 0)",
    opacity: 0.1,
    zIndex: 1
  }

  var max = {
    maxWidth: "880px"
  }
  var content = null

  if(props.content !== null) {
    content = (<p className="lh-copy f5 center pre-wrap ph4-ns ph4-ns ph3 mb5" style={max}>{props.content}</p>);
  }

  return (
    <section className="min-vh-100 flex aic relative bg-white pv6-l pv4 flex-column">      
      {content}
      <div className="w-100 overflow-hidden relative" style={height}>
        <div className="absolute line" style={line}></div>
        <div className="grid-container nowrap dragscroll relative ph5-l ph0" style={container}>
          {grid}
        </div> 
      </div>
    </section>
  )
}

/*19*/
function PhotoSlide(props) {
  let grid = [];
  var columns = "";
  
  var height = {
    height: "100vh"
  }

  var w = "90vw";

  var textStyle = {
    right: "4rem",
    bottom: "4rem"
  }

  var text = null;

  for (var i = 0; i < props.images.length; i++){
    var photoGridStyle = {
      width: w,
      height: "100vh",
      backgroundImage: "url("+props.images[i]+")",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }
    if(props.text=== "") ;
    else {
      text = (
        <div className="w-50-l mw500 pa4-l pa3 absolute" style={textStyle}>
          <div className="bg-white o-85 w-100 h-100 absolute pn top-left"></div>
          <p className="pre-wrap f5 lh-copy mv0 z4 relative black">
            {props.text[i]}
          </p>
        </div>
      )
    }

    var photos = (
      <div className="grid-item bg-white relative" key={i}>
        <div className="relative" style={photoGridStyle}>
          {text}
        </div> 
      </div>
    )
    columns+=(w+" ");
    grid.push(photos);
  }

  var container = {
    gridTemplateColumns: columns,
    height: "100vh",
  }

  return (
    <section className="min-vh-100 flex aic relative bg-white flex-column dragscroll-content">      
      <div className="w-100 overflow-hidden relative" style={height}>
        <div className="grid-container nowrap relative ph0" style={container}>
          {grid}
        </div> 
      </div>
    </section>
  )
}

function Transition(props) {
  var max = {
    maxWidth: "880px"
  }
  var objectFit = {
    objectFit: "cover"
  }
  var img = null;
  var fontSize = "f5";
  if(props.illustration !== undefined) {
    img = (
      <div class="overflow-hidden w7">
        <img src={props.illustration} height="200px" style={objectFit}/>
      </div>
    )
    fontSize = "f2 fw5";
  }
  return (
    <section className={props.title+" banner pv5-ns pv4 flex aic jcc flex-column-s ph3 "+props.bg}>
      {img}
      <p className={"dib lh-copy pre-wrap "+fontSize} style={max}>{props.text}</p>
    </section>
  )
}

function Next(props) {
  return (
    <section className="banner pv6-l pv4 bg-white">
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

function Messenger(props) {
  var messenger = {
    right: "40px",
    bottom: "40px",
    zIndex: 18,
  }
  return (
    <div className="messenger fixed h3 w3 br-100 bg-blue flex aic jcc cp shadow-5" style={messenger}>
      <img src={messengerIcon} width="32" height="32" alt="messenger"/>
    </div>
  )
}

function Panorama(props) {
  var bottomRight = {
    bottom: "0px",
    right: "0px",
    background: "rgba(0,0,0,.2)",
    padding: "20px"
  }
  return (
    <section className="panorama-container relative">
      <figure className="panorama">
        <img src={props.image} height="100%"/>
      </figure>
      <div className="panorama-icon"></div>
      <div className="panorama-text text-shadow">左右移動看看</div>
      <label className="white absolute" style={bottomRight}>{props.label}</label>
    </section>
  )
}

function TimeChange(props) {
  var z = "";
  var h = "min-vh-150"
  if(props.last) {
    z = "z-1";
    h = "min-vh-200"
  }
  var label = {
    bottom: "0px",
    right: "0px",
    background: "rgba(0,0,0,.4)",
    padding: "10px",
    color: "white",
    position: "absolute",
    boxSizing: "border-box",
    width: "100%",
    fontSize: ".875em",
    textAlign: "center"
  }
  return (
    <section className={h+" flex aic relative timeChange bg-white "+z}>
      <div className="w-100 h-100 absolute top-left time-clipping fade">
        <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
          <div className="center w-100 z4 pre-wrap">
            <div className="mw7 center w-100 pt4 ph3 h5">
              <p className="lh-copy mv0 dark-gray" dangerouslySetInnerHTML={{__html:props.text1}}></p>
            </div>
            <figure className="w-100 ma0">
              <div className="w-third pr1 dib relative">
                <img src={props.image[0]} alt="description"/>
                <label style={label}>{props.labels[0]}</label>
              </div>
              <div className="w-third pr1 dib relative">
                <img src={props.image[1]} alt="description"/>
                <label style={label}>{props.labels[1]}</label>
              </div>
              <div className="w-third dib relative">
                <img src={props.image[2]} alt="description"/>
                <label style={label}>{props.labels[2]}</label>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </section>
  )
}

function TimeChangeFull(props) {
  var z = "";
  var h = "min-vh-150"

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
    bgcolor = "bg-black o-60";
    textcolor = "white";
  } else {
    bgcolor = "bg-white o-85";
    textcolor = "black";
  }
  var text1 = null; 
  if(props.text1 !== "") {
    text1 = (
      <div className="cf">
        <div className={props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
          <div className={bgcolor+" w-100 h-100 absolute pn top-left"}/>
          <p className={"f5 lh-copy mv0 z4 relative "+textcolor} dangerouslySetInnerHTML={{__html:props.text1}}></p>
        </div>
      </div>
    )
  }
  if(props.last) {
    z = "z-1";
    h = "min-vh-200"
  }
  return (
    <section className={h+" flex aic relative bg-black timeChange"}>
      <div className="w-100 h-100 absolute top-left time-clipping fade">
        <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
          <figure className="w-100 ma0">
            <img className="w-100" style={fullImage} src={props.image} alt="background"/>
          </figure>
          <label className="white absolute" style={bottomRight}>{props.label}</label>
          <div className="absolute left-0 right-0 mw80 center ph4-ns ph3 w-100 z4 pre-wrap">
            {text1}
          </div>
        </div>
      </div>
    </section>
  )
}

function InfoHelper(props) {
  return (
    <div className="absolute z10 mw5 infoHelper">
      <p className="f7 bg-white ba b--black-30 pa3 pre-wrap lh-copy" dangerouslySetInnerHTML={{__html:props.text}}></p>
    </div>
  )
}

function TvLine(props) {
  return (
    <div className="h-100 w-100 absolute o-30" style={{ backgroundImage: "url("+tvLine+")"}}>
    </div>
  )
}

function Blog(props) {
  var img = null;
  var text = null;
  var mw = "mw80 ph3";
  var column = "flex aic flex-column-s";
  var a = "order-1";
  var b = "order-0";
  if(props.switch) {
    a = "order-0";
    b = "order-1"
  }

  let grid = [];
  var columns = "";
  
  var height = {
    height: "400px"
  }
  var w = "600px";

  for (var i = 0; i < props.image.length; i++){
    var item = {
      width: w,
      height: "400px",
      backgroundImage: "url("+props.image[i]+")",
      backgroundSize: "cover",
      backgroundPosition: "center center"
    }
    var bottomRight = {
      bottom: "0px",
      right: "0px",
      background: "rgba(0,0,0,.2)",
      padding: "20px"
    }
    var photos = (
      <div className="grid-item bg-gray relative cp" style={item} key={i} onClick={(e) => props.onOpenModal(e.target.style.backgroundImage.split('"')[1])}>
        <label className="absolute white" style={bottomRight}>{props.label[i]}</label>
      </div>
    )
    columns+=(w+" ");
    grid.push(photos);
  }

  var container = {
    gridTemplateColumns: columns,
    height: "440px",
    paddingBottom: "40px"
  }

  if(props.text === "") {
    img = (
      <div className="w-100">
        <div className="fl-l w-100 w-50-l relative tc mb5 mb0-ns">
          <img className="mb3" src={props.image[0]}/>
          <label className="f7 mt2 o-50" >{props.label[0]}</label>
        </div>
        <div className="fr-l w-100 w-50-l relative tc mb5 mb0-ns">
          <img className="mb3" src={props.image[1]}/>
          <label className="f7 mt2 o-50" >{props.label[1]}</label>
        </div>
      </div>
    )
  }
  else {
    text = (
      <div className={b+" w-100 w-50-l mw500 center ml5-l ph2 pv3"}>
        <p className="pre-wrap f5 lh-copy mv0 z4 relative black mt4-ns">{props.text}</p>
      </div>
    );
  }
  if(props.number === 1) {
    img = (
      <div className={a+" w-100 w-50-l pv3 relative tc mb5 mb0-ns"}>
        <img className="mb3" src={props.image[0]}/>
        <label className="f7 mt2 o-50" >{props.label[0]}</label>
      </div>
    );
  } else if(props.number === 2) {
    img = (
      <div className={a+" w-100 w-50-l relative tc"}>
        <img className="mb3" src={props.image[0]}/>
        <label className="f7 mt2 o-50" >{props.label[0]}</label>
        <img className="mb3 mt5" src={props.image[1]}/>
        <label className="f7 mt2 o-50" >{props.label[1]}</label>
      </div>
    );
  } else if(props.number >= 3) {
    column = "";
    mw = "";
    text = (
      <div className="mw7 center w-100 pa4-l pa3 mb4">
        <p className="pre-wrap f5 lh-copy mv0 z4 relative black mt4-ns">{props.text}</p>
      </div>
    );
    img = (
      <div className="w-100 overflow-hidden" style={height}>
        <div className="grid-container nowrap dragscroll" style={container}>
          {grid}
        </div> 
      </div>
    );
  }
  return (
    <section className={"min-vh-100 flex aic relative pv6-l pv4 "+props.bg} >
      <div className={mw+" w-100 center z4 relative"}>
        <div className={"cf "+column}>
          {text}
          {img}
        </div>
      </div>
    </section>
  )
}







/************************************************************************************************************************* 



                                                        Views



*************************************************************************************************************************/









class Event01 extends Component {
  render() {
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>

        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
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

        <Video 
          videoID="01"
          link={this.props.data.video[0]}
          text1=""
        />

        <PhotoTextFull
          position={"fl-l"}
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
        />

        <TimeChange
          position={"fr-l"}
          text1={this.props.data.timeChangeText[0]}
          image={this.props.data.timeChangePhotos[0]}
          labels={this.props.data.timeChangeLabels[0]}
        />
        <TimeChange
          position={"fr-l"}
          last={true}
          text1={this.props.data.timeChangeText[1]}
          image={this.props.data.timeChangePhotos[1]}
          labels={this.props.data.timeChangeLabels[1]}
        />

        <Video 
          videoID="02"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[0]}
        />

        <Transition text={this.props.data.videoText[1]} />
        <Video 
          videoID="03"
          link={this.props.data.video[2]}
          text1=""
        />

        <PhotoTextFull
          position={"fr-l"}
          color="dark"
          text1={this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <Blog
          number={3}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
        />

        <TimeChangeFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />
        <TimeChangeFull
          position={"fl-l"}
          last={true}
          text1={this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[4]}
          label = {this.props.data.photoFullTextLabel[4]}
        />

        <PhotoContrast 
          bg={"bg-white z1"}
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
          year={this.props.data.photocontrastYear}
        />

        <PhotoContrast
          bg={"bg-near-white z1"}
          images={this.props.data.photocontrast2}
          text={this.props.data.photocontrastText2}
          year={this.props.data.photocontrastYear2}
        />

        <CenterVideo 
          videoID="04"
          link={this.props.data.video[3]}
          text1={this.props.data.videoText[2]}
          bg={false}
        />

        <EndingVideo text="想知道淡水河更多故事...." link={"https://www.youtube.com/embed/GW71xsyJ8TY?rel=0"}/>
        {/*<Next switchView={this.props.switchView} next={"reborn-erren-river"} prev={"reborn-erren-river"}/>*/}
      </div>
    );
  }
}

class Event02 extends Component {
  state = {
    open: false,
    image: "",
    description: ""
  }
 
  onOpenModal = (img, des) => {
    this.setState({ open: true, image: img, description: des});
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
          
          map = {"-255px, 135px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <SmallVideo 
          videoID="01"
          bg={"bg-near-white"}
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
        />

        <Timeline
          content={"二仁溪河川整治年代列表"}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
        />
        <Transition
          bg={"bg-near-white"}
          text={this.props.data.videoText[1]}
        />

        <Video 
          videoID="02"
          position="fr-l"
          link={this.props.data.video[1]}
          text1=""
        />

        <Blog
          number={4}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
        />

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
          <img src={this.state.image} alt="modal"/>
          <p className="tc mb0">{this.state.description}</p>
        </Modal>

        {/*
        <PhotoTextMultiple
          images={this.props.data.photoMultiple}
          text={this.props.data.photoMultipleLabel}
        />
        */}
        <EndingVideo text={"想知道二仁溪更多故事...."} link={"https://youtube.com/embed/aeaNKyjoXcs?rel=0"}/>
      </div>
    );
  }
}

class Event03 extends Component {
  state = {
    open: false,
    image: ""
  }
 
  onOpenModal = (img, des) => {
    this.setState({ open: true, image: img, description: des});
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
          
          map = {"-155px, 335px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <CenterVideo
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
          bg={false}
        />

        <Transition
          text={this.props.data.videoText[1]}
        />

        <Video 
          videoID="02"
          link={this.props.data.video[1]}
          text1=""
        />

        <PhotoMultiple
          images={this.props.data.photoMultiple} 
          label={this.props.data.photoMultipleLabel}
          text={this.props.data.photoMultipleText} 
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="tc mb0">{this.state.description}</p>
        </Modal>

        <Transition
          bg={"bg-near-white tc"}
          text={"轉場文字"}
        />
        <Transition
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[0]}
          text={"陸蟹生存 - 第一關"}
        />
        
        <CenterSmallVideo 
          videoID="03"
          text={this.props.data.videoText[2]}
          link={this.props.data.video[2]}
        />

        <Transition
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[1]}
          text={"陸蟹生存 - 第二關"}
        />

        <Blog
          number={1}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
        />

        <Transition
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[2]}
          text={"陸蟹生存 - 第三關"}
        />

        <Video 
          videoID="04"
          color={"dark"}
          text1={this.props.data.videoText[3]}
          link={this.props.data.video[3]}
        />

        <Blog
          number={5}
          bg={"bg-near-white"}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
        />

        <CenterSmallVideo 
          videoID="05"
          text={this.props.data.videoText[4]}
          link={this.props.data.video[4]}
        />
        <Transition
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[3]}
          text={"陸蟹生存 - 第四關"}
        />
        <Video 
          videoID="06"
          text1={this.props.data.videoText[5]}
          link={this.props.data.video[5]}
        />
        <Transition
          text={this.props.data.videoText[6]}
        />
        <Video 
          videoID="07"
          text1=""
          link={this.props.data.video[6]}
        />

        <Transition
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[4]}
          text={"陸蟹生存 - 魔王關"}
        />

        <Transition
          text={this.props.data.videoText[7]}
        />
        <Video 
          videoID="08"
          text1=""
          link={this.props.data.video[7]}
        />
        <SmallVideo 
          videoID="09"
          link={this.props.data.video[8]}
          text={this.props.data.videoText[8]}
        />
        <PhotoCenterTextFull
          text1 = {this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
          bg={true}
        />
        <Blog
          number={1}
          bg={"bg-near-white"}
          text={this.props.data.blogText[2]}
          image={this.props.data.blogImage[2]}
          label={this.props.data.blogLabel[2]}
        />
        <Video 
          videoID="11"
          text1=""
          link={this.props.data.video[10]}
        />
        <CenterSmallVideo 
          videoID="10"
          text={this.props.data.videoText[9]}
          link={this.props.data.video[9]}
        />
        <PhotoCenterTextFull
          text1 = {this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
          bg={false}
        />

      </div>
    );
  }
}

class Event04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalP: null
    }
  }
  componentDidMount() {
    var $this = this;
    $(document).ready(function(){
      // Panorama
      var leftP = 0;
      var rightP = $('.panorama img').width() - $(window).width();
      var scrollP = rightP/2;
      // console.log(scrollP+"!!!");
      if($(window).width() > 600) {
        panoramaScroll();
        console.log("wide");
      } else {
        $('.panorama').scrollLeft(scrollP);
        console.log("mobile");
      }

      $('.panorama').scroll(function(){
        if($(window).width() <= 600) {
          var rightP = $('.panorama img').width() - $(window).width();
          var deg = 90*$('.panorama').scrollLeft()/rightP-45;
          $('.panorama-icon').css('transform', 'rotate('+deg+'deg)');
        }
      })

      function panoramaScroll() {
        console.log('scroll');
        var rightP = $('.panorama img').width() - $(window).width();
        var k = 0;
        $this.state.intervalP = setInterval(function(){
            $('.panorama').scrollLeft(scrollP);
            scrollP+=k*10;
            var deg = 90*$('.panorama').scrollLeft()/rightP-45;
            $('.panorama-icon').css('transform', 'rotate('+deg+'deg)');
            // console.log(k);
        },25);

        $(window).on('mousemove', function(e){
          var x = e.clientX;
          var s = 2*x/$(window).width() - 1;
          k = s;
          if(scrollP >= rightP) {
            scrollP = rightP;
          }
          else if(scrollP <= leftP) {
            scrollP = leftP;
          }
        });
      }
    });
  }
  componentWillUnmount(){
    console.log('unmount');
    clearInterval(this.state.intervalP);
  }
  render() {
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          map = {"-125px, 295px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <SmallVideo 
          videoID="01"
          bg={"bg-near-white"}
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
        />
        {/*
        <PhotoSwitch 
          position={"fr-l"}
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          label={this.props.data.photoswitchLabel}
        />
        */}

        <Video 
          videoID="02"
          link={this.props.data.video[1]}
          text1=""
        />


        <Transition
          text={this.props.data.panoramaText}
        />
        <Panorama
          image={this.props.data.panoramaImage}
          label={this.props.data.panoramaLabel}
        />

        <Transition text={this.props.data.photoSlideText}/>

        <TimeChangeFull
          position={"fl-l"}
          text1={this.props.data.photoSlideLabel[0]}
          image = {this.props.data.photoSlidePhoto[0]}
          label = ""
        />
        <TimeChangeFull
          position={"fl-l"}
          text1={this.props.data.photoSlideLabel[1]}
          image = {this.props.data.photoSlidePhoto[1]}
          label = ""
        />
        <TimeChangeFull
          position={"fl-l"}
          last={true}
          text1={this.props.data.photoSlideLabel[2]}
          image = {this.props.data.photoSlidePhoto[2]}
          label = ""
        />

        <CenterVideo 
          videoID="06"
          link={this.props.data.video[5]}
          text1={this.props.data.videoText[5]}
          bg={true}
        />

        <Transition
          text={this.props.data.photoFullText[1]}
        />
        <Video 
          videoID="05"
          link={this.props.data.video[4]}
          text1=""
        />

        <SmallVideo 
          videoID="03"
          link={this.props.data.video[2]}
          text={this.props.data.videoText[2]}
        />

        <PhotoContrast 
          bg={"bg-near-white"}
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
          year={this.props.data.photocontrastYear}
        />
        <Transition
          text={this.props.data.photoFullText[4]}
        />
        {/*<Timeline
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
        />*/}
        <Blog
          number={2}
          bg={"bg-near-white"}
          text={this.props.data.blogText}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
        />
        <Video
          position={"fr-l"}
          videoID="05"
          link={this.props.data.video[6]}
          text1={this.props.data.videoText[6]}
        />
        <Blog
          number={0}
          text=""
          image={this.props.data.blogImage[3]}
          label={this.props.data.blogLabel[3]}
        />
        <Video
          position={"fr-l"}
          videoID="04"
          link={this.props.data.video[3]}
          text1={this.props.data.videoText[3]}
        />
        <Blog
          number={0}
          text=""
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
        />
        <Blog
          number={0}
          bg={"bg-near-white"}
          text=""
          image={this.props.data.blogImage[2]}
          label={this.props.data.blogLabel[2]}
        />
        <PhotoCenterTextFull
          text1={this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />
        <EndingVideo text="一起來關心我們的海洋" link={"https://www.youtube.com/embed/fUwZID2Bikg?rel=0"}/>
      </div>
    );
  }
}

class Event05 extends Component {
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

        <Blog
          number={2}
          switch={false}
          bg={"bg-near-white"}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
        />

        <Blog
          number={2}
          switch={true}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
        />

        <Video 
          videoID="02"
          color="dark"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        <CenterSmallVideo 
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

        <Video 
          videoID="04"
          link={this.props.data.video[3]}
          text1=""
        />

        <PhotoSwitch 
          position={"fl-l"}
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          label={this.props.data.photoswitchLabel}
        />

        <Timeline
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
        />

        <Video 
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
        />

        <PhotoCenterTextFull
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
  componentDidMount(){
    var infoText = this.props.data.infoText;
    $(document).ready(function(){
      var infoHelper = '<div class="absolute z10 mw7 infoHelper pn"><p class="near-black f7 fw4 bg-white pa3 pre-wrap lh-copy">'+infoText+'</p></div>';
      $('.info').append(infoHelper);
    })
  }
  render() {
    return (
      <div>
        <CoverVideo title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
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

        <PhotoSwitch 
          images={this.props.data.photoswitch} 
          label={this.props.data.photoswitchLabel}
          text1=""
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

        <Transition text={this.props.data.photoSlideText}/>
        <PhotoSlide
          text={this.props.data.photoSlideLabel}
          images={this.props.data.photoSlidePhoto}
        />

        <Timeline
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
        />

        <PhotoContrast
          bg={"bg-near-white"}
          images={this.props.data.photocontrast}
          text=""
          year={this.props.data.photocontrastYear}
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
        <CenterVideo 
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
          bg={false}
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
          
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <Transition text={this.props.data.transitionText[0]} />
        <Video 
          videoID="01"
          link={this.props.data.video[0]}
          text1=""
        />

        <PhotoTextFull
          position={"fr-l"}
          color="dark"
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <CenterSmallVideo 
          videoID="02"
          color="invert"
          link={this.props.data.video[1]}
        />

        <Transition text={this.props.data.transitionText[1]} />
        <Video 
          videoID="03"
          link={this.props.data.video[2]}
          text1=""
        />

        <Transition text={this.props.data.transitionText[2]} />
        <PhotoSwitch 
          position={"fl-l"}
          images={this.props.data.photoswitch1} 
          text1=""
          label={this.props.data.photoswitchLabel1}
        />        

        <Video 
          videoID="04"
          link={this.props.data.video[3]}
          text1=""
        />

        <PhotoTextFull
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

        <PhotoSwitch 
          position={"fl-l"}
          images={this.props.data.photoswitch2} 
          text1={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel2}
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
          
          map = {"-110px, -200px"}
        />

        <Illustration
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />
        <Transition text={this.props.data.transitionText[0]} />
        <PhotoTextFull
          text1=""
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <PhotoText
          order="right"
          color="invert"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
        /> {/*廠區*/}

        <PhotoTextFull
          text1 = {this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        /> {/*病變*/}

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

        <Transition text={this.props.data.transitionText[1]} />
        <Video 
          videoID="03"
          link={this.props.data.video[2]}
          text1=""
        />

        <PhotoCenterTextFull
          text1 = {this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        /> {/*石棺*/}

        <PhotoTextFix
          order="left"
          color="invert"
          text={this.props.data.photoText[1]}
          image = {this.props.data.photoImage[1]}
          label = {this.props.data.photoLabel[0]}
          multiple = {true}
          top={true}
        /> {/*提告*/}

        <PhotoTextFix
          order="left"
          color="invert"
          text={this.props.data.photoText[2]}
          image = {this.props.data.photoImage[2]}
          label = {this.props.data.photoLabel[1]}
          multiple = {true}
          top={false}
        /> {/*提告*/}

        <Transition text={this.props.data.transitionText[2]} />
        <EndingVideo text={"想知道台鹼安順廠更多故事...."} link={"https://youtube.com/embed/6CwZYq6vt0k?rel=0"}/>
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

