import css from '@emotion/css';
import styled from '@emotion/styled';
import Link from 'components/Link';
import PageHeader from 'components/PageHeader';
import Planet from 'components/Planet';
import React, { useMemo } from 'react';
import { animated } from 'react-spring';
import { letterSpacing } from 'style/helpers';
import { centerContent, fillContainer } from 'style/modifiers';
import { colorPrimaryRgba, fontSecondary } from 'style/theme';
import { PosProp } from 'typings/spaceScroll';
import { getStyles } from 'utils/spaceScroll';

const Container = styled.section`
  ${fillContainer};
  ${centerContent};

  padding: 0 32px;
`;

const PlanetWrapper = styled(animated.div)`
  margin-right: -12px;
`;

const MainContent = styled.div`
  h1 {
    font-size: 36px;
    font-weight: 300;
    font-family: ${fontSecondary};
    margin-bottom: 8px;
  }

  h2 {
    font-family: ${fontSecondary};
    font-weight: 400;
    font-size: 48px;
    color: #fff;
    letter-spacing: 0.08em;
  }
`;

const SocialButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const emailButton = css`
  margin: 28px 0;
  height: 48px;
  font-size: 18px;
  text-transform: none;
  ${letterSpacing(0.1)};
  background: ${colorPrimaryRgba(0.08)};
  border-color: ${colorPrimaryRgba(0.5)};

  &:hover {
    border-color: ${colorPrimaryRgba(0.8)};
  }

  .icon {
    margin-right: 12px;
  }
`;

const socialIcon = css`
  height: 54px;
  width: 54px;
  background: ${colorPrimaryRgba(0.08)};
  border-color: ${colorPrimaryRgba(0.5)};
  padding: 0;
  /* margin: 8px; */

  &:hover {
    border-color: ${colorPrimaryRgba(0.8)};
  }
`;

const Contact = ({ pos }: PosProp) => {
  const styles = useMemo(() => getStyles('contact', 7, pos), []);

  return (
    <Container>
      <PageHeader section="Contact" style={styles[1]()} />
      <PlanetWrapper style={styles[1]()}>
        <Planet />
      </PlanetWrapper>
      <MainContent>
        <animated.h1 style={styles[1]()}>Got a project?</animated.h1>
        <animated.h2 style={styles[2]()}>Let&apos;s talk</animated.h2>
        <Link
          icon="email"
          href="mailto:hello@lucassantos.net"
          label="hello@lucassantos.net"
          style={emailButton}
          springStyle={styles[3]()}
        />
        <SocialButtonsWrapper>
          <Link icon="linkedin" style={socialIcon} springStyle={styles[4]()} />
          <Link icon="behance" style={socialIcon} springStyle={styles[5]()} />
          <Link icon="dribbble" style={socialIcon} springStyle={styles[6]()} />
          <Link icon="github" style={socialIcon} springStyle={styles[7]()} />
        </SocialButtonsWrapper>
      </MainContent>
    </Container>
  );
};

export default Contact;
