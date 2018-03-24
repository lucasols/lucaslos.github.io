import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    moreAboutMe: state.moreAboutMe
  };
};

class MoreAboutMe extends React.Component {
  render () {
    const { moreAboutMe } = this.props;

    return (
      <ul className="social" data-anim="5">
        <h2>+ About me</h2>
        {moreAboutMe.map((item, index) =>
          <a key={index} href={item.link} className="button small">{item.label}</a>
        )}
      </ul>
    )
  }
}

export default connect(mapStateToProps)(MoreAboutMe);
