import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js'
import $ from 'jquery';
import mousewheel from 'jquery-mousewheel';
import dragscroll from 'dragscroll';
import Modal from 'react-responsive-modal';
import {TweenMax} from "gsap/all";
import ReactList from 'react-list';

// Story Data
const story_data = data.stories;
const topic_data = data.topics;
const date_data = data.dates;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      area: '',
      open: false,
      content: {}
    };
  }

  onOpenModal = (event, c) => {
    if(!$(event.target).hasClass('noClick') && c.time !== "") {
      this.setState({ open: true, content: c});
    }
  };

  onCloseModal = () => {
    this.setState({ open: false });
    $('.noClick').removeClass('noClick');
  };

  componentDidMount() {
    $(document).scrollTop(0);

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
          $block.css('min-height': '') 
        }
    }
    setHeight();
    $(window).on('resize orientationchange', setHeight);
    
    // Init Page
    document.body.classList.add('ds');
    document.getElementById('loading').classList.remove('fade');

    // Preload Images
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
      var scroll = document.getElementById("scrollRange");
      var panel = document.getElementById("storyBox");    
      scroll.oninput = function () {
        var total = panel.scrollWidth - panel.offsetWidth;
        var percentage = total*(this.value/100);
        console.log(total);
        panel.scrollLeft = percentage;
        //console.log(percentage);
      }
      panel.onscroll = function () {
        var total = panel.scrollWidth - panel.offsetWidth;
        scroll.value = panel.scrollLeft*100/total;
      }
    });
  }

  // Story Component
  story = (content) => {
    let d = " dib";
    if(this.state.search === "" && content.keywords.indexOf("topic") !== -1) d = " dn";

    // Topic Cards
    let style = " white bg-dark-gray w6-ns w5 h6";
    let image = " db";
    if(content.time === "") {
      style = " bg-white dark-gray w7-ns w5 h7";
      image = " dn";
    }
    return (
      <li className={"storyItem item cp mh3"+d+style} onClick={(e) => this.onOpenModal(e, content)}>
        <div className="pn">
          <figure className={"ma0"+image}>
            <img src="https://fakeimg.pl/600x350/?text=story&retina=1" alt="story" />
          </figure>
          <h3 className="ma0 pa4 tl">{content.name}</h3>
        </div>
      </li>
    );
  }
  storyList = () => {
    let filteredStories = story_data.filter((s) => { return s.keywords.indexOf(this.state.search) !== -1 && s.keywords.indexOf(this.state.area) !== -1;});
    return (
      <ul id="storyBox" className="storyBox tc pa0 nowrap list overflow-x-scroll dragscroll">
        {filteredStories.map((s) => { return this.story(s) })}
      </ul>
    );
  }

  // Topic Component
  topic = (t) => {
    return (<li className="dib w-100 pa2 mr2 bg-white cp ph4 tc" id={t.keyword} onClick={this.updateTopic.bind(this)}>{t.title}</li>);
  }
  topicList = () => {
    return (<ul className="topicBox list flex space-between pa0 ph2-ns nowrap list overflow-x-scroll dragscroll">{topic_data.map((t) => { return this.topic(t); })}</ul>)
  }

  // Date Component
  date = (d) => {
    return (<li className="w-20 tc dib pa2 bg-white cp">{d}</li>);
  }
  dateList = () => {
    return (<ul className="list pa0">{date_data.map((d) => { return this.date(d); })}</ul>)
  }

  // Update Search
  updateSearch = (event) => {
    if(event) event.preventDefault();
    const key = this.refs.keyword.value;
    const key_area = this.refs.areas.value;
    var $this = this;
    var tween = TweenMax.to($('.storyBox'), .2, {opacity: 0});
    tween.eventCallback("onComplete", function(){
      TweenMax.to($('.storyBox'), .6, {opacity: 1});
      $this.setState({
        search: key.substr(0,20),
        area: key_area
      });
      $('.storyBox').scrollLeft(0);
    });
  }
  updateTopic = (event) => {
    if(event) event.preventDefault();
    const key = event.target.id;
    var $this = this;
    var tween = TweenMax.to($('.storyBox'), .2, {opacity: 0});
    tween.eventCallback("onComplete", function(){
      TweenMax.to($('.storyBox'), .6, {opacity: 1});
      $this.setState({
        search: key,
        area: "",
      });
      $this.refs.keyword.value = key;
      $this.refs.areas.value = '';
      $('.storyBox').scrollLeft(0);
    });
  }
  // updateDate = (event) => {
  //   if(event) event.preventDefault();
  //   const key = event.target.innerHTML;
  //   var $this = this;
  //   var tween = TweenMax.to($('.storyBox'), .2, {opacity: 0});
  //   tween.eventCallback("onComplete", function(){
  //     TweenMax.to($('.storyBox'), .6, {opacity: 1});
  //     $this.setState({
  //       search: key,
  //       area: "",
  //     });
  //     $this.refs.keyword.value = key;
  //     $this.refs.areas.value = '';
  //     $('.storyBox').scrollLeft(0);
  //   });
  // }

  render() {
    const { open } = this.state;
    return (
      <section id="timeline" className="min-vh-100 bg-light-gray pv5-l pv3">
        <Helmet>
            <title>Timeline</title>
        </Helmet>
        <div className="mw8-ns center ph3-ns mv4-ns">
          <div className="cf ph2-ns mb5-ns mb2">
            <div className="fl w-100 w-30-l ph2">
              <h2 className="ma0-l mv4 tl-ns tc">台灣環境史三十年大事紀</h2>
            </div>
            <div className="fl w-100 w-70-l ph2-ns">
              <form className="flex space-between aic" onSubmit={this.updateSearch.bind(this)}>
                <input id="search_input" className="w-100 ph2" type="text" ref="keyword"/>
                <select name="areas" ref="areas">
                  <option value="">全部地區</option>
                  <option value="north">北部地區</option>
                  <option value="central">中部地區</option>
                  <option value="south">南部地區</option>
                  <option value="others">其他</option>
                </select>
                <input type="submit" className="ph2 tc cp w4" value="搜尋" />
              </form>
            </div>
          </div>
        </div>
        <div className="topicContainer mw8-ns center ph3-ns">
          {this.topicList()}
        </div>
        <div className="storyContainer mt5-ns mt3">
          {this.storyList()}
        </div>
        <div className="mw8 center ph3 mv4">
          <form className="rangeSlider">
            <input id="scrollRange" className="w-100" type="range" defaultValue="0"/>
          </form>
          <div className="cf ph2-ns">
            {this.dateList()}
          </div>
        </div>
        <Modal open={open} onClose={this.onCloseModal}>
          <figure className="mh0 mv4">
            <img src="https://fakeimg.pl/600x350/?text=story&retina=1" alt="story" />
          </figure>
          <h2>{this.state.content.name}</h2>
          <p>
            {this.state.content.content}
          </p>
        </Modal>
      </section>
    );
  }
}

export default Search;


