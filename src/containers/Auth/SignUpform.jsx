import React, { PureComponent } from 'react';
import { Button, Form, Message } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { signUpEmailPassword } from './actions';

class SignUpForm extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      fullname: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { email, fullname, password } = this.state;
    this.props.signUpEmailPassword(email, fullname, password);
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {this.props.signupForm.errors ?
            <Message negative>
              <Message.Header>Authentication Error</Message.Header>
              {this.props.signupForm.message}
            </Message>
            : null}
          <Form.Field>
            <Form.Input
              placeholder="Fullname"
              name="fullname"
              label="Fullname"
              autoComplete="off"
              value={this.state.fullname}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder="Email"
              label="Email"
              name="email"
              type="email"
              autoComplete="off"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
          </Form.Field>
          <Form.Field>
            <Form.Input
              placeholder="Password"
              label="Password"
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleInputChange} 
            />
          </Form.Field>
          <Form.Field>
            <Button
              primary
              fluid
              loading={this.props.signupForm.loading}
              disabled={this.props.signupForm.loading}
            >
              Sign up
            </Button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { signupForm } = state.auth;
  return {
    signupForm,
  };
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
    signUpEmailPassword,
  }, dispatch)
);

SignUpForm.propTypes = {

};
export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);
