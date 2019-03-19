import { css } from '@emotion/core';
import { lighten } from 'polished';
import { colorBg, colorPrimary } from 'style/theme';
import { hexToRgb } from "utils/hexToRgb";

const background = colorBg;
const thumb = hexToRgb(lighten(0.16, colorPrimary)).join(',');

export default css`
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${background};
  }

  ::-webkit-scrollbar-thumb {
    background-color: rgba(${thumb}, 0.5);

    &:hover {
      background-color: rgba(${thumb}, 0.7);
    }

    &:active {
      background-color: rgba(${thumb}, 0.9);
    }
  }

  ::-webkit-scrollbar-corner {
    background-color: ${background};
  }
`;
