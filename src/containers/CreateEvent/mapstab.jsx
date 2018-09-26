import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Segment,
  Grid,
  Button,
  Header,
  Icon,
  Progress,
} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import {
  MapWrapper,
  Sonar,
  GeoLocator,
} from '../../components';
import {saveLocationCreateEvents,} from './actions';
import getEventColor from '../../utils/eventcolors';


const MapTab = props => (
  <Segment>
    <Progress
      percent={33}
      attached="top"
      color={getEventColor(props.details.eventType)}
    />
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <Header as="h3">
            <Icon name="marker" />
            <Header.Content>
              Location Information
              <Header.Subheader>
                Click on the map to update the incident location
              </Header.Subheader>
            </Header.Content>
          </Header>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <div
            style={{
              width: '100%',
              height: '50vh',
              left: '0px',
            }}
          >
            <MapWrapper
              dispatchOnClick={!props.reportForm.isFreezed}
              shouldFetch={false}
            >
              {props.location.mapCenter.lat ?
                <Sonar
                  lat={props.location.mapCenter.lat || props.map.lat}
                  lng={props.location.mapCenter.lng || props.map.lng}
                  id={null}
                />
              : null }

            </MapWrapper>
          </div>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h4">
            <Icon name="bullseye" />
            <Header.Content>
              Current Map Location
              <Header.Subheader>
                {props.location.text || 'No location selected'}
              </Header.Subheader>
            </Header.Content>
          </Header>
          <GeoLocator
            static
            fetchOnLoad={!props.tabs.isValid.location}
            floated="left"
            circular={false}
            size={null}
            zoom={16}
          />
          <Button
            as={Link}
            floated="right"
            color="teal"
            disabled={!props.location.mapCenter.lat}
            onClick={() => props.handleSaveLocation()}
            icon
            labelPosition="right"
            to="/create/details"
          >
            <Icon name="right arrow" />
            Proceed
          </Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>
);
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    handleSaveLocation: saveLocationCreateEvents,
  }, dispatch)
);
const mapStateToProps = state => ({
  tabs: state.createEvents.tabs,
  location: state.createEvents.location,
  details: state.createEvents.details,
  map: state.map,
  reportForm: state.createEvents.form,
});
export default connect(mapStateToProps, mapDispatchToProps)(MapTab);
