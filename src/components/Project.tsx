import styled from '@emotion/styled';
import Link from 'components/Link';
import { Project as ProjectType } from 'config/projects';
import React from 'react';
import { fillContainer } from 'style/modifiers';
import { colorSecondary, fontSecondary, colorBgRgba } from 'style/theme';

const Container = styled.div`
  ${fillContainer};

  border: 1.5px solid ${colorSecondary};
  border-radius: 4px;
  overflow: hidden;

  img {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

const Tags = styled.div`
  text-transform: uppercase;
  font-style: italic;
  font-size: 12px;
  margin-bottom: 4px;

  white-space: pre;
`;

const InfoContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 292px;

  padding-left: 36px;
  padding-bottom: 28px;

  h1 {
    font-family: ${fontSecondary};
    font-weight: 300;
    font-size: 24px;
    color: #fff;
    margin-bottom: 12px;

    text-shadow: 1px 3px 4px ${colorBgRgba(0.3)};
  }

  p {
    font-family: ${fontSecondary};
    font-size: 12px;
    color: #fff;
    line-height: 1.5;
    text-shadow: 1px 3px 4px ${colorBgRgba(0.3)};
  }

  .button {
    margin-right: 12px;
    margin-top: 20px;
  }
`;

const InfoBgShadow = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 614px;
  height: 372px;

  background: linear-gradient(
    37deg,
    ${colorBgRgba(0.5)} 0%,
    ${colorBgRgba(0.5)} 34%,
    ${colorBgRgba(0)} 46%
  );
`;

const Project = ({
  title,
  tags,
  description,
  link,
  studyCaseLink,
  img,
}: ProjectType) => (
  <Container>
    <img src={img} alt={title} />
    <InfoBgShadow />
    <InfoContainer>
      {tags && <Tags>{tags.join('  /  ')}</Tags>}
      <h1>{title}</h1>
      <p>{description}</p>
      {link && <Link href={link} openInNewTab label="Visit" />}
      {studyCaseLink && (
        <Link href={studyCaseLink} openInNewTab label="Study Case" />
      )}
    </InfoContainer>
  </Container>
);

export default Project;
