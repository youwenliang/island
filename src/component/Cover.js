import React, { Component } from 'react';
import coverVideo from '../videos/cover.mp4';
import cover from '../images/cover.svg';
import timemachine from '../images/timemachine.svg';
import hand from '../images/hand.svg';

class Cover extends Component {
  render() {
    var machineStyle = {
      bottom: "-28px"
    }
    var handStyle = {
      bottom: "-20px",
      transform: "translateX(70px)"
    }
    return (
      <section id="cover" className="min-vh-100 bg-gray flex jcc aic">
        <nav className="pv2 fixed w-100 top0 z10">
          <div className="bg-white o-80 w-100 h-100 absolute top0"/>
          <div className="mw8 center ph3 relative z4">
            <div className="ph2-ns flex space-between aic">
              <p>我們的島</p><a href="/ourisland/timeline/" target="_blank">
              <button className="cp">前往大紀事</button></a>
            </div>
          </div>
        </nav>
        <div className="bg-light-gray w-100 h-100 absolute">
          <div className="bg-near-black o-50 w-100 h-100 absolute z1"/>
          <div className="videoBg">
            <video id="video" muted loop autoPlay playsInline>
              <source src={coverVideo} type="video/mp4"/>
            </video>
          </div>
        </div>
        <div className="mw8 center ph3-l pv6 z1">
          <div className="cf tc white w-80-ns w-90 center pa4-l">
            <img src={cover} width="800px" height="auto" alt="title" />
            <img className="absolute absolute-center" style={machineStyle} width="400px" src={timemachine} alt="timemachine"/>
            <img className="absolute absolute-center" style={handStyle} width="135px" src={hand} alt="hand"/>
          </div>
        </div>
      </section>
    );
  }
}

export default Cover;
