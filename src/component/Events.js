import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Events extends Component {
  render() {
    return (
      <section id="events" className="min-vh-100 bg-gray">
        Events
        <Link to="/ourisland/page1">Page1</Link>
        <Link to="/ourisland/page2">Page2</Link>
        <Link to="/ourisland/page3">Page3</Link>
        <Link to="/ourisland/page4">Page4</Link>
        <Link to="/ourisland/page5">Page5</Link>
        <Link to="/ourisland/page6">Page6</Link>
        <Link to="/ourisland/page7">Page7</Link>
        <Link to="/ourisland/page8">Page8</Link>
        <Link to="/ourisland/page9">Page9</Link>
        <Link to="/ourisland/page10">Page10</Link>
        <Link to="/ourisland/page11">Page11</Link>
        <Link to="/ourisland/page12">Page12</Link>
        <Link to="/ourisland/page13">Page13</Link>
      </section>
    );
  }
}

export default Events;
