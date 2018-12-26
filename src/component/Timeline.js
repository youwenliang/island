import React, { Component } from 'react';

class Timeline extends Component {
  render() {
    return (
      <section id="timeline-preview" className="bg-near-white pv6-l pv4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns">
            <div className="fl w-100 w-40-l ph2 tl hide">
              <h1 className="fw7">台灣環境史三十年大事紀</h1>
              <h5 className="f5 mt0 tracked fw5 o-50">這是一小段副標題</h5>
              <h3 className="fw4 lh-copy">大紀事介紹內文，大紀事介紹內文，大紀事介紹內文，大紀事介紹內文，大紀事介紹內文，大紀事介紹內文．</h3>
              <a href="/island20/timeline/" target="_blank"><button className="btn cp mt4 mb5">前往大紀事</button></a>
            </div>
            <div className="fl w-100 w-60-l ph2 hide">
              <a href="/ourisland/timeline/" target="_blank">
                <figure className="mh0 pl5-l">
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
