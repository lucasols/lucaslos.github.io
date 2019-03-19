import * as spaceScroll from 'config/spaceScroll';
import { throttle } from 'lodash-es';
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react';
import { OpaqueInterpolation, useSpring } from 'react-spring';
import { useGetSet } from 'utils/customHooks';
import { __log, __stopRecord, __recordValuesOverTime } from 'utils/debugUtils';
import { debug } from 'util';
import { lerp } from 'utils/interpolation';

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

type inTransitionReset = {
  active: boolean;
  to: SectionId;
};

type sectionsTransition = {
  active: boolean;
  zero: SectionId;
  one: SectionId;
  fromRelPos: number;
  toRelPos: number;
  relPos: number;
  isReverse: boolean;
};

export type PropWithGoToSection = PosProp & {
  goToSection: (section: SectionId) => void;
};

export type SectionId = keyof typeof spaceScroll.sections;

/* vars */

const sectionsArray: SectionConfig[] = Object.keys(spaceScroll.sections).map(
  (section: SectionId) => ({
    ...spaceScroll.sections[section],
    id: section,
  })
);
const transitionInitialProps = {
  from: 0.5,
  to: 0.5,
  reset: true,
};
const inTransitionReset: inTransitionReset = {
  active: false,
  to: 'home',
};
const relativePosWhellDelta = 0.5 / spaceScroll.transitionScrolls;
const elemRelativePosLenght = spaceScroll.elemLenght * 0.5;
const sectionLenght =
  spaceScroll.transitionScrolls * spaceScroll.whellDelta * 2;
const sectionsScrollPosRanges = sectionsArray.map(section => {
  const { order, rest, id } = section;
  const { whellDelta } = spaceScroll;

  const restsBefore = sectionsArray
    .slice(0, order)
    .reduce((acc, currSection) => acc + currSection.rest, 0);

  const start =
    order * sectionLenght + restsBefore * whellDelta - sectionLenght / 2;

  return {
    id,
    start,
    end: start + rest * whellDelta + sectionLenght,
    center: start + sectionLenght / 2 + (rest * whellDelta) / 2,
  };
});

const numOfTransitions = Object.keys(spaceScroll.sections).length * 2 - 2;
const numOfRests = sectionsArray.reduce(
  (acc: number, curr) => acc + curr.rest,
  0
);
export const scrollHeight =
  (spaceScroll.transitionScrolls * numOfTransitions + numOfRests)
  * spaceScroll.whellDelta;

const sectionsTransition: sectionsTransition = {
  active: false,
  zero: 'home',
  one: 'home',
  relPos: 0.5,
  fromRelPos: 0,
  toRelPos: 0,
  isReverse: false,
};
let wireframeScrollPos = 0;
let wireframeScrollPosBefore = 0;
let wireframeScrollPosAdjust = 0;

/* functions */

export function getStyle(
  section: SectionId,
  order: number,
  total: number,
  props: PosProp['springProps'],
  finalOpacity: number = 1
): CSSProperties {
  if (__DEV__) {
    if (order < 1 || order > total) throw new Error('order out of range');
  }

  const { pos, transitionPos, inTransition: __inTransition } = props;

  let sectionStart = 0;

  if (__inTransition) { // REVIEW: mantain __in... or no?
    if (section === sectionsTransition.zero) {
      sectionStart = 0;
    } else if (section === sectionsTransition.one) {
      sectionStart = 1;
    } else {
      sectionStart = 3;
    }
  } else {
    sectionStart = spaceScroll.sections[section].order;
  }

  const elemStart = ((0.5 - elemRelativePosLenght) / (total - 1)) * (order - 1);
  const inStart = sectionStart + elemStart;
  const inEnd = inStart + elemRelativePosLenght;
  const outStart = sectionStart + 0.5 + elemStart;
  const outEnd = outStart + elemRelativePosLenght;

  const range = [inStart, inEnd, outStart, outEnd];

  const springInUse = __inTransition ? transitionPos : pos;

  return {
    transform: springInUse
      .interpolate({
        range,
        output: [spaceScroll.maxZDelta, 0, 0, -spaceScroll.maxZDelta],
      })
      .interpolate(p => `translate3d(0, 0, ${p}px)`),
    opacity: springInUse.interpolate({
      range,
      output: [0, finalOpacity, finalOpacity, 0],
    }),
    willChange: 'transform',
    pointerEvents: springInUse
      .interpolate({
        range,
        output: [spaceScroll.maxZDelta, 0, 0, -spaceScroll.maxZDelta],
      })
      .interpolate(p =>
        (p >= spaceScroll.interactionThreshold
        || p <= -spaceScroll.interactionThreshold
          ? 'none'
          : undefined)
      ),
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

function getSpringPos(scrollPos: number) {
  let pos =
    scrollPos / (spaceScroll.transitionScrolls * spaceScroll.whellDelta * 2)
    + 0.5;

  for (let i = 0; i < sectionsArray.length; i++) {
    const section = sectionsArray[i];
    const startRest = i + 0.5;
    const restLenght = section.rest * relativePosWhellDelta;

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
        sectionRelativePos: pos - order,
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
  return sectionsScrollPosRanges[spaceScroll.sections[sectionId].order].center;
}

export function useGetStyles(
  section: SectionId,
  total: number,
  springProps: PosProp['springProps']
) {
  return useMemo(() => getStyles(section, total, springProps), [section, springProps, total]);
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

// REVIEW: Isn't this function too big?
export function useSpaceScroll() {
  const __isInTransition = useRef(inTransitionReset);
  const [getActiveSection, setActiveSection, activeSection] = useGetSet(getCurrentSectionByScroll(window.scrollY));

  const [{ relativePos }, setRelativePosSpring] = useSpring<{ relativePos: number }>(
    () => ({
      relativePos: 0.5,
      config: { precision: 0.001, friction: 50 },
    })
  );

  const [transitionProps, setTransitionProps] = useState(
    transitionInitialProps
  );
  const { transitionRelativePos } = useSpring({
    transitionRelativePos: transitionProps.to,
    from: { transitionRelativePos: transitionProps.from },
    config: { precision: 0.002, friction: 60, clamp: true },
    reset: transitionProps.reset,
    onRest: () => {
      if (transitionProps.from !== transitionProps.to) {
        enableScroll();
        setScrollPos(__isInTransition.current.to);
        __isInTransition.current = inTransitionReset;
        sectionsTransition.active = false;
        setTransitionProps(transitionInitialProps);
      }
    },
    onFrame: ({ transitionRelativePos: pos }: { transitionRelativePos: number }) => {
      if (__isInTransition.current.active) {
        sectionsTransition.relPos = pos;
      }
    },
  });

  const [{ scrollPos }, setScrollPosSpring] = useSpring<{ scrollPos: number }>(
    () => ({
      scrollPos: window.scrollY,
      config: { precision: 1, friction: 50 },
      onFrame: ({ scrollPos: pos }: { scrollPos: number }) => {
        if (!__isInTransition.current.active) wireframeScrollPos = pos;
      },
    })
  );

  function updateActiveSection(scroll: number) {
    const currentSection = getCurrentSectionByScroll(scroll);
    if (getActiveSection() !== currentSection) {
      setActiveSection(currentSection);
    }
  }

  function setScrollPos(target: SectionId) {
    const targetScroll = getSectionScrollPos(target);
    updateActiveSection(targetScroll);
    window.scrollTo(0, targetScroll);
    setRelativePosSpring({
      relativePos: getSpringPos(targetScroll),
      immediate: true,
    });
    setScrollPosSpring({
      scrollPos: window.scrollY,
      immediate: true,
    });

    return targetScroll;
  }

  useEffect(() => {
    setActiveSection(getCurrentSectionByScroll(window.scrollY));
    setRelativePosSpring({
      relativePos: getSpringPos(window.scrollY),
      immediate: true,
    });

    const throttledSetPos = throttle(() => {
      if (!__isInTransition.current.active) {
        updateActiveSection(window.scrollY);

        setRelativePosSpring({
          relativePos: getSpringPos(window.scrollY),
          immediate: false,
        });
      }

      setScrollPosSpring({
        scrollPos: window.scrollY,
        immediate: false,
      });
    }, 100);

    window.addEventListener('scroll', throttledSetPos);
  }, []);

  function goToSection(target: SectionId) {
    const to = spaceScroll.sections[target];
    const from = getCurrentSection(relativePos.getValue());
    const isReverse = from.order > to.order;
    const same = from.order === to.order;

    const fromRelPos = from.sectionRelativePos + (isReverse ? 1 : 0);
    const toRelPos = isReverse || same ? 0.5 : 1.5;

    sectionsTransition.relPos = fromRelPos;
    sectionsTransition.fromRelPos = fromRelPos;
    sectionsTransition.toRelPos = toRelPos;
    sectionsTransition.zero = isReverse ? target : from.id;
    sectionsTransition.one = isReverse ? from.id : target;
    sectionsTransition.isReverse = toRelPos < fromRelPos;
    sectionsTransition.active = true;

    wireframeScrollPosBefore = scrollPos.getValue() + wireframeScrollPosAdjust;

    const wireframeScrollPosAfter = wireframeScrollPos + wireframeScrollPosAdjust + ((toRelPos - fromRelPos) * sectionLenght);
    const scrollPosAfter = setScrollPos(target);
    wireframeScrollPosAdjust = wireframeScrollPosAfter - scrollPosAfter;

    __isInTransition.current = { // REVIEW: mantain __in... or no?
      active: true,
      to: target,
    };
    setTransitionProps({
      from: fromRelPos,
      to: toRelPos,
      reset: true,
    });
    disableScroll();
  }

  return {
    relativePos,
    scrollPos,
    transitionPos: transitionRelativePos,
    goToSection,
    inTransition: __isInTransition.current.active,
    activeSection,
  };
}

export function getWireframePos() {
  if (sectionsTransition.active) {
    const { fromRelPos, toRelPos, relPos } = sectionsTransition;

    const transitionDelta = lerp(relPos, [fromRelPos, toRelPos], [0, toRelPos - fromRelPos]);
    const scrollDelta = transitionDelta * sectionLenght;

    // __recordValuesOverTime('wireframePos', { relPos, returnVal: wireframeScrollPosBefore + scrollDelta, scrollDelta, transitionDelta }, 300);

    return wireframeScrollPosBefore + scrollDelta;
  }

  // __stopRecord('wireframePos');
  // __log('adjust', {
  //   // wireframeScrollPosAfter,
  //   adjust: wireframeScrollPosAdjust,
  //   finalPos: wireframeScrollPos + wireframeScrollPosAdjust,
  //   wireframeScrollPos,
  // }, wireframeScrollPosAdjust);

  return wireframeScrollPos + wireframeScrollPosAdjust;
}
