import React from 'react';
import styled from '@emotion/styled';
import {
  colorGradient,
  colorPrimary,
  colorTertiary,
  colorSecondary,
} from 'style/theme';
import { centerContent, fillContainer } from 'style/modifiers';
import { letterSpacing } from 'style/helpers';
import css from '@emotion/css';
import Icon, { Icons } from 'components/Icon';

type Props = {
  label?: string;
  onClick?: () => any;
  className?: string;
  href: string;
  noNewTab?: boolean;
  icon?: Icons;
  bgColor?: string;
  iconSize?: number;
};

const Container = styled.a`
  ${centerContent};
  position: relative;
  padding: 0 16px;
  height: 32px;
  display: inline-flex;

  text-transform: uppercase;
  font-size: 16px;
  font-weight: 400;
  color: ${colorPrimary};
  border-radius: 100px;

  &::before {
    ${fillContainer};
    content: '';
    border: solid 2px transparent;
    border-radius: 100px;
    opacity: 0.6;
    transition: 160ms;
  }

  &:hover::before {
    opacity: 1;
  }

  span {
    ${letterSpacing(12)};
  }
`;

const Button = ({
  label,
  onClick,
  className,
  bgColor = '#fff',
  href,
  icon,
  noNewTab,
  iconSize,
}: Props) => (
  <Container
    className={className}
    href={href}
    onClick={onClick}
    target={noNewTab ? undefined : '_blank'}
    css={css`
      &::before {
        background: linear-gradient(${bgColor}, ${bgColor}) padding-box,
          linear-gradient(to right, #20d5d2, #0074c3) border-box;
      }
    `}
  >
    {icon && (
      <Icon
        size={iconSize}
        css={label && { marginRight: 16 }}
        name={icon}
        color={colorPrimary}
      />
    )}
    {label && <span>{label}</span>}
  </Container>
);

export default Button;
