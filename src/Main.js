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
          <Route exact path='/ourisland' component={Home} />
          <Route path='/ourisland/timeline/' component={Search} />
          <Route path='/ourisland/:id/' component={Page} />
        </Switch>
      </main>
    );
  }
}

export default Main;
