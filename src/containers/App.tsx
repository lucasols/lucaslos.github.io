import styled from '@emotion/styled';
import AboutMe from 'containers/AboutMe';
import Background from 'containers/Background';
import Contact from 'containers/Contact';
import Home from 'containers/Home';
import Projects from 'containers/Projects';
import TopButtons from 'containers/TopButtons';
import React from 'react';
import { animated } from 'react-spring';
import { config, scrollHeight, useSpaceScroll } from 'utils/spaceScroll';

const ScrollHandler = styled.div`
  position: absolute;
  width: 100%;
  height: calc(100% + ${scrollHeight}px);
`;

const MainContent = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  perspective: ${config.perspective}px;

  * {
    transform-style: preserve-3d;
  }
`;

const App = () => {
  const {
    scrollPos,
    transitionPos,
    goToSection,
    inTransition,
    activeSection,
  } = useSpaceScroll();

  const springProps = {
    pos: scrollPos,
    transitionPos,
    inTransition,
  };

  return (
    <>
      <ScrollHandler />
      <MainContent>
        <Background />
        <div
          css={{
            position: 'absolute',
            top: 0,
            left: 0,
            color: '#fff',
          }}
        >
          Pos: <animated.span>{scrollPos}</animated.span>
          <br />
          TransitionPos: <animated.span>{transitionPos}</animated.span>
          <br />
          Active: <span>{activeSection}</span>
        </div>
        <Contact springProps={springProps} active={activeSection === 'contact'} />
        <Projects springProps={springProps} active={activeSection === 'projects'} />
        <AboutMe springProps={springProps} active={activeSection === 'aboutMe'} />
        <Home springProps={springProps} active={activeSection === 'home'} goToSection={goToSection} />
        <TopButtons goToSection={goToSection} />
      </MainContent>
    </>
  );
};

export default App;
