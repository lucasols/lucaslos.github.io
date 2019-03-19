import * as PIXI from 'pixi.js';
import { colorPrimary } from 'style/theme';
import { perspective as elementsPerspective, wireFrameMargin, wireframeCycleLength } from 'config/spaceScroll';
import { cyclicLerp, lerp } from 'utils/interpolation';
import { getWireframePos } from 'utils/spaceScroll';

export const app = new PIXI.Application({
  autoStart: false,
  width: window.innerWidth,
  height: window.innerHeight,
  transparent: true,
  resizeTo: window,
  antialias: true,
});
let starLayers = [];
let wireframes: PIXI.Graphics[] = [];
let lastWireframePos: null | number = null;

export function initialize() {
  app.start();

  createElements();
  app.ticker.add(ticker);
}

function createElements() {
  // starLayers = Array(3).fill(createStarLayer());
  wireframes = Array(5).fill(0).map(createWireframe);
}

// function createStarLayer() {
//   const layer = new PIXI.ParticleContainer();
//   const stars = 90;
//   // star size for render texture
//   const size = 32;

//   // base multiplier for calc layer size
//   const layerMultiplier = 2;

//   const star = new PIXI.Graphics();
//   star.beginFill(0xffffff);
//   star.drawCircle(size, size, size);
//   star.endFill();

//   const texture = renderer.generateTexture(star);
//   starLayerWidth = renderer.width * layerMultiplier;
//   starLayerHeight = renderer.height * layerMultiplier;

//   // create starfield
//   for (let i = 0; i < stars; i++) {
//     const p = new PIXI.Sprite(texture);

//     p.x = Math.random() * starLayerWidth;
//     p.y = Math.random() * starLayerHeight;
//     p.scale.x = p.scale.y = ((0.7 * 1) / (size / 2)) + ((Math.random() * 0.6 * 1) / (size / 2));

//     layer.addChild(p);
//   }

//   stage.addChild(layer);

//   return layer;
// }

function createWireframe() {
  const rect = new PIXI.Graphics();

  rect.lineStyle(2, colorToHex(colorPrimary), 1, 0);
  rect.drawRect(
    0,
    0,
    app.renderer.width - wireFrameMargin * 2,
    app.renderer.height - wireFrameMargin * 2
  );

  app.stage.addChild(rect);

  return rect;
}

function colorToHex(color: string) {
  return parseInt(color.replace('#', ''), 16);
}

function ticker(delta: number) {
  const wireframePos = getWireframePos();

  if (wireframePos !== lastWireframePos) {
    updateWireframes(wireframePos);

    lastWireframePos = wireframePos;
  }
}

function getScaleByZPos(zPos: number, perspective: number) {
  if (__DEV__) {
    if (zPos > perspective) throw new Error('zPos cant be higher than perspective');
  }

  return perspective / (perspective - zPos);
}

function getPosInAxis(scale: number, originalMeasure: number, margin: number = 0) {
  return (((scale - 1) * originalMeasure) - (margin * 2 * scale)) / -2;
}

function updateWireframes(scrollPos: number) {
  const zPosOutRange: [number, number] = [100, -160];
  const layersZGap = wireframeCycleLength / wireframes.length;

  for (let i = 0; i < wireframes.length; i++) {
    const wireframe = wireframes[i];
    const baseValue = zPosOutRange[0] / (zPosOutRange[0] - zPosOutRange[1]) * wireframeCycleLength;
    const pos = scrollPos + baseValue + layersZGap * i;

    const zPos = cyclicLerp(pos, [0, wireframeCycleLength], zPosOutRange);
    const scale = getScaleByZPos(zPos, elementsPerspective + 500);

    wireframe.width = app.renderer.width - wireFrameMargin * 2;
    wireframe.height = app.renderer.height - wireFrameMargin * 2;
    wireframe.x = getPosInAxis(scale, app.renderer.width, wireFrameMargin);
    wireframe.y = getPosInAxis(scale, app.renderer.height, wireFrameMargin);
    wireframe.scale.x = wireframe.scale.y = scale;
    wireframe.alpha = lerp(zPos, [0, zPosOutRange[1]], [0.5, 0], true);
  }
}
