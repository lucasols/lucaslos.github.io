import css from '@emotion/css';
import styled from '@emotion/styled';
import Logo from 'components/Logo';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { circle } from 'style/helpers';
import { centerContent } from 'style/modifiers';
import { colorBgRgba, colorPrimary } from 'style/theme';
import { SectionId, config } from 'utils/spaceScroll';
import { useGetSet } from 'utils/customHooks';
import { throttle } from 'lodash-es';

type Props = {
  goToSection: (section: SectionId) => void;
};

const buttonStyle = css`
  ${centerContent};
  ${circle(50)};
  position: absolute;
  top: 18px;

  background: ${colorBgRgba(0.8)};
  transition: 240ms ease-out;

  cursor: pointer;
  opacity: 0;
  transform: translate3d(0, 0, 100px);

  &.show {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  &:hover {
    background: ${colorBgRgba(0.95)};
  }
`;

const HomeButton = styled.a`
  ${buttonStyle};
  left: 18px;
`;

const MenuButton = styled.button`
  ${buttonStyle};
  right: 18px;
`;

function isAboveThreshold() {
  const { transitionScrolls, whellDelta, sections: { home: { rest } } } = config;
  const threshold = (transitionScrolls * whellDelta) + (rest * whellDelta) - whellDelta;
  return window.scrollY >= threshold;
}

const TopButtons = ({ goToSection }: Props) => {
  const [getShowButtons, setShowButtons] = useGetSet(false);

  useEffect(() => {
    setShowButtons(isAboveThreshold());

    const onScroll = throttle(() => {
      if (isAboveThreshold()) {
        if (!getShowButtons()) setShowButtons(true);
      } else if (getShowButtons()) {
        setShowButtons(false);
      }
    }, 100);

    window.addEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <HomeButton
        href="#home"
        onClick={() => goToSection('home')}
        className={getShowButtons() ? 'show' : undefined}
      >
        <Logo color={colorPrimary} height={30} />
      </HomeButton>
    </>
  );
};

export default TopButtons;
