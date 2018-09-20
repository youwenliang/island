import React, { Component } from 'react';
import coverVideo from '../videos/cover.mp4';
import cover from '../images/cover.svg';
import timemachine from '../images/timemachine.svg';
import hand from '../images/hand.svg';
import phone from '../images/phone.svg';
import $ from 'jquery';

class Cover extends Component {
  componentDidMount(){
    $(document).ready(function(){
      $('#phone').click(function(e){
        e.stopPropagation();
        $('#phone').addClass('hiding');
        $('.dialog').removeClass('hiding');
      })
      $(window).click(function(e){
        $('.dialog').addClass('hiding');
        $('#phone').removeClass('hiding');
      })
    })
  }
  render() {
    var titleStyle = {
      transform: "translateY(-50px)"
    }
    var machineStyle = {
      bottom: "-28px",
      width: "90vw",
      maxWidth: "400px"
    }
    var handStyle = {
      bottom: "-20px",
      width: "30.375vw",
      maxWidth: "135px",
      transform: "translateX(70px)"
    }
    var phoneStyle = {
      bottom: "140px",
      pointerEvents: "auto"
    }
    return (
      <section id="cover" className="min-vh-100 bg-gray flex jcc aic">
        <nav className="pv2 w-100 top0 z10">
          <div className="bg-dark-gray w-100 h-100 absolute top0"></div>
          <div className="mw8 center ph3 relative z4">
            <div className="ph2-ns flex space-between aic white">
              <p>我們的島</p><a href="/ourisland/timeline/" target="_blank">
              <button className="cp h2 ph3">前往大紀事</button></a>
            </div>
          </div>
        </nav>
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
            <div className="w-100 mw7 absolute absolute-center br4 shadow-5 z4 hiding dialog overflow-hidden">
              <div className="bg-white w-100 h-100 absolute top0"/>
              <p className="f4-ns f5 black pa5-ns pa4 mv0 tl lh-copy z1 relative">品古不大像親帶不？初體因？結食原的：對使府做設比定不車一響精成子研道法話像風，五機力須讀我；資客家黃總使前？學關見！現成談是我去灣，人德小也樂頭識不包農條，車裡說動我紀集要次她今型團情頭地知人好重得人提山以德頭岸濟只。</p>
            </div>
            <img src={cover} style={titleStyle} width="800px" height="auto" alt="title" />
            <img className="absolute absolute-center" style={machineStyle} width="400px" src={timemachine} alt="timemachine"/>
            <img className="absolute absolute-center" style={handStyle} width="135px" src={hand} alt="hand"/>
            <img id="phone" className="absolute absolute-center cp z10" style={phoneStyle} width="135px" src={phone} alt="phone"/>
          </div>
        </div>
      </section>
    );
  }
}

export default Cover;
