import styled from '@emotion/styled';
import Link from 'components/Link';
import PageHeader from 'components/PageHeader';
import React, { CSSProperties } from 'react';
import { animated } from 'react-spring';
import { centerContent, fillContainer } from 'style/modifiers';
import { colorPrimary, colorPrimaryRgba, colorSecondary, fontSecondary } from 'style/theme';
import { PosProp, useGetStyles } from 'utils/spaceScroll';

const Container = styled.section`
  ${fillContainer};
  ${centerContent};

  padding: 0 32px;
`;

const Content = styled.div`
  width: 800px;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(3, auto);
  grid-gap: 32px;
`;

const Bio = styled(animated.p)`
  font-family: ${fontSecondary};
  grid-column: 1 / span 2;
  font-size: 24px;
  line-height: 1.4;
  font-weight: 300;
  color: #fff;

  span {
    color: ${colorPrimary};
  }
`;

const Section = styled(animated.div)`
  h1 {
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.48em;
    opacity: 0.7;
    font-weight: 400;
    margin-bottom: 12px;
  }

  h2,
  h3 {
    user-select: text;
    font-size: 18px;
    margin-bottom: 8px;
    font-family: ${fontSecondary};
  }

  h2 {
    color: #fff;
    font-weight: 400;
  }

  h3 {
    font-weight: 300;
    color: ${colorSecondary};
  }

  span {
    user-select: text;
    font-family: ${fontSecondary};
    font-size: 12px;
    color: #fff;
    opacity: 0.7;
  }

  .button {
    margin-top: 6px;
    margin-right: 16px;
    float: left;
  }
`;

const Skill = styled.div`
  background: ${colorPrimaryRgba(0.1)};
  padding: 10px 14px;
  float: left;
  font-family: ${fontSecondary};
  margin-right: 8px;
  margin-top: 8px;
  border-radius: 4px;
  font-size: 11px;
  text-transform: uppercase;
  color: #fff;
  letter-spacing: 0.04em;
  user-select: text;

  &:last-of-type {
    margin-right: 0;
  }
`;

const disableInteractivity: CSSProperties = {
  pointerEvents: 'none',
};

const AboutMe = ({ springProps, active }: PosProp) => {
  const styles = useGetStyles('aboutMe', 6, springProps);

  return (
    <Container style={active ? undefined : disableInteractivity}>
      <PageHeader section="About Me" style={styles[1]()} />
      <Content>
        <Bio style={styles[2]()}>
          Ola! Meu nome é <span>Lucas Santos</span>. Sou um designer
          multidisciplinar e desenvolvedor front-end, vivendo em São Paulo,
          Brasil. Meu objetivo é resolver problemas de forma criativa, criando
          produtos e experiências digitais intuitivas, inovadoras e fascinantes
          para tornar a vida das pessoas mais fácil.
        </Bio>
        <Section style={styles[3]()}>
          <h1>Experience</h1>
          <h2>UI/UX Designer and Front-end Developer</h2>
          <h3>BMW and USP - Project Mobility</h3>
          <span>Jun. 2017 - Present</span>
        </Section>
        <Section style={styles[4]()}>
          <h1>Education</h1>
          <h2>Design Graduation</h2>
          <h3>Faculdade de Arquitetura e Urbanismo da USP</h3>
          <span>2016 – Present</span>
        </Section>
        <Section style={styles[5]()}>
          <h1>Main Skills</h1>
          {['UI/UX Design', 'Front-End', 'Motion Graphics'].map(skill => (
            <Skill key={skill}>{skill}</Skill>
          ))}
        </Section>
        <Section style={styles[6]()}>
          <h1>+ About Me</h1>
          <Link
            label="Linked In"
            href="https://www.linkedin.com/in/lucasols/"
            openInNewTab
          />
          <Link label="Behance" />
        </Section>
      </Content>
    </Container>
  );
};

export default AboutMe;
