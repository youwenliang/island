/*global FB*/ // eslint-disable-line no-unused-vars
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import canAutoPlay from 'can-autoplay'; // eslint-disable-line no-unused-vars
import data from '../data/data.js';
import $ from 'jquery';
import BeforeAfterSlider from 'react-before-after-slider'; // eslint-disable-line no-unused-vars
import ReactCompareImage from 'react-compare-image';
import Cookies from 'universal-cookie';

import { Controller, Scene } from 'react-scrollmagic';
import { Tween } from "react-gsap";

import ImageGallery from 'react-image-gallery';
import Nav from '../component/Nav'
import Phone from '../component/Phone' // eslint-disable-line no-unused-vars
import Modal from 'react-responsive-modal';

import endingV from '../assets/images/endingVideo.png';
import messengerIcon from '../assets/images/messenger.png';
import timemachinehand from '../assets/images/timemachinehand.svg';
import taiwanMap from '../assets/images/taiwan-static.png';
import kinmenMap from '../assets/images/kinmen-static.png';
import googleEarthLogo from '../assets/images/google_earth.svg';
import tvLine from '../assets/images/tvline-4.png';
import ship from '../assets/images/machinemap.svg'; // eslint-disable-line no-unused-vars
import scrollship from '../assets/images/時光機.svg';
import placeholder from '../assets/images/placeholder.jpg';

import fish1 from '../assets/images/fish-1.svg';
import fish2 from '../assets/images/fish-2.svg';
import fish3 from '../assets/images/fish-3.svg';
import fish4 from '../assets/images/fish-4.svg';
import fish5 from '../assets/images/fish-5.svg';

import cta1 from '../assets/images/CTA-Icons-1.svg'; // eslint-disable-line no-unused-vars
import cta2 from '../assets/images/CTA-Icons-2.svg'; // eslint-disable-line no-unused-vars
import cta3 from '../assets/images/CTA-Icons-3.svg';
import ctap2 from '../assets/images/pageCTA-1.svg';
import ctap1 from '../assets/images/pageCTA-2.svg';

import success from '../assets/images/我們的島cover-08.svg';
import successTitle from '../assets/images/我們的島cover-09.svg';
import successBg1 from '../assets/images/我們的島cover-10.svg';
import successBg2 from '../assets/images/我們的島cover-11.svg'; // eslint-disable-line no-unused-vars

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
      interval2: null,
      scrollprogress: null,
      loaded: false
    };

    //Here ya go
    this.props.history.listen((location, action) => {
      var view = location.pathname.replace('/island20/','').replace('/','');
      $(document).scrollTop(0);
      this.setState({
        view: view,
        id: view,
        drag: false,
        interval: null,
        interval2: null,
        scrollprogress: null
      });
      clearInterval(this.state.interval);
      clearInterval(this.state.interval2);
      clearInterval(this.state.scrollprogress);
    });
  }
  switchView = (view) => {
    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');
    $(document).scrollTop(0);
    this.setState({
      view: view,
      id: view,
      drag: false,
      interval: null,
      interval2: null,
      scrollprogress: null
    });
    clearInterval(this.state.interval);
    clearInterval(this.state.interval2);
    clearInterval(this.state.scrollprogress);
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

  componentDidUpdate(){
    var $t = this;
    const cookies = new Cookies();
    
    $(document).scrollTop(0);
    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    var data = pageEvent_data[this.state.id];
    var images  = [data.code];
    // var images  = [];
    var loaded = false;
    var p = 0;
    var id = setInterval(frame, 10);
    
    function frame() {
      //console.log(loaded)
      if (p >= 100) {
        if(loaded) {
          if(cookies.get('firstVisit') === undefined) {
            cookies.set('firstVisit', true, { path: '/' });
            // window.location.reload();
          }
          setTimeout(function(){
            document.getElementById('loading').classList.add('fade');
            document.body.classList.remove('ds');
          },400);
          clearInterval(id);
        }
      } else {
        p++; 
        $('.progress-view').text(p+'%');
      }
    }
    // var images  = [];
    loadImage(images)
    .then(function (allImgs) {
      console.log(allImgs.length, 'images loaded!', allImgs);
      console.log($t.state.view);
      loaded = true;

      if(p >= 100) {
        clearInterval(id);
        if(cookies.get('firstVisit') === undefined) {
          cookies.set('firstVisit', true, { path: '/' });
          // window.location.reload();
        }
        setTimeout(function(){
          document.getElementById('loading').classList.add('fade');
          document.body.classList.remove('ds');
        },400);
      }
    })
    .catch(function (err) {
      console.error('One or more images have failed to load :(');
      console.error(err.errored);
      console.info('But these loaded fine:');
      console.info(err.loaded);
    });

      // $('.video-content').each( function(i){
      //   var $this = $(this);
      //   $this.find('video').get(0).pause()
      // });

      var scrolling = false; // eslint-disable-line no-unused-vars
      $t.state.scrollprogress = setInterval(function(){
        if(!$('.progress.active').hasClass('scrolling')) {
          $('.progress.active').addClass('scrolling');
          scrolling = false;
          // console.log("false scroll");
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

      $(document).ready(function(){
        let vh = window.innerHeight * 0.01;
        $('.vh-100').css('height', 100 * vh+'px');
        $('.min-vh-100').css('min-height', 100 * vh+'px');
        $('.min-vh-150').css('min-height', 150 * vh+'px');
        $('.min-vh-180').css('min-height', 180 * vh+'px');
        $('.min-vh-200').css('min-height', 240 * vh+'px');
        $('.min-vh-300').css('min-height', 340 * vh+'px');

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
      }, function(){
        var $this = $(this);
        scroll = $(this).scrollLeft();
        $t.state.interval = setInterval(function(){
          $this.scrollLeft(scroll + add)
          add+=k;
        },10);
      });

      // Autoscroll2
      var scroll2 = 0;
      var add2 = 0;
      var k2 = 0;
      $t.state.interval2 = setInterval(function(){
          $('.auto-scroll-2 .grid-container').scrollLeft(scroll2 + add2)
          add2+=k2;
      },10);

      $('.auto-scroll-2 .grid-container').hover(function(){
        add2 = 0;
        clearInterval($t.state.interval2);
      }, function(){
        var $this = $(this);
        scroll2 = $(this).scrollLeft();
        $t.state.interval2 = setInterval(function(){
          $this.scrollLeft(scroll2 + add2)
          add2+=k2;
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

        if ($(window).width() <= 959) {
          $('.timeChange-text .time-clipping').removeClass('fade');
        } else {
          $('.timeChange-text').each(function(){
            var top_of_object = $(this).offset().top;
            var bottom_of_object = $(this).offset().top + $(this).height();
            if( top_of_window > top_of_object && top_of_window < bottom_of_object){
              $(this).find('.time-clipping').removeClass('fade');
            } else {
              $(this).find('.time-clipping').addClass('fade');
            }
          });
        }

        $('.timeChange').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( top_of_window > top_of_object && top_of_window < bottom_of_object){
            $(this).find('.time-clipping:not(.first)').removeClass('fade');
          } else {
            $(this).find('.time-clipping:not(.first)').addClass('fade');
          }
          if( bottom_of_window > top_of_object && top_of_window < bottom_of_object){
            $(this).find('.time-clipping.first').removeClass('fade');
          } else {
            $(this).find('.time-clipping.first').addClass('fade');
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

        if($(window).width() > 959) {

        $('.auto-scroll').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            k = 0.3;
          } else {
            k = 0;
          }
          // console.log(scroll+'-'+add+'-'+k+"1111");
          // console.log(scroll2+'-'+add2+'-'+k2+"2222");
        });

        $('.auto-scroll-2').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            k2 = 0.3
          } else {
            k2 = 0;
          }
          // console.log(scroll+'-'+add+'-'+k+"111");
          // console.log(scroll2+'-'+add2+'-'+k2+"222");
        });
        
        }
      });
    })
  }

  componentDidMount(){

    var $t = this;
    const cookies = new Cookies();
    
    $(document).scrollTop(0);
    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    var data = pageEvent_data[this.state.id];
    var images  = [data.code];
    // var images  = [];
    var loaded = false;
    var p = 0;
    var id = setInterval(frame, 10);
    
    function frame() {
      //console.log(loaded)
      if (p >= 100) {
        if(loaded) {
          if(cookies.get('firstVisit') === undefined) {
            cookies.set('firstVisit', true, { path: '/' });
            //window.location.reload();
          }
          setTimeout(function(){
            document.getElementById('loading').classList.add('fade');
            document.body.classList.remove('ds');
          },400);
          clearInterval(id);
        }
      } else {
        p++; 
        $('.progress-view').text(p+'%');
      }
    }
    // var images  = [];
    loadImage(images)
    .then(function (allImgs) {
      console.log(allImgs.length, 'images loaded!', allImgs);
      loaded = true;

      if(p >= 100) {
        clearInterval(id);
        if(cookies.get('firstVisit') === undefined) {
          cookies.set('firstVisit', true, { path: '/' });
          //window.location.reload();
        }
        setTimeout(function(){
          document.getElementById('loading').classList.add('fade');
          document.body.classList.remove('ds');
        },400);
      }
    })
    .catch(function (err) {
      console.error('One or more images have failed to load :(');
      console.error(err.errored);
      console.info('But these loaded fine:');
      console.info(err.loaded);
    });

      // $('.video-content').each( function(i){
      //   var $this = $(this);
      //   $this.find('video').get(0).pause()
      // });

      var scrolling = false; // eslint-disable-line no-unused-vars
      $t.state.scrollprogress = setInterval(function(){
        if(!$('.progress.active').hasClass('scrolling')) {
          $('.progress.active').addClass('scrolling');
          scrolling = false;
          // console.log("false scroll");
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

      $(document).ready(function(){
        let vh = window.innerHeight * 0.01;
        $('.vh-100').css('height', 100 * vh+'px');
        $('.min-vh-100').css('min-height', 100 * vh+'px');
        $('.min-vh-150').css('min-height', 150 * vh+'px');
        $('.min-vh-180').css('min-height', 180 * vh+'px');
        $('.min-vh-200').css('min-height', 240 * vh+'px');
        $('.min-vh-300').css('min-height', 340 * vh+'px');

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
      }, function(){
        var $this = $(this);
        scroll = $(this).scrollLeft();
        $t.state.interval = setInterval(function(){
          $this.scrollLeft(scroll + add)
          add+=k;
        },10);
      });

      // Autoscroll2
      var scroll2 = 0;
      var add2 = 0;
      var k2 = 0;
      $t.state.interval2 = setInterval(function(){
          $('.auto-scroll-2 .grid-container').scrollLeft(scroll2 + add2)
          add2+=k2;
      },10);

      $('.auto-scroll-2 .grid-container').hover(function(){
        add2 = 0;
        clearInterval($t.state.interval2);
      }, function(){
        var $this = $(this);
        scroll2 = $(this).scrollLeft();
        $t.state.interval2 = setInterval(function(){
          $this.scrollLeft(scroll2 + add2)
          add2+=k2;
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

        if ($(window).width() <= 959) {
          $('.timeChange-text .time-clipping').removeClass('fade');
        } else {
          $('.timeChange-text').each(function(){
            var top_of_object = $(this).offset().top;
            var bottom_of_object = $(this).offset().top + $(this).height();
            if( top_of_window > top_of_object && top_of_window < bottom_of_object){
              $(this).find('.time-clipping').removeClass('fade');
            } else {
              $(this).find('.time-clipping').addClass('fade');
            }
          });
        }

        $('.timeChange').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( top_of_window > top_of_object && top_of_window < bottom_of_object){
            $(this).find('.time-clipping:not(.first)').removeClass('fade');
          } else {
            $(this).find('.time-clipping:not(.first)').addClass('fade');
          }
          if( bottom_of_window > top_of_object && top_of_window < bottom_of_object){
            $(this).find('.time-clipping.first').removeClass('fade');
          } else {
            $(this).find('.time-clipping.first').addClass('fade');
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

        if($(window).width() > 959) {

        $('.auto-scroll').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            k = 0.3;
          } else {
            k = 0;
          }
        });

        $('.auto-scroll-2').each(function(){
          var top_of_object = $(this).offset().top;
          var bottom_of_object = $(this).offset().top + $(this).height();
          if( center_of_window >= top_of_object && center_of_window <= bottom_of_object ){
            k2 = 0.3
          } else {
            k2 = 0;
          }
        });
        
        }
      });
    })
  }

  componentWillUnmount(){
    clearInterval(this.state.interval);
    clearInterval(this.state.interval2);
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
      'mercury-sludge-volcano': <Event13 data={data} view={this.state.view} switchView={this.switchView.bind(this)} />
    }
    let container = viewContainerMapping[this.state.view];
    
    return (
      <section id={data.id} className="overflow-x-hidden">
        <Helmet>
            <title>{data.title + " - 我們的島二十週年"}</title>
            <meta name="description" content={data.description}/>
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:title" content={data.title + " - 我們的島二十週年"} />
            <meta property="og:description" content={data.description}/>
            <meta property="og:image" content={data.thumbnail} />
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

function ChatBot(props) {
  var chatbot = {
    backgroundColor: "#cddbdd"
  }
  var successStyle = {
    width: "40vw",
    maxWidth: "300px"
  }
  var successBg = {
    backgroundImage: "url("+successBg1+")",
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    maxWidth: "220px"
  }

  var dn = "dn";
  if(props.display) dn = "flex aic";

  return (
    <section id={props.id} className={"pv5-l pv4 relative "+dn} style={chatbot}>
      <div className="mw8 center ph3 w-100">
        <div className="cf">
          <div className="fl w-50 pa2 tc">
            <img src={success} style={successStyle} alt="Success"/>
          </div>
          <div className="fl w-50 pa2 tc mw500">
            <img src={successTitle} width="100%" alt="任務完成"/>
            <p className="f3-ns f6 fw5 mt2 mb3 pa0 lh-copy nowrap">快，回去找9526吧！</p>
            <a href="https://m.me/742639746135059" rel="noopener noreferrer"><div style={successBg} className="w-50-l w-90 h4-ns h3 db center cp"></div></a>
          </div>
        </div>
      </div>
    </section>
  )
}

/*01*/
function CoverVideo(props) {
  var gradient = {
    background: "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.45) 100%)"
  }
  
  var phone = null;
  var top = {
    top: '-45px'
  }

  var ship = {
    left: 0,
    right: 0,
    margin: "0 auto",
    bottom: "60px"
  }


  return (
    <section id={props.id} className="vh-100 flex aic relative z4">
      <div className="w-100 h-100 absolute z4 pn" style={gradient}></div>
      <div className="w-100 h-100 absolute top-left clipping">
      <div className="w-100 h-100 fixed fixed-content pn">
        <div className="videoBg">
          <video id="coverVideo" muted loop autoPlay playsInline poster={props.code} data-autoplay-fallback="muted" preload="auto">
            <source src={props.link} type="video/mp4"/>
          </video>
        </div>
      </div>
      </div>
      <div className="mw80 center ph4 w-100 z4 tc relative" style={top}>
        <img src={props.title} className="center mb3" height="150" alt={props.name} />
        <div className="cf white w-80-ns w-100 center ph-ns">
          <h3 className="f3-ns f5 coverVideo-tag fw4 lh-copy mb0 pre-wrap text-shadow" dangerouslySetInnerHTML={{__html:props.content}}></h3>
        </div>
      </div>
      {phone}
      <figure className="scrollship absolute w4 tc z4" style={ship}>
        <img src={scrollship} width="100" alt="請往下滑動" />
      </figure>
    </section>
  )
}

/*02*/
class Taiwan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){
    var bgStyle = {
      backgroundImage: "url("+taiwanMap+")",
      backgroundSize: "cover",
      width: "100%",
      padding: "28.125% 0",
      borderTop: this.props.primaryColor+ " .25rem solid",
      borderBottom: this.props.primaryColor+ " .25rem solid",
      marginLeft: this.state.mobile ? "0" : "2.5rem"
    }
    if (this.props.kinmen === true) {
      bgStyle.backgroundImage = "url("+kinmenMap+")";
    }
    var position = {
      left: this.props.shipPositionL,
      top: this.props.shipPositionT,
      margin: 0,
      width: "15%",
      height: "15%"
    }
    var l = this.props.text1.split("的")[0];
    var r = (l.length-2) * 15 + 60 + "px";
    var label = { 
      background: "#222222",
      color: "white",
      padding: "10px 12px",
      top: "67px",
      position: "relative",
      right: r,
      zIndex: "-1",
      whiteSpace: "nowrap",
      display: "inline-block"
    }
    return (
      <section id={this.props.id} className="flex aic bg-near-white pv5 pv6-l ph4-ns ph3 ph0-l flex-wrap">
        <div className="bg-near-white w-100 w-50-l hide">
          <div className="relative" style={bgStyle}>
            <Overlay overlayColor={this.props.primaryColor} />
            <figure className="absolute floatship" style={position}>
              {/* <label className="taiwan-label f5 tl" style={label}>{this.props.text1.split("的")[0]}</label> */}
              <img src={scrollship} alt="時光機"/>
            </figure>
          </div>
        </div>
        <div className="pt4 pa4-l pa3 w-100 w-40-l ml4-l">
          <h2 className="mh4-l f4-ns f5 fw7 lh-copy mt0 hide">{this.props.text1}</h2>
          <p className="mh4-l f5-ns f6 lh-copy mv0 mw500 hide">{this.props.text2}</p>
        </div>
        {/* <GoogleEarthLogo text={"The image is from 2018/Google Earth  Data SIO,NOAA,U.S. Navy,NGA,GEBCO Image Landsat/Copemicus"} /> */}
      </section>
    )
  }
}

function Overlay(props) {
  var style = {
    left: "0",
    top: "0",
    backgroundColor: props.overlayColor
  }
  return (
    <div className="w-100 h-100 absolute o-20" style={style}>
    </div>
  )
}

function GoogleEarthLogo(props) {
  var style = {
    backgroundImage: "url("+googleEarthLogo+")",
    backgroundSize: "100px",
    backgroundPosition: "8px center",
    backgroundRepeat: "no-repeat",
    width: "100%",
    zIndex: "5",
    fontSize: "0.8em",
    position: "absolute",
    bottom: "0",
    color: "rgba(256,256,256,0.8)",
    padding: "8px 8px 8px 120px",
    textAlign: "right"
  }
  return (
    <div style={style}>
      ​​{props.text}
    </div>
  )
}

/*03*/
class Illustration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }
  render(){
    var text2 = null;

    var h = "min-vh-150"
    var mt50vh = "cf mt50vh"
    if(this.props.number === 2) {
      h = "min-vh-200"
      if(this.state.mobile) {
        h = "";
        mt50vh = "mt0"
      }
      text2 = (
        <div className={"black "+mt50vh}>
          <div className="w-50-l mw500 mh3-l center w-100 fr-l pa4-l pa3 bg-white">
            <p className="f5-ns f6 lh-copy mv0">{this.props.text2}</p>
          </div>
        </div>
      )
    }

    if(this.state.mobile) {
      h = "";
    }

    var illustration_content_1 = this.state.mobile ? null : (
      <figure className="center mw70 w-100 ph4-ns">
        <img className="w-50-l w-100" src={this.props.illustration} alt="illustration"/>
      </figure>
    )

    var illustration_content_2 = this.state.mobile ? (
      <figure className="center mw70 w-100 ph4-ns">
        <img className="w-50-l w-100" src={this.props.illustration} alt="illustration"/>
      </figure>
    ) : null

    return (
      <section id={this.props.id} className={h+" flex aic relative pv6-l pv5"}>
        <div className="w-100 h-100 absolute top-left clipping">
          <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
            {illustration_content_1}
          </div>
        </div>
        <div className="mw70 center ph4-ns ph3 w-100 z4 pre-wrap">
          {illustration_content_2}
          <div className="cf black">
            <div className="w-50-l mw500 mh3-l center w-100 fr-l pa4-l pa3 bg-white">
              <p className="f5-ns f6 lh-copy mv0">{this.props.text1}</p>
            </div>
          </div>
          {text2}
        </div>
      </section>
    )
  }
}

/*04*/
class PhotoTextFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){

    var fullImage = {
      height: this.state.mobile && this.props.switch ? "auto" : "100vh",
      objectFit: "cover",
      width: "100%",
      objectPosition: this.state.mobile && this.props.switch ? "center center" : this.props.objectP
    }
    var bottomRight = {
      bottom: this.state.mobile ? "45px": "0",
      right: "0",
      background: "rgba(0,0,0,.2)",
      padding: this.state.mobile ? "10px" : "20px"
    }

    var bottomLeft = {
      bottom: this.state.mobile ? "45px": "0",
      left: "0",
      padding: this.state.mobile ? "10px" : "20px",
      maxWidth: "80%",
      textAlign: "left"
    }

    var bgcolor = ""
    var textcolor = ""
    if(this.props.color === "dark") {
      bgcolor = this.state.mobile && this.props.switch ? "bg-white" : "bg-black o-60";
      textcolor = this.state.mobile && this.props.switch ? "black" : "white";
    } else {
      bgcolor = "bg-white o-85";
      textcolor = "black";
    }
    var text1 = null;
    var h = "min-vh-150"
    
    var label_content = null;
    if(this.props.label !== "") {
      label_content = (<label className="white absolute lh-normal f6-ns f8 pn" style={bottomRight}>{this.props.label}</label>)
    }

    var copyright_content = null;
    if(this.props.copyright) {
      copyright_content = (<label className="white absolute f8 pn o-30" style={bottomLeft}>{this.props.copyright}</label>)
    }

    if(this.props.text1 !== "") {
      h = "min-vh-200"
      text1 = (
        <div className="cf">
          <div className={this.props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
            <div className={"w-100 h-100 absolute pn top-left "+this.props.opacity+" "+bgcolor}></div>
            <p className={"f5-ns f6 lh-copy mv0 z4 relative "+textcolor} dangerouslySetInnerHTML={{__html:this.props.text1}}></p>
          </div>
        </div>
      )
    }

    var new_image = this.props.image;
    if(this.props.switch && this.state.mobile) {
      new_image = new_image.replace('電腦版','手機版');
    }


    var text2 = null;
    var image_content = this.state.mobile && this.props.switch ? null : (<figure className="w-100 ma0">
              <img className="w-100" style={fullImage} src={new_image} alt="background"/>
            </figure>);
    var image_content2 = this.state.mobile && this.props.switch ? (<figure className="w-100 ma0">
              <img className="w-100" style={fullImage} src={new_image} alt="background"/>
            </figure>) : null;
    
    if(this.props.number === 2) {
      h = "min-vh-300"
      text2 = (
        <div className="cf mt50vh">
          <div className={this.props.position+" w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative"}>
            <div className={bgcolor+" w-100 h-100 absolute pn top-left"}></div>
            <p className={"f5-ns f6 lh-copy mv0 z4 relative "+textcolor} dangerouslySetInnerHTML={{__html:this.props.text2}}></p>
          </div>
        </div>
      )
    }

    if(this.state.mobile && this.props.switch) h = "";
    if(this.props.small) h = "min-vh-100";

    return (
      <section id={this.props.id} className={h+" flex aic relative pv6-l pv5 photoText"}>
        <div className="w-100 h-100 absolute top-left clipping">
          <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
            {image_content}
            {label_content}
            {copyright_content}
          </div>
        </div>
        <div className="mw80 center ph4-ns ph3 w-100 z4 pre-wrap">
          {image_content2}
          {text1}
          {text2}
        </div>
      </section>
    )
  }
}

class PhotoCenterTextFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){
    var fullImage = {
      height: "100vh",
      objectFit: "cover",
      width: "100%",
      objectPosition: this.props.objectP
    }
    var bottomRight = {
      bottom: this.state.mobile ? "45px": "0",
      right: "0px",
      background: "rgba(0,0,0,.2)",
      padding: this.state.mobile ? "10px" : "20px"
    }
    var max = {
      maxWidth: "800px"
    }
    var textShadow = "text-shadow f4-ns f5";
    var bgColor = "";
    var mask = "bg-dark-gray o-40";
    if(this.props.bg) {
      textShadow = "f5-ns f6";
      bgColor = "bg-black o-60";
      mask = "";
    }

    var label = this.props.label === "" ? null : (
      <label className="white absolute lh-normal z10 f6-ns f8 pn" style={bottomRight}>{this.props.label}</label>
    )
    return (
      <section id={this.props.id} className="min-vh-200 flex aic relative bg-black">
        <div className="w-100 h-100 absolute top-left clipping">
          <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
            <figure className="w-100 ma0">
              <img className="w-100" style={fullImage} src={this.props.image} alt="background"/>
            </figure>
            <div className={mask+" w-100 h-100 absolute pn top-left z4"}></div>
            {label}
          </div>
        </div>
        <div className="w-100 center ph4-ns ph3 z4 relative">
          <div className="cf flex aic">
            <div className="w-100 w-50-l center pa4-l pa3 relative" style={max}>
              <div className={bgColor+" w-100 h-100 absolute pn top-left"}></div>
              <p className={"pre-wrap lh-copy mv0 z4 relative white "+textShadow}>{this.props.text1}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

/*05*/
class PhotoText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){
    var photo, text = "";
    var color1 = "bg-white"
    var color2 = "bg-near-white";
    if(this.props.color === "invert") {
      color1 = "bg-near-white";
      color2 = "bg-white";
    }
    if(this.props.order === "right") {
      text = "fr-l"
    } else {
      photo = "fr-l"
    }
    var h = "min-vh-150";
    if(this.props.multiple) {
      h = "";
    }
    
    var fish = null;
    var info = this.props.info === undefined ? null : (
      <p className="w-50-l w-100 f6-ns f7 fw5 tc o-50 lh-normal">{this.props.info}</p>
    )


    if(this.props.fish) {
      info = (
        <p className="w-50-l w-100 f6 fw7 tc">資料來源：環保署統計年報</p>
      )
      fish = (
        <div className="absolute z4">
          <Controller>
            <Scene
              triggerElement="#triggerText"
              duration={1600}
              pin={false}
            >
            {(progress) => (
              <Tween
                from={{
                  css: {
                    top: '-300px',
                    left: '100vw',
                    rotation: -10,
                  }
                }}
                to={{
                  css: {
                    top: '-200px',
                    left: '-500px',
                    rotation: 10,
                  }
                }}
                totalProgress={progress}
                paused
              >
                <img className="relative" id="fish1" src={fish1} height="90" alt="fish"/>
              </Tween>
            )}        
            </Scene>
            <Scene
              triggerElement="#triggerText"
              duration={1800}
              pin={false}
            >
            {(progress) => (
              <Tween
                from={{
                  css: {
                    top: '0px',
                    left: '100vw',
                    rotation: -10,
                  }
                }}
                to={{
                  css: {
                    top: '100px',
                    left: '-500px',
                    rotation: 10,
                  }
                }}
                totalProgress={progress}
                paused
              >
                <img className="relative" id="fish2" src={fish2} height="90" alt="fish"/>
              </Tween>
            )}        
            </Scene>
            <Scene
              triggerElement="#triggerText"
              duration={1400}
              pin={false}
            >
            {(progress) => (
              <Tween
                from={{
                  css: {
                    top: '-200px',
                    left: '100vw',
                    rotation: -10,
                  }
                }}
                to={{
                  css: {
                    top: '-100px',
                    left: '-500px',
                    rotation: 10,
                  }
                }}
                totalProgress={progress}
                paused
              >
                <img className="relative" id="fish3" src={fish3} height="90" alt="fish"/>
              </Tween>
            )}        
            </Scene>
            <Scene
              triggerElement="#triggerText"
              duration={1400}
              pin={false}
            >
            {(progress) => (
              <Tween
                from={{
                  css: {
                    top: '400px',
                    left: '-1500px',
                    rotation: -10,
                    scaleX: -1
                  }
                }}
                to={{
                  css: {
                    top: '0px',
                    left: '100vw',
                    rotation: 10,
                    scaleX: -1
                  }
                }}
                totalProgress={progress}
                paused
              >
                <img className="relative" id="fish4" src={fish4} height="90" alt="fish"/>
              </Tween>
            )}        
            </Scene>
            <Scene
              triggerElement="#triggerText"
              duration={1000}
              pin={false}
            >
            {(progress) => (
              <Tween
                from={{
                  css: {
                    top: '200px',
                    left: '-1500px',
                    rotation: -10,
                    scaleX: -1
                  }
                }}
                to={{
                  css: {
                    top: '-200px',
                    left: '100vw',
                    rotation: 10,
                    scaleX: -1
                  }
                }}
                totalProgress={progress}
                paused
              >
                <img className="relative" id="fish5" src={fish5} height="90" alt="fish"/>
              </Tween>
            )}        
            </Scene>
          </Controller>
        </div>
      )
    }

    var large = ""
    var obj = null;
    var mw70 = "mw70"
    var pa3 = "pa3"
    if(this.props.large) {
      large = "h-100"
      mw70 = ""
      pa3 = ""
      obj = {
        objectFit: "cover"
      }
    }

    var copyrightStyle = {
      bottom: "0",
      left: this.state.mobile ? "0": "50%",
      padding: this.state.mobile ? "10px" : "20px",
      maxWidth: this.state.mobile ? "100%" : "80%",
      textAlign: "left"
    }

    var copyright_content = null;
    if(this.props.copyright) {
      copyright_content = (<label className="white absolute f8 pn o-30" style={copyrightStyle}>{this.props.copyright}</label>)
    }

    var photo_content_1 = this.state.mobile ? null : (
      <figure className={"center w-100 o-90 o-100-ns relative "+mw70+" "+large}>
        {copyright_content}
        <img className={"w-50-l w-100 "+photo+" "+large} src={this.props.image} alt="description" style={obj}/>
        {info}
      </figure>
    )

    var bgwhite = "bg-white";
    if(this.props.noWhite) bgwhite = "";

    var photo_content_2 = this.state.mobile ? (
      <figure className={"center mw70 w-100 o-90 relative "+pa3+" "+bgwhite}>
        {copyright_content}
        <img className={"w-50-l w-100 "+photo} src={this.props.image} alt="description"/>
        {info}
      </figure>
    ) : null

    if(this.state.mobile) h = "";
    var bgImg = null;
    if(this.props.bg !== undefined) {
      color1 = null;
      h = "min-vh-150";
      bgImg = {
        background: "url("+this.props.bg+")",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
        backgroundColor: "transparent"
      }
    }

    var photo_text = this.props.text === undefined ? null : (
            <div className={"w-50-l mw500 mh3-l center w-100 o-90 pa4-l pa3 bg-white "+text}>
              <p className="f5-ns f6 lh-copy mv0" dangerouslySetInnerHTML={{__html:this.props.text}}></p>
            </div>
    )

    return (
      <section id={this.props.id} className={h+" flex aic relative pv6-l pv5 photoText"}>
        <div className="w-100 h-100 absolute top-left clipping">
          <div className={color1+" w-100 h-100 fixed fixed-content pn flex aic"} style={bgImg}>
            {fish}
            {photo_content_1}
          </div>
        </div>
        <div className="mw70 center ph4-ns ph3 w-100 z4 pre-wrap" id="triggerText">
          <div className="cf black">
            {photo_content_2}
            {photo_text}
          </div>
        </div>
      </section>
    )
  }
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

  var p = "pb6-l pb5";
  if(props.top) {
    p = "pt6-l pt5";
  }

  return (
    <section id={props.id} className={h+" flex aic relative "+p+" "+color1}>
      <div className="mw80 w-100 center ph4-ns ph3 z4 relative">
        <div className="cf flex aic flex-column-s">
          <div className={"w-100 w-50-l ph2 pv3 relative "+photo}>
            <figure className="center mw70 w-100">
              <img className="w-100" src={props.image} alt="description"/>
            </figure>
            <p className="f7 o-50 tc">{props.label}</p>
          </div>
          <div className={"w-100 w-50-l mw500 center ml5-l ph2 pv3 "+color1+" "+text}>
            <p className="pre-wrap f5-ns f6 lh-copy mv0 z4 relative black">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*05-1*/
function MapText(props) {
  return (
    <section id={props.id} className="min-vh-150 flex aic relative">
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
            <p className="f5-ns f6 lh-copy mv0">{props.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

/*06*/
class PhotoSwitch extends Component {
  componentDidMount(){
    var $this = this;
    var $t = $('#'+$this.props.id);

    $(document).ready(function(){
      $(window).scroll(function(){
        if($t.length !== 0) {
          var top_of_object = $t.offset().top;
          var bottom_of_object = $t.offset().top + $t.height();
          var top_of_window = $(window).scrollTop(); 
          var bottom_of_window = $(window).scrollTop()+ $(window).height(); 
          
          if(bottom_of_window > top_of_object && top_of_window < bottom_of_object ){
            $t.addClass('z2');
          } else {
            $t.removeClass('z2');
          }
        }
      });
    });
  }
  render(){
    var list = this.props.images;
    var title = this.props.label;
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
    if(this.props.text1 !== "") {
      h = "min-vh-200"
      text1 = (
        <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative "+this.props.position}>
          <div className="w-100 h-100 absolute bg-black o-60 top-left"></div>
          <p className="f5-ns f6 lh-copy mv0 relative z4">{this.props.text1}</p>
        </div>
      )
    }
    var text2 = null;
    if(this.props.number === 2) {
      h = "min-vh-300"
      text2 = (
        <div className="cf white mt50vh">
          <div className={"w-50-l mw500 mh3-l center w-100 pa4-l pa3 relative "+this.props.position}>
            <div className="w-100 h-100 absolute bg-black o-60 top-left"></div>
            <p className="f5-ns f6 lh-copy mv0 relative z4">{this.props.text2}</p>
          </div>
        </div>
      )
    }
    return (
      <section id={this.props.id} className={h+" flex aic w-100 relative bvh photoSwitch "+this.props.z}>
        <div className="w-100 h-100 absolute top-left clipping">
          <div className="w-100 h-100 fixed fixed-content">
            <ImageGallery items={images} showFullscreenButton={false} showThumbnails={false} showPlayButton={false} autoPlay={true} showBullets={true} slideInterval={9000}/>
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
}

/*07*/
class PhotoMultiple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){

    let grid = [];
    var columns = "";
    var hint = this.state.mobile ? (<p className='f6 o-50 tc mt4'>{"◂◂ 往左滑看更多"}</p>) : null;

    var height = {
      height: this.state.mobile ? "466px" : "640px"
    }

    var w = this.state.mobile ? "300px" : "500px";

    for (var i = 0; i < this.props.images.length; i++){
      var item = {
        width: w,
        height: this.state.mobile ? "200px" : "320px",
        backgroundImage: "url("+this.props.images[i]+")",
        backgroundSize: "cover",
        backgroundPosition: "center center"
      }
      var bottomRight = {
        bottom: "0px",
        right: "0px",
        background: "rgba(0,0,0,.2)",
        padding: this.state.mobile ? "10px" :" 20px"
      }
      
      var label_content = (<label className="white absolute lh-normal z10 f6-l f8 pn" style={bottomRight}>{this.props.label[i]}</label>);


      var photos = (
        <div className="grid-item bg-gray relative cp" alt={this.props.label[i]} style={item} key={i} onClick={(e) => this.props.onOpenModal(e.target.style.backgroundImage.split('"')[1], e.target.getAttribute("alt"))}>
          {label_content}
        </div>
      )
      if(i%2 === 0) columns+=(w+" ");
      grid.push(photos);
    }

    var container = {
      gridTemplateColumns: columns,
      height: this.state.mobile ? "440px" : "680px",
      paddingBottom: "40px"
    }
    
    var auto = this.props.second === "auto-scroll-2" ? this.props.second : "auto-scroll" 
    if(this.state.mobile) auto = "";

    var title = null;
    if(this.props.title !== undefined) {
        title = (
          <p className='f3-ns f5 fw7 ph3 tracked mb0 lh-normal hide tc'>{this.props.title}</p>
        )
    }

    return (
      <section id={this.props.id} className={"flex aic relative bg-white flex-column pt6-l pt5 "+auto}>      
        <div className="mw80 center cf black mb5-ns mb3 ph4-ns ph3 w-100">
          <div className="mw7 w-100 center bg-white pre-wrap hide">
            <p className="f5-ns f6 lh-copy mv0 ph4-l ph3" dangerouslySetInnerHTML={{__html:this.props.text}}></p>
            {title}
          </div>
        </div>
        <div className="w-100 overflow-hidden hide" style={height}>
         {hint}
         <div className="grid-container nowrap dragscroll hide" style={container}>
            {grid}
          </div> 
        </div>
      </section>
    )
  }
}

/*08*/
class PhotoContrast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  componentDidMount(){
    var $this = this;
    $(document).ready(function(){
      $(window).scroll(function(){
        if(!$this.state.active) {
          $this.setState({active:true});
        }
      });
    });

  }
  render() {
    let text = null;
    if(this.props.text !== "") {
      text = (
        <div className="mw80 center cf black mb5 ph4-ns ph3 hide">
          <div className="mw7 w-100 center pre-wrap">
            <p className="f5-ns f6 lh-copy mv0 ph4-l ph3" dangerouslySetInnerHTML={{__html:this.props.text}}></p>
          </div>
        </div>
      )
    }
    let label = null
    if(this.props.label !== "") {
      label = (
        <label className="f7-ns f8 mt3 o-50 lh-normal mh2" >{this.props.label}</label>
      )
    }
    var contrastStyle = {
      maxWidth: '1024px', 
      margin: '0 auto'
    }

    var contrastComponent = this.state.active ? (
      <ReactCompareImage
        leftImage={this.props.images[0]}
        rightImage={this.props.images[1]}
        sliderLineWidth={2}
        handleSize={40}
        autoReloadSpan={100}
        sliderPositionPercentage={0.8}
      />
    ) : null;

    return (
      <section id={this.props.id} className={"flex aic relative flex-column pv6-l pv5 "+this.props.bg}>
          <div className="w-100 z4">
            {text}
            <div className="photoContrast relative tc hide" style={contrastStyle}>
              {contrastComponent}         
              {label}
              {/*<span className="mt3 right-20 absolute white top f3 fw5" data-type="original">{this.props.year[1]}</span>
              <span className="mt3 left-20 absolute white top f3 fw5" data-type="modified">{this.props.year[0]}</span>*/}
            </div>
          </div>
      </section>
    )
  }
}

/*09*/
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      mobile: false
    };
  }

  componentDidMount(){
    var $this = this;
    var $t = $('#'+$this.props.id);
    var mh = $t.css('min-height');

    function checkMobile() {
      if($(window).width() <= 959) {
        $this.setState({mobile:true});
        $t.css('min-height', 'auto');
      }
      else {
        $this.setState({mobile:false});
        $t.css('min-height', mh);
      }
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    $(window).scroll(function(){
      if($t.length !== 0) {
        var top_of_object = $t.offset().top;
        var bottom_of_object = $t.offset().top + $t.height();
        var top_of_window = $(window).scrollTop(); 
        var bottom_of_window = $(window).scrollTop()+ $(window).height(); 
        
        if(bottom_of_window + 640 > top_of_object && top_of_window < bottom_of_object) {
          if(!$this.state.active) {
            $this.setState({active:true});
          }
        }

        if(bottom_of_window > top_of_object && top_of_window < bottom_of_object ){
          if($t.find('video').get(0).paused) {
            if($t.find('video').hasClass('clicked')) ;
            else {
              $t.find('video').get(0).play();
              $t.find('.play').removeClass('pause');
            }
          }
        } else {
          var vid = document.getElementById('video'+$this.props.videoID);
          if(vid !== null) {
            if(vid.readyState === 4 ) {
              if(!$t.find('video').get(0).paused) {
                $t.find('video').get(0).pause();
                $t.find('.play').addClass('pause');
              }
            }
          }
        }
      }
    });
    });
  }

  render() {
    var $this = this;
    function playVideo(e) {
      var $video = $('#video'+$this.props.videoID);
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
      var $video = $('#video'+$this.props.videoID);
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
    if(this.props.color === "dark") {
      bgcolor = "bg-black o-60";
      textcolor = "white";
    } else {
      bgcolor = "bg-white o-85";
      textcolor = "black";
    }

    var cf="cf"

    if(this.props.text1 !== "") {
      h = "min-vh-200"
      if($this.state.mobile) {
        bgcolor = "transparent";
        textcolor = "black";
        cf="";
      }
      text1 = (
          <div className={cf}>
            <div className={this.props.position+" w-50-l mw500 mh3-l mh3-l center w-100 pa4-l relative mt0-l mt2"}>
              <div className={bgcolor+" w-100 h-100 absolute pn top-left z1"}></div>
              <p className={"pre-wrap f5-ns f6 lh-copy mv0 z4 relative ph0-l ph3 "+textcolor}>{this.props.text1}</p>
            </div>
          </div>
        
      )
    }

    var text2 = null;
    var mt50vh = "mt50vh";
    if(this.props.number === 2) {
      h = "min-vh-300"
      if($this.state.mobile) {
        bgcolor = "transparent";
        textcolor = "black";
        mt50vh = "";
        cf="";
      }
      text2 = (
        <div className={cf+" "+mt50vh}>
          <div className={this.props.position+" w-50-l mw500 mh3-l center w-100 pa4-l relative mt0-l mt4"}>
            <div className={bgcolor+" w-100 h-100 absolute pn top-left z1"}></div>
            <p className={"pre-wrap f5-ns f6 lh-copy mv0 z4 relative ph0-l ph3 "+textcolor}>{this.props.text2}</p>
          </div>
        </div>
      )
    }

    var loadingStyle = {
      textAlign: "center",
      position: "absolute",
      left: 0,
      right: 0,
      top: "20%",
      margin: "auto",
      width: "200px",
      color: "#f4f4f4"
    }

    var ship = {
      backgroundImage: "url("+scrollship+")",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: "60px",
      width: "60px",
      position: "absolute",
      left: 0,
      right: 0,
      marginLeft: "0"
    }
    
    var unmuteTag = "";
    var $video = $('#video'+this.props.videoID);
    var video = this.state.active ? (
      <div className="videoBg">
        <div style={loadingStyle}>
          <div className="dib floatship" style={ship}></div>
          <p className="dib white ml4">
            Loading...
          </p>
        </div>
        <video id={'video'+this.props.videoID} loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
        </video>
      </div>
    ) : (
      <div className="videoBg">
        <video className="emptyVideo" id={'video'+this.props.videoID} loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
        </video>
      </div>
    )
    if(this.props.sound) {
      unmuteTag = "unmute";
      video = this.state.active ? (
        <div className="videoBg">
          <div style={loadingStyle}>
            <div className="dib floatship" style={ship}></div>
            <p className="dib white ml4">
              Loading...
            </p>
          </div>
          <video id={'video'+this.props.videoID} loop playsInline autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
            <source src={this.props.link} type="video/mp4"/>
          </video>
        </div>
      ) : (
        <div className="videoBg">
          <video className="emptyVideo" id={'video'+this.props.videoID} loop playsInline autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          </video>
        </div>
      )
    }

    var playButton = this.props.playing ? (<div className="fixed play cp z10" onClick={(e) => playVideo(e)}></div>) : null

    var video_content = (
        <div className="w-100 h-100 absolute top-left clipping">
          {playButton}
          <div className={unmuteTag+" fixed sound cp z10"} onClick={(e) => soundVideo(e)}></div>
          <div className="w-100 h-100 fixed fixed-content pn">
            {video}
          </div>
        </div>
    )

    var text_content = (
        <div className="mw80 center ph4-ns ph3 w-100 z4 pre-wrap">
          {text1}
          {text2}
        </div>
    )

    if($this.state.mobile) {
      h = "pv5 bg-near-white";
      var mb4 = ""
      if(this.props.text1 !== "") mb4 = "mb4"
      if(this.props.order) mb4 = "mt4"
      video_content = this.state.active ? (
        <div className={"z4 relative cf flex aic jcc w-100 flex-column " + mb4}>
          <div className="center relative w-100">
            <video className="w-100" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
              <source src={this.props.link} type="video/mp4"/>
            </video>
          </div>
        </div>
      ) : (
        <div className={"z4 relative cf flex aic jcc w-100 flex-column " + mb4}>
          <div className="center relative w-100">
            <video className="w-100 emptyVideo" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
            </video>
          </div>
        </div>
      );
    }
    
    var all = (
      <div className="w-100">
        {video_content}
        {text_content}
      </div>
    )
    if(this.props.order) {
      all = (
        <div className="w-100">          
          {text_content}
          {video_content}
        </div>
      )
    }

    return (
      <section id={this.props.id} className={h+" flex aic flex-column-s relative video-content full-video bg-black"} data-active="false">
        {all}
      </section>
    )
  }
}

/*09-1*/
class SmallVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount(){
    var $this = this;
    var $t = $('#'+$this.props.id);
    $(document).ready(function(){
    $(window).scroll(function(){
      if($t.length !== 0) {
        var top_of_object = $t.offset().top;
        var bottom_of_object = $t.offset().top + $t.height();
        var top_of_window = $(window).scrollTop(); 
        var bottom_of_window = $(window).scrollTop()+ $(window).height(); 
          
        if(bottom_of_window + 640 > top_of_object && top_of_window < bottom_of_object) {
          if(!$this.state.active) {
            $this.setState({active:true});
          }
        }

        if(bottom_of_window > top_of_object && top_of_window < bottom_of_object ){
          if($t.find('video').get(0).paused) {
            if($t.find('video').hasClass('clicked')) ;
            else {
              $t.find('video').get(0).play();
              $t.find('.play').removeClass('pause');
            }
          }
        } else {
          var vid = document.getElementById('video'+$this.props.videoID);
          if(vid !== null) {
            if(vid.readyState === 4 ) {
              if(!$t.find('video').get(0).paused) {
                $t.find('video').get(0).pause();
                $t.find('.play').addClass('pause');
              }
            }
          }
        }
      }
    });
    });
  }

  render(){
    var $this = this;
    var video_content = null;

    if(this.state.active) {
      video_content = this.state.sound ? (
        <video className="w-100" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
        </video>
      ) : (
        <video className="w-100" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
        </video>
      )
      
    }
    else {
      video_content = (
        <video className="w-100 emptyVideo" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
        </video>
      )
    }

    var content_all = this.props.reverse ?  (
      <div className="cf flex aic flex-column-s">
        <div className="fl-l w-100 w-50-l ml5-l ph4-ns ph3 pv3 hide">
          <p className="center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black mt0-ns mt4 ph4-l ph3">{this.props.text}</p>
        </div>
        <div className="fr-l w-100 w-50-l pl25-l pv3 relative hide">
          {video_content}
        </div>
      </div>
    ) : (
      <div className="cf flex aic flex-column-s">
        <div className="fl-l w-100 w-50-l pl25-l pv3 relative hide">
          {video_content}
        </div>
        <div className="fr-l w-100 w-50-l ml5-l ph4-ns ph3 pv3 hide">
          <p className="center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black mt0-ns mt4 ph4-l ph3">{this.props.text}</p>
        </div>
      </div>
    )

    return (
      <section id={this.props.id} className={"flex aic relative pv6-l pv5 video-content smallVideo "+this.props.bg}>
        <div className="mw80 w-100 center z4 relative">
          {content_all}
        </div>
      </section>
    )
  }
}

/*09-2*/
class CenterVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  componentDidMount(){
    var $this = this;
    var $t = $('#'+$this.props.id);
    $(document).ready(function(){
    $(window).scroll(function(){
      if($t.length !== 0) {
        var top_of_object = $t.offset().top;
        var bottom_of_object = $t.offset().top + $t.height();
        var top_of_window = $(window).scrollTop(); 
        var bottom_of_window = $(window).scrollTop()+ $(window).height(); 
          
        if(bottom_of_window + 640 > top_of_object && top_of_window < bottom_of_object) {
          if(!$this.state.active) {
            $this.setState({active:true});
          }
        }

        if(bottom_of_window > top_of_object && top_of_window < bottom_of_object ){
          if($t.find('video').get(0).paused) {
            if($t.find('video').hasClass('clicked')) ;
            else {
              $t.find('video').get(0).play();
              $t.find('.play').removeClass('pause');
            }
          }
        } else {
          var vid = document.getElementById('video'+$this.props.videoID);
          if(vid !== null) {
            if(vid.readyState === 4 ) {
              if(!$t.find('video').get(0).paused) {
                $t.find('video').get(0).pause();
                $t.find('.play').addClass('pause');
              }
            }
          }
        }
      }
    });
    });
  }

  render(){
    var $this = this;
    function playVideo(e) {
      var $video = $('#video'+$this.props.videoID);
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
      var $video = $('#video'+$this.props.videoID);
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
    var textShadow = "text-shadow f4-ns f5";
    var bgColor = "";
    var mask = "bg-dark-gray o-40";
    if(this.props.bg) {
      textShadow = "f5-ns f6";
      bgColor = "bg-black o-60";
      mask = "";
    }

    var loadingStyle = {
      textAlign: "center",
      position: "absolute",
      left: 0,
      right: 0,
      top: "20%",
      margin: "auto",
      width: "200px",
      color: "#f4f4f4"
    }

    var ship = {
      backgroundImage: "url("+scrollship+")",
      backgroundSize: "contain",
      backgroundRepeat: "no-repeat",
      height: "60px",
      width: "60px",
      position: "absolute",
      left: 0,
      right: 0,
      marginLeft: "0"
    }

    var unmuteTag = "";
    var $video = $('#video'+this.props.videoID);
    var video = this.state.active ? (
      <div className="videoBg">
        <div style={loadingStyle}>
          <div className="dib floatship" style={ship}></div>
          <p className="dib white ml4">
            Loading...
          </p>
        </div>
        <video id={'video'+this.props.videoID} loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
        </video>
      </div>
    ) : (
      <div className="videoBg">
        <video className="emptyVideo" id={'video'+this.props.videoID} loop playsInline muted autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
        </video>
      </div>
    );
    if(this.props.sound) {
      unmuteTag = "unmute";
      video = this.state.active ? (
        <div className="videoBg">
          <div style={loadingStyle}>
            <div className="dib floatship" style={ship}></div>
            <p className="dib white ml4">
              Loading...
            </p>
          </div>
          <video id={'video'+this.props.videoID} loop playsInline autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
            <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
          </video>
        </div>
      ) : (
        <div className="videoBg">
          <video className="emptyVideo" id={'video'+this.props.videoID} loop playsInline autoPlay data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          </video>
        </div>
      );
    }

    return (
      <section id={this.props.id} className="min-vh-150 flex aic relative pv6-l pv5 video-content z4 bg-black">
        <div className="w-100 h-100 absolute top-left clipping">
          <div className={mask+" w-100 h-100 absolute pn top-left z4"}></div>
          {/*<div className="fixed play cp z10" onClick={(e) => playVideo(e)}></div>*/}
          <div className={unmuteTag+" fixed sound cp z10"} onClick={(e) => soundVideo(e)}></div>
          <div className="w-100 h-100 fixed fixed-content pn">
            {video}
          </div>
        </div>
        <div className="w-100 center ph4-ns ph3 z4 relative">
          <div className="cf flex aic">
            <div className="w-100 w-50-l center pa4-l pa3 relative" style={max}>
              <div className={bgColor+" w-100 h-100 absolute pn top-left"}></div>
              <p className={"pre-wrap f4 lh-copy mv0 z4 relative white "+textShadow}>{this.props.text1}</p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

/*09-2*/
class CenterSmallVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }

  componentDidMount(){
    var $this = this;
    var $t = $('#'+$this.props.id);
    $(document).ready(function(){
    $(window).scroll(function(){
      if($t.length !== 0) {
        var top_of_object = $t.offset().top;
        var bottom_of_object = $t.offset().top + $t.height();
        var top_of_window = $(window).scrollTop(); 
        var bottom_of_window = $(window).scrollTop()+ $(window).height(); 
          
        if(bottom_of_window + 640 > top_of_object && top_of_window < bottom_of_object) {
          if(!$this.state.active) {
            $this.setState({active:true});
          }
        }

        if(bottom_of_window > top_of_object && top_of_window < bottom_of_object ){
          if($t.find('video').get(0).paused) {
            if($t.find('video').hasClass('clicked')) ;
            else {
              $t.find('video').get(0).play();
              $t.find('.play').removeClass('pause');
            }
          }
        } else {
          var vid = document.getElementById('video'+$this.props.videoID);
          if(vid !== null) {
            if(vid.readyState === 4 ) {
              if(!$t.find('video').get(0).paused) {
                $t.find('video').get(0).pause();
                $t.find('.play').addClass('pause');
              }
            }
          }
        }
      }
    });
    });
  }

  render(){
    var $this = this;
    var max = {
      maxWidth: "800px"
    }
    var top = {
      top: "40px"
    }
    var color = "bg-white";
    if(this.props.color === "invert") color = "bg-near-white"

    let text = null;
    if(this.props.text !== "") {
      text = (
        <div className="mw80 center black mb5-ns mb4 pre-wrap ph4-ns ph3">
          <div className="mw7 w-100 center ph4-l ph3 pv3 hide">
            <p className={"f5-ns f6 lh-copy mv0 "+this.props.align}>{this.props.text}</p>
          </div>
        </div>
      )
    }

    var video_content = null;

    if(this.state.active) {
      video_content = this.state.sound ? (
        <video className="w-100" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline autoPlay style={max} data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
        </video>
      ) : (
        <video className="w-100" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline muted autoPlay style={max} data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
          <source src={this.props.link+'#t=0.1'} type="video/mp4"/>
        </video>
      )
      
    }
    else {
      video_content = (
        <video className="w-100 emptyVideo" id={'video'+this.props.videoID} controls controlsList="nodownload" loop playsInline muted autoPlay style={max} data-autoplay-fallback="muted" preload="auto" poster={placeholder}>
        </video>
      )
    }

    return (
      <section id={this.props.id} className={"flex aic relative pv6-l pv5 video-content "+color}>
        <div className="w-100 center z4 relative">
          {text}
          <div className="cf flex aic jcc w-100 flex-column pv3">
            <div className="center relative w-100 tc hide">
              {video_content}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

/*10*/
class EndingVideo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }

  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }
  render() {
    var machineStyle = {
      bottom: "-3px",
      width: this.state.mobile ? "270px": "90vw",
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
      <section id={this.props.id} className="flex aic relative bg-white pv6-l pv5 overflow-y-hidden">
        <div className="center ph3-ns ph0 z4 relative mb5rem">
          <div className="f7 f6-ns cf tc black w-60-l w-80-m w-100 center pv2 ph2 ph4-ns bg-white mb2 hide">
            <h3 className="lh-copy">{this.props.text}</h3>
          </div>
          <div className="bg-white pa5-ns pa0 pb6-ns pb4 hide" style={bgTV}>
            <iframe className="iframe" title="playlist" width="100%" height="315" src={this.props.link} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
          </div>
        </div>
        <img className="absolute absolute-center hide" style={machineStyle} width="400px" src={timemachinehand} alt="timemachine"/>
      </section>
    )
  }
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
    <section id={props.id} className="flex aic relative bg-white pv6-l pv5">
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
              <p className="f5-ns f6 lh-copy mv4">{props.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/*13*/
class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      narrow: false,
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
      if($(window).width() <= 1600) $this.setState({narrow:true});
      else $this.setState({narrow:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){
    var special = this.props.special;
    let grid = [];
    var columns = "";
    var crab = special ? "crab" : "";

    var thisH = this.props.height; //560

    var ths = thisH+"px";
    if(this.state.mobile) ths = "calc("+(thisH-320)+"px + 60vw";
    if(special) ths = "600px";

    var scrollingAreaStyle = {
      height: (special&&this.state.mobile) ? "170vw" : ths,
      backgroundColor: (special) ? "#F4F4F4" : "transparent",
      borderTop: (special) ? "#F4F4F4 20px solid" : "none",
      borderBottom: (special) ? "#F4F4F4 20px solid" : "none",
      marginBottom: (special) ? "4rem" : "0"
    }
    var w = ""
    var h = ""
    if (!special) {
      if(this.state.mobile) {
        w = "90vw";
        h = "60vw";
      } else {
        w = "480px";
        h = "320px";
      }
    } else {
      if(this.state.mobile) {
        w = "90vw";
        h = "158vw";
      } else {
        w = "320px";
        h = "560px";
      }
    }

    var bgColor = this.props.bg !== undefined ? this.props.bg : "bg-white";

    for (var i = 0; i < this.props.images.length; i++){
      var photoGridStyle = {
        width: w,
        height: h,
        backgroundImage: "url("+this.props.images[i]+")",
        backgroundSize: special ? "contain" : "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center"
      }
      var textGridStyle = {
        height: (thisH-320)+"px",
        maxWidth: "440px",
        whiteSpace: "normal"
      }

      var boxColor = ""
      if(this.props.noImg) {
        bgColor="";
        boxColor="bg-white";
      }

      var y = (<p className={"f5-ns f6 fw6 lh-copy mb2 mt0 dib z4 relative pr2 "+bgColor}>{"• "+this.props.year[i]}</p>);
      if(this.props.noY) y = null;

      var text_content = special ? null : (
        <div style={textGridStyle} className={"pa4 center "+boxColor}>
            
              {y}
            
            <p className="f6 lh-copy mv0">
              {this.props.text[i]}
            </p>
          </div>
      )

      var photoGrid = this.props.noImg ? null : (
        <div style={photoGridStyle}></div>
      )

      var photos = (
        <div className="grid-item relative z4" key={i}>
          {photoGrid}
          {text_content}
        </div>
      )
      columns+=(w+" ");
      grid.push(photos);
    }

    var th = (thisH+40)+"px";
    if(this.state.mobile) th = "calc("+(thisH-280)+"px + 60vw";

    var container = {
      gridTemplateColumns: columns,
      gridGap: "10px",
      height: (special&&this.state.mobile) ? "158vw" : th,
      paddingBottom: (special&&this.state.mobile) ? "0" : "40px",
      overflowY: "hidden"
    }

    var line = special ? null : {
      top: this.state.mobile ? "57.5vw": "369px",
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: "rgb(0, 0, 0)",
      opacity: 0.1,
      zIndex: 0,
      transform: this.state.mobile ? "translateY(54px)" : ""
    }

    if(this.props.noImg) {
      line = {
        top: this.state.mobile ? "1px": "56px",
        left: 0,
        width: "100%",
        height: "2px",
        backgroundColor: "rgb(0, 0, 0)",
        opacity: 0.1,
        zIndex: 0,
        transform: this.state.mobile ? "translateY(54px)" : ""
      }
    }

    var max = {
      maxWidth: "880px"
    }
    var content = null;
    var jcc = null;
    if(this.props.noY) {
      line = null;
      
      if(this.state.narrow) jcc = "";
      else jcc = "jcc"

    }

    if(this.props.content !== null) {
      if(this.props.content === "") content = null;
      else content = this.props.contentTitle ? (<p className='f3-ns f5 fw7 ph3 tracked mb5-ns mb3 lh-normal' style={max} dangerouslySetInnerHTML={{__html:this.props.content}}></p>) :
      (<p className="lh-copy f5-ns f6 center pre-wrap ph4-ns ph3 mb5-ns mb3" style={max} dangerouslySetInnerHTML={{__html:this.props.content}}></p>);
    }

    var padding = special || this.props.noImg || this.props.noY ? "pt6-l pt5" : "pv6-l pv5 min-vh-100";
    var scrollLeft = (<div className="ma0 pa0 hide"><p className='f6 o-50 tc mt4'>{"◂◂ 往左滑看更多"}</p></div>)
    if(!this.state.mobile && this.props.images.length < 5) scrollLeft = null;
    
    bgColor = this.props.bg !== undefined ? this.props.bg : "bg-white";
    
    var scrollTitle = null;
    if(this.props.scrollTitle !== undefined) {
        scrollTitle = (
          <p className='f3-ns f5 fw7 ph3 tracked mb0 lh-normal hide'>{this.props.scrollTitle}</p>
        )
    }

    return (
      <section id={this.props.id} className={bgColor+" flex aic relative flex-column "+padding}>      
        <div className="ma0 ph3 hide">
          {content}
        </div>
        {scrollTitle}
        {scrollLeft}
        <div className={"w-100 overflow-hidden relative hide"} style={scrollingAreaStyle}>
          <div className="absolute line" style={line}></div>
          <div className={"grid-container nowrap dragscroll relative ph5-l ph0 "+crab+" "+jcc} style={container}>
            {grid}
          </div> 
        </div>
      </section>
    )
  }
}

class Music extends Component {
  state = {
    play: false
  }
  
  audio = new Audio(this.props.url)
  togglePlay = () => {
    this.setState({ play: !this.state.play }, () => {
      this.state.play ? this.audio.play() : this.audio.pause();
    });
  }
  render() {
    var stateP = !this.state.play ? 'pause':''
    var $t = this;
    var max = {
      width: "200px"
    }

    $t.audio.addEventListener("ended",function() {
      $t.setState({play:false});
    })

    return (
      <div className="ph4-l ph3 mt3">
        <div className="cp br2 ph3 pv2 tc b--black-30 ba flex aic" onClick={this.togglePlay} style={max}>
          <div className={"pn z10 dib play mr3 "+ stateP}></div>
          {this.state.play ? '暫停錄音檔' : '播放錄音檔'}
        </div>
      </div>
    );
  }
}

function PhotoAudioPlay(props) {
  var max = {
    maxWidth: "880px"
  }

  function content(i) {
    var thisID = "play-"+i;

    return (
      <div className="cf flex aic flex-column-s">
        <div className="fl-l w-100 w-50-l pl25-l pv3 relative hide">
          <img className="mt4 mt0-l" src={props.image[i]} alt={props.name[i]}/>
        </div>
        <div className="fr-l w-100 w-50-l ml5-l ph4-ns ph3 pv3 hide">
          <p className="center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black mt0-ns mt4 ph4-l ph3 fw7">{props.name[i]}</p>
          <p className="center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black mt0-ns mt4 ph4-l ph3">{props.text[i]}</p>
          <Music url={props.audio[i]}/>
        </div>
      </div>
    )
  }
  var content_all = [];
  for(var i = 0; i < props.image.length; i++) {
    content_all.push(content(i));
  }

  return (
    <section id={props.id} className={props.bg+" flex aic relative flex-column pv6-l pv5"}>      
      <div className="ma0 ph3 hide">
        <p className="lh-copy f5-ns f6 center pre-wrap ph4-ns ph3 mb5-ns mb3" style={max} dangerouslySetInnerHTML={{__html: props.content}}></p>
      </div>
      <div className="mw80 w-100 center z4 relative">
        {content_all}
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
          <p className="pre-wrap f5-ns f6 lh-copy mv0 z4 relative black">
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
    <section id={props.id} className="min-vh-100 flex aic relative bg-white flex-column dragscroll-content">      
      <div className="w-100 overflow-hidden relative" style={height}>
        <div className="grid-container nowrap relative ph0" style={container}>
          {grid}
        </div> 
      </div>
    </section>
  )
}

function Transition(props) {
  var objectFit = {
    objectFit: "cover",
    maxWidth: "24rem"
  }
  var img = null;
  var fontSize = "f5-ns f6";
  if(props.illustration !== undefined) {
    img = (
      <div className="overflow-hidden hide">
        <img src={props.illustration} height="200px" style={objectFit} alt="illustration" />
      </div>
    )
    fontSize = "f2rem fw7 tracked mv0";
  }

  var pv = "pv5";
  if(props.top) pv = "pt6-l pt5 pb5"

  return (
    <section id={props.id} className={props.title+" "+pv+" relative banner flex aic jcc flex-column-s ph4-ns ph3 z4 "+props.bg}>
      {img}
      <p className={"dib mw7 mv0 lh-copy pre-wrap ph4-l ph3 hide "+fontSize} dangerouslySetInnerHTML={{__html:props.text}}></p>
    </section>
  )
}

function Next(props) {
  return (
    <section id={props.id} className="banner pv6-l pv5 bg-white">
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
    <section id={props.id} className="panorama-container relative vh-100">
      <p className="tc f3-ns f5 fw7 ph3 tracked mt0 mb4-ns mb3 lh-normal">{props.label}</p>
      <figure className="panorama">
        <img src={props.image} height="100%" alt="panorama" />
      </figure>
      <div className="panorama-icon"></div>
      <div className="panorama-text text-shadow">左右移動看看</div>
    </section>
  )
}

function Bullets(props) {
  var count = props.count;
  var active = count.split('-')[0];
  var total = count.split('-')[1];
  
  var buttons = [];
  for (var i = 0; i < total; i++) {
    var temp = null;
    if(i === active - 1) temp = (<button type="button" className={props.dark+" active image-gallery-bullet side"} aria-pressed="false" aria-label="Go to Slide 1" key={i}></button>)
    else temp = (<button type="button" className={props.dark+" image-gallery-bullet side"} aria-pressed="false" aria-label="Go to Slide 1" key={i}></button>)
    buttons.push(temp);
  }

  return (
    <div className="image-gallery-bullets side">
      <div className="image-gallery-bullets-container" role="navigation" aria-label="Bullet Navigation">
        {buttons}
      </div>
    </div>
  )
}

class TimeChange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false,
      mini: false,
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
      if($(window).width() <= 665) $this.setState({mini:true});
      else $this.setState({mini:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }
  
  render(){
    var z = "";
    var h = "min-vh-180";
    if(this.props.last && !this.state.mobile) {
      z = "z-1";
      h = "min-vh-200"
    }
    var dH = null

    if(this.state.mobile) {
      h = "";
      dH = {
        minHeight: "calc(1413px + 18rem)"
      }
    }
    if(this.state.mini) {
      h = "";
      dH = {
        minHeight: "calc(223vw + 20rem)"
      }
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
      textAlign: "center",
      lineHeight: 1.5
    }

    if (this.state.mobile) {
      label.fontSize = ".7em"
    }

    var max = {
      maxHeight: "471px",
      width: "100%",
      objectFit: "cover"
    }

    var top = this.state.mobile ? null : {
      marginTop: "66px"
    }

    

    return (
      <section id={this.props.id} className={h+" flex aic relative timeChange-text bg-white "+z} style={dH}>
        <div className="w-100 h-100 absolute top-left time-clipping fade">
          <div className="bg-white w-100 h-100-m h-100-l fixed-l fixed-content pn flex aic">
            <div className="center w-100 z4 pre-wrap" style={top}>
              <div className="mw7 mv3 mv0-l center w-100 pt0-l pt5 ph3 h5-ns h6">
                <p className="lh-copy mv0 dark-gray ph3 ph0-l" dangerouslySetInnerHTML={{__html:this.props.text1}}></p>
              </div>
              <figure className="w-100 flex flex-wrap flex-nowrap-l ma0">
                <div className="relative mr2-l">
                  <img src={this.props.image[0]} alt="description" style={max}/>
                  <label style={label}>{this.props.labels[0]}</label>
                </div>
                <div className="relative mr2-l">
                  <img src={this.props.image[1]} alt="description" style={max}/>
                  <label style={label}>{this.props.labels[1]}</label>
                </div>
                <div className="relative">
                  <img src={this.props.image[2]} alt="description" style={max}/>
                  <label style={label}>{this.props.labels[2]}</label>
                </div>
              </figure>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

class TimeChangeFull extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }
  render(){
    var z = "";
    var h = "min-vh-100"
    var first = "first z-1";

    var fullImage = {
      height: "100vh",
      objectFit: "cover",
      objectPosition: this.props.move ? "41.5% 22px" : "center 22px",
      width: "100%"
    }
    var bottomRight = {
      bottom: this.state.mobile ? "45px": "0",
      right: "0px",
      background: "rgba(0,0,0,.2)",
      padding: this.state.mobile ? "10px" : "20px"
    }

    var bgcolor = ""
    var textcolor = ""
    var up = {
      top: this.props.up
    }
    if(this.state.mobile && this.props.upM !== undefined) {
      up = {
        top: this.props.upM   
      }
    }
    if(this.props.color === "dark") {
      bgcolor = "bg-black o-20";
      textcolor = "white";
      up = {
        top: "18%"
      }
    } else {
      bgcolor = "bg-white o-85";
      textcolor = "black";
    }
    var text1 = null; 
    if(this.props.text1 !== "") {
      text1 = (
        <div className="cf">
          <div className={this.props.position+" mw500 mh3-l center pa4-l pa3 relative"}>
            <div className={bgcolor+" w-100 h-100 absolute pn top-left"}></div>
            <p className={"f5-ns f6 lh-copy mv0 z4 relative "+textcolor} dangerouslySetInnerHTML={{__html:this.props.text1}}></p>
          </div>
        </div>
      )
    }
    if(this.props.last) {
      z = "z-1";
      h = "min-vh-200"
    }
    if(!this.props.first) {
      first = "fade"
    }

    var copyrightStyle = {
      bottom: "0",
      left: "0",
      padding: this.state.mobile ? "10px" : "20px",
      maxWidth: this.state.mobile ? "100%" : "80%",
      textAlign: "left"
    }

    var copyright_content = null;
    if(this.props.copyright) {
      copyright_content = (<label className="white absolute f8 pn o-30" style={copyrightStyle}>{this.props.copyright}</label>)
    }

    var label_content = this.props.label !== "" ? (<label className="white absolute lh-normal z10 f6-ns f8 pn" style={bottomRight}>{this.props.label}</label>) : null;
    var earth = this.props.earth ? <GoogleEarthLogo text={this.props.earthText} /> : null;
    var imgSrc = this.props.image;

    return (
      <section id={this.props.id} className={h+" flex aic relative timeChange "+z}>
        <div className={first+" w-100 h-100 absolute top-left time-clipping fade"}>
          <div className="bg-white w-100 h-100 fixed fixed-content pn flex aic">
            <figure className="w-100 ma0">
              {copyright_content}
              <img className="w-100" style={fullImage} src={imgSrc} alt="background"/>
            </figure>
            {label_content}
            <div className="absolute left-0 right-0 mw80 center ph4-ns ph3 w-100 z4 pre-wrap" style={up}>
              {text1}
            </div>
            {earth}
            <Bullets count={this.props.count}/>
          </div>
        </div>
      </section>
    )
  }
}


class TimeChangeSide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){

    var z = "";
    var h = "min-vh-150"
    var first = "first z-1";

    if(this.props.last) {
      z = "z-1"
      h = "min-vh-200"
    }
    if(!this.props.first) {
      first = "fade"
    }

    var imgH = "100%";
    if(!this.props.cover) {
      imgH = this.state.mobile ? "80%" : "60%";
    }

    var ml = this.props.small ? "2.5rem" : "0";
    if(this.state.mobile) ml = "0";

    var halfImageContain = {
      height: imgH,
      objectFit: this.props.cover ? "cover" : "contain",
      marginLeft: ml,
    }

    var halfImageCover = {
      width: this.state.mobile ? "100%" :"90%",
      objectFit: "contain"
    }

    var bottomRight = {
      bottom: this.state.mobile ? "45px": "0",
      right: "0px",
      background: "rgba(0,0,0,.2)",
      padding: this.state.mobile ? "10px" : "20px"
    }

    var content = null;
    var container = {
      marginTop: this.state.mobile ? "66px" : "0",
    }

    var topImg = {
      maxWidth: this.state.mobile ? "75vw" : "auto",
      margin: "0 auto"
    }

    if(this.props.small) {
      topImg = {
        maxWidth: this.state.mobile ? "100vw" : "auto",
      }
    }

    var jcc = "jcc"

    if(this.props.text1 !== "") {
      container = {
        marginTop: this.state.mobile ? "33px" : "0",
      }
      content = (
        <div className="fl-l w-50-l w-100 pre-wrap mt4-ns pr4-l">
          <div className="mw500 center ml4-l ph3 pv3">
            <div className="w-100 h-100 absolute pn top-left"></div>
            <p className='f3-ns f4 fw7 ph3 mb2 tracked'>{this.props.title}</p>
            <p className="pre-wrap f5-ns f6 lh-copy mv0 z4 relative black mt0-ns mt4 ph3">{this.props.text1}</p>
          </div>
        </div>
      )
    } else {
      topImg = {
        height: "50vh"
      }
      var halfImageContain = {
        height: this.state.mobile ? "100%" : "120%"
      }
      jcc = ""

      content = (
        <figure className="fr-l w-50-l w-100 relative tc flex jcc flex-column mv0">
          <label className="tl-l tc f5-ns f8 mb3 tl w-90-l w-100 lh-normal ph0" >{this.props.label}</label>
          <img style={halfImageCover} src={this.props.image[1]} width="90%" alt="background"/>
        </figure>
      )
    }
    
    var imgSrc = this.props.image[0];
    if(this.state.mobile && this.props.small) {
      if(imgSrc.indexOf(".jpg") > -1) imgSrc = imgSrc.split('.jpg')[0]+"_m.jpg";
      else imgSrc = imgSrc.split('.svg')[0]+"_m.svg";
    }

    if(this.props.cover) {
      topImg = this.state.mobile ? {
        height: "calc(100vh - 180px)"
      } : null;
      container = null;
      jcc = "";
    }
    
    return (
      <section id={this.props.id} className={h+" flex aic relative timeChange "+z}>
        <div className={first+" w-100 h-100 absolute top-left time-clipping cf fade"}>
          <div className={jcc+" bg-white w-100 h-100 fixed fixed-content pn flex aic flex-column-s"} style={container}>
            <figure className="fr-l w-50-l w-100 h-100-l ma0 flex aic overflow-hidden" style={topImg}>
              <img style={halfImageContain} src={imgSrc} width="100%" alt="background"/>
            </figure>
            {content}
            <Bullets dark={"dark"} count={this.props.count}/>
          </div>
        </div>
      </section>
    )
  }
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
    <div className="h-100 w-100 absolute o-10" style={{ backgroundImage: "url("+tvLine+")"}}>
    </div>
  )
}


class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: false
    };
  }
  componentDidMount(){
    var $this = this;
    function checkMobile() {
      if($(window).width() <= 959) $this.setState({mobile:true});
      else $this.setState({mobile:false});
    }
    $(window).on('resize orientationchange', checkMobile);

    $(document).ready(function(){
      checkMobile();
    });
  }

  render(){
    var img = null;
    var text = null;
    var mw = "mw80 ph3 ph4-ns";
    var column = "flex aic flex-column-s";
    var a = "order-1";
    var b = "order-0";
    if(this.props.switch) {
      a = "order-0";
      b = "order-1"
    }

    var hint = this.state.mobile ? null : (<p className='f6 o-50 tc mt4'>{"◂◂ 往左滑看更多"}</p>)

    let grid = [];
    var columns = "";
    var rows = "";
    
    
    var w = this.state.mobile ? "100vw" : "660px";
    var h = "200px";
    var len = "count"+this.props.image.length;
    var height = {
      height: this.state.mobile ? this.props.image.length*200+"px" : "466px"
    }

    for (var i = 0; i < this.props.image.length; i++){
      var item = {
        width: w,
        height: this.state.mobile ? "200px" : "400px",
        backgroundImage: "url("+this.props.image[i]+")",
        backgroundSize: "cover",
        backgroundPosition: "center bottom"
      }
      var bottomRight = {
        bottom: "0px",
        right: "0px",
        background: "rgba(0,0,0,.2)",
        padding: this.state.mobile ? "10px" : "20px"
      }

      var label_content = this.props.label[i] === "" ? null : (<label className="white absolute lh-normal z10 f6-ns f8 pn" style={bottomRight}>{this.props.label[i]}</label>)
      var photos = (
        <div className="grid-item bg-gray relative cp" alt={this.props.label[i]} style={item} key={i} onClick={(e) => this.props.onOpenModal(e.target.style.backgroundImage.split('"')[1], e.target.getAttribute("alt"))}>
          {label_content}
        </div>
      )
      columns+=(w+" ");
      rows+=(h+" ");
      grid.push(photos);
    }

    var container = {
      gridTemplateColumns: this.state.mobile ? "100vw" : columns,
      gridTemplateRows: this.state.mobile ? h : null,
      height: this.state.mobile ? this.props.image.length*200+40+"px" : "440px",
      paddingBottom: "40px",
      justifyContent: "start",
    }

    if(this.props.text === "") {
      img = (
        <div className="w-100 hide">
          <div className="fl-l w-100 w-50-l relative tc mb5 mb0-ns">
            <img className="mb3" src={this.props.image[0]} alt={this.props.label[0]}/>
            <label className="f7 mt2 o-50 lh-normal" >{this.props.label[0]}</label>
          </div>
          <div className="fr-l w-100 w-50-l relative tc mb0">
            <img className="mb3" src={this.props.image[1]} alt={this.props.label[1]}/>
            <label className="f7 mt2 o-50 lh-normal" >{this.props.label[1]}</label>
          </div>
        </div>
      )
    }
    else {
      text = (
        <div className="w-100 ph4-l ph3 mb4 hide">
          <p className="mw7 center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black">{this.props.text}</p>
        </div>
      );
    }
    if(this.props.number === 1) {
      img = (
        <div className={a+" w-100 w-50-l pv3 relative tc-ns tl mb0 hide"}>
          <img className="mb3" src={this.props.image[0]} alt={this.props.label[0]}/>
          <label className="f7 mt2 o-50 lh-normal" >{this.props.label[0]}</label>
        </div>
      );
      text = (
        <div className="w-100 w-50-l pv3 mb4 hide">
          <p className="mw500 center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black ph4-l ph3">{this.props.text}</p>
        </div>
      );
    } else if(this.props.number === 2) {
      column = "";
      var image1 = this.props.image[0];
      var image2 = this.props.image[1];
      var mt5 = "mt5";

      if(this.props.text === "") {
        text = null;
        mt5 = "";
      }

      if(this.props.switchM) {
        if(this.state.mobile){
          image1 = this.props.image[0].split('.')[0]+'-M.jpg';
          image2 = this.props.image[1].split('.')[0]+'-M.jpg';
        } else {
          image1 = this.props.image[0];
          image2 = this.props.image[1];          
        }
      }
      img = (
        <div className={"w-100 hide "+mt5}>
          <div className="fl-l w-100 w-50-l relative tc mb4 mb0-l">
            <img className="mb3" src={image1} alt={this.props.label[0]}/>
            <label className="f7 mt2 o-50 lh-normal" >{this.props.label[0]}</label>
          </div>
          <div className="fr-l w-100 w-50-l relative tc mb0">
            <img className="mb3" src={image2} alt={this.props.label[1]}/>
            <label className="f7 mt2 o-50 lh-normal" >{this.props.label[1]}</label>
          </div>
        </div>
      );
    } else if(this.props.number >= 3) {
      column = "";
      mw = "";
      text = (
        <div className="w-100 ph4-ns ph3 mb4 hide">
          <p className="mw7 center pre-wrap f5-ns f6 lh-copy mv0 z4 relative black ph4-l ph3">{this.props.text}</p>
        </div>
      );
      img = (
        <div className="w-100 overflow-hidden hide" style={height}>
          {hint}
          <div className={"grid-container nowrap dragscroll "+len} style={container}>
            {grid}
          </div> 
        </div>
      );
    }
    
    var bgColor = this.props.bg !== undefined ? this.props.bg : "bg-white";
    var more = this.props.more === undefined ? null : (
      <p className="w-100 tc f6 pa3 mv0 o-50 lh-normal">{this.props.more}</p>
    )

    return (
      <section id={this.props.id} className={"flex aic relative pv6-l pv5 "+bgColor} >
        <div className={mw+" w-100 center z4 relative"}>
          <div className={"cf "+column}>
            {text}
            {img}
            {more}
          </div>
        </div>
      </section>
    )
  }
}

function More(props) {
  var border = {
    borderTop: "1px #eee solid"
  }

  var borderLink = {
    borderColor: props.color
  }

  var len = props.link.length;
  var morelinks = [];
  for(var i = 0; i < len; i++) {
    var morelink = (
      <div className="fl w-100 w-50-ns pa2 hide" key={i}>
        <div className="bg-white pv2 f4-ns f5 fw5">
          <a className="bb bw1" href={props.link[i]} target="_blank" style={borderLink} rel="noopener noreferrer">
            {props.title[i]}
          </a>
        </div>
      </div>
    )
    morelinks.push(morelink);
  }


  return(
    <section id={props.id} className="bg-white pv6-l pv5 relative z10" style={border}>
      <div className="mw8 center ph3">
        <div className="cf ph2-ns tc">
          <h1 className="ph2 fw7 tracked mb5-l mb4 f2rem hide">同場加映</h1>
          {morelinks}
        </div>
      </div>
    </section>
  )
}


function CTA(props) {
    return (
      <section id={props.id} className="bg-near-white pv6-l pv5 relative z10">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tc">
            <div className="fl w-third-l w-100 pa2 cp hide">
              <Link to="/island20">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w-100 h5 center mv0 flex aic jcc">
                    <img src={ctap1} width="210" height="210" alt="回首頁"/>
                  </figure>
                  <p className="f3-ns f4 fw5 mt0 mb2">回首頁</p>
                  <p className="f5-ns f6 fw4 o-60">穿梭島嶼時光機</p>
                </div>
              </Link>
            </div>
            <div className="fl w-third-l w-100 pa2 cp hide">
              <Link to={"../"+props.next+"/"}> 
                <div className="pv3 pa4 tc ctaBox bg-white" onClick={() => props.switchView(props.next)}>
                  <figure className="w-100 h5 center mv0 flex aic jcc">
                    <img src={ctap2} width="210" height="210" alt="下一篇"/>
                  </figure>
                  <p className="f3-ns f4 fw5 mt0 mb2">下一篇</p>
                  <p className="f5-ns f6 fw4 o-60">{props.nextN}</p>
                </div>
              </Link>
            </div>
            <div className="fl w-third-l w-100 pa2 cp hide">
              <a href="https://ourisland.pts.org.tw/" target="_blank" rel="noopener noreferrer">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w-100 h5 center mv0 flex aic jcc">
                    <img src={cta3} width="210" height="210" alt="大事記"/>
                  </figure>
                  <p className="f3-ns f4 fw5 mt0 mb2">島官網</p>
                  <p className="f5-ns f6 fw4 o-60">了解更多我們的島</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
}




/************************************************************************************************************************* 



                                                        Views



*************************************************************************************************************************/









class Event01 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      image: "",
      description: "",
      chat: false
    }
  }
  componentDidMount(){
    var $this = this;
    console.log("event01");
    window.onload = function() {
      if(window.location.href.indexOf('chatbot') > -1) {
        $this.setState({chat: true});
      }
    }
  }
  componentDidUpdate(){
    console.log("event01_update");
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>

        <Taiwan
          id={"2-taiwan"}
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}     
          primaryColor = {"#399DBB"}
          shipPositionL = "51%"
          shipPositionT = "-8%"
        />
        <Illustration
          id={"3-illustration"}
          number = {2}
          text1={this.props.data.illustrationText[0]}
          text2={this.props.data.illustrationText[1]}
          illustration = {this.props.data.illustration}
        />

        <PhotoSwitch
          id={"4-photoSwitch"}
          number = {2} 
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          text2={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel}
        />

        <p className="nextp dib mw7 pt5 ma0 w-100 bg-near-white lh-copy pre-wrap ph3 tc dn-l">來看看淡水河如何從垃圾山變身為河濱公園…</p>

        <Video 
          id={"5-video"}
          videoID="01"
          link={this.props.data.video[0]}
          text1=""
          playing={true}
          sound={false}
        />

        <PhotoTextFull
          id={"6-photoTextFull"}
          position={"fl-l"}
          objectP={"65%"}
          color="dark"
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <PhotoText
          id={"7-photoText"}
          order="right"
          color="invert"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
          fish={true}
        />

        <TimeChange
          id={"8-timeChange"}
          position={"fr-l"}
          text1={this.props.data.timeChangeText[0]}
          image={this.props.data.timeChangePhotos[0]}
          labels={this.props.data.timeChangeLabels[0]}
        />
        <TimeChange
          id={"9-timeChange"}
          position={"fr-l"}
          last={true}
          text1={this.props.data.timeChangeText[1]}
          image={this.props.data.timeChangePhotos[1]}
          labels={this.props.data.timeChangeLabels[1]}
        />

        <Video 
          id={"10-video"}
          videoID="02"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[0]}
          playing={true}
          sound={false}
        />

        <Transition id={"11-transition"} bg={"bg-white"} text={this.props.data.videoText[1]} />
        <Video
          id={"12-video"}
          videoID="03"
          link={this.props.data.video[2]}
          text1=""
          playing={true}
          sound={false}
        />

        <PhotoTextFull
          id={"13-photoTextFull"}
          position={"fr-l"}
          color="dark"
          text1={this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <Blog
          id={"14-blog"}
          number={3}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <TimeChangeFull
          id={"15-timeChangeFull"}
          position={"fl-l"}
          text1={this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
          count="1-2"
          first={true}
        />
        <TimeChangeFull
          id={"16-timeChangeFull"}
          position={"fl-l"}
          last={true}
          text1={this.props.data.photoFullText[5]}
          image = {this.props.data.photoFull[4]}
          label = {this.props.data.photoFullTextLabel[4]}
          count="2-2"
        />

        <PhotoContrast
          id={"17-photoContrast"} 
          bg={"bg-white z1"}
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
          year={this.props.data.photocontrastYear}
          label=""
        />

        <PhotoContrast
          id={"18-photoContrast"} 
          bg={"bg-near-white z1"}
          images={this.props.data.photocontrast2}
          text={this.props.data.photocontrastText2}
          year={this.props.data.photocontrastYear2}
          label=""
        />
        
        <CenterVideo 
          id={"19-centerVideo"} 
          videoID="04"
          link={this.props.data.video[3]}
          text1={this.props.data.videoText[2]}
          bg={false}
          playing={false}
          sound={false}
        />

        <EndingVideo 
          id={"20-endingVideo"} 
          text="來收看，淡水河20年來的故事..." 
          link={"https://www.youtube.com/embed/pJcFZSLkelU?rel=0"}
        />

        <ChatBot id={"chatbot"} display={this.state.chat}/>

        <More 
          id={"21-more"} 
          link={this.props.data.moreLink} 
          title={this.props.data.moreTitle} 
          color={"#3A85A6"}
        />

        <CTA id={"22-cta"} switchView={this.props.switchView} next={"reborn-erren-river"} nextN={"重生 二仁溪"}/>
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

  componentDidMount(){
    console.log("event02");
  }
  componentDidUpdate(){
    console.log("event02_update");
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          primaryColor = {"#399DBB"}
          shipPositionL = "35%"
          shipPositionT = "47%"
        />

        <Illustration
          id={"3-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <SmallVideo 
          id={"4-smallVideo"} 
          videoID="01"
          bg={"bg-near-white"}
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
          sound={false}
        />

        <Timeline
          id={"5-timeline"}
          height="560"
          contentTitle={true}
          content={"長達三十年，二仁溪還是無法擺脫廢五金陰影。"}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
        />
        <Transition
          id={"6-transition"} 
          bg={"bg-near-white"}
          text={this.props.data.videoText[1]}
        />

        <Video 
          id={"7-video"} 
          videoID="02"
          link={this.props.data.video[1]}
          text1=""
          playing={true}
          sound={false}
        />

        <Blog
          id={"8-blog"} 
          number={4}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Transition
          id={"9-transition"} 
          bg={"bg-near-white"}
          text={this.props.data.transitionText}
        />

        <PhotoSwitch 
          id={"10-photoSwitch"} 
          number = {2} 
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          text2={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel}
        />

        <Video 
          id={"11-video"} 
          videoID="03"
          link={this.props.data.video[2]}
          text1=""
          playing={true}
          sound={false}
        />

        <PhotoMultiple
          id={"12-photoMultiple"} 
          text={this.props.data.photoMultipleText}
          images={this.props.data.photoMultiple}
          label={this.props.data.photoMultipleLabel}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <EndingVideo id={"13-endingVideo"} text={"來看二仁溪，二十年來承受了什麼..."} link={"https://youtube.com/embed/gfI8M0LGMss?rel=0"}/>
        <More id={"14-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#3A85A6"}/>
        <CTA id={"15-cta"} switchView={this.props.switchView} next={"land-crabs-survival"}  nextN={"陸蟹闖天關"}/>
      </div>
    );
  }
}

class Event03 extends Component {
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
    var max = {
      maxWidth: "880px"
    }

    return (
      <div>
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          primaryColor = {"#399DBB"}
          shipPositionL = "42%"
          shipPositionT = "65%"
        />

        <Illustration
          id={"3-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <CenterVideo
          id={"4-centerVideo"} 
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
          bg={false}
          sound={false}
          playing={false}
        />

        <Transition
          id={"5-transition"} 
          bg={"bg-white"}
          text={this.props.data.videoText[1]}
        />

        <Video
          id={"6-video"} 
          videoID="02"
          link={this.props.data.video[1]}
          text1=""
          playing={true}
          sound={false}
        />

        <PhotoMultiple
          second={"auto-scroll-2"}
          id={"7-photoMultiple"} 
          images={this.props.data.photoMultiple} 
          label={this.props.data.photoMultipleLabel}
          text={this.props.data.photoMultipleText} 
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <Timeline
          id={"8-timeline"}
          special={true}
          content={this.props.data.timelineContent}
          text={this.props.data.timelineText}
          year=""
          images={this.props.data.timelineImage}
        />

        <CenterSmallVideo
          id={"9-centerSmallVideo"}  
          videoID="03"
          text={this.props.data.videoText[12]}
          link={this.props.data.video[12]}
          sound={false}
        />

        <Transition
          id={"10-transition"} 
          bg={"bg-blue white tc"}
          text={this.props.data.transitionText[0]}
        />
        <Transition
          id={"11-transition"} 
          title={"transitionTitle bn"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[0]}
          text={"弱肉強食 生死關"}
        />
        
        <CenterSmallVideo
          id={"12-centerSmallVideo"}  
          videoID="04"
          text={this.props.data.videoText[2]}
          link={this.props.data.video[2]}
          sound={false}
        />

        <Transition
          id={"13-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[1]}
          text={"起手無回 抓去關"}
        />

        <Blog
          id={"14-blog"} 
          number={1}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Transition
          id={"15-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[2]}
          text={"無家可歸 難過關"}
        />

        <Video 
          id={"16-video"} 
          videoID="05"
          color={"dark"}
          text1={this.props.data.videoText[3]}
          link={this.props.data.video[3]}
          playing={false}
          sound={false}
        />

        <Blog
          id={"17-blog"} 
          number={5}
          bg={"bg-white"}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
        />
        

        <Transition
          id={"18-transition"} 
          bg={"bg-blue white tc"}
          text={this.props.data.transitionText[1]}
        />

        <CenterSmallVideo
          id={"19-centerSmallVideo"} 
          color={"invert"}
          videoID="06"
          text={this.props.data.videoText[4]}
          link={this.props.data.video[4]}
          sound={false}
        />

        <Transition
          id={"20-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[3]}
          text={"蟹生好卡 障礙關"}
        />
        <Video 
          id={"21-transition"} 
          sound={false}
          videoID="07"
          text1={this.props.data.videoText[5]}
          link={this.props.data.video[5]}
          playing={false}
          sound={false}
        />
        

        <section id={"22-transition"}  style={max} className="pv6-ns pv5 ph4-ns ph3 center">
          <img src={this.props.data.illustrationCrab[6]} className="w-25-ns w-50 hide" alt="illustration" />
          <img src={this.props.data.illustrationCrab[7]} className="w-25-ns w-50 hide" alt="illustration" />
          <img src={this.props.data.illustrationCrab[8]} className="w-25-ns w-50 hide" alt="illustration" />
          <img src={this.props.data.illustrationCrab[9]} className="w-25-ns w-50 hide" alt="illustration" />
          <p className="lh-copy pre-wrap f5-ns f6 mt5 ph4-l ph3 hide">{this.props.data.videoText[6]}</p>
        </section>

        <Video 
          id={"23-video"} 
          videoID="08"
          position={"fr-l"}
          text1={this.props.data.videoText[11]}
          link={this.props.data.video[6]}
          playing={true}
          sound={false}
        />

        <Transition
          id={"24-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationCrab[4]}
          text={"步步驚心 鬼門關"}
        />

        <Transition
          id={"25-transition"} 
          bg={"bg-white"}
          text={this.props.data.videoText[7]}
        />
        <Video 
          id={"26-video"} 
          videoID="09"
          text1=""
          link={this.props.data.video[7]}
          playing={true}
          sound={false}
        />
        <Blog
          id={"27-blog"} 
          number={5}
          text={this.props.data.blogText[3]}
          image={this.props.data.blogImage[4]}
          label={this.props.data.blogLabel[4]}
          onOpenModal={this.onOpenModal.bind(this)}
        />
        <SmallVideo
          id={"28-smallVideo"} 
          bg={"bg-near-white"}
          videoID="10"
          link={this.props.data.video[8]}
          text={this.props.data.videoText[9]}
          sound={false}
        />

        <section id={"29-illustration"} className="ma0 flex jcc aic">
          <img className="mw8 center" src={this.props.data.illustrationCrab[5]} width="100%" alt="illustration" />
        </section>

        <PhotoCenterTextFull
          id={"30-photoCenterTextFull"} 
          text1 = {this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
          bg={true}
          objectP={"75%"}
        />

        <PhotoMultiple
          id={"31-photoMultiple"} 
          images={this.props.data.photoMultiple2} 
          label={this.props.data.photoMultipleLabel2}
          text={this.props.data.photoMultipleText2} 
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Transition
          id={"32-transition"} 
          bg={"bg-white"}
          text={this.props.data.transitionText[2]}
        />

        <Video 
          id={"33-video"} 
          videoID="11"
          text1=""
          link={this.props.data.video[10]}
          playing={true}
          sound={false}
        />

        <SmallVideo
          id={"34-smallVideo"}  
          videoID="11"
          bg={"bg-near-white"}
          reverse={true}
          text={this.props.data.blogText[2]}
          link={this.props.data.video[11]}
          sound={false}
        />

        <CenterSmallVideo 
          id={"35-centerSmallVideo"} 
          videoID="12"
          text={this.props.data.videoText[10]}
          link={this.props.data.video[9]}
          sound={false}
        />
        <PhotoCenterTextFull
          id={"36-photoCenterTextFull"} 
          text1 = {this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
          bg={false}
        />
        <p className="w-100 tc f6 pa3 mv0 o-50 lh-normal">諮詢顧問及影像提供：劉烘昌</p>
        <EndingVideo id={"37-endingVideo"} text={"一起來守護陸蟹"} link={"https://youtube.com/embed/KyG4mEAyv8E?rel=0"}/>
        <More id={"38-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#3A85A6"}/>
        <CTA id={"39-cta"} switchView={this.props.switchView} next={"dawu-fishing-port"} nextN={"漁港的黑色幽默"}/>
      </div>
    );
  }
}

class Event04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      intervalP: null,
      open: false,
      image: "",
      description: ""
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
      if($(window).width() > 1023) {
        panoramaScroll();
        console.log("wide");
      } else {
        $('.panorama').scrollLeft(scrollP);
        console.log("mobile");
      }

      $('.panorama').scroll(function(){
        if($(window).width() <= 1024) {
          var rightP = $('.panorama img').width() - $(window).width();
          var deg = 90*$('.panorama').scrollLeft()/rightP-45;
          $('.panorama-icon').css('transform', 'rotate('+deg+'deg)');
        }
      })

      function panoramaScroll() {
        // console.log('scroll');
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          primaryColor = {"#399DBB"}
          shipPositionL = "44%"
          shipPositionT = "58%"
        />

        <Illustration
          id={"3-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <SmallVideo 
          id={"4-smallVideo"} 
          videoID="01"
          bg={"bg-near-white"}
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
          sound={false}
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
          id={"5-video"} 
          videoID="02"
          link={this.props.data.video[1]}
          text1=""
          playing={true}
          sound={false}
        />

          <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <Transition
          id={"6-transition"} 
          text={this.props.data.panoramaText}
          bg={"bg-white"}
          top={true}
        />
        <Panorama
          id={"7-panorama"} 
          image={this.props.data.panoramaImage}
          label={this.props.data.panoramaLabel}
        />
        <Transition id={"8-transition"} bg={"bg-near-white"} text={this.props.data.transitionText[0]}/>
        
        <TimeChangeSide
          id={"9-timeChangeSide"} 
          cover={true}
          text1={this.props.data.photoSlideLabel[0]}
          title={this.props.data.photoSlideTitle[0]}
          image = {this.props.data.photoSlidePhoto[0]}
          label = "2013年 大武漁港"
          count="1-3"
          first={true}
        />
        <TimeChangeSide
          id={"10-timeChangeSide"}
          cover={true}
          text1={this.props.data.photoSlideLabel[1]}
          title={this.props.data.photoSlideTitle[1]}
          image = {this.props.data.photoSlidePhoto[1]}
          label = "2016年 大武漁港"
          count="2-3"
        />
        <TimeChangeSide
          id={"11-timeChangeSide"}
          cover={true}
          text1={this.props.data.photoSlideLabel[2]}
          title={this.props.data.photoSlideTitle[2]}
          last={true}
          image = {this.props.data.photoSlidePhoto[2]}
          label = "2018年 大武漁港"
          count="3-3"
        />

        <Transition id={"12-transition"} bg={"bg-near-white z4"} text={this.props.data.photoSlideText}/>

        <CenterVideo 
          id={"13-centerVideo"}
          videoID="06"
          sound={false}
          playing={false}
          link={this.props.data.video[5]}
          text1={this.props.data.videoText[5]}
          bg={true}
        />

        <Transition
          id={"14-transition"}
          bg={"bg-near-white"}
          text={this.props.data.photoFullText[1]}
        />
        <Video 
          id={"15-video"}
          videoID="05"
          link={this.props.data.video[4]}
          text1=""
          playing={false}
          sound={false}
        />
  
        <Timeline
          id={"16-timeline"}
          height={500}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
          bg={"bg-near-white"}
        />

        <TimeChangeSide
          id={"17-timeChangeSide"}
          count="1-2"
          text1={this.props.data.photoText[0]}
          title={this.props.data.photoTitle[0]}
          image = {this.props.data.photoImage[0]}
          first={true}
        />
        <TimeChangeSide
          id={"18-timeChangeSide"}
          count="2-2"
          last={true}
          text1={this.props.data.photoText[0]}
          title={this.props.data.photoTitle[0]}
          image = {this.props.data.photoImage[1]}
        />

        <SmallVideo
          id={"19-smallVideo"}
          bg={"bg-near-white z4"}
          videoID="03"
          link={this.props.data.video[2]}
          text={this.props.data.videoText[2]}
          sound={false}
        />

        <PhotoContrast 
          id={"20-photoContrast"}
          bg={"bg-white"}
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
          year={this.props.data.photocontrastYear}
          label={this.props.data.photocontrastLabel}
        />
        {/*
        <Transition
          id={"21-transition"}
          bg={"bg-near-white"}
          text={this.props.data.photoFullText[4]}
        />
        <TimeChangeSide
          id={"22-timeChangeSide"}
          text1=""
          title=""
          image = {this.props.data.timeChangeSidePhotos[0]}
          label = {this.props.data.timeChangeSideLabels[0]}
          count="1-4"
          first={true}
        />
        <TimeChangeSide
          id={"23-timeChangeSide"}
          text1=""
          title=""
          image = {this.props.data.timeChangeSidePhotos[1]}
          label = {this.props.data.timeChangeSideLabels[1]}
          count="2-4"
        />
        <TimeChangeSide
          id={"24-timeChangeSide"}
          text1=""
          title=""
          image = {this.props.data.timeChangeSidePhotos[2]}
          label = {this.props.data.timeChangeSideLabels[2]}
          count="3-4"
        />
        <TimeChangeSide
          id={"25-timeChangeSide"}
          text1=""
          title=""
          last={true}
          image = {this.props.data.timeChangeSidePhotos[3]}
          label = {this.props.data.timeChangeSideLabels[3]}
          count="4-4"
        />
        */}
        <Timeline
          id={"22-timeline"}
          special={true}
          bg={"bg-near-white"}
          content={this.props.data.photoFullText[4]}
          text=""
          year=""
          images={this.props.data.timeChangeSideImage}
        />
        
        <Blog
          id={"23-blog"}
          number={2}
          bg={"bg-white z4"}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <TimeChangeFull
          id={"24-timeChangeFull"}
          position={"fl-l"}
          text1={this.props.data.videoText[6]}
          image={this.props.data.blogImage[3][0]}
          label = {this.props.data.blogLabel[3][0]}
          count="1-2"
          first={true}
        />
        <TimeChangeFull
          id={"25-timeChangeFull"}
          position={"fl-l"}
          last={true}
          text1={this.props.data.videoText[6]}
          image={this.props.data.blogImage[3][1]}
          label = {this.props.data.blogLabel[3][1]}
          count="2-2"
        />

        <Transition
          id={"26-transition"}
          bg={"bg-white tc z4"}
          text={this.props.data.videoText[7]}
        />

        <Video
          id={"27-video"}
          position={"fr-l"}
          videoID="07"
          link={this.props.data.video[6]}
          text1=""
          playing={true}
          sound={false}
        />

        <Transition
          id={"28-transition"}
          bg={"bg-blue white tc"}
          text={"你知道台灣有多少座漁港嗎？"}
        />

        <Video
          id={"29-video"}
          position={"fr-l"}
          videoID="04"
          link={this.props.data.video[3]}
          text1={this.props.data.videoText[3]}
          sound={false}
        />
        <Blog
          id={"30-blog"}
          number={2}
          bg={"bg-white"}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
        />
        <Blog
          id={"31-blog"}
          number={2}
          bg={"bg-near-white"}
          text={this.props.data.blogText[2]}
          image={this.props.data.blogImage[2]}
          label={this.props.data.blogLabel[2]}
          onOpenModal={this.onOpenModal.bind(this)}
        />
        <PhotoCenterTextFull
          id={"32-photoCenterTextFull"}
          text1={this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />
        <EndingVideo id={"33-endingVideo"} text="一起來關心我們的海岸" link={"https://www.youtube.com/embed/C-Au_8Y6tCc?rel=0"}/>
        <More id={"34-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#3A85A6"}/>
        <CTA id={"35-cta"} switchView={this.props.switchView} next={"kinmen-Hou-feng-kang"} nextN={"不靠海的金門後豐港"}/>
      </div>
    );
  }
}

class Event05 extends Component {
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"}
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          kinmen = {true}
          primaryColor = {"#399DBB"}
          shipPositionL = "32%"
          shipPositionT = "47%"
        />

        <Illustration
          id={"3-illustration"}
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoTextFull
          id={"4-photoTextFull"}
          position={"fr-l"}
          color={"dark"}
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <Transition
          id={"5-transition"}
          bg={"bg-white"}
          text={this.props.data.transitionText}
        />

        <TimeChangeFull
          id={"6-timeChangeFull"}
          position={"fl-l"}
          earth = {true}
          color={"dark"}
          earthText = {"Image is from Google Earth ©️2018  DigitalGlobe"}
          text1={this.props.data.timeChangeLabels[0]}
          image = {this.props.data.timeChangePhotos[0]}
          label = ""
          count="1-4"
          move={true}
          switch={true}
          first={true}
        />
        <TimeChangeFull
          id={"7-timeChangeFull"}
          position={"fl-l"}
          earth = {true}
          color={"dark"}
          earthText = {"Image is from Google Earth ©️2018  DigitalGlobe"}
          text1={this.props.data.timeChangeLabels[1]}
          image = {this.props.data.timeChangePhotos[1]}
          label = ""
          count="2-4"
          move={true}
          switch={true}
        />
        <TimeChangeFull
          id={"8-timeChangeFull"}
          position={"fl-l"}
          earth = {true}
          color={"dark"}
          earthText = {"Image is from Google Earth ©️2018  DigitalGlobe"}
          text1={this.props.data.timeChangeLabels[2]}
          image = {this.props.data.timeChangePhotos[2]}
          label = ""
          count="3-4"
          move={true}
          switch={true}
        />
        <TimeChangeFull
          id={"9-timeChangeFull"}
          position={"fl-l"}
          earth = {true}
          color={"dark"}
          earthText = {"Image is from Google Earth ©️2018  DigitalGlobe"}
          last={true}
          text1={this.props.data.timeChangeLabels[3]}
          image = {this.props.data.timeChangePhotos[3]}
          label = ""
          count="4-4"
          move={true}
          switch={true}
        />        
      
        <SmallVideo
          id={"10-smallVideo"} 
          bg={"bg-white z4"}
          videoID="01"
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
          sound={false}
        />

        <Blog
          id={"11-blog"}
          number={4}
          switch={false}
          bg={"bg-near-white z4"}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <Video
          id={"12-video"} 
          videoID="02"
          color="dark"
          sound={false}
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        <CenterSmallVideo
          id={"13-centerSmallVideo"} 
          videoID="03"
          link={this.props.data.video[2]}
          text={this.props.data.videoText[2]}
          sound={false}
        />

        <PhotoTextFull
          id={"14-photoTextFull"}
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

        <Video 
          id={"15-video"}
          videoID="04"
          link={this.props.data.video[3]}
          text1=""
          playing={true}
          sound={false}
        />

        <TimeChangeSide
          id={"16-timeChangeSide"}
          text1={this.props.data.photoText}
          title=""
          image = {this.props.data.photoImage[0]}
          count="1-2"
          first={true}
          small={true}
        />
        <TimeChangeSide
          id={"17-timeChangeSide"}
          last={true}
          title=""
          text1={this.props.data.photoText}
          image = {this.props.data.photoImage[1]}
          count="2-2"
          small={true}
        />

        <PhotoSwitch 
          id={"18-photoSwitch"}
          position={"fl-l"}
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          label={this.props.data.photoswitchLabel}
        />

        <Timeline
          id={"19-timeline"}
          height={480}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
        />

        <Video 
          id={"20-video"}
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
          playing={true}
          sound={false}
        />

        <PhotoCenterTextFull
          id={"21-photoCenterFull"}
          text1={this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <EndingVideo id={"22-endingVideo"} text={"了解更多，關於金門鱟..."} link={"https://youtube.com/embed/nlWGkBTafkc?start=716&rel=0"}/>
        <More id={"23-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#3A85A6"}/>
        <CTA id={"24-cta"} switchView={this.props.switchView} next={"changing-tamsui-river"} nextN={"變遷 淡水河"}/>
      </div>
    );
  }
}

class Event06 extends Component {
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"}
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "48%"
          shipPositionT = "21%"
        />

        <Illustration
          id={"3-illustration"}
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoTextFull
          id={"4-photoTextFull"}
          position={"fr-l"}
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <Video 
          id={"5-video"}
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
          playing={true}
          sound={false}
        />

        <Transition
          id={"6-transition"}
          text={this.props.data.photoswitchText}
        />

        <PhotoSwitch 
          id={"7-photoSwitch"}
          position={"fr-l"}
          images={this.props.data.photoswitch} 
          text1=""
          label={this.props.data.photoswitchLabel}
        />

        <PhotoTextFull
          id={"8-photoTextFull"}
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

        <Video 
          id={"9-video"}
          number={2}
          position={"fr-l"}
          color="dark"
          videoID="02"
          order={true}
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
          text2={this.props.data.videoText[2]}
        />

        <Transition id={"10-transition"} text={this.props.data.transitionText[0]} bg={"bg-white"}/>

        <Video 
          id={"11-video"}
          position={"fl-l"}
          videoID="03"
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[3]}
          playing={true}
        />

        <Timeline
          id={"12-timeline"}
          special={true}
          bg={"bg-near-white"}
          content={this.props.data.photoFullText[5]}
          text=""
          year=""
          images={this.props.data.timelineImage}
          scrollTitle="2004年敏督利颱風災情"
        />

        <Blog
          id={"13-blog"}
          number={2}
          bg={"bg-white z4"}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <PhotoSwitch
          id={"14-photoSwitch"}
          number = {2} 
          images={this.props.data.photoswitch2} 
          text1={this.props.data.photoswitchText2}
          text2={this.props.data.photoswitchText3}
          label={this.props.data.photoswitchLabel2}
        />

        <PhotoContrast
          id={"15-photoContrast"} 
          bg={"bg-white z1"}
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
          year=""
          label=""
        />

        <SmallVideo 
          id={"16-smallVideo"} 
          videoID="04"
          bg={"bg-near-white"}
          link={this.props.data.video[4]}
          text={this.props.data.videoText[5]}
          sound={false}
        />

        <PhotoCenterTextFull
          id={"17-photoCenterTextFull"} 
          text1={this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />

        <EndingVideo id={"18-endingVideo"} text={"一起來，看梨山20年變遷...."} link={"https://youtube.com/embed/2hNzEhztAms?rel=0"}/>
        <More id={"19-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#85A48C"}/>
        <CTA id={"20-cta"} switchView={this.props.switchView} next={"lushan-hotspring-risk"} nextN={"冒險 泡湯去"}/>

      </div>
    );
  }
}

class Event07 extends Component {
  componentDidMount(){
    // var infoText = this.props.data.infoText;
    // $(document).ready(function(){
    //   var infoHelper = '<div class="absolute z10 mw7 infoHelper pn"><p class="near-black f7 fw4 bg-white pa3 pre-wrap lh-copy">'+infoText+'</p></div>';
    //   $('.info').append(infoHelper);
    // })
  }
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "47%"
          shipPositionT = "18%"
        />

        <Video 
          id={"3-video"} 
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
          playing={true}
          sound={false}
        />

        <Illustration
          id={"4-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoSwitch 
          id={"5-photoSwitch"} 
          images={this.props.data.photoswitch} 
          label={this.props.data.photoswitchLabel}
          text1={this.props.data.photoFullText[0]}
        />

        <Video 
          id={"6-video"} 
          videoID="02"
          color="dark"
          position="fr-l"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        <Blog
          id={"7-blog"}
          number={2}
          text={this.props.data.photoSlideText}
          label={this.props.data.photoSlideLabel}
          image={this.props.data.photoSlidePhoto}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Timeline
          id={"8-timeline"} 
          height="480"
          bg={"bg-near-white"}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
        />

        <PhotoContrast
          id={"9-photoContrast"} 
          bg={"bg-white"}
          images={this.props.data.photocontrast}
          text={this.props.data.photocontrastText}
          year={this.props.data.photocontrastYear}
          label={this.props.data.photocontrastLabel}
        />

        <Video
          id={"10-video"} 
          videoID="03"
          color="dark"
          position={"fr-l"}
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[2]}
        />
        
        <PhotoTextFull
          id={"11-photoTextFull"} 
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />
        <Blog
          id={"14-blog"}
          number={3}
          bg={"bg-near-white"}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
          more={this.props.data.blogMore[0]}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <SmallVideo
          id={"15-smallVideo"}  
          videoID="06"
          text={this.props.data.videoText[5]}
          link={this.props.data.video[5]}
          sound={false}
        />

        <Blog
          id={"14-blog"}
          number={3}
          bg={"bg-near-white"}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <CenterSmallVideo 
          id={"13-video"} 
          videoID="04"
          link={this.props.data.video[3]}
          text={this.props.data.videoText[3]}
        />

        <CenterVideo 
          id={"14-centerVideo"} 
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
          bg={false}
        />

        <EndingVideo id={"15-endingVideo"} text={"廬山是如何變成今天的樣子呢?"} link={"https://youtube.com/embed/sMp_TgjcHDo?rel=0"}/>
        <More id={"16-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#85A48C"}/>
        <CTA id={"17-cta"} switchView={this.props.switchView} next={"hushan-reservoir-lost-water"} nextN={"攔住水又失去水"}/>
        
      </div>
    );
  }
}

class Event08 extends Component {
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"}
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "41%"
          shipPositionT = "28%"
        />

        <Illustration
          id={"3-illustration"}
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <Transition id={"4-illustration"} text={this.props.data.transitionText[0]} bg={"bg-near-white"}/>

        <Video
          id={"5-video"} 
          videoID="01"
          link={this.props.data.video[0]}
          text1=""
          playing={true}
        />
        <Transition
          id={"10-transition"} 
          bg={"bg-green white tc"}
          text={"在湖水漲起之前，這裡有一座美麗的幽情谷。"}
        />
        <PhotoSwitch 
          id={"6-photoSwitch"} 
          position={"fl-l"}
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          label={this.props.data.photoswitchLabel}
        />

        <PhotoCenterTextFull
          id={"7-photoCenterTextFull"} 
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
          bg={true}
        />

        <PhotoText
          id={"8-photoText"}
          order="left"
          large={true}
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
          copyright = {"Image is from 2018/©️DigitalGlobe,©️CNES/Airbus"}
        />

        <Timeline
          id={"9-timeline"}
          height={480}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
          bg={"bg-near-white"}
        />

        <PhotoCenterTextFull
          id={"10-photoCenterTextFull"} 
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
          objectP={"30%"}
        />

        <Transition
          id={"11-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationQ[0]}
          text={this.props.data.transitionText[1]}
        />

        <PhotoTextFull
          id={"12-photoTextFull"}
          position={"fl-l"}
          text1={this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <Transition
          id={"13-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationQ[1]}
          text={this.props.data.transitionText[2]}
        />

        <Video
          id={"14-video"} 
          videoID="02"
          color="dark"
          position="fl-l"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
        />

        <Transition
          id={"15-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationQ[2]}
          text={this.props.data.transitionText[3]}
        />

        <PhotoText
          id={"16-photoText"}
          order="left"
          large={true}
          text={this.props.data.photoText[1]}
          image = {this.props.data.photoImage[1]}
          copyright = {"Image is from 2018/©️DigitalGlobe,©️CNES/Airbus"}
        />

        <Transition
          id={"17-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationQ[3]}
          text={this.props.data.transitionText[4]}
        />

        <Video
          id={"18-video"} 
          videoID="03"
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[2]}
        />

        <Transition
          id={"19-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationQ[4]}
          text={this.props.data.transitionText[5]}
        />

        <SmallVideo 
          id={"19-smallVideo"} 
          videoID="05"
          link={this.props.data.video[7]}
          text={this.props.data.timeChangeText[0]}
          sound={false}
        />

        <Transition id={"22-transition"} text={this.props.data.transitionText[6]} bg={"bg-near-white"}/>

        <Blog
          id={"23-blog"}
          number={1}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <Video
          id={"24-video"} 
          videoID="04"
          color="dark"
          link={this.props.data.video[6]}
          text1=""
          playing={true}
        />

        <Transition id={"25-transition"} text={this.props.data.transitionText[7]} bg={"bg-near-white"}/>

        <PhotoText
          id={"26-photoText"}
          order="left"
          text={this.props.data.photoText[2]}
          image = {this.props.data.photoImage[2]}
          large ={true}
          copyright = {"Image is from 2018/©️DigitalGlobe,©️CNES/Airbus"}
        />

        <Timeline
          id={"27-timeline"}
          height={520}
          text={this.props.data.timelineText2}
          year={this.props.data.timelineYear2}
          images={this.props.data.timelineImage2}
          content={this.props.data.timelineContent2}
          bg={"bg-near-white"}
        />

        <Transition id={"28-transition"} text={this.props.data.transitionText[8]} bg={"bg-white"}/>

        <Transition
          id={"29-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationBird[0]}
          text={"我們可以:節水"}
        />

        <CenterSmallVideo
          id={"30-centerSmallVideo"}  
          videoID="05"
          text={this.props.data.videoText[3]}
          link={this.props.data.video[3]}
          sound={false}
        />

        <Transition
          id={"31-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationBird[1]}
          text={"我們可以:降低漏水率"}
        />

        <Blog
          id={"32-blog"}
          number={1}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Transition
          id={"33-transition"} 
          title={"transitionTitle"}
          bg={"bg-white black tc"}
          illustration={this.props.data.illustrationBird[2]}
          text={"我們可以:區域性總量管制"}
        />

        <CenterSmallVideo
          id={"34-video"} 
          videoID="06"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
          playing={true}
        />

        <CenterVideo 
          id={"35-centerVideo"} 
          videoID="07"
          link={this.props.data.video[5]}
          text1={this.props.data.videoText[5]}
          bg={false}
          playing={false}
          sound={false}
        />

        <EndingVideo id={"36-endingVideo"} text={"再看一眼，湖山水庫..."} link={"https://youtube.com/embed/MpiZ6kbim2g?rel=0"}/>
        <More id={"37-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#85A48C"}/>
        <CTA id={"38-cta"} switchView={this.props.switchView} next={"asia-cement-cost"} nextN={"挖山取石的代價"}/>
      </div>
    );
  }
}

class Event09 extends Component {
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
        <CoverVideo id={"1-coverVideo"} code={this.props.data.code} name={this.props.data.title} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"}
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "53%"
          shipPositionT = "17%"
        />

        <Illustration
          id={"3-illustration"}
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoText
          id={"4-photoText"}
          order="right"
          color="invert"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
          info={"資料來源：礦務局2018年10月資料"}
        />

        <PhotoTextFull
          id={"5-photoTextFull"}
          position={"fr-l"}
          objectP={"43%"}
          text1={this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
          copyright = {"Image is from 2018/©️DigitalGlobe,©️CNES/Airbus"}
        />

        <CenterSmallVideo
          id={"6-centerSmallVideo"}  
          videoID="01"
          text={this.props.data.transitionText[3]}
          link={this.props.data.video[0]}
          sound={false}
        />

        <PhotoTextFull
          id={"7-photoTextFull"}
          position={"fl-l"}
          text1={this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />

        <Blog
          id={"8-blog"}
          number={3}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
          more={"以上照片提供:田春綢"}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <Transition id={"16-transition"} text={this.props.data.transitionText[1]} bg={"bg-near-white"}/>

        <PhotoTextFull
          id={"7-photoTextFull"}
          position={"fl-l"}
          text1=""
          image = {this.props.data.photoFull[5]}
          label = {this.props.data.photoFullTextLabel[5]}
          objectP = {"65%"}
        />

        <TimeChangeFull
          id={"10-timeChangeFull"}
          position={"fl-l"}
          text1={this.props.data.timeChangeText[0]}
          image = {this.props.data.timeChangePhoto[0]}
          label = {this.props.data.timeChangeLabel[0]}
          count="1-2"
          first={true}
          up={"18%"}
          upM={"58%"}
        />
        <TimeChangeFull
          id={"11-timeChangeFull"}
          position={"fl-l"}
          last={true}
          text1={this.props.data.timeChangeText[0]}
          image = {this.props.data.timeChangePhoto[1]}
          label = {this.props.data.timeChangeLabel[1]}
          count="2-2"
          up={"18%"}
          upM={"58%"}
        />

        <PhotoText
          id={"12-photoText"}
          order="left"
          large={true}
          text={this.props.data.photoText[2]}
          image = {this.props.data.photoImage[2]}
        />

        <Video 
          id={"13-video"}
          videoID="03"
          link={this.props.data.video[3]}
          text1=""
          playing={true}
        />

        <TimeChangeFull
          id={"14-timeChangeFull"}
          position={"fl-l"}
          text1={this.props.data.timeChangeText[1]}
          image = {this.props.data.timeChangePhoto[2]}
          label = {this.props.data.timeChangeLabel[2]}
          count="1-2"
          first={true}
          move={true}
          up={"18%"}
          copyright = {"Image is from 2018/©️DigitalGlobe,©️CNES/Airbus"}
        />
        <TimeChangeFull
          id={"15-timeChangeFull"}
          position={"fl-l"}
          last={true}
          text1={this.props.data.timeChangeText[1]}
          image = {this.props.data.timeChangePhoto[3]}
          label = {this.props.data.timeChangeLabel[3]}
          count="2-2"
          move={true}
          up={"18%"}
          copyright = {"Image is from 2018/©️DigitalGlobe,©️CNES/Airbus"}
        />

        <CenterSmallVideo
          id={"17-video"} 
          videoID="04"
          link={this.props.data.video[4]}
          playing={true}
          text={this.props.data.transitionText[2]}
        />

        <Blog
          id={"18-blog"}
          number={2}
          bg={"bg-near-white"}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
        />   

        <SmallVideo 
          id={"19-smallVideo"} 
          videoID="05"
          link={this.props.data.video[1]}
          text={this.props.data.transitionText[4]}
          sound={false}
        />

        <PhotoTextFull
          id={"20-photoTextFull"}
          position={"fl-l"}
          text1={this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
          objectP={"60%"}
        />

        <PhotoSwitch 
          id={"21-photoSwitch"}
          position={"fl-l"}
          images={this.props.data.photoswitch2} 
          text1={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel2}
        />

        <Blog
          id={"22-blog"}
          number={4}
          text={this.props.data.blogText[2]}
          image={this.props.data.blogImage[2]}
          label={this.props.data.blogLabel[2]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Blog
          id={"23-blog"}
          number={1}
          bg={"bg-near-white"}
          text={this.props.data.blogText[3]}
          image={this.props.data.blogImage[3]}
          label={this.props.data.blogLabel[3]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <PhotoCenterTextFull
          id={"24-photoCenterTextFull"} 
          text1={this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[4]}
          label = {this.props.data.photoFullTextLabel[4]}
        />

        <Timeline
          id={"16-timeline"}
          height={300}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.photoText[1]}
          bg={"bg-near-white"}
          noImg={true}
        />

        <EndingVideo id={"26-endingVideo"} text={"一起來關心 山林採礦"} link={"https://youtube.com/embed/DwvwCxkHN-Q?start=1195&rel=0"}/>
        <More id={"27-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#85A48C"}/>
        <CTA id={"28-cta"} switchView={this.props.switchView} next={"lishan-high-mountain-farms"} nextN={"咬一口高山青翠"}/>
      </div>
    );
  }
}

class Event10 extends Component {
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
        <CoverVideo id={"1-coverVideo"} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"}
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "38%"
          shipPositionT = "30%"
        />

        <Illustration
          id={"3-illustration"}
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoTextFull
          id={"4-photoTextFull"}
          text1 = {this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <Transition id={"5-transition"} text={this.props.data.transitionText[0]} bg={"bg-white"}/>

        <PhotoTextFull
          id={"6-photoTextFull"}
          text1 = {this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
          position = {"fr-l"}
        />

        <CenterSmallVideo
          id={"7-centerSmallVideo"}
          videoID="01"
          text={this.props.data.videoText[0]}
          link={this.props.data.video[0]}
          sound={false}
        />

        <PhotoSwitch
          id={"8-photoSwitch"}
          number = {1} 
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          label={this.props.data.photoswitchLabel}
        />

        <Transition id={"9-transition"} text={this.props.data.transitionText[1]} bg={"bg-white"}/>

        <PhotoTextFull
          id={"10-photoTextFull"}
          position = {"fr-l"}
          text1 = {this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
          objectP = {"10%"}
          copyright = {'Image is from 2019,©DigitalGlobe,Terra Metrics,©CNES/Airbus'}
        />

        <Video 
          id={"11-centerVideo"} 
          videoID="02"
          link={this.props.data.video[1]}
          text1={this.props.data.videoText[1]}
          bg={false}
          playing={true}
          sound={false}
        />

        <SmallVideo 
          id={"12-smallVideo"}
          videoID="03"
          link={this.props.data.video[2]}
          text={this.props.data.videoText[2]}
          bg={"bg-near-white"}
        />

        <section id={"illustration"} className="pt6-ns pt5 ph4-ns ph3 center below tc">
          <img src={this.props.data.illustrationMore[2]} className="w-third-l w-80 hide" alt="illustration" />
        </section>

        <Blog
          id={"13-blog"}
          number={4}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <PhotoTextFull
          id={"14-photoTextFull"}
          text1 = {this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />

        <CenterSmallVideo 
          id={"15-centerSmallVideo"}
          videoID="04"
          link={this.props.data.video[3]}
          text={this.props.data.videoText[3]}
        />

        <SmallVideo 
          id={"16-smallVideo"}
          videoID="05"
          link={this.props.data.video[4]}
          text={this.props.data.videoText[4]}
          bg={"bg-near-white"}
          reverse = {true}
        />

        <section id={"illustration"} className="pt6-ns pt5 ph4-ns ph3 center below tc">
          <img src={this.props.data.illustrationMore[1]} className="w-third-l w-80 hide" alt="illustration" />
        </section>
        <Transition id={"17-transition"} text={this.props.data.transitionText[2]} bg={"bg-white"}/>

        <Video 
          id={"18-video"}
          videoID="06"
          link={this.props.data.video[5]}
          text1=""
          playing={true}
        />

        <section id={"illustration"} className="pt6-ns pt5 ph4-ns ph3 center below tc">
          <img src={this.props.data.illustrationMore[0]} className="w-third-l w-80 hide" alt="illustration" />
        </section>
        <Transition id={"19-transition"} text={this.props.data.transitionText[3]} bg={"bg-white"}/>
        
        {/*
        
        <SmallVideo 
          id={"20-smallVideo"}
          videoID="07"
          link={this.props.data.video[6]}
          text={this.props.data.videoText[6]}
          bg={"bg-white"}
        />
        */}

        <PhotoTextFull
          id={"21-photoTextFull"}
          text1 = {this.props.data.photoFullText[4]}
          image = {this.props.data.photoFull[4]}
          label = {this.props.data.photoFullTextLabel[4]}
        />

        <Timeline
          id={"23-timeline"}
          height={560}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.transitionText[4]}
          bg={"bg-white"}
        />

        <Blog
          id={"24-blog"}
          bg={"bg-near-white"}
          number={1}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Video 
          id={"25-video"}
          videoID="08"
          link={this.props.data.video[7]}
          text1=""
          playing={true}
        />

        <PhotoCenterTextFull
          id={"26-photoCenterFull"}
          text1 = {this.props.data.photoFullText[5]}
          image = {this.props.data.photoFull[5]}
          label = {this.props.data.photoFullTextLabel[5]}
          objectP = {"20%"}
        />

        <EndingVideo id={"27-endingVideo"} text={"當農地變成工業區"} link={"https://youtube.com/embed/iwcWyreW9nA?rel=0"}/>
        <More id={"28-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#CF9479"}/>
        <CTA id={"29-cta"} switchView={this.props.switchView} next={"petrochemical-kingdom"} nextN={"海上的石化王國"}/>
      </div>
    );
  }
}

class Event11 extends Component {
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
        <CoverVideo id={"1-coverVideo"} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "35%"
          shipPositionT = "30%"
        />

        <Illustration
          id={"3-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <SmallVideo 
          id={"4-smallVideo"}
          videoID="01"
          link={this.props.data.video[0]}
          text={this.props.data.videoText[0]}
          bg={"bg-near-white"}
        />

        <PhotoTextFull
          id={"5-photoTextFull"}
          text1 = {this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />

        <PhotoMultiple
          id={"6-photoMultiple"} 
          text={this.props.data.photoMultipleText}
          images={this.props.data.photoMultiple}
          label={this.props.data.photoMultipleLabel}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <Timeline
          id={"7-timeline"} 
          height="480"
          bg={"bg-near-white"}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
          scrollTitle={"這座石化王國是如何形成的？"}
        />

        <SmallVideo 
          id={"8-smallVideo"}
          videoID="02"
          link={this.props.data.video[1]}
          text={this.props.data.videoText[1]}
          bg={"bg-white"}
        />

        <PhotoText
          id={"9-photoText"}
          order="left"
          color="invert"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
        />

        <Transition id={"10-transition"} text={this.props.data.transitionText[0]} bg={"bg-white"}/>

        <PhotoText
          id={"11-photoText"}
          order="right"
          color="invert"
          text={this.props.data.photoText[1]}
          image = {this.props.data.photoImage[1]}
        />
        
        <Transition id={"12-transition"} text={this.props.data.transitionText[1]} bg={"bg-white"}/>

        <Video 
          id={"13-video"}
          videoID="03"
          link={this.props.data.video[2]}
          text1={this.props.data.videoText[2]}
          playing={true}
        />

        <Transition id={"14-transition"} text={this.props.data.transitionText[2]} bg={"bg-white"}/>

        <Video 
          id={"15-video"}
          videoID="04"
          link={this.props.data.video[3]}
          text1={this.props.data.videoText[3]}
        />
        
        <PhotoAudioPlay
          id={"16-photoAudioPlay"}
          content={this.props.data.photoAudioContent}
          audio={this.props.data.photoAudio}
          image={this.props.data.photoAudioPhoto}
          text={this.props.data.photoAudioText}
          name={this.props.data.photoAudioName}
        />

        <SmallVideo 
          id={"17-smallVideo"}
          videoID="05"
          link={this.props.data.video[4]}
          text={this.props.data.videoText[4]}
          bg={"bg-near-white"}
        />

        <PhotoTextFull
          id={"18-photoTextFull"}
          position={"fr-l"}
          text1={this.props.data.photoText[2]}
          image = {this.props.data.photoFull[1]}
          small = {true}
        />

        <CenterSmallVideo 
          id={"19-smallVideo"}
          videoID="06"
          link={this.props.data.video[5]}
          text={this.props.data.videoText[5]}
          bg={"bg-white"}
        />

        <Blog
          id={"20-blog"}
          number={5}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
          onOpenModal={this.onOpenModal.bind(this)}
          bg={"bg-near-white"}
        />

        <PhotoText
          id={"21-photoText"}
          order="right"
          text={this.props.data.photoText[3]}
          image = {this.props.data.photoImage[3]}
          info={"2018年詹長權將雲林縣麥寮、台西鄉（深色區）設定為高曝露區，周邊其他鄉鎮（淺色區）列為低曝露區作為對照組。"}
        />

        <Blog
          id={"22-blog"}
          number={1}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          onOpenModal={this.onOpenModal.bind(this)}
          bg={"bg-near-white"}
        />

        <Transition id={"23-transition"} text={this.props.data.transitionText[3]} bg={"bg-white"}/>
          
        <PhotoTextFull
          id={"24-photoTextFull"}
          text1 = {this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />
        <Blog
          id={"25-blog"}
          number={2}
          text={this.props.data.photocontrastText}
          image={this.props.data.photocontrast}
          label={this.props.data.photocontrastLabel}
          onOpenModal={this.onOpenModal.bind(this)}
          bg={"bg-white"}
        />
        <Blog
          id={"26-blog"}
          number={2}
          text=""
          image={this.props.data.photocontrast2}
          label={this.props.data.photocontrastLabel2}
          onOpenModal={this.onOpenModal.bind(this)}
          bg={"bg-near-white"}
        />

        <PhotoCenterTextFull
          id={"27-photoTextCenterFull"}
          text1 = {this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />

        <EndingVideo id={"28-endingVideo"} text={"想了解六輕更多"} link={"https://youtube.com/embed/cg4lgyEdY8g?rel=0"}/>
        <More id={"29-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#CF9479"}/>
        <CTA id={"30-cta"} switchView={this.props.switchView} next={"soil-pollution-tainan"} nextN={"焦土"}/>
      </div>
    );
  }
}

class Event12 extends Component {
  render() {
    return (
      <div>
        <CoverVideo id={"1-coverVideo"} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "34%"
          shipPositionT = "50%"
        />

        <Illustration
          id={"3-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoText
          id={"4-photoText"}
          order="right"
          text={this.props.data.photoText[2]}
          image = {this.props.data.photoImage[2]}
          bg={this.props.data.photoImage[3]}
          noWhite={true}
        />

        <Transition id={"5-transition"} text={this.props.data.transitionText[0]} bg={"bg-white"}/>

        <Video 
          id={"6-video"}
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
          playing={true}
        />

        <PhotoText
          id={"7-photoText"}
          order="right"
          text={this.props.data.photoText[0]}
          image = {this.props.data.photoImage[0]}
        />

        <CenterSmallVideo 
          id={"8-centerSmallVideo"}
          videoID="02"
          link={this.props.data.video[1]}
          text={this.props.data.videoText[1]}
          color={"invert"}
        />

        <PhotoTextFull
          id={"9-photoTextFull"}
          text1={this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
        />
        <Transition id={"10-transition"} text={this.props.data.transitionText[1]} bg={"bg-near-white"}/>

        <SmallVideo 
          id={"11-smallVideo"}
          videoID="03"
          link={this.props.data.video[2]}
          text={this.props.data.videoText[2]}
        />

        <Timeline
          id={"12-timeline"}
          height={560}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
          bg={"bg-near-white"}
          noY={true}
        />

        <SmallVideo 
          id={"13-smallVideo"}
          videoID="04"
          link={this.props.data.video[3]}
          text={this.props.data.videoText[3]}
        />

        <Video 
          id={"14-video"}
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
        />

        <Timeline
          id={"15-timeline"}
          height={560}
          text={this.props.data.timelineText1}
          year={this.props.data.timelineYear1}
          images={this.props.data.timelineImage1}
          content={this.props.data.timelineContent1}
          bg={"bg-white"}
        />

        <PhotoCenterTextFull
          id={"16-photoCenterTextFull"} 
          text1 = {this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
          bg={true}
        />

        <PhotoCenterTextFull
          id={"17-photoCenterTextFull"} 
          text1 = {this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
          bg={true}
        />

        <PhotoText
          id={"18-photoText"}
          order="right"
          color="invert"
          text={this.props.data.photoText[1]}
          image = {this.props.data.photoImage[1]}
        />


        <EndingVideo id={"19-endingVideo"} text={"來看台鹼安順廠所遺留下的毒害"} link={"https://youtube.com/embed/FdCu9lOMolc?rel=0"}/>
        <More id={"20-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#CF9479"}/>
        <CTA id={"21-cta"} switchView={this.props.switchView} next={"mercury-sludge-volcano"} nextN={"無人知曉的未爆彈"}/>
      </div>
    );
  }
}

class Event13 extends Component {
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
        <CoverVideo id={"1-coverVideo"} title={this.props.data.coverTitle} content={this.props.data.coverDescription} link={this.props.data.coverVideo}/>
        
        <Taiwan
          id={"2-taiwan"} 
          text1={this.props.data.taiwanText[0]}
          text2={this.props.data.taiwanText[1]}
          illustration = {this.props.data.taiwan}
          
          shipPositionL = "40%"
          shipPositionT = "60%"
        />

        <Illustration
          id={"3-illustration"} 
          number = {1}
          text1={this.props.data.illustrationText[0]}
          illustration = {this.props.data.illustration}
        />

        <PhotoCenterTextFull
          id={"4-photoCenterTextFull"} 
          text1 = {this.props.data.photoFullText[0]}
          image = {this.props.data.photoFull[0]}
          label = {this.props.data.photoFullTextLabel[0]}
          objectP={"30%"}
        />

        <Blog
          id={"5-blog"}
          number={1}
          text={this.props.data.blogText[0]}
          image={this.props.data.blogImage[0]}
          label={this.props.data.blogLabel[0]}
        />

        <Transition id={"6-transition"} text={this.props.data.transitionText[0]} bg={"bg-near-white"}/>

        <Video 
          id={"7-video"}
          videoID="01"
          link={this.props.data.video[0]}
          text1={this.props.data.videoText[0]}
          playing={true}
        />

        <PhotoTextFull
          id={"8-photoTextFull"} 
          text1 = {this.props.data.photoFullText[1]}
          image = {this.props.data.photoFull[1]}
          label = {this.props.data.photoFullTextLabel[1]}
        />

        <SmallVideo 
          id={"9-smallVideo"}
          videoID="02"
          link={this.props.data.video[1]}
          text={this.props.data.videoText[1]}
        />

        <Blog
          id={"10-blog"}
          number={1}
          text={this.props.data.blogText[1]}
          image={this.props.data.blogImage[1]}
          label={this.props.data.blogLabel[1]}
          bg={"bg-near-white"}
        />

        <PhotoSwitch
          id={"11-photoSwitch"}
          number = {2} 
          images={this.props.data.photoswitch} 
          text1={this.props.data.photoswitchText}
          text2={this.props.data.photoswitchText2}
          label={this.props.data.photoswitchLabel}
        />

        <Timeline
          id={"12-timeline"} 
          height="480"
          bg={"bg-white"}
          text={this.props.data.timelineText}
          year={this.props.data.timelineYear}
          images={this.props.data.timelineImage}
          content={this.props.data.timelineContent}
        />

        <SmallVideo 
          id={"13-smallVideo"}
          videoID="04"
          link={this.props.data.video[3]}
          text={this.props.data.videoText[3]}
          bg={"bg-near-white"}
        />

        <Video 
          id={"14-video"}
          videoID="05"
          link={this.props.data.video[4]}
          text1={this.props.data.videoText[4]}
          playing={true}
        />

        <Transition id={"15-transition"} text={this.props.data.transitionText[1]} bg={"bg-white"}/>

        <Video 
          id={"16-video"}
          videoID="06"
          link={this.props.data.video[5]}
          text1={this.props.data.videoText[5]}
        />

        <PhotoTextFull
          id={"17-photoTextFull"}
          position={"fr-l"}
          text1 = {this.props.data.photoFullText[2]}
          image = {this.props.data.photoFull[2]}
          label = {this.props.data.photoFullTextLabel[2]}
        />

        <PhotoMultiple
          id={"18-photoMultiple"} 
          title={"各地廢棄物棄置現場"}
          text={this.props.data.photoMultipleText}
          images={this.props.data.photoMultiple}
          label={this.props.data.photoMultipleLabel}
          onOpenModal={this.onOpenModal.bind(this)}
        />

        <Modal open={open} onClose={this.onCloseModal} center classNames={{modal: "modalImg", closeButton: "closeButton-circle"}}>
          <img src={this.state.image} alt="modal"/>
          <p className="f6-ns f8 tc mb0 lh-normal pn">{this.state.description}</p>
        </Modal>

        <PhotoCenterTextFull
          id={"19-photoCenterTextFull"} 
          text1 = {this.props.data.photoFullText[3]}
          image = {this.props.data.photoFull[3]}
          label = {this.props.data.photoFullTextLabel[3]}
        />

        <EndingVideo id={"20-endingVideo"} text={"重回污染現場"} link={"https://youtube.com/embed/AeX1vJVP-nI?rel=0"}/>
        <More id={"21-more"} link={this.props.data.moreLink} title={this.props.data.moreTitle} color={"#CF9479"}/>
        <CTA id={"22-cta"} switchView={this.props.switchView} next={"science-park-landuse"} nextN={"無土時代"}/>
      </div>
    );
  }
}

