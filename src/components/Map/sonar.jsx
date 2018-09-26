/* global google */

import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateMapCenter, updateMapZoom } from './actions';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import { openEventPreview } from '../EventPreviewCard/actions';
import './pulseRed.css';

// 1x1 transparent png image as we don't want to show the default marker image
const markerImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';


/**
 * [Sonar Our custom marker for the maps. Behaves like a Sonar pulsating on the map]
 * @param {[type]} props [description]
 */
const Sonar = props => (
  <MarkerWithLabel
    position={{ lat: props.lat, lng: props.lng }}
    // This 35, 70 value is determined via trial & error. Any other value shifts
    // the marker on changing the zoom level
    labelAnchor={new google.maps.Point(35, 70)}
    labelStyle={{ padding: '24px' }}
    icon={{
      // Show the transparent 1x1 png as the marker image
      url: markerImage,
    }}
    // Push events to browser history so that user is redirected to view events
    onClick={() => {
        if (props.clustered) {
          props.updateMapZoom({
            lat: props.lat,
            lng: props.lng,
            zoom: Math.min(props.map.zoom + 3, 16),
          });
          props.updateMapCenter({
            lat: props.lat,
            lng: props.lng,
            zoom: Math.min(props.map.zoom + 3, 16),
          });
        } else if (props.id) {
          props.openEventPreview({ ...props.payload });
        }
      }}
  >
    <div>
      <div className={`sonar-emitter sonar_${props.type}`}>
        <div className={`sonar-wave sonar_${props.type}`} />
      </div>
    </div>
  </MarkerWithLabel>
);
Sonar.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  id: PropTypes.string,
  type: PropTypes.string,
  clustered: PropTypes.bool,
  updateMapCenter: PropTypes.func,
  updateMapZoom: PropTypes.func,
  openEventPreview: PropTypes.func,
  map: PropTypes.shape({
    zoom: PropTypes.number,
  }),
};
Sonar.defaultProps = {
  id: null,
  type: 'other',
  clustered: false,
  updateMapCenter: () => {},
  updateMapZoom: () => {},
  openEventPreview: () => {},
  map: {
    zoom: 4,
  },
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMapCenter,
    updateMapZoom,
    openEventPreview,
  }, dispatch)
);
const mapStateToProps = state => ({
  map: state.map,
});

export default connect(mapStateToProps, mapDispatchToProps)(Sonar);
