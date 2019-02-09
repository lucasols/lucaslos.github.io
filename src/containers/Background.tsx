import React from 'react';
import styled from '@emotion/styled';
import { gradientBg } from 'style/theme';
import { fillContainer } from 'style/modifiers';

const Container = styled.section`
  ${fillContainer}
  ${gradientBg}
`;

const Background = () => <Container />;

export default Background;
