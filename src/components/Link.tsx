import styled from '@emotion/styled';
import Icon, { Icons } from 'components/Icon';
import React from 'react';
import { letterSpacing } from 'style/helpers';
import { centerContent } from 'style/modifiers';
import { colorBgRgba, colorSecondaryRgba } from 'style/theme';
import { SerializedStyles } from '@emotion/css';
import { obj } from 'typings/utils';
import { OpaqueInterpolation, animated } from 'react-spring';

type Props = {
  label?: string;
  href?: string;
  icon?: Icons;
  openInNewTab?: boolean;
  style?: SerializedStyles;
  iconSize?: number;
  springStyle?: obj<OpaqueInterpolation<string | number>>;
};

const Container = styled(animated.a)`
  ${centerContent};
  display: inline-flex;
  height: 34px;
  font-size: 12px;
  text-transform: uppercase;
  background: ${colorBgRgba(0.36)};
  ${letterSpacing(0.04)};
  padding: 0 20px;
  border-radius: 32px;
  border: 1.2px solid ${colorSecondaryRgba(0.5)};
  cursor: pointer;
  color: #fff;
  transition: 240ms ease-out;

  &:hover {
    border-color: ${colorSecondaryRgba(0.8)};
  }

  &:visited {
    color: #fff;
  }
`;

const Link = ({
  label,
  href,
  icon,
  iconSize = 26,
  openInNewTab,
  style,
  springStyle,
}: Props) => (
  <Container
    className="button"
    href={href}
    css={style}
    style={springStyle}
    target={openInNewTab ? '_blank' : undefined}
  >
    {icon && <Icon name={icon} size={iconSize} />}
    {label}
  </Container>
);

export default Link;
