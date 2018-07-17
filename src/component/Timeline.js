import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    return (
      <section id="timeline-preview" className="bg-near-white pv6-l pv4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-40-l ph2 tl hide">
              <p>Timeline</p>
              <a href="/ourisland/timeline/" target="_blank">Search</a>
            </div>
            <div className="fl w-100 w-60-l ph2 hide">
              <figure>
                <img src="https://fakeimg.pl/800x600/?text=timeline&retina=1" alt="timeline" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Timeline;
