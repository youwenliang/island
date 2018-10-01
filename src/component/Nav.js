import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import logo from '../assets/images/logo.png';

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
    var copyButton = document.querySelector('.share-form button');
    var copyInput = document.querySelector('.share-form input');
    var text = copyInput.select();
    document.execCommand('copy');
    copyInput.select();
    copyButton.innerHTML = "Copied!";
    setTimeout(function(){
      copyButton.innerHTML = "Copy Link";
    }, 1200);
  }

  render() {
    const { open } = this.state;
    var link = window.location.href;
    var timeline = null;
    if(this.props.timeline) timeline = (<a href="/ourisland/timeline/" target="_blank"><button className="btn cp h2 ph3">前往大紀事</button></a>);
    return (
      <div>
        <nav className="w-100 top0 z10 h3 flex aic space-between">
          <div className="bg-dark-gray w-100 h-100 absolute top0"></div>
          <div className="w-100 mw8 center ph3 relative z4">
            <div className="ph2-ns flex space-between aic white">
              <Link to="/ourisland">
                <img src={logo} height="36px"/>
              </Link>
              <div className="flex flex-row">
                {timeline}
                <button className="btn cp h2 ph3 ml3" onClick={() => this.onOpenModal()}>分享</button>
              </div>
            </div>
          </div>
        </nav>
        <Modal open={open} onClose={this.onCloseModal}>
          <form className="pt4 share-form flex aic jcc" action="javascript:void(0);">
            <input type="text" value={link}/>
            <button className="dib w4" type="button" onClick={() => this.copyLink()}>Copy Link</button>
          </form>
        </Modal>
      </div>
    );
  }
}

export default Nav;
