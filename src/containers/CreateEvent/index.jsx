import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import Tab from './tabs';
import MapTab from './mapstab';
import FormTab from './formtab';
import ImageTab from './imagestab';

class CreateEvent extends Component {
  render() {
    console.log(this.state);
    return (
      <Container style={{ paddingBottom: '26vh' }}>
        <br />
        <Tab />
        <MapTab />
        <FormTab />
        <ImageTab />
      </Container>
    );
  }
}

export default CreateEvent;
