import React, { Component } from 'react';
import timemachine from '../assets/images/timemachine.svg';
import hand from '../assets/images/hand.svg';
import phone from '../assets/images/phone_new.svg';
import phone_stop from '../assets/images/phone_stop.svg'; // eslint-disable-line no-unused-vars
import $ from 'jquery';

class Phone extends Component {
  componentDidMount(){
    $(document).ready(function(){
      $('#phone').click(function(e){
        e.stopPropagation();
        $('#phone').addClass('hiding');
        $('.dialog').removeClass('hiding');
      })
      $(window).click(function(e){
        $('.dialog').addClass('hiding');
        $('#phone.hiding').addClass('stop');
        $('#phone').removeClass('hiding');
      })
    })
  }
  render() {
    var machineStyle = {
      bottom: "-22px",
      width: "90vw",
      maxWidth: "320px",
      zIndex: 10
    }
    var handStyle = {
      bottom: "-15.5px",
      width: "30.375vw",
      maxWidth: "108px",
      transform: "translateX(56px)",
      zIndex: 10
    }
    var phoneStyle = {
      bottom: "110px",
      pointerEvents: "auto"
    }
    var dialog = {
      bottom: "200px"
    }
    return (
      <div>
        <div className="w-100 mw7 absolute absolute-center br4 shadow-5 z4 hiding dialog overflow-hidden" style={dialog}>
          <div className="bg-white w-100 h-100 absolute top0"/>
          <p className="f4-ns f5 black pa5-ns pa4 mv0 tl lh-copy z1 relative">品古不大像親帶不？初體因？結食原的：對使府做設比定不車一響精成子研道法話像風，五機力須讀我；資客家黃總使前？學關見！現成談是我去灣，人德小也樂頭識不包農條，車裡說動我紀集要次她今型團情頭地知人好重得人提山以德頭岸濟只。</p>
        </div>
        <img className="absolute absolute-center" style={machineStyle} width="400px" src={timemachine} alt="timemachine"/>
        <img className="absolute absolute-center" style={handStyle} width="135px" src={hand} alt="hand"/>
        <img id="phone" className="absolute absolute-center cp z10" style={phoneStyle} width="135px" src={phone} alt="phone"/>
      </div>
    );
  }
}

export default Phone;
