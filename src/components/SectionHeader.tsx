import React from 'react';
import styled from '@emotion/styled';
import { fontSecondary, colorTertiary, colorPrimary } from 'style/theme';
import { letterSpacing } from 'style/helpers';

type Props = {
  name: string;
};

const Container = styled.h1`
  margin-top: 80px;
  width: 100%;
  text-align: center;
  text-transform: uppercase;
  font-family: ${fontSecondary};
  font-size: 24px;
  font-weight: 400;
  color: ${colorPrimary};

  border-top: 1px solid ${colorTertiary};
  padding-top: 16px;
  margin-bottom: 40px;

  span {
    ${letterSpacing(16)};
  }
`;

const SectionHeader = ({ name }: Props) => <Container><span>{name}</span></Container>;

export default SectionHeader;
