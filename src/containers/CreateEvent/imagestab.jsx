import React, { Component } from 'react';
import {
  Dimmer,
  Grid,
  Loader,
  Modal,
  Button,
  Segment,
  Image as SemanticImage,
  Icon,
  Progress,
  Header,
  Message,
} from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import { Link } from 'react-router-dom';
import { Image } from '../../components';
import Webcam from './webcam';
import { UPLOAD_IMAGES } from '../../utils/apipaths';
import { toggleImageUpload } from './actions';

class ImagesTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: {},
    };
    this.setWebcamRef = this.setWebcamRef.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.captureWebcam = this.captureWebcam.bind(this);
    this.handleFileSelect = this.handleFileSelect.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
  }
  setWebcamRef(webcam) {
    this.webcam = webcam;
  }
  captureWebcam() {
    const src = this.webcam.getScreenshot();
    const newImage = {
      base64: src,
      isVerified: true,
      key: Object.keys(this.state.images).length,
      isUploaded: false,
    };
    this.setState({
      ...this.state,
      images: {
        ...this.state.images,
        [Object.keys(this.state.images).length]: newImage,
      },
    });
  }
  handleFileSelect(accepted) {
    accepted.map((imageFile) => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const newImage = {
          base64: reader.result,
          isVerified: false,
          isUploaded: false,
          key: Object.keys(this.state.images).length,
        };
        this.setState({
          ...this.state,
          images: {
            ...this.state.images,
            [Object.keys(this.state.images).length]: newImage,
          },
        });
      }, false);
      reader.readAsDataURL(imageFile);
      return null;
    });
  }
  handleUpload() {
    if (!this.props.reportForm.eventID) {
      // return;
    }
    this.setState({
      ...this.state,
      errors: false,
    });
    this.props.toggleImageUpload();

    const images = Object.keys(this.state.images).map(key =>
      this.state.images[key]);
    const imagesUpload = images.map((image) => {
      if (image.isUploaded) {
        // console.log(image);
        return null;
      }
      const newFormData = new FormData();
      newFormData.append('isValid', image.isVerified);
      newFormData.append('eventId', this.props.reportForm.eventID);
      newFormData.append('base64', image.base64);

      return fetch(UPLOAD_IMAGES, {
        method: 'post',
        body: newFormData,
      }).then(resp => resp.json())
        .then((resp) => {
          const newImage = {
            ...image,
            isUploaded: true,
            uuid: resp.name,
          };
          const newState = {
            ...this.state,
            images: {
              ...this.state.images,
              [image.key]: newImage,
            },
          };
          this.setState(newState);
        });
    });
    Promise.all(imagesUpload)
      .then(() => {
        this.props.toggleImageUpload();
      })
      .catch(() => {
        this.props.toggleImageUpload();
        this.setState({
          ...this.state,
          errors: true,
        });
      });
  }
  render() {
    let uploaded = 0;
    const total = Object.keys(this.state.images).length;

    // console.log(this.state);
    return (
      <div>
        <Dimmer active={false}>
          <Loader />
        </Dimmer>
        <Segment attached color="brown">
          <Header as="h3" dividing>
            <Icon name="camera" />
            <Header.Content>
              Upload Images
              <Header.Subheader>
                Uploading images gives your report credibility
              </Header.Subheader>
              <Header.Subheader>
                <br />
              </Header.Subheader>

            </Header.Content>
          </Header>

          <Grid columns={2} divided>
            <Grid.Row>
              <Grid.Column textAlign="center">
                <p>Use device camera</p>
                <Modal
                  trigger={<Button
                    icon="camera"
                    fluid
                    size="massive"
                    basic
                    color="green"
                    style={{
                      marginTop: '5vh', marginBottom: '5vh', paddingTop: '8vh', paddingBottom: '8vh',
                      }}
                    disabled={this.props.reportForm.imageSelectDisabled}
                  />}
                  closeIcon
                >
                  <Modal.Header>Click a Photo</Modal.Header>
                  <Modal.Content>
                    <Webcam
                      audio={false}
                      height="100%"
                      ref={this.setWebcamRef}
                      screenshotFormat="image/jpeg"
                      width="100%"
                      front={false}
                    />
                    <Modal.Description>
                      <Grid columns="equal">
                        <Grid.Row textAlign="center">
                          <Grid.Column />
                          <Grid.Column>
                            <Button
                              circular
                              icon="camera"
                              fluid
                              size="massive"
                              basic
                              color="green"
                              onClick={this.captureWebcam}
                              disabled={this.props.reportForm.imageSelectDisabled}
                            />
                          </Grid.Column>
                          <Grid.Column />
                        </Grid.Row>
                      </Grid>

                    </Modal.Description>
                  </Modal.Content>
                </Modal>
              </Grid.Column>
              <Grid.Column textAlign="center">
                <Dropzone
                  ref={(node) => { this.dropzoneRef = node; }}
                  onDrop={this.handleFileSelect}
                  style={{ display: 'none' }}
                />
                <p>Upload from device</p>
                <Button
                  icon="cloud upload"
                  fluid
                  size="massive"
                  basic
                  color="orange"
                  style={{
                    marginTop: '5vh', marginBottom: '5vh', paddingTop: '8vh', paddingBottom: '8vh',
                    }}
                  onClick={() => { this.dropzoneRef.open(); }}
                  disabled={this.props.reportForm.imageSelectDisabled}
                />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
        {this.state.errors ?
          <Message
            attached
            negative
            header="Error during upload"
            content="Some of the images might not have been uploaded. Please retry"
          />
          :
          null
        }
        <Segment attached secondary>
          <Grid>
            <Grid.Row>
              <Grid.Column>
                <SemanticImage.Group size="tiny">
                  {
                    Object.keys(this.state.images).map((key) => {
                      const image = this.state.images[key];
                      if (image.isUploaded) {
                        uploaded += 1;
                      }
                      return (
                        <Image
                          base64={image.base64}
                          key={image.key}
                          isTrusted={image.isVerified}
                        >
                          <SemanticImage
                            fluid
                            label={image.isUploaded ? {
                              as: 'a',
                              corner: 'left',
                              icon: 'check',
                            } : null}
                            src={image.base64}
                          />
                        </Image>
                      );
                    })
                  }
                </SemanticImage.Group>
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                {this.props.reportForm.uploading ?
                  <Progress
                    percent={parseInt((uploaded / total) * 100, 10) || 10}
                    color="teal"
                    indicating
                  />
                : null
                }
                {
                  Object.keys(this.state.images).length ?
                    <div>
                      {parseInt((uploaded / total), 10) ?
                        <Button
                          as={Link}
                          to={`/view/${this.props.reportForm.eventID}`}
                          color="green"
                          floated="left"
                          loading={this.props.reportForm.uploading}
                        >
                          <Icon name="check" />
                          Finish
                        </Button>
                      : null 
                      }
                      {(!parseInt((uploaded / total), 10) &&
                        !this.props.reportForm.uploading) ?
                          <Button
                            color="brown"
                            floated="right"
                            onClick={this.handleUpload}
                            loading={this.props.reportForm.uploading}
                            disabled={this.props.reportForm.uploading}
                          >
                            <Icon name="cloud upload" />
                            Upload
                          </Button>
                        : null
                      }
                    </div>
                  : null
                }
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  tabs: state.createEvents.tabs,
  details: state.createEvents.details,
  reportForm: state.createEvents.form,
});
const mapDisptachToProps = dispatch => (
  bindActionCreators({
    toggleImageUpload,
  }, dispatch)
);
export default connect(mapStateToProps, mapDisptachToProps)(ImagesTab);
