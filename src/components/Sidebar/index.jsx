import React from 'react';
import propTypes from 'prop-types';
import {
  Sidebar,
  Segment,
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
// import { dispatch } from 'rxjs/internal/observable/pairs';

/**
 * [LeftSidebar LeftSidebar for the app]
 * @param {[type]} props [description]
 */
const LeftSidebar = props => (
  <div style={styles.fitContainer}>
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation={props.animation}
        visible={props.isVisible}
        vertical
        style={styles.sidebar}
        inverted
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
        <Menu.Item name="user">
          <Icon name="user circle" />
          Profile
        </Menu.Item>
        <Link to="/view/-L6MrTH7NgTawjN-LOsd" onClick={props.removeSidebarVisibility}>
          <Menu.Item name="user">
            <Icon name="browser" />
              Sample Incident
          </Menu.Item>
        </Link>
        <Menu.Item name="logout">
          <Icon name="sign out" />
          Sign out
        </Menu.Item>
      </Sidebar>
      <Sidebar.Pusher
        onClick={props.isVisible ? props.removeSidebarVisibility : null}
        dimmed={props.animation === 'scale down' && props.isVisible? true : false}
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

const mapStateToProps = state => (
  state.sidebar
);
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    removeSidebarVisibility,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(LeftSidebar);
