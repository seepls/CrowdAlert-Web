import React from 'react';
import PropTypes from 'prop-types';
import { Item, Divider, Label } from 'semantic-ui-react';
import styleSheet from './styleSheet';

/**
 * [getEventColor returns event color according event type]
 * @param  {[type]} type [event type]
 * @return {[type]}      [event color]
 */
const getEventColor = (type) => {
  let eventColor = '';
  switch (type) {
    case 'fire':
      eventColor = 'red';
      break;
    case 'road':
      eventColor = 'brown';
      break;
    case 'health':
      eventColor = 'teal';
      break;
    case 'electric':
      eventColor = 'yellow';
      break;
    default:
      eventColor = 'blue';
  }
  return eventColor;
};
/**
 * [Body JSX element for Event Card Body. Contains the event description]
 * @param {[type]} props
 */

const Body = props => (
  <Item.Content>
    <Item.Header as="a">{props.title}</Item.Header>
    <Label
      color={getEventColor(props.eventType)}
      ribbon
      style={styleSheet.ribbonLabel}
    >
      {props.eventType.toLocaleUpperCase()}
    </Label>
    {props.desktop ?
      <Item.Meta>Description</Item.Meta>
    : null}
    <Item.Description>
      {props.description}
    </Item.Description>
    <Divider section />
    <Item.Extra>
      {props.children}
    </Item.Extra>
  </Item.Content>
);

Body.propTypes = {
  title: PropTypes.string.isRequired,
  desktop: PropTypes.bool,
  description: PropTypes.string,
  children: PropTypes.node.isRequired,
  eventType: PropTypes.string,
};
Body.defaultProps = {
  desktop: false,
  description: 'None available',
  eventType: 'N/A',
};

export default Body;
