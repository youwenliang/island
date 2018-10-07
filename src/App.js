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

export default App;
