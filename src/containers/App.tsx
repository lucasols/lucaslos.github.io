import styled from '@emotion/styled';
import Planet from 'components/Planet';
import AboutMe from 'containers/AboutMe';
import Background from 'containers/Background';
import Contact from 'containers/Contact';
import Home from 'containers/Home';
import Projects from 'containers/Projects';
import { throttle } from 'lodash-es';
import React, { useEffect } from 'react';
import { animated, useSpring } from 'react-spring';
import { getTransitionPos, scrollHeight, perspective } from 'utils/spaceScroll';

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
  perspective: ${perspective}px;

  * {
    transform-style: preserve-3d;
  }
`;

const App = () => {
  const [{ pos }, setPos] = useSpring<{ pos: number }>(() => ({ pos: 0.5, config: { precision: 0.001, friction: 60 } }));

  useEffect(() => {
    const throttledSetPos = throttle(
      () => setPos(getTransitionPos(window.scrollY)),
      100
    );

    window.addEventListener('scroll', throttledSetPos);
  }, []);

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
          Pos: <animated.span>{pos}</animated.span>
        </div>
        <Contact pos={pos} />
        <Projects pos={pos} />
        <AboutMe pos={pos} />
        <Home pos={pos} />
      </MainContent>
    </>
  );
};

export default App;
