import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    return (
      <section id="timeline-preview" className="bg-near-white pv6-l pv4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-40-l ph2 tl">
              <p>Timeline</p>
              <a href="/ourisland/timeline/" target="_blank">Search</a>
            </div>
            <div className="fl w-100 w-60-l ph2">
              <div className="bg-gray">
                <figure className="h5"></figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Timeline;
