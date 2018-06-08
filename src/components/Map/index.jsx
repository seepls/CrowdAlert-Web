/* global google */
import React from 'react';
import PropTypes from 'prop-types';

import { compose, withProps, withStateHandlers } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';

import history from '../../';
import style from './styleBright2';

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
    labelAnchor={new google.maps.Point(35, 70)}
    labelStyle={{ padding: '24px' }}
    icon={{
      url: markerImage,
    }}
    // Push events to browser history so that user is redirected to view events
    onClick={() => history.push(`/view/${props.id}`)}
  >
    <div>
      <div className="sonar-emitter">
        <div className="sonar-wave" />
      </div>
    </div>
  </MarkerWithLabel>
);
Sonar.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};
const MapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />,
  }),
  // Reserved for future if we
  withStateHandlers(() => ({
    isOpen: false,
  }), {
    onToggleOpen: ({ isOpen }) => () => ({
      isOpen: !isOpen,
    }),
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  console.log('MAP PROPS', props);
  return (
    <GoogleMap
      defaultZoom={props.zoom}
      defaultCenter={{
        lat: parseFloat(props.location.lat),
        lng: parseFloat(props.location.lng),
     }}
      defaultOptions={{
      styles: style,
     // these following 7 options turn certain controls off
      streetViewControl: false,
      scaleControl: false,
      mapTypeControl: false,
      panControl: false,
      zoomControl: false,
      rotateControl: false,
      fullscreenControl: false,
    }}
      disableDefaultUI
    >
      { props.children }
    </GoogleMap>
  );
});
/**
 * [Map Just to make sure everythings is in scope]
 * @param {[type]} props [description]
 */
const MapWrapper = props => (
  <MapComponent {...props} />
);

export {
  MapWrapper,
  Sonar,
};
