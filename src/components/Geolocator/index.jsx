import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal, Header, Icon, Button } from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  geolocatoretLocationPermission,
  geolocatorModalClose,
} from './actions';
import style from './styles';

const ConfirmationModal = props => (
  <Modal open={props.isOpen} basic size="small">
    <Header icon="archive" content="Permissions Required" />
    <Modal.Content>
      <p>{props.text}</p>
    </Modal.Content>
    <Modal.Actions>
      <Button color="teal" inverted onClick={() => props.closeModal()}>
        <Icon name="checkmark" />
        Okay
      </Button>
    </Modal.Actions>
  </Modal>
);

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

class GeoLocator extends Component {
  componentWillMount() {
    if (this.props.fetchOnLoad) {
      this.props.getLocation();
    }
  }

  render() {
    return (
      <div style={this.props.static ? null : style.crosshair}>
        <Button
          icon="crosshairs"
          circular={this.props.circular}
          color="black"
          size={this.props.size}
          onClick={() => this.props.getLocation(this.props)}
          floated={this.props.floated}
        />
        <ConfirmationModal
          text={this.props.modal.modalText}
          isOpen={this.props.modal.isOpen}
          closeModal={this.props.closeModal}
        />
      </div>
    );
  }
}

GeoLocator.propTypes = {
  static: PropTypes.bool,
  size: PropTypes.string,
  circular: PropTypes.bool,
  getLocation: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  fetchOnLoad: PropTypes.bool,
  floated: PropTypes.string,
  modal: PropTypes.shape({
    modalText: PropTypes.string.isRequired,
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
  }).isRequired,
};
GeoLocator.defaultProps = {
  static: false,
  size: 'huge',
  circular: true,
  fetchOnLoad: false,
  floated: 'right',
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getLocation: geolocatoretLocationPermission,
    closeModal: geolocatorModalClose,
  }, dispatch)
);
const mapStateToProps = (state) => {
  const { geoLocator } = state;
  return {
    modal: geoLocator,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GeoLocator);
