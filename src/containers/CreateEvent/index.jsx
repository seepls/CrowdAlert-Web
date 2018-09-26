import React from 'react';
import { Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import MapTab from './mapstab';
import FormTab from './formtab';
import ImageTab from './imagestab';

const CreateEvent = (props) => {
  return (
    <Container style={{ paddingBottom: '16vh' }}>
      <br />
      <Switch>
        <Route path={`${props.match.path}/location`} component={MapTab} />
        <Route path={`${props.match.path}/details`} component={FormTab} />
        <Route path={`${props.match.path}/images`} component={ImageTab} />
        <Route render={() => (<Redirect to={`${props.match.path}/location`} />)} />
      </Switch>
    </Container>
  );
};


const mapStateToProps = state => ({
  tabs: state.createEvents.tabs,
});

export default withRouter(connect(mapStateToProps)(CreateEvent));
