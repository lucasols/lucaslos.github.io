import { css, Global } from '@emotion/core';
import hotkey from 'hotkeys-js';
import React, { useEffect } from 'react';
import normalize from 'style/normalize';
import scrollBar from 'style/scrollBar';
import { colorPrimary, fontPrimary } from 'style/theme';
import { useGetSet } from 'utils/customHooks';

const debugLayoutStyle = css`
  *:not(g):not(path) {
    color: hsla(210, 100%, 100%, 0.9) !important;
    background: hsla(210, 100%, 50%, 0.5) !important;
    outline: solid 3px hsla(210, 100%, 100%, 0.5) !important;

    box-shadow: none !important;
    filter: none !important;
  }
`;

const reset = css`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    transform: translate3d(0, 0, 0);
    user-select: none;
    margin: 0;
    padding: 0;
  }

  html,
  body,
  #app {
    position: absolute;
    height: 100%;
    width: 100%;

    font-family: ${fontPrimary}, sans-serif;
    color: ${colorPrimary};
  }

  a {
    color: inherit;
    text-decoration: none;

    &:visited {
      color: inherit;
    }
  }
`;

const GlobalStyle = () => {
  const [getDebugLayout, setDebugLayout] = useGetSet(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      hotkey('shift+d', () => {
        setDebugLayout(!getDebugLayout());
      });
    }
  }, []);

  return (
    <Global
      styles={[
        normalize,
        scrollBar,
        getDebugLayout() && debugLayoutStyle,
        reset,
      ]}
    />
  );
};

export default GlobalStyle;
