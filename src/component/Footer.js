import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <section id="footer" className="bg-dark-gray pv4">
      	<div className="mw9 center ph3">
          <div className="f6 cf ph2-ns white">
        	<Link to="/ourisland">回到首頁</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
