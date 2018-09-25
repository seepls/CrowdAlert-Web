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
  CommentsSection,
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
      reportedBy={props.reportedBy}
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
  // reportedBy: propTypes..isRequired,
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
  componentWillMount() {
    const { eventid } = this.props.match.params;
    const shouldRefresh =
      this.props.match.params.eventid !== this.props.event.data.eventid;

    this.props.fetchEventData({ eventid, shouldRefresh });
  }
  render() {
    console.log('ViewEvent Props', this.props);
    return (
      <div style={{ paddingTop: '1rem', marginBottom: '6rem' }}>
        <Responsive maxWidth={900}>
          <div style={styleSheet.mobile.mapContainer}>
            <MapwithSonar
              latitude={this.props.map.lat}
              longitude={this.props.map.lng}
              type={this.props.event.data.category}
            />

          </div>
          <Item style={styleSheet.mobile.itemContainer}>
            {
              this.props.event.isLoading
              ? <LoadingCard loading />
              :
              <EventCard
                viewmode="mobile"
                reportedBy={this.props.event.data.reportedBy}
                datetime={this.props.event.data.datetime}
                title={this.props.event.data.title}
                description={this.props.event.data.description}
                images={this.props.event.data.images}
                reverse_geocode={this.props.event.reverse_geocode}
                eventType={this.props.event.data.category}
              />
          }
            {!this.props.event.isLoading ?
              <CommentsSection
                threadId={this.props.match.params.eventid}
              />
            : null }
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
                          reportedBy={this.props.event.data.reportedBy}
                          datetime={this.props.event.data.datetime}
                          title={this.props.event.data.title}
                          description={this.props.event.data.description}
                          images={this.props.event.data.images}
                          reverse_geocode={this.props.event.reverse_geocode}
                          eventType={this.props.event.data.category}
                        />
                    }
                    {!this.props.event.isLoading ?
                      <CommentsSection
                        threadId={this.props.match.params.eventid}
                      />
                    : null }
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
const mapStateToProps = state => ({
  map: state.map,
  event: state.event,
});
export default connect(mapStateToProps, mapDispatchToProps)(Viewevent);
