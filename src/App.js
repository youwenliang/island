import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './Main'
import Footer from './component/Footer'

class App extends Component {
  render() {
  	var percentage = {
	  	position: "relative",
	    top: "120px",
	    left: "10px",
	    fontWeight: 700,
	    fontSize: "24px"
	}
    return (
      <div className="App">
        <div id="loading" className="flex aic jcc">
        	<p className="progress-view" style={percentage}>0%</p>
        </div>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

// Deploy 取代
// data.js ("/images -> "/ourisland/images && "/events -> "/ourisland/events)
// app.css ("/images -> "/ourisland/images)
// Events.js ("/images -> "/ourisland/images)

export default App;
