import React from 'react'; import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import classNames from 'classnames';

const mapStateToProps = (state) => {
  return {
    language: state.language
  };
};

class LangSwitcher extends React.Component {
  render () {
    const { language } = this.props;

    return (
      <div className="lang-switcher" data-anim="6">
        <a href="" className={language === 'en' ? 'active' : ''}>EN</a>
        <span>/</span>
        <a href="" className={language === 'pt' ? 'active' : ''}>PT</a>
      </div>
    )
  }
}

export default connect(mapStateToProps)(LangSwitcher);
