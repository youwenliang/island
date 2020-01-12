import React, { Component } from 'react';
import $ from 'jquery';
import asset from '../assets/images/大事記.svg';
import title from '../assets/images/timelinetitle.svg';
import bg from '../assets/images/共用底圖.jpg';

class Timeline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: $(window).width() <= 959 ? true : false
    }
    this.checkMobile = this.checkMobile.bind(this);
  }
  componentDidMount() {
    var $t = this;
    window.addEventListener('resize', $t.checkMobile, false);
  }
  componentWillUnmount(){
    var $t = this;
    window.removeEventListener('resize', $t.checkMobile, false);
  }
  checkMobile() {
    var $t = this;
    if($(window).width() <= 959) $t.setState({mobile:true});
    else $t.setState({mobile:false});
  }
  render() {
    var content = !this.state.mobile ? (
      <div className="cf ph2-ns flex aic">
        <div className="fl w-100 w-50-l ph2 tl hide">
          <img className="mw400 mb3" src={title} alt="島嶼時光機" />
          <h5 className="f5 mt0 tracked fw5 o-50">台灣環境大事記</h5>
          <h3 className="fw4 lh-copy">從「天災地變」到「食在不安」，<br/>完整收錄1970到2019年間的台灣環境重要大事記。</h3>
          <a href="/island20/timeline/" target="_blank"><button className="btn cp mt4 mb4">了解更多</button></a>
        </div>
        <div className="fl w-100 w-50-l ph2 hide">
          <a href="/island20/timeline/" target="_blank">
            <figure className="mh0 pl5-l">
              <img src={asset} alt="timeline" />
            </figure>
          </a>
        </div>
      </div>
    ):(
      <div className="cf ph2-ns">
        <div className="fl w-100 w-60-l ph2 hide">
          <a href="/island20/timeline/" target="_blank">
            <figure className="mh2 pl5-l mw400 center">
              <img src={asset} alt="timeline" />
            </figure>
          </a>
        </div>
        <div className="center mw400 w-100 w-40-l ph2 tl hide">
          <img className="mb3" src={title} alt="島嶼時光機" />
          <h5 className="f5 mt0 tracked fw5 o-50">台灣環境大事記</h5>
          <h3 className="fw4 lh-copy">從「天災地變」到「食在不安」，<br/>完整收錄1970到2019年間的台灣環境重要大事記。</h3>
          <a href="/island20/timeline/" target="_blank"><button className="btn cp mt4 mb5">了解更多</button></a>
        </div>
      </div>
    )

    var bgStyle = {
      backgroundImage: "url("+bg+")",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover" 
    }
    return (
      <section id="timeline-preview" className="pv6-l pv4 relative" style={bgStyle}>
        <div className="absolute w-100 h-100 top-left z1 bg-black o-30"></div>
        <div className="mw8 center ph3 z4 relative white">
          {content}
        </div>
      </section>
    );
  }
}

export default Timeline;
