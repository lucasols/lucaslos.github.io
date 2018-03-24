import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import * as actions from 'redux/actions/index';

import SocialLinks from 'components/SocialLinks';
import ContactForm from 'components/ContactForm';

class Contact extends React.Component {
  static emailSvgIcon() {
    return (
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
      </svg>
    );
  }

  static messageSvgIcon() {
    return (
      <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z" />
      </svg>
    );
  }

  openContactForm = () => {
    this.props.openContactForm();
  }

  render() {
    const { isOpenContactForm } = this.props;

    return (
      <section id="contact">
        <div className={`logo ${isOpenContactForm ? 'hide-bg' : ''}`} data-anim="1" />
        <h1 className="section-title" data-anim="1">CONTACT</h1>
        <article className={`contact-container ${isOpenContactForm ? 'hide-bg' : ''}`}>
          <h2 data-anim="2">Get in touch with me!</h2>
          <a href="mailto:contact@lucassantos.net" className="button big email" data-anim="3">{ this.constructor.emailSvgIcon() }hello@lucassantos.net</a>
          <a className="button big message" id="shared-button" data-anim="4" onClick={this.openContactForm}>{ this.constructor.messageSvgIcon() }Drop me a line</a>
          <SocialLinks />
          {/* FIXME: Ztranslate at end of scroll bug, value is not zero*/}
          <a href="https://github.com/code-kotis/react-floating-label" className="github-project-link" data-anim="6">This project is open source on GitHub.</a>
        </article>
        <ContactForm />
      </section>
    );
  }
}

Contact.propTypes = {
  openContactForm: PropTypes.func.isRequired,
  isOpenContactForm: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isOpenContactForm: state.contactForm.isOpen,
});

const mapDispatchToProps = dispatch => ({
  openContactForm: () => dispatch(actions.setVisibilityContactForm(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Contact);
