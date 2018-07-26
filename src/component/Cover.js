import React, { Component } from 'react';

class Cover extends Component {
  render() {
    return (
      <section id="cover" className="min-vh-100 bg-light-gray">
      	<nav className="bg-white pv3">
      	  <div className="mw8 center ph3">
          	<div className="cf ph2-ns">
          		<p>我們的島</p>
          	</div>
          </div>
        </nav>
        <div className="mw8 center ph3 pv6">
        	<div className="cf ph2-ns">
        		<a href="/ourisland/timeline/" target="_blank"><button className="cp">前往大紀事</button></a>
        	</div>
        </div>
      </section>
    );
  }
}

export default Cover;
