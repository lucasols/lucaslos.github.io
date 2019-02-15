const projects = [0];

type SectionConfig = {
  order: number;
  rest: number;
};

let sectionOrder = 0;

/* config */
const whellDelta = 100;
const transitionScrolls = 10; // in whellDeltas
const elemLenght = 0.5; // 0 - 1
const sections = {
  home: { rest: 0, order: sectionOrder++ },
  aboutMe: { rest: 2, order: sectionOrder++ },
  projects: { rest: 2 * projects.length, order: sectionOrder++ },
  contact: { rest: 0, order: sectionOrder++ },
};
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

export const scrollHeight =
  (transitionScrolls * numOfTransitions + numOfRests) * whellDelta;

/* function args */
const section: Sections = 'aboutMe';
const total = 4;
const order = 0;

/* function body */
const elemRelLenght = elemLenght * 0.5;
const sectionStart = sections[section].order;
const elemStart = (((0.5 - elemRelLenght) / total) * order);
const inStart = sectionStart + elemStart;
const inEnd = inStart + elemRelLenght;
const outStart = sectionStart + 0.5 + elemStart;
const outEnd = outStart + elemRelLenght;

elemStart;
inStart;
inEnd;
outStart;
outEnd;
