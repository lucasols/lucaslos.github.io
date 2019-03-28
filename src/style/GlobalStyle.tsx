import { css, Global } from '@emotion/core';
import hotkey from 'hotkeys-js';
import React, { useEffect } from 'react';
import normalize from 'style/normalize';
import scrollBar from 'style/scrollBar';
import { colorPrimary, fontPrimary } from 'style/theme';
import { useGetSet } from 'utils/customHooks';
import { fillContainer } from 'style/modifiers';

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

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  p {
    user-select: text;
  }

  html,
  body,
  #app {
    ${fillContainer}

    font-family: ${fontPrimary}, sans-serif;
    color: ${colorPrimary};

    transform: none;
  }

  a {
    color: #fff;
    text-decoration: none;

    &:visited {
      color: #fff;
    }
  }
`;

const GlobalStyle = () => {
  const [getDebugLayout, setDebugLayout] = useGetSet(false);

  useEffect(() => {
    // OPTIMIZE: refactor this
    if (__DEV__) {
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
