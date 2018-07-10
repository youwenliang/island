import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <section id="footer" className="bg-near-black pv5">
      	<div className="mw8 center ph3">
          <div className="cf ph2-ns">
        	<Link to="/ourisland">Home</Link>
          </div>
        </div>
      </section>
    );
  }
}

export default Footer;
