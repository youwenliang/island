import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './view/Home'
import Search from './view/Search'
import Page from './view/Page'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/island20' component={Home} />
          <Route path='/island20/timeline/' component={Search} />
          <Route path='/island20/:id/' component={Page} />
        </Switch>
      </main>
    );
  }
}

export default Main;
