import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.js';
import $ from 'jquery';
import mousewheel from 'jquery-mousewheel'; // eslint-disable-line no-unused-vars
import dragscroll from 'dragscroll'; // eslint-disable-line no-unused-vars
import {TweenMax} from "gsap/all";

// Event Data
const event_data = data.events;

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [0,0,0]
    };
  }
  handleMouseEnter (id) {
    var topic = id.split('-')[0];
    var num = id.split('-')[1];
    var $this = this;
    var tween = null;

    switch(topic) {
    case "1":
      if($this.state.topics[0] === num-1) ;
      else {
        tween = TweenMax.to($('#topic-'+topic+' .eventBg'), .2, {opacity: 0});
        tween.eventCallback("onComplete", function(){
          TweenMax.to($('#topic-'+topic+' .eventBg'), .6, {opacity: 1});
          $this.setState({topics:[num-1,0,0]});
        });
      }
      break;
    case "2":
      if($this.state.topics[1] === num-1) ;
      else {
        tween = TweenMax.to($('#topic-'+topic+' .eventBg'), .2, {opacity: 0});
        tween.eventCallback("onComplete", function(){
          TweenMax.to($('#topic-'+topic+' .eventBg'), .6, {opacity: 1});
          $this.setState({topics:[0,num-1,0]});
        });
      }
      break;
    case "3":
      if($this.state.topics[2] === num-1) ;
      else {
        tween = TweenMax.to($('#topic-'+topic+' .eventBg'), .2, {opacity: 0});
        tween.eventCallback("onComplete", function(){
          TweenMax.to($('#topic-'+topic+' .eventBg'), .6, {opacity: 1});
          $this.setState({topics:[0,0,num-1]});
        });
      }
      break;
    default:
      break;
    }
  }
  componentDidMount() {
    $(document).ready(function(){

      //Init
      $('.eventItem').each(function(){
        TweenMax.to($(this), .001, {transform: "scale3d(0,0,0)"});
      });

      //Scroll
      var flag = [false, false, false];
      $(window).scroll( function(){
        for (var k = 1; k <= 3; k++) {
          var $this = $('#topic-'+k+' .eventBg');
          if($this.length !== 0) {
            var bottom_of_object = $this.offset().top + $this.outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            if( bottom_of_window > bottom_of_object + 50){
            if(!flag[k-1]) {
              $('#topic-'+k+' .eventItem').each(function(i){
                var $eventItem = $(this);
              setTimeout(function(){
                TweenMax.to($eventItem, .4, {transform: "scale3d(1,1,1)"});
                }, 50 + i * 50);
              });
              flag[k-1] = !flag[k-1];
            }
            } else if( bottom_of_window < bottom_of_object - 200){
              if(flag[k-1]) {
                $('#topic-'+k+' .eventItem').each(function(i){
                  TweenMax.to($(this), .4, {transform: "scale3d(0,0,0)"});
                });
                flag[k-1] = !flag[k-1];
              }
            }
          }
        }
      });

      //Check Width
      if($(window).width() < 850) {
        $('.eventBox').mousewheel(function(event, change) {
          this.scrollLeft -= (change * 1); //need a value to speed up the change
          event.preventDefault();
        });
      }
    });
  }

  event = (content, i) => {
    return (
      <li className="eventItem item dib center tc" key={i} onMouseEnter={() => this.handleMouseEnter(content.id)}>
        <Link to={"/ourisland/"+content.url+"/"}>
        <figure className="eventFigure h4 w4 br-100 ma3 bg-near-white">
          <img src={"https://fakeimg.pl/200x200/?text="+content.id+"&retina=1"} alt={content.name} />
        </figure>
        {content.name}
        </Link>
      </li>
    )
  }

  topics = (num) => {
    let list = [];
    const topic_title = event_data[num].title
    const event_content = event_data[num].content
    for(var i = 0; i < event_content.length; i++) {
      var content = event_content[i];
      list.push(this.event(content, i));
    }
    var bgUrl = "https://fakeimg.pl/1200x900/000000/ffffff/?text="+event_content[this.state.topics[num]].name+"&retina=1";
    var bgStyle = {
          backgroundImage: 'url('+bgUrl+')',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          height: '500px'
      }
    return (
      <section id={"topic-"+(num+1)} className="mt4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns hide">
            <div className="fl w-100 w-50-l ph2">
              <figure className="mh0">
                <img src={"https://fakeimg.pl/500x200/?text=illustration&retina=1"} alt={topic_title} />
              </figure>
            </div>
            <div className="fl w-100 w-50-l ph2 tl">
              <h2>{topic_title}</h2>
            </div>
          </div>
        </div>
        <div className="eventContainer relative hide mv4">
          <div className="pv6-ns pv4 eventBg" style={bgStyle}>
            <div className="mw8 center ph5-l ph4 relative z1">
              <div className="cf ph2-ns">
                <h3 className="white">{event_content[this.state.topics[num]].name}</h3>
                <Link to={"/ourisland/"+event_content[this.state.topics[num]].url+"/"}> <button className="cp">事件連結</button> </Link>
              </div>
            </div>
          </div>
          <div className="mw8 center event tr-l tc relative">
            <ul className="eventBox dragscroll nowrap overflow-x-scroll dragscroll list pa0 ph2">{list}</ul>
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <section id="events" className="bg-white pt6-l pt4 tl">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tc hide">
            <h1 className="ph2 fw7">三大主題十三個事件</h1>
            <h3 className="ph2 mb5-l mb4 fw4">三大主題副標</h3>
          </div>
        </div>
        {this.topics(0)}
        {this.topics(1)}
        {this.topics(2)}
      </section>
    );
  }
}

export default Events;
