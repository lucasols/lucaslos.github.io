import { hexToRgb } from 'utils/hexToRgb';
import css from '@emotion/css';

function createRbgaFunction(hex: string) {
  const rgb = hexToRgb(hex).join(',');

  return (a: number) => `rgba(${rgb}, ${a})`;
}

/* colors hex */
export const colorPrimary = '#0530AD';
export const colorSecondary = '#005B99';
export const colorTertiary = '#20D5D2';
export const colorBg = '#fff';

export const colorGradient = (
  deg: number = 118.77,
  alpha: number = 1,
) => `linear-gradient(${deg}deg, rgba(32, 213, 210, ${alpha}) 0%, rgba(0, 116, 195, ${alpha}) 100%);
`;

/* rgba colors */

/* fonts */
export const fontPrimary = 'Open Sans, sans-serif';
export const fontSecondary = 'Lato, sans-serif';

export const easeInOut = 'cubic-bezier(0.4, 0, 0.2, 1)';
export const easeOut = 'cubic-bezier(0, 0, 0.2, 1)';
