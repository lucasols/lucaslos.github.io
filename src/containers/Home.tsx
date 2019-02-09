import styled from '@emotion/styled';
import Icon from 'components/Icon';
import Logo from 'components/Logo';
import React from 'react';
import { letterSpacing } from 'style/helpers';
import { centerContent, centerContentCollum, fillContainer } from 'style/modifiers';
import { fontSecondary } from 'style/theme';

const Container = styled.section`
  ${fillContainer};
  ${centerContentCollum};
`;

const Menu = styled.nav`
  position: absolute;
  top: 44px;

  a {
    text-transform: uppercase;
    font-size: 24px;
    padding: 8px 32px;
    ${letterSpacing(0.1)}

    opacity: 0.7;
    transition: opacity 240ms ease-out;

    &:hover {
      opacity: 1;
    }
  }
`;

const Logotype = styled.div`
  ${centerContent};

  h1 {
    margin-left: 22px;
    font-size: 90.5px;
    font-family: ${fontSecondary};
    font-weight: 300;
    color: #fff;
  }
`;

const Description = styled.h2`
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

const Scroll = styled.div`
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

const Home = () => {


  return (
    <Container>
      <Menu>
        <a href="#about-me">About Me</a>
        <a href="#projects">Projects</a>
        <a href="#projects">Contact</a>
      </Menu>
      <Logotype>
        <Logo />
        <h1>LUCAS SANTOS</h1>
      </Logotype>
      <Description>
        <strong>UI/UX Designer</strong> and <strong>Front-End Dev</strong> at <strong>Project Mobility</strong>
      </Description>
      <Scroll>
        <span>SCROLL</span>
        <Icon name="arrow-down" />
      </Scroll>
    </Container>
  );
};

export default Home;
