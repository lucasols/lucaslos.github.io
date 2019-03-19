import projects from 'config/projects';

let sectionOrder = 0;

export const sections = {
  home: { rest: 0, order: sectionOrder++ },
  aboutMe: { rest: 2, order: sectionOrder++ },
  projects: { rest: 2 * projects.length, order: sectionOrder++ },
  contact: { rest: 1, order: sectionOrder++ },
};
export const whellDelta = 100;
export const transitionScrolls = 10; // in whellDeltas
export const elemLenght = 0.4; // 0 - 1
export const perspective = 600;
export const maxZDelta = 240;
export const interactionThreshold = 10;

export const wireframeCycleLength = 10 * whellDelta;
export const wireFrameMargin = 10;
