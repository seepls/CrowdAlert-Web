import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Segment,
  Grid,
  Button,
} from 'semantic-ui-react';
import {
  MapWrapper,
  Sonar,
  GeoLocator,
} from '../../components';
import {
  saveLocationCreateEvents,
} from './actions';

const MapTab = (props) => {
  if (props.tabs.activeTab !== 0) {
    return null;
  }
  return (
    <Segment attached color="yellow">    
      <Grid>
        <Grid.Row>
          <div
            style={{
              width: '100%',
              height: '50vh',
              left: '0px',
            }}
          >
            <MapWrapper
              dispatchOnClick
              shouldFetch={false}
            >
              <Sonar
                lat={props.location.mapCenter.lat || props.map.lat}
                lng={props.location.mapCenter.lng || props.map.lng}
                id={null}
              />
            </MapWrapper>
          </div>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <p>{props.location.text}</p>           
            <GeoLocator
              static
              fetchOnLoad={!props.tabs.isValid.location}
              floated="left"
              circular={false}
              size={null}
              zoom={16}
            />
            <Button
              floated="right"
              color="teal"
              disabled={
                props.location.disabled
                || false} 
              onClick={() => props.handleSaveLocation()}
            >
              Save Location
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    handleSaveLocation: saveLocationCreateEvents,
  }, dispatch)
);
const mapStateToProps = (state) => {
  return {
    tabs: state.createEvents.tabs,
    location: state.createEvents.location,
    map: state.map,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MapTab);
