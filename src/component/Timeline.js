import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    return (
      <section id="timeline-preview" className="bg-near-white pv6-l pv4 bt bw3 b--light-gray">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-40-l ph2 tl hide">
              <h1 className="fw7">台灣環境史三十年大事紀</h1>
              <h3 className="fw4">大紀事介紹內文</h3>
              <a href="/ourisland/timeline/" target="_blank"><button>前往大紀事</button></a>
            </div>
            <div className="fl w-100 w-60-l ph2 hide">
              <a href="/ourisland/timeline/" target="_blank">
                <figure className="mh0">
                  <img src="https://fakeimg.pl/800x600/?text=timeline&retina=1" alt="timeline" />
                </figure>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Timeline;
