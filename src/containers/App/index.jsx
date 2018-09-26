import React, { Component } from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { checkUserAuthenticationStatus } from '../Auth/actions';

// import propTypes from 'prop-types';
import {
  Menu,
  Sidebar,
  BottomBar,
} from '../../components';
import Viewevent from '../Viewevent';
import Feed from '../Feed';
import CreateEvent from '../CreateEvent';
import LoginPage from '../Auth/LoginPage';
import SignUpPage from '../Auth/SignUpPage';
import ConfirmEmail from '../Auth/confirmEmail';

const PrivateRoute = ({ component: Cmp, auth: Auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (Auth) {
        return (<Cmp {...props} />);
      }
      return (<Redirect to="/login/" />);
    }
  }
  />
);
/**
 * [App Main entry point of the App]
 * @extends Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    if (window.localStorage.getItem('shouldBeLoggedIn') === "true") {
      this.props.checkUserAuthenticationStatus();
    }
  }
  render() {
    // console.log(this.state);
    return (
      <div>
        {this.props.authenticating ?
          <Dimmer active inverted>
            <Loader>Authenticating</Loader>
          </Dimmer>
        : null }
        <Sidebar>
          <div>
            <Menu />
          </div>
          <Route exact path="/view/:eventid" component={Viewevent} />
          <PrivateRoute path="/create" component={CreateEvent} auth={this.props.isLoggedIn} />
          <Route exact path="/" component={Feed} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/auth/confirmEmail" component={ConfirmEmail} />

        </Sidebar>
        <BottomBar />
      </div>

    );
  }
}
const mapStateToProps = (state) => {
  const { isLoggedIn, authenticating } = state.auth;
  return {
    isLoggedIn,
    authenticating,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    checkUserAuthenticationStatus,
  }, dispatch)
);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
