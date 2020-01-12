import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js'
import $ from 'jquery';
import mousewheel from 'jquery-mousewheel'; // eslint-disable-line no-unused-vars
import dragscroll from 'dragscroll'; // eslint-disable-line no-unused-vars
import Modal from 'react-responsive-modal';
import {TweenMax} from "gsap/all";
import ReactList from 'react-list'; // eslint-disable-line no-unused-vars
import Image from "react-graceful-image";
import Swiper from 'swiper/dist/js/swiper.js';
import Nav from '../component/Nav';
import Cookies from 'universal-cookie';

// Story Data
const story_data = data.stories;
const topic_data = data.topics;
const date_data = data.dates;
var divides = [];
var offset_i = 520;
var offset_w = 440;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      area: '',
      open: false,
      content: {},
      topic: 0
    };
    divides = [
      offset_i + (this.findDate('7') - topic_data.length)*offset_w,
      offset_i + (this.findDate('8') - topic_data.length)*offset_w,
      offset_i + (this.findDate('9') - topic_data.length)*offset_w,
      offset_i + (this.findDate('0') - topic_data.length)*offset_w,
      offset_i + (this.findDate('1') - topic_data.length)*offset_w
    ];
    // console.log(divides);
  }

  onOpenModal = (event, c) => {
    if(!$(event.target).hasClass('noClick') && c.time !== "") {
      this.setState({ open: true, content: c});
    }
    $(document).ready(function(){
      console.log("swiper!");
      var mySwiper = new Swiper ('.swiper-container', { // eslint-disable-line no-unused-vars
        // Optional parameters
        autoHeight: true,
        allowTouchMove: true,
        loop: true,
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
        // Navigation arrows
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }
      })
    })
  };

  onCloseModal = () => {
    this.setState({ open: false });
    $('.noClick').removeClass('noClick');
  };

  componentDidMount() {
    $(document).scrollTop(0);
    $('#storyBox').scrollLeft(0);

    // Horizontal Scroll
    $('.storyBox').mousewheel(function(event, change) {
      this.scrollLeft -= (change * 1); //need a value to speed up the change
      event.preventDefault();
    });

    // Set Height
    function setHeight() {
      var windowHeight = $(window).height(),
        $block = $('#timeline');
        if(windowHeight > 550) { // 550px is your css min-height for this block
          $block.css('min-height', windowHeight + 'px')
        } else {
          $block.css('min-height', '')
        }
    }
    setHeight();
    $(window).on('resize orientationchange', setHeight);

    // Init Page
    const cookies = new Cookies();
    var $t = this;

    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    var images  = [];
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

    var $this = this;
    $(document).ready(function(){
      var scroll = document.getElementById("scrollRange");
      var panel = document.getElementById("storyBox");
      scroll.oninput = function (el) {
        var total = panel.scrollWidth - panel.offsetWidth;
        var percentage = total*(this.value/100);
        panel.scrollLeft = percentage;
        window.scrollTo(window.scrollX, window.scrollY + 1);
        window.scrollTo(window.scrollX, window.scrollY - 1);
        $this.activeScroll(panel);
      }
      panel.onscroll = function (el) {
        var total = panel.scrollWidth - panel.offsetWidth;
        scroll.value = panel.scrollLeft*100/total;
        window.scrollTo(window.scrollX, window.scrollY + 1);
        window.scrollTo(window.scrollX, window.scrollY - 1);
        $this.activeScroll(panel);
      }
    });
  }

  activeScroll = (p) => {
      if(p.scrollLeft < divides[4] && p.scrollLeft >= divides[3]) {
        if(!$('.dateContainer li:nth-child(4)').hasClass('active')) {
          $('.dateContainer li.active').removeClass('active');
          $('.dateContainer li:nth-child(4)').addClass('active');
        }
      }
      else if(p.scrollLeft < divides[3] && p.scrollLeft >= divides[2]) {
        if(!$('.dateContainer li:nth-child(3)').hasClass('active')) {
          $('.dateContainer li.active').removeClass('active');
          $('.dateContainer li:nth-child(3)').addClass('active');
        }
      }
      else if(p.scrollLeft < divides[2] && p.scrollLeft >= divides[1]) {
        if(!$('.dateContainer li:nth-child(2)').hasClass('active')) {
          $('.dateContainer li.active').removeClass('active');
          $('.dateContainer li:nth-child(2)').addClass('active');
        }
      }
      else if(p.scrollLeft < divides[1]) {
        if(!$('.dateContainer li:nth-child(1)').hasClass('active')) {
          $('.dateContainer li.active').removeClass('active');
          $('.dateContainer li:nth-child(1)').addClass('active');
        }
      }
      else {
        if(!$('.dateContainer li:nth-child(5)').hasClass('active')) {
          $('.dateContainer li.active').removeClass('active');
          $('.dateContainer li:nth-child(5)').addClass('active');
        }
      }
  }

  stories = (s, i) => {
    let d = " dib";
    if(this.state.search === "" && s.keywords.indexOf("topic") !== -1) d = " dn";

    // Topic Cards
    let style = " bg-white dark-gray w6-ns w5 card";
    let image = " db";
    let pa = "pa3";
    let tscale = "";
    var icon = "";
    if(s.time === "") {
      pa = "pa4";
      tscale = "scaleup";
      style = " bg-white dark-gray w7-ns w5 pa3";
      image = " dn";
      if(this.state.topic <= 5) icon = (<img src={topic_data[this.state.topic].icon} width="44" height="44" className="pr3 icon" alt={topic_data[this.state.topic].title}/>);
      else d = " dn";
    } else {
      image = " flex aic"
    }
    if(this.state.topic === 0) {
      icon = ""
    }
    let cover = ""
    if(s.images !== undefined) {
      cover = s.images[0];
    }
    var figure = {
      margin: "1rem 1rem 0 1rem"
    }


    return (
      <li className={"storyItem item cp mh3"+d+style} key={i} onClick={(e) => this.onOpenModal(e, s)}>
        <div className="pn">
          <figure className={"ma0 vh-22 overflow-hidden"+image} style={figure}>
            <Image
              src={cover}
              width="100%"
              height="100%"
              alt="story"
            />
          </figure>
          <div className={pa+" tl"}>
            <h3 className={"ma0 f4-ns f5 initial lh-copy flex aic "+tscale}>{icon}{s.name}</h3>
            <p className="mv2 f5-ns f6">{s.time}</p>
          </div>
        </div>
      </li>
    );
  }

  // Story Component
  storyList = () => {
    let filteredStories = story_data.filter((s) => {
      return s.keywords.indexOf(this.state.search) !== -1 && s.keywords.indexOf(this.state.area) !== -1;
    });
    return (<ul id="storyBox" className="storyBox tc pa0 nowrap list overflow-x-scroll dragscroll z4 relative">{filteredStories.map((s, i) => {
      return this.stories(s, i);
    })}</ul>);
  }

  // Topic Component
  topicList = () => {
    return (<ul className="topicBox mw8-ns center list flex space-between pa0 ph2-ns nowrap list overflow-x-scroll dragscroll">{topic_data.map((t, i) => {
      let highlight = '';
      let img = (<img src={t.icon} width="36" height="36" className="pr2" alt={t.title}/>);
      if(t.title === '全部事件') {
        highlight = 'active'
        img = ''
      }
      return (
        <li className={"dib w-100 pa2 mh2 bg-white cp ph4 tc br4 "+highlight} key={i} data-num={i} id={t.keyword} onClick={this.updateTopic.bind(this)}>
          {img}
          {t.title}
        </li>
      );
    })}</ul>)
  }

  // Date Component
  scrollDate = (event) => {
    var t = event.target.innerHTML.toString()[2];
    var scrollL = offset_i + (this.findDate(t) - topic_data.length)*offset_w;
    $('#storyBox').animate( {scrollLeft: scrollL}, 400);
  }

  dateList = () => {
    let disable = ''
    if(this.state.search !== '') disable = 'none';

    return (<ul className={"list pa0 mb0 "+disable}>{date_data.map((d, i) => {
      let highlight = '';
      if(d === '1970') highlight = 'active';
      return (
        <li className={"w-20 tc dib pa2 bg-white cp ba bw1 b--white " + highlight} key={i} onClick={this.scrollDate.bind(this)}>{d}</li>
      );
    })}</ul>)
  }

  // Update Search
  updateSearch = (event) => {
    if(event) event.preventDefault();
    const key = this.refs.keyword.value;
    if(key !== "") {
      $('.topicContainer .active').removeClass('active');
      const key_area = this.refs.areas.value;
      var $this = this;
      var tween = TweenMax.to($('.storyBox'), .2, {opacity: 0});
      tween.eventCallback("onComplete", function(){
        TweenMax.to($('.storyBox'), .4, {opacity: 1});
      });

      $this.setState({
        search: key.substr(0,20),
        area: key_area,
        topic: 6
      });
      $('.storyBox').scrollLeft(0);
    }
  }
  updateTopic = (event) => {
    if(!event.target.classList.contains('active')) {
      if(event) {
        $('.topicContainer .active').removeClass('active');
        event.target.classList.add('active');
        event.preventDefault();
      }
      const key = event.target.id;
      const id = event.target.dataset.num;
      var $this = this;
      var tween = TweenMax.to($('.storyBox'), .2, {opacity: 0});
      tween.eventCallback("onComplete", function(){
        TweenMax.to($('.storyBox'), .4, {opacity: 1});
        $this.setState({
          search: key,
          area: "",
          topic: id
        });
        $this.refs.keyword.value = key;
        $this.refs.areas.value = '';
        $('.storyBox').scrollLeft(0);
      });
    }
  }
  findDate = (n) => {
    for (var i = 0; i < story_data.length; i++) {
      if(n > 1) {
        if(story_data[i].time.toString().split('.')[0].indexOf('9'+n) !== -1) return i;
      } else {
        if(story_data[i].time.toString().split('.')[0].indexOf('20'+n) !== -1) return i;
      }
    }
  }

  render() {
    const { open } = this.state;
    let images = [];
    let imageLength = 0;
    if(this.state.content.images !== undefined) {
      images = this.state.content.images;
      imageLength = images.length;
    }

    var imageSlider = [];
    var all_content = null;
    var label = null;
    var bottomRight = {
      bottom: this.state.mobile ? "45px": "0",
      right: "0",
      background: "rgba(0,0,0,.2)",
      padding: this.state.mobile ? "10px" : "20px"
    }

    if(imageLength > 1) {
      for(var i = 0; i < imageLength; i++) {
        label = this.state.content.labels === undefined ? null : this.state.content.labels[i];
        var slides = (
          <div className="swiper-slide" key={i}>
            <figure className="mh0 mv4 modalImg">
              <img src={images[i]} alt="story" />
              <label className="white absolute lh-normal f6-ns f8 pn" style={bottomRight}>{label}</label>
            </figure>
          </div>
        )
        imageSlider.push(slides);
      }
      all_content = (
        <div className="swiper-container">
          <div className="swiper-wrapper">
            {imageSlider}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      )
    } else {
      label = this.state.content.labels === undefined ? null : this.state.content.labels[0];
      all_content = (
        <div className="image">
          <figure className="mh0 mv4 modalImg">
            <img src={images[0]} alt="story" />
            <label className="white absolute lh-normal f6-ns f8 pn" style={bottomRight}>{label}</label>
          </figure>
        </div>
      )
    }

    var form = {
      marginTop: "1.5px"
    }

    var link = "";
    if(this.state.topic > 5) {
      link = "https://fakeimg.pl/1920x1080/?text=search&retina=1"
    } else {
      link = topic_data[this.state.topic].background;
    }

    var storyBg = {
      backgroundImage: 'url('+link+')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center'
    }



    return (
      <section id="timeline" className="min-vh-100 bg-white pv5-l pv4">
        <Helmet>
            <title>台灣環境史三十年大事紀 - 我們的島二十週年</title>
        </Helmet>
        <Nav timeline={false} notfix={true} show={true}/>
        <div className="mw8-ns center ph3-ns mb4-ns pt4-l pt5">
          <div className="cf mb3-ns mb2">
            <div className="fl w-100 w-30-l flex aic mb3 mb0-l ph0-ns ph3 patitle">
              <h2 className="ma0 nowrap">大事紀標題</h2>
            </div>
            <div className="fl w-100 w-60-l">
              <form className="flex space-between aic" style={form} onSubmit={this.updateSearch.bind(this)}>
                <input id="search_input" className="w-100 ph2" type="text" ref="keyword" placeholder="搜尋紀事"/>
                <select name="areas" ref="areas" className="w150">
                  <option value="">全部地區</option>
                  <option value="area1">北北基</option>
                  <option value="area2">桃竹苗</option>
                  <option value="area3">中彰投</option>
                  <option value="area4">雲嘉南</option>
                  <option value="area5">高屏</option>
                  <option value="area6">宜花東</option>
                  <option value="area7">金馬澎蘭嶼</option>
                  <option value="others">不分區及其他</option>
                </select>
                <input type="submit" className="ph2 tc cp w4" id="searchButton" value="搜尋" />
              </form>
            </div>
          </div>
        </div>
        <div className="topicContainer pv3 bg-light-gray">
          {this.topicList()}
        </div>
        <div className="storyContainer relative" style={storyBg}>
          <div className="absolute w-100 h-100 top-left bg-black o-30"></div>
          {this.storyList()}
        </div>
        <div className="mw8 center ph3-ns mt4">
          <form className="rangeSlider ph3">
            <input id="scrollRange" className="w-100" type="range" defaultValue="0"/>
          </form>
          <div className="dateContainer cf">
            {this.dateList()}
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          {all_content}
          <div className="ph4-ns pb4 modalTxt">
            <h2 className="f3-ns f5">{this.state.content.name}</h2>
            <p className="lh-copy pre-wrap" dangerouslySetInnerHTML={{__html:this.state.content.content}}></p>
          </div>
        </Modal>
      </section>
    );
  }
}

export default Search;


