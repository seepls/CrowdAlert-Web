import React, { Component } from 'react';
import {
  Segment,
  Grid,
  Form,
  Message,
  TextArea,
  Icon,
  Input,
  Label,
  Checkbox,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getEventColor from '../../utils/eventcolors';
import {
  updateEventDetailsCreateEvents,
  validateFormCreateEvents,
} from './actions';

const eventOptions = [
  { key: 'rd', text: 'Road', value: 'road' },
  { key: 'el', text: 'Electric', value: 'electric' },
  { key: 'hl', text: 'Health', value: 'health' },
  { key: 'fr', text: 'Fire', value: 'fire' },
];

const FormTab = (props) => {
  if (props.tabs.activeTab !== 1) {
    return null;
  }
  return (
    <Segment
      attached
      color={getEventColor(props.details.eventType)}
    >
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Form loading={props.reportForm.loading}>
              <Form.Field>
                {props.reportForm.validationErrors ?
                  // <h1>ERROR</h1>
                  <Message
                    negative
                    icon="ban"
                    header={props.reportForm.message.header}
                    content={props.reportForm.message.body}
                  />
                  : null }
              </Form.Field>
              <Form.Field required disabled={props.reportForm.isFreezed}>
                <p>Event Type</p>
                <Form.Select
                  options={eventOptions}
                  placeholder="Event Type"
                  value={props.details.eventType}
                  onChange={(e, { value }) =>
                    props.handleInputChange({
                      target: {
                        value,
                        name: 'eventType',
                      },
                    })
                  }
                />
              </Form.Field>
              <Form.Field required disabled={props.reportForm.isFreezed}>
                <p>Short Description</p>
                <Input
                  name="title"
                  label={{
                    basic: true,
                    content:
                      `${props.details.title.length}/50`,
                  }}
                  labelPosition="right"
                  onChange={props.handleInputChange}
                  value={props.details.title}
                  autoComplete="off"
                  maxLength={50}
                />
              </Form.Field>
              <Form.Field disabled={props.reportForm.isFreezed}>
                <TextArea
                  placeholder="Tell us more"
                  style={{ minHeight: 100 }}
                  onChange={props.handleInputChange}
                  value={props.details.description}
                  name="description"
                />
              </Form.Field>
              <Form.Field disabled={props.reportForm.isFreezed}>
                <Checkbox
                  label={{ children: 'Make incident publicly visible' }}
                  checked={props.details.public}
                  onChange={() => props.handleInputChange({
                      target: {
                        checked: !props.details.public,
                        name: 'public',
                        type: 'checkbox',
                      },
                    })}
                />
              </Form.Field>
              <Form.Field disabled={props.reportForm.isFreezed}>
                <Checkbox
                  label={{ children: 'Ask for public help' }}
                  checked={props.details.help}
                  name="help"
                  onChange={() => props.handleInputChange({
                      target: {
                        checked:
                          props.details.public
                          && !props.details.help,
                        name: 'help',
                        type: 'checkbox',
                      },
                    })}
                />
              </Form.Field>
              <Form.Button
                floated="right"
                color="orange"
                onClick={(e) => {
                  e.preventDefault();
                  props.handleSubmit();
                  }
                }
                disabled={
                  props.reportForm.loading
                  || props.reportForm.isFreezed}
              >
                <Icon name="check" /> Report Incident
              </Form.Button>
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
};

const mapStateToProps = (state) => {
  return {
    tabs: state.createEvents.tabs,
    details: state.createEvents.details,
    reportForm: state.createEvents.form,
  };
};
const mapDisptachToProps = dispatch => (
  bindActionCreators({
    handleInputChange: updateEventDetailsCreateEvents,
    handleSubmit: validateFormCreateEvents,
  }, dispatch)
);

export default connect(mapStateToProps, mapDisptachToProps)(FormTab);
