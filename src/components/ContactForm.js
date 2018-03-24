import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import * as actions from 'redux/actions/index';

import TextField from 'components/TextField';

class ContactForm extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpen: false,
    };

    this.duration = 400;

    // TODO: solve bluried text
    this.finalPositioning = {
      top: '50%',
      left: '50%',
      width: '450px',
      maxHeight: '450px',
      marginLeft: '-225px',
      marginTop: '-180px',
      transition: `${this.duration / 1000}s ease-out`,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen) {
      this.setState({
        isOpen: true,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      this.cloneSharedElementPositioning();
      Object.assign(document.getElementById('shared-button').style, {
        opacity: 0,
        transition: 'none',
      });

      setTimeout(() => Object.assign(this.form.style, this.finalPositioning), 10);
    }
  }

  cloneSharedElementPositioning() {
    const sharedPositioning = document.getElementById('shared-button').getBoundingClientRect();

    Object.assign(this.form.style, {
      top: `${sharedPositioning.top}px`,
      left: `${sharedPositioning.left}px`,
      maxHeight: `${sharedPositioning.height}px`,
      width: `${sharedPositioning.width}px`,
      marginLeft: 0,
      marginTop: 0,
      transform: 'translate(0)',
    });
  }

  closeContactForm = () => {
    this.cloneSharedElementPositioning();

    this.props.closeContactForm();

    setTimeout(() => {
      this.setState({ isOpen: false });
      Object.assign(document.getElementById('shared-button').style, {
        opacity: null,
        transition: null,
      });
    }, this.duration + 10);
  }

  submitForm() {
    return false;
  }

  render() {
    const hideContainer = {
      height: 0,
      width: 0,
    };
    const showContainer = {
      height: null,
      width: null,
    };

    return (
      <div className="contact-form-container" onClick={this.closeContactForm} style={this.state.isOpen ? showContainer : hideContainer} >
        <iframe name="hidden-iframe" id="hidden-iframe" style={{ display: 'none' }} />
        <form
          id="contactForm"
          ref={(c) => { this.form = c; }}
          className="contact-form"
          method="post"
          target="hidden_iframe"
          onSubmit={this.submitForm}
          onClick={(e) => { e.stopPropagation(); }}
          action="https://docs.google.com/forms/d/1kv3BsxhYCSos4wp3sZOfPRQpsYtq-dnkrsf-vbeudb4/formResponse"
        >
          <div className="close-form-btn" onClick={this.closeContactForm} />
          <div className="fields-container">
            <TextField
              id="input1"
              label="Your Name"
              errorMsg="validationError"
              regExp="^([a-zA-ZãÃáÁàÀêÊéÉèÈíÍìÌôÔõÕóÓòÒúÚùÙûÛçÇ] ?){2,30}$"
              max="100"
            />
            <TextField
              id="input2"
              label="Email"
              errorMsg="validationError"
              regExp='^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$'
              max="100"
            />
            <TextField
              id="input3"
              label="Message"
              errorMsg="validationError"
              regExp={false}

              max="300"
              multiLine
            />
            <button className="send-form-btn button small">SEND MESSAGE</button>
          </div>

          <h1 className="confirm-msg">Thank you!<br />I'll be in touch.</h1>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeContactForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  isOpen: state.contactForm.isOpen,
});

const mapDispatchToProps = dispatch => ({
  closeContactForm: () => dispatch(actions.setVisibilityContactForm(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
