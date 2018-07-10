import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import data from '../data/data.js'

class Events extends Component {
  event = (id) => {
    return (
      <li className="dib center tc">
        <Link to={"/ourisland/page"+id+"/"}>
        <figure className="h4 w4 br-100 ma3 bg-near-white"></figure>
        {id}
        </Link>
      </li>
    )
  }

  topics = (num) => {
    let list = [];
    var event_data = data.events;
    var topic_title = event_data[num].title
    var event_content = event_data[num].content
    for(var i = 0; i < event_content.length; i++) {
      var id = event_content[i].id;
      list.push(this.event(id));
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
              <p>test</p>
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
