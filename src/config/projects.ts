const UXUI_DESIGN = 'UX/UI Design';
const FRONT_END = 'Front-END';

const projects = [
  {
    id: 'bmw-hub-navigation',
    title: 'BMW HUB Navigation',
    tags: [UXUI_DESIGN, FRONT_END],
    client: 'BMW e USP - Project Mobility',
    date: '02/2019',
    description: 'Protótipo de alta fidelidade do sistema de navegação da BMW. O aplicativo é resultado de dois anos de trabalho e pesquisa do uso de Inteligência Artificial para a melhoria da mobilidade dos veículos da marca. O design do sistema busca o mesmo nível de sofisticação do design dos carros da BMW, porém com uma navegação simples e fácil que usa animações para o guiar o usuário pela interface. Por trás do protótipo estão tecnologias web modernas, como React, Sass e PWA, e uma simulação de navegação em mapa 3d interativo, que demonstram todo o potencial das ferramentas desenvolvidas pela equipe do Project Mobility.',
    imgs: [
      'static/images/nav1.jpg',
      'static/images/nav7.jpg',
      'static/images/nav5.jpg',
      'static/images/nav2.jpg',
      'static/images/nav3.jpg',
      'static/images/nav4.jpg',
      'static/images/nav6.jpg',
    ],
  },
  {
    id: 'bmw-hub-analytics',
    title: 'BMW HUB Analytics',
    tags: [UXUI_DESIGN, FRONT_END],
    client: 'BMW e USP - Project Mobility',
    date: '02/2019',
    description: 'Aplicativo criado para visualização e análise dos dados gerados pela equipe do Project Mobility. Criado com React, Redux e Sass, o aplicativo tem como foco a experiência mobile, podendo ser instalado como um aplicativo nativo do celular através de um Progressive Web App.',
    imgs: [
      'static/images/analytics1.jpg',
      'static/images/analytics2.jpg',
      'static/images/analytics3.jpg',
      'static/images/analytics4.jpg',
      'static/images/analytics5.jpg',
      'static/images/analytics6.jpg',
    ],
  },
  {
    id: 'traddalberto-casacor',
    title: 'Painel Digital · WC Linha · CASACOR',
    tags: ['UI Design', FRONT_END],
    client: 'Trad Dalberto Arquitetura',
    date: '05/2019',
    description: 'Trad Dalberto é um escritório de Arquitetura e Design de Interiores de São Paulo-SP que teve sua estreia na renomada mostra de arquitetura CASACOR, com o ambiente WC. Linha. Pensando no tema da mostra “sustentabilidade e tecnologia” desenvolvi, em parceria com a omni-electronica o Design e Front-End de um painel digital que exibe e monitora em tempo real a interação e uso dos recursos no ambiente. O painel foi desenvolvido com React, Typescript e a biblioteca de CSS-in-JS emotion.',
    links: [
      {
        label: 'Visitar versão online',
        url: 'http://td-projeto-casa-cor.surge.sh/',
      },
      {
        label: 'Repositório do Github',
        url: 'https://github.com/lucaslos/traddalberto-casacor-display',
      },
      {
        label: 'Detalhes da WC Linha',
        url: 'https://site.casacor.abril.com.br/wc-linha/p',
      },
    ],
    imgs: [
      'static/images/casa-cor1.jpg',
      'static/images/casa-cor2.jpg',
      'static/images/casa-cor3.jpg',
    ],
  },
  {
    id: 'traddalberto-site',
    title: 'Webisite Trad Dalberto Arquitetura',
    tags: [UXUI_DESIGN, FRONT_END],
    client: 'Trad Dalberto Arquitetura',
    date: '06/2018',
    description: 'Redesign do website da dupla de arquitetas do escritório Trad Dalberto. O site traz uma navegação simples e um design minimalista e sofisticado que combina com o estilo arquitetônico do escritório. No desenvolvimento, se destaca o design responsivo, que se adapta perfeitamente aos dispositivos móveis, e o uso de tecnologias modernas, como o Gatsby.js, e Netlify CMS, que juntos permitem a fácil atualização do conteúdo do site.',
    links: [
      {
        label: 'Visitar site',
        url: 'https://traddalberto.com.br/',
      },
      {
        label: 'Repositório do Github',
        url: 'https://github.com/traddalberto/traddalberto',
      },
    ],
    imgs: [
      'static/images/td1.jpg',
      'static/images/td2.jpg',
      'static/images/td3.jpg',
      'static/images/td4.jpg',
      'static/images/td5.jpg',
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
    links?: {
      url: string;
      label: string;
    }[];
    imgs: string[];
  }[] = projects;
}

export default projects;
