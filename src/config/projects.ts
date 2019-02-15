export type Project = {
  title: string;
  img: string;
  tags?: string[];
  description: string;
  link?: string;
  studyCaseLink?: string;
};

const projects: Project[] = [
  {
    title: 'Nano Wallpapers',
    img: 'https://mir-s3-cdn-cf.behance.net/project_modules/fs/dc76ff61543179.5a727ee024b25.jpg',
    description: 'A serie of high resolution wallpapers for the cryptocurrency NANO',
    link: 'ok',
    tags: ['Graphic Design', 'Personal'],
    studyCaseLink: 'ok',
  },
];

export default projects;
