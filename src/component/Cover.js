import React, { Component } from 'react';

class Cover extends Component {
  render() {
    return (
      <section id="cover" className="min-vh-100 bg-gray flex jcc aic">
        <nav className="bg-white pv3 fixed w-100 top0 z4">
          <div className="mw8 center ph3">
            <div className="ph2-ns flex space-between aic">
              <p>我們的島</p><a href="/ourisland/timeline/" target="_blank">
              <button className="cp">前往大紀事</button></a>
            </div>
          </div>
        </nav>
        <div className="mw8 center ph3 pv6"><div className="cf ph2-ns tc white">
          <h1>穿梭島嶼時光機</h1><h3>《我們的島》二十週年</h3></div>
        </div>
      </section>
    );
  }
}

export default Cover;
