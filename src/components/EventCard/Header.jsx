import React from 'react';
import PropTypes from 'prop-types';
import {
  Feed,
  Image,
  Label,
} from 'semantic-ui-react';
import eventStyles from './styleSheet';
import calcAge from '../../utils/time';
import { STATIC_IMAGES } from '../../utils/apipaths';
/**
 * [EventHeader description]
 * @param {[type]} props [description]
 */
const EventHeader = (props) => {
  const { reportedBy } = props;
  const reporters = Object.keys(reportedBy).map(k => reportedBy[k]);

  return (
    <Feed style={eventStyles.header}>
      <Feed.Event>
        <Feed.Label>
          <Image
            src={reporters[0].photoURL || `${STATIC_IMAGES}/meerkat.svg`}
          />
        </Feed.Label>
        <Feed.Content>
          <Feed.Date>
            {calcAge(props.dateTime)}
          </Feed.Date>
          <Feed.Summary>
            <p>{reporters[0].displayName } reported an incident</p>
          </Feed.Summary>
          <br />
          {props.reverse_geocode ?
            <div>
              <Label as="a" basic color="purple">{props.reverse_geocode.name}</Label>
              <Label as="a" basic color="orange">{props.reverse_geocode.admin2}</Label>
              <Label as="a" basic color="yellow">{props.reverse_geocode.admin1}</Label>
            </div>
            : null
          }
        </Feed.Content>
      </Feed.Event>
    </Feed>
  );
};

EventHeader.propTypes = {
  reverse_geocode: PropTypes.shape({
    /* Name of the place */
    name: PropTypes.string,
    /* Top levels administative area */
    admin1: PropTypes.string,
    /* Upper administative area */
    admin2: PropTypes.string,
  }),
  /* user_id of the person posting the event */
  // user_id: PropTypes.string.isRequired,
  /* timestamp of the event */
  dateTime: PropTypes.number.isRequired,
};
EventHeader.defaultProps = {
  reverse_geocode: { name: '', admin2: '', admin1: '' },
};

export default EventHeader;
