import React, { Component } from 'react';
import { Dropdown, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import user from './man-user.svg';
import { logoutUserAuthencation } from '../../containers/Auth/actions';

class UserSettingsMenu extends Component {
  signOut() {
    this.props.signOut();
  }
  render() {
    const { displayName, photoURL } = this.props.user;

    return (
      <Dropdown
        trigger={
          <span>
            <Image avatar src={photoURL || user} /> {displayName}
          </span>
        }
      >
        <Dropdown.Menu>

          <Dropdown.Item icon="settings" text="Settings" description="Review your account settings" />
          <Dropdown.Item icon="user" text="Your Profile" description="View your profile" />
          <Dropdown.Item icon="privacy" text="Privacy" description="Review our privacy policy" />
          <Dropdown.Item icon="tasks" text="Your Reports" description="View incidents reported by you" />
          <Dropdown.Divider />
          <Dropdown.Item icon="sign out" text="Sign out." onClick={() => this.signOut()} />
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}

UserSettingsMenu.propTypes = {

};
const mapStateToProps = (state) => {
  const { user, isLoggedIn } = state.auth;
  return {
    isLoggedIn,
    user,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signOut: logoutUserAuthencation,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UserSettingsMenu);
