import styled from '@emotion/styled';
import React from 'react';
import { letterSpacing } from 'style/helpers';
import { OpaqueInterpolation, animated } from 'react-spring';
import { anyObject } from 'typings/utils';

type Props = {
  section: string;
  style: anyObject<OpaqueInterpolation<string | number>>;
};

const Container = styled(animated.h1)`
  position: absolute;
  top: 40px;
  font-weight: 300;
  font-size: 28px;
  text-transform: uppercase;
  ${letterSpacing(0.1)};
`;

const PageHeader = ({ section, style }: Props) => (
  <Container style={style}>{section}</Container>
);

export default PageHeader;
