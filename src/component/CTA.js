import React, { Component } from 'react';

class CTA extends Component {
  render() {
    return (
      <section id="cta" className="bg-near-white pv6-l pv4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tc hide">
            <h1 className="ph2 fw7 tracked">這是標題</h1>
            <h3 className="ph2 mb5-l mb4 fw4">這是副標</h3>
            <div className="fl w-third-l w-100 pa2">
              <div className="pv3 pa4 tc ctaBox bg-white">
                <figure className="w5 h5 bg-light-gray center mb4"></figure>
                <p className="f4 fw5 mt0">這是內容</p>
                <p className="f5 fw4">這是說明</p>
              </div>
            </div>
            <div className="fl w-third-l w-100 pa2">
              <div className="pv3 pa4 tc ctaBox bg-white">
                <figure className="w5 h5 bg-light-gray center mb4"></figure>
                <p className="f4 fw5 mt0">這是內容</p>
                <p className="f5 fw4">這是說明</p>
              </div>
            </div>
            <div className="fl w-third-l w-100 pa2">
              <div className="pv3 pa4 tc ctaBox bg-white">
                <figure className="w5 h5 bg-light-gray center mb4"></figure>
                <p className="f4 fw5 mt0">這是內容</p>
                <p className="f5 fw4">這是說明</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CTA;
