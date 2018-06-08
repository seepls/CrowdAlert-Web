import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Label, Icon, Dropdown } from 'semantic-ui-react';
import ShareModal from '../Share';

/**
 * [EventFooter Footer Bar component for Events Card ]
 * @param {[type]} props [description]
 */
const EventFooter = props => (
  <Menu widths={3}>
    <Menu.Item active>
      <Icon color="red" name="thumbs up" />
      <Label color="red" floating>12</Label>
          Upvoted
    </Menu.Item>
    <Menu.Item>
      <Dropdown icon="bars">
        <Dropdown.Menu>
          <Dropdown.Item>
            <ShareModal title={props.title}>
              <p>
                <Icon color="black" name="external share" />
                 Share
              </p>
            </ShareModal>
          </Dropdown.Item>
          <Dropdown.Item>
            <Icon color="black" name="warning circle" />Mark as Spam
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
    <Menu.Item >
      <Icon color="blue" name="comments outline" />
      <Label color="blue" floating>5</Label>
          Comment
    </Menu.Item>
  </Menu>
);
EventFooter.propTypes = {
  title: PropTypes.string.isRequired,
};

export default EventFooter;
