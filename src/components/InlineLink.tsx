import styled from '@emotion/styled';
import React, { FunctionComponent } from 'react';
import { colorGradient } from 'style/theme';

type Props = {
  href: string;
  noNewTab?: boolean;
}

const Container = styled.a`
  position: relative;
  white-space: nowrap;
  transition: 160ms ease-out;
  padding: 4px;
  margin: -4px;

  @supports (-webkit-background-clip: text) {
    background: ${colorGradient()};
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::before {
    z-index: -1;
    content: '';
    bottom: 0;
    left: 0;
    position: absolute;
    width: 100%;
    height: 3px;
    background: ${colorGradient()};
    border-radius: 2px;

    transition: 160ms ease-out;
  }

  &:hover {
    color: #fff;

    @supports (-webkit-background-clip: text) {
      background: transparent;
      -webkit-text-fill-color: inherit;
    }

    &::before {
      height: calc(100% - 4px);
    }
  }
`;

const InlineLink: FunctionComponent<Props> = ({ href, children, noNewTab }) => (
  <Container href={href} target={noNewTab ? undefined : '_blank'}>
    {children}
  </Container>
);

export default InlineLink;
