import css from "@emotion/css";
import { hexToRgb } from "utils/hexToRgb";

/* colors hex */
export const colorPrimary = '#00EEFF';
export const colorSecondary = '#BAF1FF';
export const colorBg = '#0F053C';

/* rgb colors */
const rgbColorPrimary = hexToRgb(colorPrimary).join(',');
const rgbColorSecondary = hexToRgb(colorSecondary).join(',');
const rgbColorBg = hexToRgb(colorBg).join(',');

export const colorPrimaryRgba = (a: number = 1) => `rgba(${rgbColorPrimary}, ${a})`;
export const colorSecondaryRgba = (a: number = 1) => `rgba(${rgbColorSecondary}, ${a})`;
export const colorBgRgba = (a: number = 1) => `rgba(${rgbColorBg}, ${a})`;

export const gradientBg = css`
  background: linear-gradient(
    158deg,
    ${colorBg} 14%,
    #0B042B 86%
  );
`;

/* fonts */
export const fontPrimary = 'Lato, sans-serif';
export const fontSecondary = `Open Sans, sans-serif`;
