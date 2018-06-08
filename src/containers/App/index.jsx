import React, { Component } from 'react';
import { Route } from 'react-router-dom';
// import propTypes from 'prop-types';
import {
  Menu,
  Sidebar,
} from '../../components';
import Viewevent from '../Viewevent';
import Feed from '../Feed';

/**
 * [App Main entry point of the App]
 * @extends Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
    this.toggleVisibility = this.toggleVisibility.bind(this);
  }
  /**
   * [toggleVisibility toogles visiblity of sidebar]
   * @return {none}
   */
  toggleVisibility() {
    this.setState({
      visible: !this.state.visible,
    });
  }
  render() {
    // console.log(this.state);
    return (
      <Sidebar
        toggleVisibility={this.toggleVisibility}
        visible={this.state.visible}
      >
        <div>
          <Menu toggleVisibility={this.toggleVisibility} />
        </div>
        <Route exact path="/view/:eventid" component={Viewevent} />
        <Route exact path="/" component={Feed} />
      </Sidebar>
    );
  }
}


export default App;
