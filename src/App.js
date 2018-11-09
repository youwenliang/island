import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Main from './Main'
import Footer from './component/Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div id="loading"></div>
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
