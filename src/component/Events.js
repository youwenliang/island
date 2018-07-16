import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.js'

const event_data = data.events;

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [0,0,0]
    };
  }
  handleMouseOver (id) {
    var topic = id.split('-')[0];
    var num = id.split('-')[1];
    switch(topic) {
      case "1":
        this.setState({topics:[num-1,0,0]});
        break;
      case "2":
        this.setState({topics:[0,num-1,0]});
        break;
      case "3":
        this.setState({topics:[0,0,num-1]});
        break;
      default:
        break;
    }
  }

  event = (content) => {
    return (
      <li className="dib center tc" onMouseOver={() => this.handleMouseOver(content.id)}>
        <Link to={"/ourisland/page"+content.id+"/"}>
        <figure className="h4 w4 br-100 ma3 bg-near-white"></figure>
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
      list.push(this.event(content));
    }  
    return (
      <section className="mb7-ns mb6 mt4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-50-l ph2 tl">
              <p>{topic_title}</p>
            </div>
            <div className="fl w-100 w-50-l ph2">
              <div className="bg-gray">
                <figure className="h5"></figure>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-silver pv6-ns pv4 relative">
          <div className="mw8 center ph3">
            <div className="cf ph2-ns">
              <p>{event_content[this.state.topics[num]].name}</p>
            </div>
          </div>
          <div className="event tr-l tc ph5-l nowrap overflow-x-scroll relative">
            <ul className="list pa0 ph2">{list}</ul>
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <section id="events" className="bg-white pt6-l pt4 tl">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tc">
            <h2 className="ph2">Events</h2>
            <h4 className="ph2 mb5-l mb4">tagline</h4>
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
