import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'semantic-ui-react';

const Loginbutton = props => (
  <div>
    {props.login ?
      <Button fluid secondary basic icon>
        <Icon name="sign in" />
        Login
      </Button>
    : null }
    {props.signup ?
      <Button fluid primary icon>
        <Icon name="signup" />
        Signup
      </Button>
    : null }
  </div>
);

Loginbutton.propTypes = {
  login: PropTypes.bool,
  signup: PropTypes.bool,
};
Loginbutton.defaultProps = {
  login: false,
  signup: false,
};

export default Loginbutton;
