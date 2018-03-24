import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    education: state.education
  };
};

class Education extends React.Component {
  render () {
    const { education } = this.props;

    return (
      <div className="education" data-anim="4">
        <h2>Education</h2>
        {education.map((education, index) =>
          <div key={index} className="item">
            <h3>{education.course}</h3>
            <p>{education.institution}</p>
          </div>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Education);
