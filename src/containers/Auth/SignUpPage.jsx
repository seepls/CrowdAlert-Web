import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Container, Grid, Segment, Header, Image, Button, Responsive, Divider } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

import meerkat from '../../meerkat.svg';
import { setBottomBarVisibility, removeBottomBarVisibility } from '../../components/Sidebar/actions';
import SignUpForm from './SignUpform';
import style from './styles';
import OAuth from './OAuth';

class LoginPage extends Component {
  componentDidMount() {
    this.props.removeBottomBarVisibility();
  }
  componentWillUnmount() {
    this.props.setBottomBarVisibility();
  }  
  render() {
    return (
      <Container>
        <Responsive minWidth={900}>
          <Grid columns={3} stackable verticalAlign="middle" centered>
            <Grid.Row>
              <Grid.Column width={3} />
              <Grid.Column width={10}>
                <Grid columns={2} style={{ padding: '1.4rem' }}>
                  <Grid.Row stretched>
                    <Grid.Column width={7} style={style.meerkatImage} />
                    <Grid.Column width={9}>
                      <Segment.Group style={{ marginLeft: '-1.2rem', marginRight: '-1.2rem' }}>
                        <Segment color="teal" textAlign="center" style={{ minHeight: '10vh' }}>
                          <Header as="h3">CrowdAlert</Header>
                        </Segment>
                        <Segment>
                          <SignUpForm />
                        </Segment>
                        <Segment secondary attached basic style={{ minHeight: '20vh' }}>
                          <OAuth />
                        </Segment>
                      </Segment.Group>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column width={3} />
            </Grid.Row>
          </Grid>
        </Responsive>
        <Responsive maxWidth={900}>
          <Grid style={{ padding: '1.4rem' }}>
            <Grid.Row>
              <Grid.Column>
                <Segment.Group style={{ marginLeft: '-1.2rem', marginRight: '-1.2rem' }}>
                  <Segment color="teal" textAlign="center" style={{ padding: '2vh' }}>
                    <Image src={meerkat} size="small" circular bordered centered />
                    <Header as="h3">CrowdAlert</Header>
                  </Segment>
                  <Segment>
                    <SignUpForm />
                  </Segment>
                  <Segment secondary attached basic style={{ padding: '2vh' }}>
                    <Link to="/login">
                      <Button secondary fluid basic>
                        Login
                      </Button>
                    </Link>
                    <Divider horizontal>Or</Divider>
                    <OAuth />
                  </Segment>
                </Segment.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Responsive>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    removeBottomBarVisibility,
    setBottomBarVisibility,
  }, dispatch)
);

LoginPage.propTypes = {

};

export default connect(null, mapDispatchToProps)(LoginPage);
