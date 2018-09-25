import React, { Component } from 'react';
import { Comment, Image, Card, Icon, Feed, Form, Responsive, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { LoadingCard } from '../';
import {
  fetchCommentsThread,
  fetchCommentsThreadCancel,
  postCommentToThread,
} from './actions';
import { STATIC_IMAGES } from '../../utils/apipaths';
import calcAge from '../../utils/time';

class CommentsSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchCommentsThread(this.props.threadId, true);
  }
  handleInputChange(event) {
    const { target } = event;
    const { value } = target;
    const { name } = target;

    this.setState({
      ...this.state,
      [name]: value,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { comment } = this.state;
    if (!comment) {
      return false;
    }
    const { threadId } = this.props.comments;
    this.setState({
      comment: '',
    });
    this.props.postCommentToThread(comment, threadId);
  }
  render() {
    if (this.props.comments.loading) {
      return (<LoadingCard loading />);
    }
    return (
      <Card style={{ width: '95%', padding: '0.3rem' }} color="red">
        <Card.Content>
          <Feed>
            <Feed.Event>
              <Feed.Label
                image={this.props.auth.user.photoURL ||
                  `${STATIC_IMAGES}/meerkat.svg`}
                style={{ marginTop: '1rem' }}
              />
              <Feed.Content>
                <Feed.Summary>
                  Write a comment
                </Feed.Summary>
                <Feed.Extra text>
                  <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                      <Form.Field width={13}>
                        <Form.TextArea
                          autoHeight
                          placeholder="Comment.."
                          name="comment"
                          onChange={this.handleInputChange}
                          value={this.state.comment}
                        />
                      </Form.Field>
                      <Form.Field width={3} style={{ paddingLeft: '0rem' }}>
                        <Responsive minWidth={901}>
                          <Form.Button width={2} color="teal">
                            <Icon name="comment" />
                          </Form.Button>
                        </Responsive>
                        <Responsive maxWidth={900}>
                          <Form.Button
                            width={2}
                            color="teal"
                            style={{ marginTop: '1rem' }}
                            icon
                            labelPosition="left"
                            loading={this.props.comments.commentButtonLoading}
                            disabled={this.props.comments.commentButtonLoading}
                          >
                            <Icon name="comment" />
                            Post
                          </Form.Button>
                        </Responsive>
                      </Form.Field>
                    </Form.Group>
                  </Form>
                </Feed.Extra>
              </Feed.Content>
            </Feed.Event>
          </Feed>
          {this.props.comments.errors ?
            <Message negative>
              <Message.Header>Unable to Post Comment</Message.Header>
              <Message.Content>{this.props.comments.message}</Message.Content>
            </Message>
            : null}
        </Card.Content>
        <Card.Content>
          <Comment.Group>
            {this.props.comments.comments.map(comment => (
              <Comment key={comment.key}>
                <Comment.Avatar
                  src={this.props.comments.userData[comment.user].photoURL ||
                      `${STATIC_IMAGES}/meerkat.svg`}
                />
                <Comment.Content>
                  <Comment.Author as="a">
                    {this.props.comments.userData[comment.user].displayName}
                  </Comment.Author>
                  <Comment.Metadata as="a">
                    <span>{calcAge(comment.timestamp)}</span>
                  </Comment.Metadata>
                  <Comment.Text>{comment.text}</Comment.Text>
                  <Comment.Actions>
                    <a><Icon name="like" /></a>
                    <a><Icon name="flag" /></a>
                  </Comment.Actions>
                </Comment.Content>
              </Comment>
            ))}
            
            {this.props.comments.comments.length ?
              null
            :
              <center>
                <Image
                  src={`${STATIC_IMAGES}/meerkat.svg`}
                  size="tiny"
                  circular
                  bordered
                  centered
                  disabled
                />
                <br />
                <p>Nothing here</p>
              </center>
            }
          </Comment.Group>
        </Card.Content>
      </Card>
    );
  }
}

CommentsSection.propTypes = {

};

const mapStateToProps = state => ({
  comments: state.comments,
  auth: state.auth,
});
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    fetchCommentsThread,
    fetchCommentsThreadCancel,
    postCommentToThread,
  }, dispatch)
);


export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
