import React from 'react';
import styled from '@emotion/styled';
import SlideShow from 'components/SlideShow';
import {
  colorGradient,
  colorTertiary,
  fontSecondary,
  colorPrimary,
} from 'style/theme';
import { letterSpacing } from 'style/helpers';
import Button from 'components/Button';
import { centerContent } from 'style/modifiers';
import galleryModalState from 'state/galleryState';
import { mqMobile } from 'style/mediaQueries';

type Props = {
  id: string;
  pos: number;
  title: string;
  tags: string[];
  client: string;
  date: string;
  description: string;
  links?: {
    url: string;
    label: string;
  }[];
  imgs: string[];
};

const Container = styled.article`
  position: relative;
  width: 100%;
  overflow: hidden;
  margin-bottom: 24px;

  display: grid;
  grid-template-columns: 1fr 360px;
  grid-template-rows: minmax(500px, auto);

  ${mqMobile} {
    grid-template-columns: 1fr;
  }
`;

const Info = styled.div`
  ${centerContent};
  padding: 28px 24px 28px 32px;
  background: #f8f8f8;

  h1 {
    width: 100%;
    font-weight: 400;
    font-size: 24px;
    color: ${colorPrimary};
    margin-bottom: 8px;
  }

  h2 {
    margin-bottom: 16px;
    width: 100%;
    font-weight: 400;
    font-size: 16px;
    color: ${colorPrimary};
  }

  p {
    line-height: 1.4;
    font-size: 12px;
    margin-bottom: 28px;
  }
`;

const Tags = styled.div`
  margin-bottom: 20px;
  font-size: 14px;

  font-family: ${fontSecondary};
  font-weight: 400;
  font-style: italic;
  ${letterSpacing(4)};
`;

const Project = ({
  id,
  pos,
  title,
  tags,
  client,
  date,
  description,
  links,
  imgs,
}: Props) => (
  <Container id={id}>
    <SlideShow
      imgs={imgs.slice(0, 3)}
      onClick={() =>
        galleryModalState.dispatch('openProject', { project: pos })
      }
    />
    <Info>
      <div>
        <Tags>{tags.join(' / ')}</Tags>
        <h1>{title}</h1>
        <h2>
          {date} <span css={{ color: colorTertiary }}>·</span> {client}
        </h2>
        <p>{description}</p>
        {links &&
          links.map((elem, i) => (
            <Button
              css={{ marginBottom: 8, marginRight: 8, width: '100%' }}
              bgColor="#f8f8f8"
              key={i}
              label={elem.label}
              href={elem.url}
            />
          ))}
      </div>
    </Info>
  </Container>
);

export default Project;
