import React, { Component } from 'react';
import cta1 from '../assets/images/CTA-Icons-1.svg';
import cta2 from '../assets/images/CTA-Icons-2.svg';
import cta3 from '../assets/images/CTA-Icons-3.svg';


class CTA extends Component {
  render() {
    return (
      <section id="cta" className="bg-near-white pv6-l pv5">
        <div className="mw8 center ph3">
          <div className="cf ph2-ns tc hide">
            <h1 className="ph2 fw7 tracked f2rem">邀請你一起關心環境</h1>
            <h3 className="ph2 mb5-l mb4 fw4 lh-copy mw7 center">我們呼吸的空氣、喝的水、吃的食物，樣樣都跟環境有關，<br className="db-ns dn"/> 我們一舉一動也深深影響著環境，共同守護我們的島。</h3>
            <div className="fl w-third-l w-100 pa2 cp hide">
              <a href="https://www.facebook.com/PTSourisland/" target="_blank" rel="noopener noreferrer">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w5 h5 center mv0 flex aic jcc">
                    <img src={cta1} width="210" height="210" alt="島FB" />
                  </figure>
                  <p className="f3-ns f4 fw5 mt0 mb2">島FB</p>
                  <p className="f5-ns f6 fw4 o-60">加入粉絲  掌握最新資訊</p>
                </div>
              </a>
            </div>
            <div className="fl w-third-l w-100 pa2 cp hide">
              <a href="https://www.youtube.com/channel/UCiNrmbGfxRnzVVqg4a9banQ" target="_blank" rel="noopener noreferrer">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w5 h5 center mv0 flex aic jcc">
                    <img src={cta2} width="210" height="210" alt="島Youtube"/>
                  </figure>
                  <p className="f3-ns f4 fw5 mt0 mb2">島Youtube</p>
                  <p className="f5-ns f6 fw4 o-60">訂閱影音  隨時看不漏失</p>
                </div>
              </a>
            </div>
            <div className="fl w-third-l w-100 pa2 cp hide">
              <a href="https://ourisland.pts.org.tw/" target="_blank" rel="noopener noreferrer">
                <div className="pv3 pa4 tc ctaBox bg-white">
                  <figure className="w5 h5 center mv0 flex aic jcc">
                    <img src={cta3} width="210" height="210" alt="島官網"/>
                  </figure>
                  <p className="f3-ns f4 fw5 mt0 mb2">島官網</p>
                  <p className="f5-ns f6 fw4 o-60">完整收錄  20年環境報導</p>
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
