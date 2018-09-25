import React from 'react';
import { Responsive, Menu, Icon, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toggleSidebarVisibility } from '../Sidebar/actions';
import LoginButton from '../../containers/Auth/Loginbutton';
import { UserSettingsMenu } from '../';
import logo from '../../logo.png';

/**
 * [MenuBar top menu bar for the app. Responsive according to the viewport]
 * @param {[type]} props [description]
 */
const MenuBar = props => (
  <Menu size="small">
    <Menu.Menu position="left">
      <Responsive as={Menu.Item} {...Responsive.onlyMobile}>
        <Icon
          name="content"
          onClick={() => props.toggleSidebarVisibility({
            animation: 'scale down',
          })}
        />
      </Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyTablet}>
        <Menu.Item>
          <Icon
            name="content"
            onClick={() => props.toggleSidebarVisibility({
              animation: 'uncover',
            })}
          />
        </Menu.Item>
      </Responsive>
      <Responsive as={Menu.Item} minWidth={992}>
        <Image src={logo} style={{ height: '4vh' }} />
        <Link to="/">
          <Menu.Item>
            <Icon name="browser" />
            Feed
          </Menu.Item>
        </Link>
        <Link to="/create">
          <Menu.Item>
            <Icon name="browser" />
            Report
          </Menu.Item>
        </Link>
      </Responsive>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Responsive as={Menu.Item} minWidth={992}>
        {props.isLoggedIn ?
          <p>Logged IN</p>
          :
          <Link to="/login">
            <LoginButton login />
          </Link>
        }
      </Responsive>
      <Responsive as={Menu.Item} minWidth={992}>
        {props.isLoggedIn ?
          <UserSettingsMenu />
          :
          <Link to="/signup">
            <LoginButton signup />
          </Link>
        }
      </Responsive>
      <Responsive as={Menu.Item} {...Responsive.onlyTablet}>
        {props.isLoggedIn ?
          <p>Logged IN</p>
          :
          <Link to="/login">
            <LoginButton login />
          </Link>
        }
      </Responsive>

      <Responsive as={Menu.Item} {...Responsive.onlyMobile}>
        <Icon name="search" />
      </Responsive>

    </Menu.Menu>
  </Menu>
);

MenuBar.propTypes = {
  toggleSidebarVisibility: propTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { isLoggedIn } = state.auth;
  return {
    isLoggedIn,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleSidebarVisibility,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
