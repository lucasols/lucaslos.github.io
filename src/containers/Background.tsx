import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { gradientBg } from 'style/theme';
import { fillContainer } from 'style/modifiers';
import { app, initialize } from 'utils/spaceScroll/background';

const Container = styled.section`
  ${fillContainer};
  ${gradientBg};
`;

const Background = () => {
  const container = useRef<HTMLElement>(null);

  useEffect(() => {
    if (container.current) container.current.appendChild(app.view);
    initialize();

    return () => app.stop();
  }, []);

  return <Container ref={container} />;
};

export default Background;
