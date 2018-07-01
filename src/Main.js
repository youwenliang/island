import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './component/Home'
import Search from './component/Search'

class Main extends Component {
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/ourisland' component={Home} />
          <Route path='/ourisland/:id' component={Search} />
        </Switch>
      </main>
    );
  }
}

export default Main;
