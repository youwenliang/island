import React, { Component } from 'react';
import coverVideo from '../assets/videos/cover.mp4';
import cover from '../assets/images/cover.svg';
import Phone from '../component/Phone';
import scrollship from '../assets/images/時光機.svg';
import panel from '../assets/videos/4_時光機.gif';

import numbers1 from '../assets/videos/4_數字_1.gif';
import numbers2 from '../assets/videos/4_數字_2.gif';
import numbers3 from '../assets/videos/4_數字_3.gif';
import numbers4 from '../assets/videos/4_數字_4.gif';
import numbers5 from '../assets/videos/4_數字_5.gif';
import $ from 'jquery';

class Cover extends Component {
  componentDidMount(){
    var array = [numbers1, numbers2, numbers3, numbers4, numbers5];
    var i = 1;

    setInterval(function(){
      $('#numbers').attr("src", array[i]);
      $('#panel').attr("src", panel);
      i++;
      if(i === 5) i = 0;
    },5500)
  }

  render() {
    var titleStyle = {
      transform: "translateY(-50px)"
    }

    var ship = {
      left: '50%',
      transform: "translateX(-50%)",
      margin: "0 auto",
      bottom: "0",
      width: "450px"
    }

    var numberStyle = {
      position: "absolute",
      bottom: "104px",
      left: 0,
      right: 0,
      margin: "auto"
    }
    
    return (
      <section id="cover" className="vh-100 bg-gray flex jcc aic relative overflow-hidden">
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
        <figure className="absolute z4 tc" style={ship}>
          {/*<img src={scrollship} width="100" alt="請往下滑動" />*/}
          <img id="panel" src={panel} width="450" alt="操作台" />
          <img id="numbers" src={numbers1} width="100" alt="年代表" style={numberStyle}/>
        </figure>*/}
      </section>
    );
  }
}

export default Cover;
