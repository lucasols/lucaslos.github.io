export const isDev = process.env.NODE_ENV === 'development';

export function getLastElem(array: any[]) {
  return array[array.length - 1];
}

export function clamp(num: number, min: number, max: number) {
  return num > max ? max : num < min ? min : num;
}

export const clampMin = (num: number, min: number) => (num < min ? min : num);

export const clampMax = (num: number, max: number) => (num > max ? max : num);
