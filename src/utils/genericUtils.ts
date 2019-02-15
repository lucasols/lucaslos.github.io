export const isDev = process.env.NODE_ENV === 'development';

export function getLastElem(array: any[]) {
  return array[array.length - 1];
}

export function clamp(num: number, min: number, max: number) {
  return num > max ? max : num < min ? min : num;
}

export const clampMin = (num: number, min: number) => (num < min ? min : num);

export const clampMax = (num: number, max: number) => (num > max ? max : num);

export function hexToRgb(hex: string) {
  if (hex.length < 4) throw new Error('Invalid hex value');

  return (hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m: string, r: string, g: string, b: string) =>
        `#${r}${r}${g}${g}${b}${b}`
    )
    .substring(1)
    .match(/.{2}/g) || [])
    .map((x: string) => parseInt(x, 16));
}

export function stringList<T extends string[]>(...args: T) {
  return args;
}
