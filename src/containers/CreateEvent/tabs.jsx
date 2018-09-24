import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Step,
  Icon,
  Responsive,
} from 'semantic-ui-react';
import getEventColor from '../../utils/eventcolors';

import { changeTabCreateEventsForm } from './actions';

const Tabs = (props) => {
  return (
    <Step.Group fluid attached="top" widths={3} unstackable>
      <Step
        completed={props.tabs.isValid.location}
        active={props.tabs.activeTab === 0}
        onClick={() => props.handleTabChange(0)}
      >
        <Icon circular color="yellow" name="map outline" size="small" />
        <Responsive minWidth={901}>
          <Step.Content>
            <Step.Title>Location</Step.Title>
            <Step.Description>{props.location.text}</Step.Description>
          </Step.Content>
        </Responsive>

      </Step>
      <Step
        active={props.tabs.activeTab === 1}
        onClick={() => props.handleTabChange(1)}
        completed={props.tabs.isValid.details}
      >
        <Icon circular color={getEventColor(props.details.eventType)} name="edit" />
        <Responsive minWidth={901}>
          <Step.Content>
            <Step.Title>Description</Step.Title>
            <Step.Description>Enter incident information</Step.Description>
          </Step.Content>
        </Responsive>
      </Step>

      <Step
        active={props.tabs.activeTab === 2}
        onClick={() => props.handleTabChange(2)}
        completed={props.tabs.isValid.images}
      >
        <Icon circular color="brown" name="camera retro" />
        <Responsive minWidth={901}>
          <Step.Content>
            <Step.Title>Image</Step.Title>
            <Step.Description>Click a photo</Step.Description>
          </Step.Content>
        </Responsive>
      </Step>
    </Step.Group>
  );
};

const mapStateToProps = (state) => {
  return {
    tabs: state.createEvents.tabs,
    location: state.createEvents.location,
    details: state.createEvents.details,
  };
};

const mapDisptachToProps = dispatch => (
  bindActionCreators({
    handleTabChange: changeTabCreateEventsForm,
  }, dispatch)
);

export default connect(mapStateToProps, mapDisptachToProps)(Tabs);
