import projects from 'config/projects';
import { OpaqueInterpolation } from 'react-spring';
import { isDev } from 'utils/genericUtils';

type SectionConfig = {
  order: number;
  rest: number;
};

let sectionOrder = 0;

/* config */
const sections = {
  home: { rest: 0, order: sectionOrder++ },
  aboutMe: { rest: 2, order: sectionOrder++ },
  projects: { rest: 2 * projects.length, order: sectionOrder++ },
  contact: { rest: 0, order: sectionOrder++ },
};
const whellDelta = 100;
const transitionScrolls = 10; // in whellDeltas
const elemLenght = 0.3; // 0 - 1
export const perspective = 600;
const maxZDelta = 200;
/* config end */

type Sections = keyof typeof sections;
const sectionsArray: SectionConfig[] = Object.keys(sections).map(
  (section: Sections) => ({ ...sections[section] })
);
const numOfSections = Object.keys(sections).length;
const numOfTransitions = numOfSections * 2 - 2;
const numOfRests = sectionsArray.reduce(
  (acc: number, curr) => acc + curr.rest,
  0
);
const relativeWDelta = 0.5 / transitionScrolls;
const elemRelLenght = elemLenght * 0.5;

export const scrollHeight =
  (transitionScrolls * numOfTransitions + numOfRests) * whellDelta;

/* functions */
export function getStyle(
  section: Sections,
  order: number,
  total: number,
  pos: OpaqueInterpolation<number>,
  finalOpacity: number = 1,
) {
  if (isDev) {
    if (order < 1 || order > total) throw new Error('order out of range');
  }

  const sectionStart = sections[section].order;
  const elemStart = ((0.5 - elemRelLenght) / total) * (order - 1);
  const inStart = sectionStart + elemStart;
  const inEnd = inStart + elemRelLenght;
  const outStart = sectionStart + 0.5 + elemStart;
  const outEnd = outStart + elemRelLenght;

  const range = [inStart, inEnd, outStart, outEnd];

  return {
    transform: pos
      .interpolate({
        range,
        output: [maxZDelta, 0, 0, -maxZDelta],
      })
      .interpolate(p => `translate3d(0, 0, ${p}px)`),
    opacity: pos.interpolate({ range, output: [0, finalOpacity, finalOpacity, 0] }),
  };
}

export function getStyles(
  section: Sections,
  lenght: number,
  pos: OpaqueInterpolation<number>
) {
  return Array(lenght + 1)
    .fill(0)
    .map((n, i) => (opacity?: number) => getStyle(section, i, lenght, pos, opacity));
}

export function getTransitionPos(scrollPos: number) {
  let pos = scrollPos / (transitionScrolls * whellDelta * 2) + 0.5;

  for (let i = 0; i < sectionsArray.length; i++) {
    const section = sectionsArray[i];
    const startRest = i + 0.5;
    const restLenght = section.rest * relativeWDelta;

    if (pos > startRest) {
      if (pos < startRest + restLenght) {
        pos = startRest;

        break;
      } else {
        pos -= restLenght;

        if (pos <= startRest + 0.5) {
          break;
        }
      }
    }
  }

  return { pos };
}
