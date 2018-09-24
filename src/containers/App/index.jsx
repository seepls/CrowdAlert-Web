import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import propTypes from 'prop-types';
import {
  Menu,
  Sidebar,
} from '../../components';
import Viewevent from '../Viewevent';
import Feed from '../Feed';
import CreateEvent from '../CreateEvent';

/**
 * [App Main entry point of the App]
 * @extends Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    // console.log(this.state);
    return (
      <Sidebar>
        <div>
          <Menu />
        </div>
        <Route exact path="/view/:eventid" component={Viewevent} />
        <Route exact path="/create" component={CreateEvent} />
        <Route exact path="/" component={Feed} />
      </Sidebar>
    );
  }
}

export default App;
