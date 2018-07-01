import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Timeline extends Component {
  render() {
    return (
      <section id="timeline" className="min-vh-100 bg-near-white">
        Timeline
        <Link to="/ourisland/search">Search</Link>
      </section>
    );
  }
}

export default Timeline;
