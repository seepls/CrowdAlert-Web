import React, { Component } from 'react';
import propTypes from 'prop-types';
import {
  Responsive,
  Card,
  Image as SemanticImage,
  Item,
  Grid,
  Container,
} from 'semantic-ui-react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Image,
  Event,
  MapWrapper,
  LoadingCard,
  Sonar,
} from '../../components';

import { updateMapCenter, updateMapZoom } from '../../components/Map/actions';
import { fetchEventData } from './actions';

import styleSheet from './style';

/**
 * [MapwithSonar Combines the MapWrapper & Sonar component to view a single marker
 * on a single marker]
 * @param {[type]} props [description]
 */
const MapwithSonar = props => (
  <MapWrapper>
    <Sonar lat={props.latitude} lng={props.longitude} id={null} type={props.type} />
  </MapWrapper>
);
MapwithSonar.propTypes = {
  latitude: propTypes.number.isRequired,
  longitude: propTypes.number.isRequired,
};
/**
 * [EventCard Combines the all the three parts of event cards to form a single
 * whole component ]
 * @param {[type]} props [description]
 */
const EventCard = props => (
  <Card style={styleSheet[props.viewmode].cardContainer}>
    <Event.Header
      user_id={props.user_id}
      dateTime={props.datetime}
      reverse_geocode={props.reverse_geocode}
    />
    <Event.Body
      title={props.title}
      description={props.description}
      eventType={props.eventType}
    >
      <SemanticImage.Group size={props.viewmode === 'desktop' ? 'small' : 'tiny'}>
        {
          props.images ? props.images.map(image => (
            <Image
              uuid={image.uuid}
              key={image.uuid}
              isTrusted={image.isTrusted}
            />
          )) : null
        }
      </SemanticImage.Group>
    </Event.Body>
    <Event.Footer title={props.title} />
  </Card>
);
EventCard.propTypes = {
  viewmode: propTypes.string.isRequired,
  user_id: propTypes.string.isRequired,
  datetime: propTypes.number.isRequired,
  title: propTypes.string.isRequired,
  description: propTypes.string,
  eventType: propTypes.string,
  reverse_geocode: propTypes.shape({
    /* Name of the place */
    name: propTypes.string,
    /* Top levels administative area */
    admin1: propTypes.string,
    /* Upper administative area */
    admin2: propTypes.string,
  }),
  images: propTypes.arrayOf(propTypes.shape({
    isNsfw: propTypes.bool.isRequired,
    isTrusted: propTypes.bool.isRequired,
    uuid: propTypes.string.isRequired,
  })).isRequired,
};
EventCard.defaultProps = {
  reverse_geocode: { name: '', admin2: '', admin1: '' },
  description: '',
  eventType: 'N/A',
  imageUrls: {
    thumbnail: '',
    url: '',
  },
};
/**
 * [Viewevents Responsive Viewevents component. Fetches data & renders the
 * component]
 * @type {Object}
 */
class Viewevent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.match.params,
      loading: true,
      event: {},
    };
  }
  componentWillMount() {
    const eventid = this.props.match.params.eventid;
    const shouldRefresh =
      this.props.match.params.eventid !== this.props.event.data.eventid;

    this.props.fetchEventData({ eventid, shouldRefresh });
    //this.getEventData();
  }
  /**
   * [getEventData Issue fetch requests to server to get data]
   * @return {[none]}
   */
  getEventData() {
    // Fetch the json data for the given event id
    const lat = this.state.event.location.coords.latitude;
    const long = this.state.event.location.coords.longitude;        
    fetch()
      .then((response) => {
        this.setState({
          ...this.state,
          reverse_geocode: response,
        });
      })
  }
  render() {
    console.log('ViewEvent Props', this.props);
    return (
      <div>
        <Responsive maxWidth={900}>
          <div style={styleSheet.mobile.mapContainer}>
            <MapwithSonar
              latitude={this.props.map.lat}
              longitude={this.props.map.lng}
              type={this.state.event.category}
              id={this.state.eventid} 
            />
        
          </div>
          <Item style={styleSheet.mobile.itemContainer}>
            {
              this.props.event.isLoading
              ? <LoadingCard loading />
              :
              <EventCard
                viewmode="mobile"
                user_id={this.props.event.data.user_id}
                datetime={this.props.event.data.datetime}
                title={this.props.event.data.title}
                description={this.props.event.data.description}
                images={this.props.event.data.images}
                reverse_geocode={this.props.event.reverse_geocode}
                eventType={this.props.event.data.category}
              />
          }
          </Item>
        </Responsive>
        <Responsive minWidth={901}>
          <Container>
            <Grid columns={2}>
              <Grid.Row>
                <Grid.Column>
                  <div style={styleSheet.desktop.mapContainer}>
                    <MapwithSonar
                      latitude={this.props.map.lat}
                      longitude={this.props.map.lng}
                      type={this.props.event.data.category}
                    />
                  </div>
                </Grid.Column>
                <Grid.Column>
                  <Item style={styleSheet.desktop.itemContainer}>
                    {
                      this.props.event.isLoading
                        ? <LoadingCard loading />
                        :
                        <EventCard
                          viewmode="desktop"
                          user_id={this.props.event.data.user_id}
                          datetime={this.props.event.data.datetime}
                          title={this.props.event.data.title}
                          description={this.props.event.data.description}
                          images={this.props.event.data.images}
                          reverse_geocode={this.props.event.reverse_geocode}
                          eventType={this.props.event.data.category}
                        />
                    }
                  </Item>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Container>
        </Responsive>
      </div>
    );
  }
}
Viewevent.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      eventid: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    updateMapCenter,
    updateMapZoom,
    fetchEventData,
  }, dispatch)
);
const mapStateToProps = (state) => {
  return {
    map: state.map,
    event: state.event,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Viewevent);
