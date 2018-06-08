/* global document */
import React from 'react';
import PropTypes from 'prop-types';

import {
  Button,
  Header,
  Icon,
  Grid,
  Modal,
  Responsive,
} from 'semantic-ui-react';

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from 'react-share';

/**
* [ShareModal ShareModal conponent for event sharing events across
* different platforms. Opens a new modal for sharing buttons.]
*
* @param {[type]} props [description]
*/
const ShareModal = (props) => {
  const shareUrl = document.URL;
  const { title } = props;
  return (
    <Modal trigger={props.children} basic size="small">
      <Header icon="external share" content="Share" />
      <Modal.Content>
        <Responsive maxWidth={900}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <Button color="facebook" fluid>
              <Icon name="facebook" />
              Facebook
            </Button>
          </FacebookShareButton>
          <br />
          <TwitterShareButton url={shareUrl} title={title}>
            <Button color="twitter" fluid>
              <Icon name="twitter" />
              Twitter
            </Button>
          </TwitterShareButton>
          <br />
          <WhatsappShareButton url={shareUrl} title={title} separator=":: ">
            <Button color="green" fluid>
              <Icon name="whatsapp" />
              WhatsApp
            </Button>
          </WhatsappShareButton>
        </Responsive>
        <Responsive minWidth={900}>
          <Grid columns={3}>
            <Grid.Column>
              <FacebookShareButton url={shareUrl} quote={title}>
                <Button color="facebook" fluid>
                  <Icon name="facebook" />
                  Facebook
                </Button>
              </FacebookShareButton>
            </Grid.Column>
            <Grid.Column>
              <TwitterShareButton url={shareUrl} title={title}>
                <Button color="twitter" fluid>
                  <Icon name="twitter" />
                  Twitter
                </Button>
              </TwitterShareButton>
            </Grid.Column>
            <Grid.Column>
              <Button color="google plus" fluid>
                <Icon name="google plus" />
                Google Plus
              </Button>
            </Grid.Column>
          </Grid>
        </Responsive>
      </Modal.Content>
      <Modal.Actions />
    </Modal>
  );
};
ShareModal.propTypes = {
  /* Title to be published on social platforms */
  title: PropTypes.string.isRequired,
  /* Should be a single element which triggers the modal */
  children: PropTypes.element.isRequired,
};
export default ShareModal;
