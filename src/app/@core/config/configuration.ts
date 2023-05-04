import { Configuration } from './configuration.interface'

export const DefaultConfiguration: Configuration = {
  app: {
    name: 'Checkin control',
    title: 'Checkin control',
    aboutTitle: 'Sobre o projeto aplicado para o MBA front end XPE',
    aboutDescription:
      'Projeto aplicado realizado para obtenção de nota no MBA front end XPE',
    sidebar: {
      left: false,
      right: true,
    },
    layout: {
      windowMode: false,
    },
  },
  header: {
    title: 'Checkin control',
    showNotifications: true,
    showFavorites: true,
    showNewWindow: true,
    showThemeSelector: true,
    showSystemSelector: false,
    themes: [
      {
        value: 'default',
        name: 'Padrão',
      },
      {
        value: 'dark',
        name: 'Escuro',
      },
      // {
      //   value: 'cosmic',
      //   name: 'Cósmico',
      // },
      // {
      //   value: 'corporate',
      //   name: 'Corporativo',
      // },
      // {
      //   value: 'material-light',
      //   name: 'Material',
      // },
      // {
      //   value: 'material-dark',
      //   name: 'Material escuro',
      // },
    ],
    userMenu: [
      // { title: 'Perfil', icon: { icon: 'user', pack: 'fas' } },
      { title: 'Nova janela', icon: 'browser-outline' },
      {
        title: 'Tema',
        icon: 'color-palette-outline',
        children: [
          {
            data: 'default',
            title: 'Clássico',
          },
          {
            data: 'dark',
            title: 'Escuro',
          },
          // {
          //   data: 'cosmic',
          //   title: 'Cósmico',
          // },
          // {
          //   data: 'corporate',
          //   title: 'Corporativo',
          // },
          // {
          //   data: 'material-light',
          //   title: 'Material',
          // },
          // {
          //   data: 'material-dark',
          //   title: 'Material escuro',
          // },
        ],
      },
      {
        title: 'Sobre',
        icon: 'question-mark-circle-outline',
        link: 'outros/sobre',
      },
      { title: 'Sair', icon: 'log-out-outline' },
    ],
    themeMenu: [
      {
        data: 'default',
        title: 'Clássico',
        icon: 'sun',
      },
      {
        data: 'dark',
        title: 'Escuro',
        icon: 'moon',
      },
      // {
      //   data: 'cosmic',
      //   title: 'Cósmico',
      //   icon: { icon: 'meteor', pack: 'fas' },
      // },
      // {
      //   data: 'corporate',
      //   title: 'Corporativo',
      //   icon: { icon: 'landmark', pack: 'fas' },
      // },
      // {
      //   data: 'material-light',
      //   title: 'Material',
      //   icon: 'sun-outline',
      // },
      // {
      //   data: 'material-dark',
      //   title: 'Material escuro',
      //   icon: 'moon-outline',
      // },
    ],
  },
  footer: {
    title: 'Checkin control',
    showLinkedin: true,
    linkedinLink: 'https://www.linkedin.com/in/jean-melo/',
    showInstagram: true,
    instagramLink: '#',
    showFacebook: true,
    facebookLink: '#',
    showTwitter: false,
    twitterLink: '#',
  },
  enviroment: {
    dev: 'http://localhost:3000',
    homolog: 'http://localhost:3000',
    prod: 'https://po-mba-back-end-jean.onrender.com',
  },
  backoffice: {
    dev: '',
    homolog: '',
    prod: '',
  },
  system: {
    id: '',
  },
  backend: {
    mainUrl: '',
  },
}
