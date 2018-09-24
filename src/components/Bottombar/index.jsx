import React from 'react';
import { Responsive, Segment, Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import styleSheet from './style';

// Moved to Bottombar in a later MR

const BottomBar = () => (
  <Responsive maxWidth={900}>
    <Segment style={styleSheet}>
      <Grid columns="equal" inverted>
        <Grid.Row textAlign="center">
          <Grid.Column>
            <Icon circular color="teal" name="map outline" />
          </Grid.Column>
          <Grid.Column>
            <Link to="/create/">
              <Icon circular inverted color="teal" name="camera" />
            </Link>
          </Grid.Column>
          <Grid.Column>
            <Icon circular color="teal" name="bell" />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  </Responsive>
);

export default BottomBar;
