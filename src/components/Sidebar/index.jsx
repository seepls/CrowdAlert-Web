import React from 'react';
import propTypes from 'prop-types';
import {
  Sidebar,
  Menu,
  Icon,
  Image,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import logo from '../../logo.png';
import styles from './styles';
import { removeSidebarVisibility } from './actions';
import { logoutUserAuthencation } from '../../containers/Auth/actions';


/**
 * [LeftSidebar LeftSidebar for the app]
 * @param {[type]} props [description]
 */
const LeftSidebar = props => (
  <div style={styles.fitContainer}>
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation={props.animation}
        visible={props.isVisible}
        vertical
        inverted
        style={styles.sidebar}
      >
        <Menu.Item name="logo">
          <Image src={logo} size="small" bordered centered />
        </Menu.Item>

        <Link to="/" onClick={props.removeSidebarVisibility}>
          <Menu.Item name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
        </Link>
        <Link to="/create" onClick={props.removeSidebarVisibility}>
          <Menu.Item name="camera">
            <Icon name="camera" />
            Report
          </Menu.Item>
        </Link>
        {props.isLoggedIn ?
          <Menu.Item name="avatar">
            <Image
              avatar
              src={props.user.photoURL}
              floated="right"
              style={{ position: 'fixed', right: '0px', marginRight: '0.7rem', marginTop: '-0.5rem' }}
            />
            {props.user.displayName}
            <Menu.Menu icon="labeled">
              <Menu.Item />
              <Menu.Item name="settings">
                <Icon name="settings" />
                Settings
              </Menu.Item>
              <Menu.Item name="add">
                <Icon name="user" />
                Your Profile
              </Menu.Item>
              <Menu.Item name="add">
                <Icon name="tasks" />
                Your Reports
              </Menu.Item>
              <Menu.Item name="add">
                <Icon name="privacy" />
                Privacy Policy
              </Menu.Item>
            </Menu.Menu>
          </Menu.Item>
        :
        null
        }
        {props.isLoggedIn ?
          <Menu.Item
            name="logout"
            onClick={() => {
              props.removeSidebarVisibility();
              props.signOut();
            }}
          >
            <Icon name="sign out" />
            Sign out
          </Menu.Item>
        :
          <div>
            <Link to="/login" onClick={props.removeSidebarVisibility}>
              <Menu.Item name="logout">
                <Icon name="sign in" />
                Login
              </Menu.Item>
            </Link>
            <Link to="/signup" onClick={props.removeSidebarVisibility}>
              <Menu.Item name="logout">
                <Icon name="signup" />
                Sign up
              </Menu.Item>
            </Link>
          </div>
        }
      </Sidebar>
      <Sidebar.Pusher
        onClick={props.isVisible ? props.removeSidebarVisibility : null}
        dimmed={!!(props.animation === 'scale down' && props.isVisible)}
        
      >
        {props.children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);
LeftSidebar.propTypes = {
  /* function to handle the visiblity */
  removeSidebarVisibility: propTypes.func.isRequired,
  /* bool denoting whether the sidebar is open or not */
  isVisible: propTypes.bool.isRequired,
  animation: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};

const mapStateToProps = (state) => {
  const { user, isLoggedIn } = state.auth;
  return {
    ...state.sidebar,
    isLoggedIn,
    user,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signOut: logoutUserAuthencation,
    removeSidebarVisibility,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
