import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    social: state.socialLinks,
  };
};

class SocialLinks extends React.Component {
  svgIcon(path) {
    return (
      <svg width="36" height="36" viewBox="0 0 1024 1024">
        <path d={path} />
      </svg>
    )
  }

  render() {
    const { social } = this.props;

    return (
      <ul className="social-links" data-anim="5">
        {social.map((social, index) =>
          <li key={index}><a href={social.link}>{ this.svgIcon(social.svgPaths) }{social.name}</a></li>
        )}
      </ul>
    )
  }
}

export default connect(mapStateToProps)(SocialLinks);
