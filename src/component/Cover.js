import React, { Component } from 'react';
import coverVideo from '../assets/videos/cover.mp4';
import cover from '../assets/images/cover.svg';
import Phone from '../component/Phone';
import scrollship from '../assets/images/時光機.svg';

class Cover extends Component {
  render() {
    var titleStyle = {
      transform: "translateY(-50px)"
    }

    var ship = {
      left: 0,
      right: 0,
      margin: "0 auto",
      bottom: "60px"
    }
    
    return (
      <section id="cover" className="vh-100 bg-gray flex jcc aic relative">
        <div className="bg-light-gray w-100 h-100 absolute">
          <div className="bg-near-black o-20 w-100 h-100 absolute z1"/>
          <div className="videoBg">
            <video id="video" muted loop autoPlay playsInline>
              <source src={coverVideo} type="video/mp4"/>
            </video>
          </div>
        </div>
        <div className="mw8 center ph3-l pv6 z1 pn">
          <div className="cf tc white w-80-ns w-90 center pa4-l">
            <img src={cover} style={titleStyle} width="960px" height="auto" alt="title" />
          </div>
        </div>
        {/*<Phone/>*/}
        <figure className="scrollship absolute w4 tc z4" style={ship}>
          <img src={scrollship} width="100" alt="請往下滑動" />
        </figure>
      </section>
    );
  }
}

export default Cover;
