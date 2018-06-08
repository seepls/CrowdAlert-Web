import React from 'react';
import PropTypes from 'prop-types';
import { Image, Modal, Responsive } from 'semantic-ui-react';

/**
 * [ImageModal Displays a small thumbnail & opens a large modal onclick]
 * @param {[type]} props [description]
 */

const undefinedURL = 'https://firebasestorage.googleapis.com/v0/b/crowdalert-4fa46.appspot.com/o/images%2Fundefined?alt=media';

const ImageModal = (props) => {
  // console.log(props.imageUrls.url,undefinedURL, props.imageUrls.url === undefinedURL);
  if (props.imageUrls.url !== undefinedURL && props.imageUrls.url !== '') {
    return (
      <Modal trigger={
        <Image
          src={`${props.imageUrls.url}`}
          size="small"
          style={{ backgroundImage: `url(${props.imageUrls.thumbnail})` }}
        />
      }
      >
        <Modal.Header>Photo</Modal.Header>
        <Modal.Content image>
          <Responsive maxWidth={900}>
            <Image fluid src={`${props.imageUrls.url}`} />
          </Responsive>
          <Responsive minWidth={900}>
            <Image size="massive"src={`${props.imageUrls.url}`} />
          </Responsive>
        </Modal.Content>
      </Modal>
    );
  }
  return (
    <p>Image not available</p>
  );
};

ImageModal.propTypes = {
  imageUrls: PropTypes.shape({
    /* SVG url for the image thumbnail */
    thumbnail: PropTypes.string,
    /* Original image thumbnail */
    url: PropTypes.string,
  }),
};
ImageModal.defaultProps = {
  imageUrls: false,
};

export default ImageModal;
