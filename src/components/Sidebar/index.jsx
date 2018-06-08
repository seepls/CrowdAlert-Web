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
import logo from '../../logo.png';
import styles from './styles';

/**
 * [LeftSidebar LeftSidebar for the app]
 * @param {[type]} props [description]
 */
const LeftSidebar = props => (
  <div style={styles.fitContainer}>
    <Sidebar.Pushable as={Segment}>
      <Sidebar
        as={Menu}
        animation="scale down"
        width="wide"
        visible={props.visible}
        vertical
        style={styles.sidebar}
        inverted
      >
        <Menu.Item name="logo">
          <Image src={logo} size="small" bordered centered />
        </Menu.Item>

        <Link
          to="/"
          onClick={
            props.visible
            ? props.toggleVisibility
            : null
          }
        >
          <Menu.Item name="home">
            <Icon name="home" />
            Home
          </Menu.Item>
        </Link>
        <Menu.Item name="camera">
          <Icon name="camera" />
          Report
        </Menu.Item>
        <Menu.Item name="user">
          <Icon name="user circle" />
          Profile
        </Menu.Item>

        <Link
          to="/view/-L6MrTH7NgTawjN-LOsd"
          onClick={props.visible
                    ? props.toggleVisibility
                    : null}
        >
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
        dimmed={props.visible}
        onClick={props.visible
                ? props.toggleVisibility
                : null}
      >
        {props.children}
      </Sidebar.Pusher>
    </Sidebar.Pushable>
  </div>
);
LeftSidebar.propTypes = {
  /* function to handle the visiblity */
  toggleVisibility: propTypes.func.isRequired,
  /* bool denoting whether the sidebar is open or not */
  visible: propTypes.bool.isRequired,
  children: propTypes.node.isRequired,
};

export default LeftSidebar;
