import React from 'react'; import PropTypes from 'prop-types'; 
import Skills from 'components/Skills';
import Education from 'components/Education';
import MoreAboutMe from 'components/MoreAboutMe';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    bio: state.bio,
  };
};

class AboutMe extends React.Component {
  render() {
    const { bio } = this.props;

    return (
      <section id="about-me">
        <div className="logo" data-anim="1" />
        <h1 className="section-title" data-anim="1">ABOUT ME</h1>

        <article>
          <p className="bio" data-anim="2" dangerouslySetInnerHTML={{ __html: bio }} />
          <Skills />
          <Education />
          <MoreAboutMe />
        </article>
      </section>
    )
  }
}

export default connect(mapStateToProps)(AboutMe);
