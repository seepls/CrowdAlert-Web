import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUserLocation, fetchEventsByLocation } from './actions';
import style from './style';
import { MapWrapper, Sonar, BottomBar, EventPreviewCard, GeoLocator } from '../../components';

function getEventMarkers(feed, zoom) {
  // Boundary conditions
  if (zoom < 4 || zoom > 18) {
    return [];
  }
  const feedData = {};
  Object
    .keys(feed)
    .forEach((z) => {
      feedData[z] = Object.keys(feed[z]).map(e => feed[z][e]);
    });

  // If current zoom level has some events return them
  if (feedData[zoom] && feedData[zoom].length) {
    return feedData[zoom];
  }

  for (let i = 1; i < 18;) {
    if ((zoom + i > 4 && zoom + i < 18)
      && feedData[zoom + i] && feedData[zoom + i].length) {
      console.log(feedData[zoom + i], i, zoom+i);
      return feedData[zoom + i] || [];
    }
    if ((zoom - i > 4 && zoom - i < 18)
      && feedData[zoom - i] && feedData[zoom - i].length) {
      console.log(feedData[zoom - i], i, zoom-i);
      return feedData[zoom - i];
    }
    i += 1;
  }
  return [];
}

/**
 * [Feed Display events on th map using Sonar components]
 * @extends Component
 */
class Feed extends Component {
  /**
   * [componentWillMount fetch  the event as soon as the component will mount]
   * @return {[type]} [description]
   */
  componentWillMount() {
    // Fetch the users current approximate location using API
    this.props.fetchUserLocation({
      oldLat: this.props.mapProps.lat,
      oldLng: this.props.mapProps.lng,
    });
    this.props.fetchEventsByLocation({
      lat: this.props.mapProps.lat,
      lng: this.props.mapProps.lng,
      zoom: this.props.mapProps.zoom,
    });
  }
  componentWillUnmount() {
    console.log('UNMOUNT');
  }
  render() {
    // console.log(this.props);
    const Markers =
      getEventMarkers(this.props.feedProps, this.props.mapProps.zoom)
        .map(event => (
          <Sonar
            lat={event.lat}
            lng={event.long}
            key={event.key}
            id={event.key}
            type={event.isClustered ? 'other' : event.category}
            clustered={event.isClustered}
            payload={event}
          />
        ));
    return (
      <div style={style}>
        <MapWrapper shouldFetch>
          { Markers }
        </MapWrapper>
        <EventPreviewCard />
        <GeoLocator />
        <BottomBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { map } = state;
  const { feed } = state;
  return {
    mapProps: map,
    feedProps: feed,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchUserLocation,
    fetchEventsByLocation,
  }, dispatch)
);
export default connect(mapStateToProps, mapDispatchToProps)(Feed);
