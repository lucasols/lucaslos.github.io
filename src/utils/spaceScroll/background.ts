import {
  numOfWireframes,
  perspective as elementsPerspective,
  wireframeCycleLength,
  wireframesZGap,
  wireframeMargin,
  wireframePerspective,
} from 'config/spaceScroll';
import * as PIXI from 'pixi.js';
import { colorPrimary } from 'style/theme';
import { __watchValue } from 'utils/debugUtils';
import { cyclicLerp, interpolate } from 'utils/interpolation';
import { getRelativePos, getWireframePos } from 'utils/spaceScroll';

export const app = new PIXI.Application({
  autoStart: false,
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true,
  resizeTo: window,
  antialias: true,
});
// Test canvas performance

// eslint-disable-next-line prefer-const
let starLayers: PIXI.ParticleContainer[] = [];
let wireframes: PIXI.Graphics[] = [];
let lastWireframePos: null | number = null;
let lastRelPos: null | number = null;

const starTextureSize = 32;
const starLayerSizeMultiplier = 2;
const starShape = new PIXI.Graphics();
starShape.beginFill(0xffffff);
starShape.drawCircle(starTextureSize, starTextureSize, starTextureSize);
starShape.endFill();
const starTexture = app.renderer.generateTexture(
  starShape,
  PIXI.SCALE_MODES.LINEAR,
  1
);

export function initialize() {
  app.start();

  createElements();
  app.ticker.add(ticker);
}

function createElements() {
  // starLayers = Array(3)
  //   .fill(0)
  //   .map(createStarLayer);
  wireframes = Array(numOfWireframes)
    .fill(0)
    .map(createWireframe);
}

function createStarLayer() {
  const layer = new PIXI.ParticleContainer();
  const numOfStars = 150;
  const starSizeRange = [1, 2];

  const starLayerWidth = app.renderer.width * starLayerSizeMultiplier;
  const starLayerHeight = app.renderer.height * starLayerSizeMultiplier;

  for (let i = 0; i < numOfStars; i++) {
    const p = new PIXI.Sprite(starTexture);

    p.x = Math.random() * starLayerWidth;
    p.y = Math.random() * starLayerHeight;
    p.scale.x = p.scale.y =
      (starSizeRange[0]
        + Math.random() * (starSizeRange[1] - starSizeRange[0]))
      / starTextureSize;

    layer.addChild(p);
  }

  app.stage.addChild(layer);

  return layer;
}

function createWireframe() {
  const rect = new PIXI.Graphics();

  rect.lineStyle(2, colorToHex(colorPrimary), 1, 0);
  rect.drawRect(
    0,
    0,
    app.renderer.width - wireframeMargin * 2,
    app.renderer.height - wireframeMargin * 2
  );

  app.stage.addChild(rect);

  return rect;
}

function colorToHex(color: string) {
  return parseInt(color.replace('#', ''), 16);
}

function ticker(delta: number) {
  const wireframePos = getWireframePos();
  const relPos = getRelativePos();

  if (wireframePos !== lastWireframePos) {
    updateWireframes(wireframePos);

    lastWireframePos = wireframePos;
  }

  if (relPos !== lastRelPos) {
    updateStarLayers(relPos);

    lastRelPos = relPos;
  }
}

function getScaleByZPos(zPos: number, perspective: number) {
  if (__DEV__) {
    if (zPos > perspective) throw new Error('zPos cant be higher than perspective');
  }

  return perspective / (perspective - zPos);
}

function getPosInAxis(
  scale: number,
  originalMeasure: number,
  margin: number = 0
) {
  return ((scale - 1) * originalMeasure - margin * 2 * scale) / -2;
}

function updateWireframes(scrollPos: number) {
  const zOutStart = 100;
  const zPosRange: [number, number] = [
    zOutStart,
    zOutStart - wireframesZGap * wireframes.length,
  ];
  const layersScrollGap = wireframeCycleLength / wireframes.length;
  const offset =
    (zPosRange[0] / (zPosRange[0] - zPosRange[1])) * wireframeCycleLength;

  for (let i = 0; i < wireframes.length; i++) {
    const wireframe = wireframes[i];
    const pos = scrollPos + offset + layersScrollGap * i;

    const zPos = cyclicLerp(pos, [0, wireframeCycleLength], zPosRange);
    const scale = getScaleByZPos(zPos, wireframePerspective);

    __watchValue(i, scale);

    wireframe.width = app.renderer.width - wireframeMargin * 2;
    wireframe.height = app.renderer.height - wireframeMargin * 2;
    wireframe.x = getPosInAxis(scale, app.renderer.width, wireframeMargin);
    wireframe.y = getPosInAxis(scale, app.renderer.height, wireframeMargin);
    wireframe.scale.x = wireframe.scale.y = scale;
    wireframe.alpha = interpolate(zPos, [0, zPosRange[1]], [0.8, 0], false);
  }
}

function updateStarLayers(relPos: number) {
  const zPosRange: [number, number] = [599, -800];
  const layersZGap = 0.1;

  for (let i = 0; i < starLayers.length; i++) {
    const starLayer = starLayers[i];
    const pos = (relPos + layersZGap * i) % 1;

    const zPos = interpolate(
      pos,
      [0, 0.4, 1],
      [zPosRange[0], -200, zPosRange[1]]
    );
    const scale = getScaleByZPos(zPos, elementsPerspective);

    __watchValue(i, zPos);

    starLayer.x = getPosInAxis(
      scale,
      app.renderer.width,
      -app.renderer.width / 2
    );
    starLayer.y = getPosInAxis(
      scale,
      app.renderer.height,
      -app.renderer.height / 2
    );
    starLayer.scale.x = starLayer.scale.y = scale;
    starLayer.alpha = interpolate(zPos, [0, zPosRange[1]], [0.6, 0], false);
  }
}
