import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';
import { signInOAuth } from './actions';

class OAuth extends PureComponent {
  signIn(provider) {
    this.props.signInOAuth(provider);
  }
  render() {
    return (
      <div>
        <Button.Group widths={3} fluid>
          <Button color="facebook" onClick={() => this.signIn('facebook')}>
            <Icon name="facebook" />
          </Button>
          <Button color="twitter" onClick={() => this.signIn('twitter')}>
            <Icon name="twitter" />
          </Button>
          <Button color="google plus" onClick={() => this.signIn('google')}>
            <Icon name="google plus" />
          </Button>
        </Button.Group>
      </div>
    );
  }
}

OAuth.propTypes = {

};
const mapStateToProps = (state) => {
  const { loginForm } = state.auth;
  return {
    loginForm,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signInOAuth,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(OAuth);
