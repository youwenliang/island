import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Footer extends Component {
  render() {
    return (
      <section id="footer" className="h4 bg-near-black">
        <Link to="/ourisland">Home</Link>
      </section>
    );
  }
}

export default Footer;
