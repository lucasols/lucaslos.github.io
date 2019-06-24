const UXUI_DESIGN = 'UX/UI Design';
const FRONT_END = 'Front-END';

const projects = [
  {
    id: 'bmw-hub-navigation',
    title: 'BMW HUB Navigation',
    tags: [UXUI_DESIGN, FRONT_END],
    client: 'BMW e USP - Project Mobility',
    date: '02/2019',
    description: 'The leading company in testing and creators of Monkop, among others regarding continuous improvement of software development, hired me to work on a project about training and promotion of software testing. The result is a web site with a striking visual language, based on colors, gradients and patterns, which define the different study areas and their levels of complexity.',
    links: [
      {
        url: 'string',
        label: 'string',
      },
    ],
    imgs: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6ae2ef80460163.5ce25f3b83998.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2660ca71630153.5bcc35dc1c18e.jpg',
    ],
  },
  {
    id: 'bmw-hub-navigation',
    title: 'BMW HUB Navigation',
    tags: [UXUI_DESIGN, FRONT_END],
    client: 'BMW e USP - Project Mobility',
    date: '02/2019',
    description: 'The leading company in testing and creators of Monkop, among others regarding continuous improvement of software development, hired me to work on a project about training and promotion of software testing. The result is a web site with a striking visual language, based on colors, gradients and patterns, which define the different study areas and their levels of complexity.',
    links: [
      {
        url: 'string',
        label: 'string',
      },
    ],
    imgs: [
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/6ae2ef80460163.5ce25f3b83998.jpg',
      'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/2660ca71630153.5bcc35dc1c18e.jpg',
    ],
  },
];

if (__DEV__) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const testProjectsTypes: {
    id: string;
    title: string;
    tags: string[];
    client: string;
    date: string;
    description: string;
    links: {
      url: string;
      label: string;
    }[];
    imgs: string[];
  }[] = projects;
}

export default projects;
