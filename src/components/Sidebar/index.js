import React, { Component } from 'react';
import { Sidebar, Segment, Button, Menu, Icon, Container, Image } from 'semantic-ui-react'
import logo from '../../logo.svg'

export default class LeftSidebar extends Component {
    render() { 
        return (
            <div style={{height: '100vh'}}>
              <Sidebar.Pushable as={Segment}>
                <Sidebar as={Menu} animation='overlay' width='wide' visible={this.props.visible} icon='labeled' vertical style={{width: '75%'}}>
                <Menu.Item name='logo'>
                  <Image src={logo} size='small' bordered centered />
                    
                  </Menu.Item>
                  <Menu.Item name='home'>
                    <Icon name='home' />
                    Home
                  </Menu.Item>
                  <Menu.Item name='camera'>
                    <Icon name='camera' />
                    Report
                  </Menu.Item>
                  <Menu.Item name='user'>
                    <Icon name='user circle' />
                    Profile
                  </Menu.Item>
                  <Menu.Item name='logout'>
                    <Icon name='sign out' />
                    Sign out
                  </Menu.Item>
                </Sidebar>
                <Sidebar.Pusher dimmed={this.props.visible} style={{height: '99.9%', 'overflowY':'hidden'}} onClick={this.props.visible?this.props.toggleVisibility:null}>                
                  {this.props.children}
                </Sidebar.Pusher>
              </Sidebar.Pushable>
          </div>
        )
    }
}