import { clampRange } from 'utils/clamp';

type interval = [number, number];

export function cyclicLerp(value: number, [inStart, inEnd]: interval, [outStart, outEnd]: interval) {
  return (((value - inStart) / (inEnd - inStart)) % 1) * (outEnd - outStart) + outStart;
}

export function lerp(value: number, [inStart, inEnd]: interval, [outStart, outEnd]: interval, clampValue: boolean = false) {
  const interpolatedValue = ((value - inStart) / (inEnd - inStart)) * (outEnd - outStart) + outStart;

  return clampValue ? clampRange(interpolatedValue, outStart, outEnd) : interpolatedValue;
}
