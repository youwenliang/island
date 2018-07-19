import React, { Component } from 'react';
import {Helmet} from "react-helmet";
import loadImage from 'image-promise';
import data from '../data/data.js'
import $ from 'jquery';
import mousewheel from 'jquery-mousewheel';
import dragscroll from 'dragscroll';

// Story Data
const story_data = data.stories;
const topic_data = data.topics;
const date_data = data.dates;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      area: ''
    };
  }
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
  }

  // Story Component
  story = (content) => {
    return (
      <li className="storyItem item h5 w5 dib bg-dark-gray white mh3">
        <div className="pa4">
          <h3 className="ma0">{content.name}</h3>
          <h5 className="ma0">{content.time}</h5>
        </div>
      </li>
    );
  }
  storyList = () => {
    let filteredStories = story_data.filter((s) => { return s.keywords.indexOf(this.state.search) != -1 && s.keywords.indexOf(this.state.area) != -1;});
    return (<ul className="storyBox pa0 nowrap list overflow-x-scroll dragscroll">{filteredStories.map((s) => { return this.story(s) })}</ul>);
  }

  // Topic Component
  topic = (t) => {
    return (<li className="dib pa2 mr2 bg-white cp ph4" id={t.keyword} onClick={this.updateTopic.bind(this)}>{t.title}</li>);
  }
  topicList = () => {
    return (<ul className="list pa0 nowrap list overflow-x-scroll dragscroll">{topic_data.map((t) => { return this.topic(t); })}</ul>)
  }

  // Date Component
  date = (d) => {
    return (<li className="w-20 tc dib pa2 bg-white cp" onClick={this.updateDate.bind(this)}>{d}</li>);
  }
  dateList = () => {
    return (<ul className="list pa0">{date_data.map((d) => { return this.date(d); })}</ul>)
  }

  // Update Search
  updateSearch = (event) => {
    if(event) event.preventDefault();
    const key = this.refs.keyword.value;
    const key_area = this.refs.areas.value;
    this.setState({
      search: key.substr(0,20),
      area: key_area
    });
  }
  updateTopic = (event) => {
    if(event) event.preventDefault();
    const key = event.target.id;
    this.setState({
      search: key,
      area: "",
    });
    this.refs.keyword.value = key;
    this.refs.areas.value = '';
  }
  updateDate = (event) => {
    if(event) event.preventDefault();
    const key = event.target.innerHTML;
    this.setState({
      search: key,
      area: "",
    });
    this.refs.keyword.value = key;
    this.refs.areas.value = '';
  }

  render() {
    return (
      <section id="timeline" className="min-vh-100 bg-light-gray pv5-l pv3">
        <Helmet>
            <title>Timeline</title>
        </Helmet>
        <div className="mw8 center ph3 mv4">
          <div className="cf ph2-ns mb5">
            <div className="fl w-100 w-30-l ph2">
              <h1 className="ma0">Search</h1>
            </div>
            <div className="fl w-100 w-70-l ph2">
              <form onSubmit={this.updateSearch.bind(this)}>
                <input id="search_input" className="w-70" type="text" ref="keyword"/>
                <select name="areas" ref="areas">
                  <option value="">全部地區</option>
                  <option value="north">北部地區</option>
                  <option value="central">中部地區</option>
                  <option value="south">南部地區</option>
                  <option value="others">其他</option>
                </select>
                <input type="submit" value="search" />
              </form>
            </div>
          </div>
          {this.topicList()}    
        </div>
        <div className="storyContainer">
          {this.storyList()}
        </div>
        <div className="mw8 center ph3 mv4">
          <div className="cf ph2-ns">
            {this.dateList()}
          </div>
        </div>
      </section>
    );
  }
}

export default Search;
