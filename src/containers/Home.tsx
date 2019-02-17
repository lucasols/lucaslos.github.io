import styled from '@emotion/styled';
import Icon from 'components/Icon';
import Logo from 'components/Logo';
import React, { CSSProperties } from 'react';
import { animated } from 'react-spring';
import { letterSpacing } from 'style/helpers';
import { centerContent, centerContentCollum, fillContainer } from 'style/modifiers';
import { colorPrimaryRgba, fontSecondary } from 'style/theme';
import { PropWithGoToSection, useGetStyles } from 'utils/spaceScroll';

const Container = styled.section`
  ${fillContainer};
  ${centerContentCollum};
`;

const TopNav = styled.nav`
  position: absolute;
  top: 44px;

  a {
    display: inline-block;
    text-transform: uppercase;
    font-size: 24px;
    padding: 8px 32px;
    ${letterSpacing(0.1)};
    color: ${colorPrimaryRgba(0.7)};

    transition: color 240ms ease-out;

    &:hover {
      color: ${colorPrimaryRgba(1)};
    }
  }
`;

const Logotype = styled(animated.div)`
  ${centerContent};

  h1 {
    margin-left: 22px;
    font-size: 90.5px;
    font-family: ${fontSecondary};
    font-weight: 300;
    color: #fff;
  }
`;

const Description = styled(animated.h2)`
  font-size: 18px;
  text-transform: uppercase;
  font-weight: 300;
  letter-spacing: 0.09em;
  padding-left: 98px;
  margin-top: -2px;

  strong {
    font-weight: 400;
  }
`;

const Scroll = styled(animated.div)`
  ${centerContentCollum};
  position: absolute;
  bottom: 32px;
  color: #fff;
  font-weight: 300;
  font-size: 16px;
  cursor: pointer;
  ${letterSpacing(0.1)}

  .icon {
    margin-top: -4px;
    transition: 240ms ease-out;
  }

  &:hover {
    .icon {
      transform: translate3d(0, 2px, 0);
    }
  }
`;

const disableInteractivity: CSSProperties = {
  pointerEvents: 'none',
};

// TODO: put an element over scrollbar to avoid its drag
// TODO: add one transition for each letter/word
const Home = ({ springProps, goToSection, active }: PropWithGoToSection) => {
  const styles = useGetStyles('home', 6, springProps);

  return (
    <Container style={active ? undefined : disableInteractivity}>
      <TopNav>
        <animated.a
          style={styles[1]()}
          onClick={() => goToSection('aboutMe')}
          href="#about-me"
        >
          About Me
        </animated.a>
        <animated.a
          style={styles[2]()}
          onClick={() => goToSection('projects')}
          href="#projects"
        >
          Projects
        </animated.a>
        <animated.a
          style={styles[3]()}
          onClick={() => goToSection('contact')}
          href="#projects"
        >
          Contact
        </animated.a>
      </TopNav>
      <Logotype style={styles[4]()}>
        <Logo />
        <h1>LUCAS SANTOS</h1>
      </Logotype>
      <Description style={styles[5]()}>
        <strong>UI/UX Designer</strong> and <strong>Front-End Dev</strong> at{' '}
        <strong>Project Mobility</strong>
      </Description>
      <Scroll style={styles[6]()} onClick={() => goToSection('aboutMe')}>
        <span>SCROLL</span>
        <Icon name="arrow-down" />
      </Scroll>
    </Container>
  );
};

export default Home;
