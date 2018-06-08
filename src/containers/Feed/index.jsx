import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import { MapWrapper, Sonar } from '../../components';
import { GET_EVENTS_BY_LOCATION, GET_LOCATION_BY_IP } from '../../utils/apipaths';

/**
 * [Feed Display events on th map using Sonar components]
 * @extends Component
 */
class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      events: [],
    };
  }
  /**
   * [componentWillMount fetch  the event as soon as the component will mount]
   * @return {[type]} [description]
   */
  componentWillMount() {
    // Fetch the users current approximate location using API
    fetch(GET_LOCATION_BY_IP).then(resp => resp.json()).then((resp) => {
      // Store the location
      this.setState({
        ...this.state,
        location: {
          ...resp,
          lat: parseFloat(resp.lat),
          long: parseFloat(resp.lng),
        },
      });
      const { lat, long } = this.state.location;
      // Try to fetch the events near the given location
      // Here the distance param is hardcoded
      // but it should be replaced by (earth perimeter)/zoom level
      // so that we can fetch events according to the zoom level
      return fetch(`${GET_EVENTS_BY_LOCATION}?lat=${lat}&long=${long}&dist=10000`);
    })
      .then(resp => resp.json())
      .then((resp) => {
        this.setState({
          ...this.state,
          events: resp,
        });
      });
  }

  render() {
    console.log(this.state.events);
    return (
      <div style={{
        // BUG: I previously had encountered a situation where the Map component
        // was not using the entire screen. So I had to hardcode them. But as of
        // now I am not able to reproduce them.
        // So the following styles are commented out.
        // position: 'absolute',
        width: '100hw',
        height: '99vh',
        // top: '0px',
        left: '0px',
        // zIndex: -1,
      }}
      >
        {
          this.state.location ?
            <MapWrapper
              location={{
                lat: this.state.location.lat,
                lng: this.state.location.long,
              }}
              zoom={11}
            >
              {
                this.state.events.map(event => (
                  <Sonar
                    lat={event.lat}
                    lng={event.long}
                    key={event.key}
                    id={event.key}
                  />
              ))}
            </MapWrapper>

          : null
      }

      </div>
    );
  }
}

export default Feed;
