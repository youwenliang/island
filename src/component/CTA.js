import React, { Component } from 'react';
import cta1 from '../assets/images/CTA-Icons-1.svg';
import cta2 from '../assets/images/CTA-Icons-2.svg';
import cta3 from '../assets/images/CTA-Icons-3.svg';


class CTA extends Component {
  render() {
    return (
      <section id="cta" className="bg-near-white pv6-l pv4">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tc hide">
            <h1 className="ph2 fw7 tracked">邀請你</h1>
            <h3 className="ph2 mb5-l mb4 fw4">一起關心環境大小事</h3>
            <div className="fl w-third-l w-100 pa2 cp">
              <a href="https://www.facebook.com/PTSourisland/" target="_blank">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w5 h5 center mv0 flex aic jcc">
                    <img src={cta1} width="210" height="210"/>
                  </figure>
                  <p className="f4 fw5 mt0">島FB</p>
                  <p className="f5-ns f6 fw4">加入粉絲  掌握最新資訊</p>
                </div>
              </a>
            </div>
            <div className="fl w-third-l w-100 pa2 cp">
              <a href="https://www.youtube.com/channel/UCiNrmbGfxRnzVVqg4a9banQ" target="_blank">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w5 h5 center mv0 flex aic jcc">
                    <img src={cta2} width="210" height="210"/>
                  </figure>
                  <p className="f4 fw5 mt0">島Youtube</p>
                  <p className="f5-ns f6 fw4">訂閱影音  隨時看不漏失</p>
                </div>
              </a>
            </div>
            <div className="fl w-third-l w-100 pa2 cp">
              <a href="https://ourisland.pts.org.tw/" target="_blank">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w5 h5 center mv0 flex aic jcc">
                    <img src={cta3} width="210" height="210"/>
                  </figure>
                  <p className="f4 fw5 mt0">島官網</p>
                  <p className="f5-ns f6 fw4">詳細收集  20年環境報導</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default CTA;
