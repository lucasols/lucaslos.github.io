import projects from 'config/projects';
import { throttle } from 'lodash-es';
import { useCallback, useEffect, useState, useMemo, useRef, CSSProperties } from 'react';
import { OpaqueInterpolation, SetUpdateFn, useSpring } from 'react-spring';
import { isDev } from 'utils/genericUtils';
import { useGetSet } from 'utils/customHooks';

/* types */
type SectionConfig = {
  order: number;
  rest: number;
  id: SectionId;
};

export type PosProp = {
  springProps: {
    pos: OpaqueInterpolation<number>;
    transitionPos: OpaqueInterpolation<number>;
    inTransition: boolean;
  };
  active: boolean;
};

export type PropWithGoToSection = PosProp & {
  goToSection: (section: SectionId) => void;
};

type SpringNumProp = OpaqueInterpolation<number>;
type SetPos = SetUpdateFn<{ pos: number }>;
/* types end */

let sectionOrder = 0;
export const config = {
  sections: {
    home: { rest: 0, order: sectionOrder++ },
    aboutMe: { rest: 2, order: sectionOrder++ },
    projects: { rest: 2 * projects.length, order: sectionOrder++ },
    contact: { rest: 1, order: sectionOrder++ },
  },
  whellDelta: 100,
  transitionScrolls: 10, // in whellDeltas
  elemLenght: 0.4, // 0 - 1
  perspective: 600,
  maxZDelta: 240,
  interactionThreshold: 10,
};

export type SectionId = keyof typeof config.sections;
const sectionsArray: SectionConfig[] = Object.keys(config.sections).map(
  (section: SectionId) => ({
    ...config.sections[section],
    id: section,
  })
);
const relativeWDelta = 0.5 / config.transitionScrolls;
const elemRelLenght = config.elemLenght * 0.5;
const sectionLenght = config.transitionScrolls * config.whellDelta * 2;
const transitionSections: {
  active: boolean;
  zero: SectionId;
  one: SectionId;
} = {
  active: false,
  zero: 'home',
  one: 'home',
};
const sectionsScrollPosRanges = sectionsArray.map(section => {
  const { order, rest, id } = section;
  const { whellDelta } = config;

  const restsBefore = sectionsArray
    .slice(0, order)
    .reduce((acc, currSection) => acc + currSection.rest, 0);

  const start = (order * sectionLenght) + (restsBefore * whellDelta) - (sectionLenght / 2);

  return {
    id,
    start,
    end: start + (rest * whellDelta) + sectionLenght,
    center: start + (sectionLenght / 2) + (rest * whellDelta) / 2,
  };
});

const numOfTransitions = Object.keys(config.sections).length * 2 - 2;
const numOfRests = sectionsArray.reduce(
  (acc: number, curr) => acc + curr.rest,
  0
);
export const scrollHeight =
  (config.transitionScrolls * numOfTransitions + numOfRests)
  * config.whellDelta;

/* functions */
export function getStyle(
  section: SectionId,
  order: number,
  total: number,
  props: PosProp['springProps'],
  finalOpacity: number = 1
): CSSProperties {
  if (isDev) {
    if (order < 1 || order > total) throw new Error('order out of range');
  }

  const { pos, transitionPos, inTransition } = props;

  let sectionStart = 0;

  if (inTransition) {
    if (section === transitionSections.zero) {
      sectionStart = 0;
    } else if (section === transitionSections.one) {
      sectionStart = 1;
    } else {
      sectionStart = 3;
    }
  } else {
    sectionStart = config.sections[section].order;
  }
  const elemStart = ((0.5 - elemRelLenght) / (total - 1)) * (order - 1);
  const inStart = sectionStart + elemStart;
  const inEnd = inStart + elemRelLenght;
  const outStart = sectionStart + 0.5 + elemStart;
  const outEnd = outStart + elemRelLenght;

  const range = [inStart, inEnd, outStart, outEnd];

  const springInUse = inTransition ? transitionPos : pos;

  return {
    transform: springInUse
      .interpolate({
        range,
        output: [config.maxZDelta, 0, 0, -config.maxZDelta],
      })
      .interpolate(p => `translate3d(0, 0, ${p}px)`),
    opacity: springInUse.interpolate({
      range,
      output: [0, finalOpacity, finalOpacity, 0],
    }),
    pointerEvents: springInUse
      .interpolate({
        range,
        output: [config.maxZDelta, 0, 0, -config.maxZDelta],
      })
      .interpolate(p => (
        p >= config.interactionThreshold || p <= -config.interactionThreshold
         ? 'none'
         : undefined
      )),
  };
}

function getStyles(
  section: SectionId,
  lenght: number,
  props: PosProp['springProps']
) {
  return Array(lenght + 1)
    .fill(0)
    .map((n, i) => (opacity?: number) =>
      getStyle(section, i, lenght, props, opacity)
    );
}

function getRelativePos(scrollPos: number) {
  let pos =
    scrollPos / (config.transitionScrolls * config.whellDelta * 2) + 0.5;

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

  return pos;
}

function getCurrentSection(pos: number) {
  for (let i = 0; i < sectionsArray.length; i++) {
    const { order, id } = sectionsArray[i];

    if (pos <= order + 1) {
      return {
        id,
        relPos: pos - order,
        order,
      };
    }
  }

  throw new Error('pos out of range');
}

function getCurrentSectionByScroll(scroll: number) {
  for (let i = 0; i < sectionsScrollPosRanges.length; i++) {
    const { end, id } = sectionsScrollPosRanges[i];

    if (scroll <= end) {
      return id;
    }
  }

  throw new Error('scroll out of range');
}

function getSectionScrollPos(sectionId: SectionId) {
  return sectionsScrollPosRanges[config.sections[sectionId].order].center;
}

export function useGetStyles(
  section: SectionId,
  total: number,
  springProps: PosProp['springProps']
) {
  return useMemo(() => getStyles(section, total, springProps), [
    springProps.inTransition,
  ]);
}

function lockScroll(e: MouseEvent) {
  e.preventDefault();
}

function disableScroll() {
  window.addEventListener('mousewheel', lockScroll);
  window.addEventListener('touchmove', lockScroll, { passive: false });
}

function enableScroll() {
  window.removeEventListener('mousewheel', lockScroll);
  window.removeEventListener('touchmove', lockScroll);
}

export function useSpaceScroll() {
  const [{ scrollPos }, setScrollSpring] = useSpring<{ scrollPos: number }>(
    () => ({
      scrollPos: 0.5,
      config: { precision: 0.001, friction: 50 },
    })
  );
  const transitionInitialConf = {
    from: 0.5,
    to: 0.5,
    reset: true,
    active: false,
  };
  const [transitionSpringProps, setTransitionSpring] = useState(
    transitionInitialConf
  );
  const { transitionPos } = useSpring({
    transitionPos: transitionSpringProps.to,
    from: { transitionPos: transitionSpringProps.from },
    config: { precision: 0.002, friction: 60, clamp: true },
    reset: transitionSpringProps.reset,
    onRest: () => {
      if (transitionSpringProps.from !== transitionSpringProps.to) {
        enableScroll();
        setTransitionSpring(transitionInitialConf);
      }
    },
  });
  const [getActiveSection, setActiveSection, activeSection] = useGetSet<SectionId>('home');

  function updateActiveSection(scroll: number) {
    const currentSection = getCurrentSectionByScroll(scroll);
    if (getActiveSection() !== currentSection) {
      setActiveSection(currentSection);
    }
  }

  const setScrollPos = useCallback((target: SectionId) => {
    const targetScroll = getSectionScrollPos(target);
    window.scrollTo(0, targetScroll);
    updateActiveSection(targetScroll);
    setScrollSpring({
      scrollPos: getRelativePos(targetScroll),
      immediate: true,
    });
  }, []);


  useEffect(() => {
    setActiveSection(getCurrentSectionByScroll(window.scrollY));

    const throttledSetPos = throttle(() => {
      updateActiveSection(window.scrollY);

      setScrollSpring({
        scrollPos: getRelativePos(window.scrollY),
        immediate: false,
      });
    }, 100);

    window.addEventListener('scroll', throttledSetPos);
  }, []);

  function goToSection(target: SectionId) {
    const to = config.sections[target];
    const from = getCurrentSection(scrollPos.getValue());
    const reverse = from.order > to.order;
    const same = from.order === to.order;

    transitionSections.zero = reverse ? target : from.id;
    transitionSections.one = reverse ? from.id : target;

    setTransitionSpring({
      from: reverse && !same ? 1 + from.relPos : from.relPos,
      to: reverse || same ? 0.5 : 1.5,
      reset: true,
      active: true,
    });
    setScrollPos(target);
    disableScroll();
  }

  return {
    scrollPos,
    transitionPos,
    goToSection,
    inTransition: transitionSpringProps.active,
    activeSection,
  };
}
