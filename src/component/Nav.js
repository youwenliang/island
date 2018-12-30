import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import logo from '../assets/images/logo.png';
import facebookLogo from '../assets/images/facebook-logo.svg';
import lineLogo from '../assets/images/line-logo.svg';
import shareIcon from '../assets/images/share.svg';
import scrollship from '../assets/images/時光機.svg';

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  onOpenModal = (event) => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  copyLink = (e) => {
    e.preventDefault()
    var copyButton = document.querySelector('.share-form button');
    var copyInput = document.querySelector('.share-form input');
    var text = copyInput.select(); // eslint-disable-line no-unused-vars
    document.execCommand('copy');
    copyInput.select();
    copyButton.innerHTML = "Copied!";
    setTimeout(function(){
      copyButton.innerHTML = "Copy Link";
    }, 1200);
    return false;
  }

  render() {
    const { open } = this.state;
    var link = window.location.href;
    // var timeline = null;
    var share = {
      overflow: "hidden",
      backgroundImage: "url("+shareIcon+")",
      backgroundSize: "20px 20px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "15px center",
      width: "100px"
    }
    // if(this.props.timeline) timeline = (<a href="/ourisland/timeline/" target="_blank"><button className="btn cp h2 ph3">前往大紀事</button></a>);
    return (
      <div>
        <nav className="w-100 top0 z40 h3 flex aic space-between">
          <div className="bg-dark-gray w-100 h-100 absolute top0"></div>
          <div className="w-100 mw9 center ph3 relative z4">
            <div className="ph2-ns flex space-between aic white">
              <Link to="/island20">
                <img src={logo} height="32px" alt="我們的島"/>
              </Link>
              <div className="flex flex-row">
                {/*{timeline}*/}
                <button className="share btn cp h2 ph3 ml3" style={share} onClick={() => this.onOpenModal()}>分享</button>
              </div>
            </div>
          </div>
        </nav>
        <Modal open={open} onClose={this.onCloseModal}>
          <div className="pa3">
            <div className="w-100">
              <figure className="floatship w-30" style={{margin: "0 auto"}}>
                <img src={scrollship} alt="時光機"/>
              </figure>
            </div>
            <div className="w-100 f6 tc mv3 fw7">
              帶著訊息前往新的地方⋯⋯
            </div>
            <div className="w-100 flex sharing">
              <div style={{margin: "0 auto"}}>
                <img src={facebookLogo} height="60px" alt="分享至 Facebook"/>
                <img src={lineLogo} height="60px" alt="分享至 Line"/>
              </div>
            </div>
            <form className="pt4 share-form flex aic jcc">
              <input className="pv2 mr1 bn f7" type="text" value={link} />
              <button className="dib w4 bg-near-white bn pv2 f7" type="button" onClick={(e) => this.copyLink(e)}>Copy Link</button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Nav;
