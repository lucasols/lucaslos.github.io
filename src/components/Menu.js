import React from 'react';
import { connect } from 'react-redux';
import spaceScroll from 'utils/spaceScroll';
import classNames from 'classnames';

import LangSwitcher from 'components/LangSwitcher';

class Menu extends React.Component {
  constructor() {
    super();

    this.state = {
      isToggleOn: false,
    };
  }

  onClickSectionLink(sectionId) {
    this.setState({
      isToggleOn: false,
    });

    spaceScroll.scrollToSection(sectionId);
  }

  onClickOutside = (e) => {
    const menuElem = document.getElementById('menu');

    if (!menuElem.contains(e.target)) {
      this.setState({
        isToggleOn: false,
      });

      document.getElementById('app').removeEventListener('click', this.onClickOutside);
    }
  }

  toggleNav = () => {
    if (!this.state.isToggleOn) {
      document.getElementById('app').addEventListener('click', this.onClickOutside);
    }

    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }

  render() {
    const { activeSection, isOpenContactForm } = this.props;

    return (
      <nav
        id="menu"
        className={classNames(
          { active: this.state.isToggleOn },
          { 'hide-bg': isOpenContactForm },
        )}
      >
        <div className="nav-toggle" onClick={this.toggleNav}>
          <div className="hamburger" />
        </div>

        <ul>
          <li><a href="#start" onClick={() => this.onClickSectionLink(0)}><span className={activeSection === 0 ? 'active' : ''}>Start</span></a></li>
          <li><a href="#about-me" onClick={() => this.onClickSectionLink(1)}><span className={activeSection === 1 ? 'active' : ''}>About me</span></a></li>
          <li><a href="#works" onClick={() => this.onClickSectionLink(2)}><span className={activeSection === 2 ? 'active' : ''}>Works</span></a></li>
          <li><a href="#contact" onClick={() => this.onClickSectionLink(3)}><span className={activeSection === 3 ? 'active' : ''}>Contact</span></a></li>
        </ul>

        <LangSwitcher />
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  activeSection: state.spaceScroll.activeSection,
  isOpenContactForm: state.contactForm.isOpen,
});

export default connect(mapStateToProps)(Menu);
