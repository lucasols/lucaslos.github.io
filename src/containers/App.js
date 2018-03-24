import React from 'react'; import PropTypes from 'prop-types'; 

import Menu from 'components/Menu';
import Home from 'containers/Home';
import AboutMe from 'containers/AboutMe';
import Works from 'containers/Works';
import Contact from 'containers/Contact';

import spaceScroll from 'utils/spaceScroll';

class App extends React.Component {
  componentDidMount() {
    spaceScroll.initialize(this.bgContainer);
  }

  render() {
    return (
      <div>
        <div id="scroll-handler" style={{ height: 20000 }} />
        <div className="page-container">
          <div className="background" ref={(c) => { this.bgContainer = c; }} />
          <Home />
          <AboutMe />
          <Works />
          <Contact />
        </div>
        <Menu />
      </div>
    );
  }
}
// TODO: implement scroll to start to logo
// TODO: implement router
// window.onbeforeunload = () => { window.scrollTo(0, 0); }

export default App;
