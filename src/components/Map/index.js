import React, { Component } from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

const MapStyle = {
  width: '90%',
  height: '90%'
}

export class MapContainer extends Component {
  componentDidMount() {
    //alert('Not Yet Implemented');
  }
  render() {
    if (!this.props.loaded) {
      return (
        <div>Loading..</div>
      )
    }
    return (
      <div>
        <Map google={this.props.google}
          zoom={14}
          initialCenter={this.props.location}
        //    style={MapStyle}
          >
            {this.props.children}
          <Marker onClick={() => console.log(this)}
                  name={'Current location'} />
        </Map>
      </div>

    )
  }
}

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY,
})(MapContainer)
