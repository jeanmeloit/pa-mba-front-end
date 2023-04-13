import { NbMenuItem } from '@nebular/theme'

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Checking control',
    icon: { icon: 'chart-pie', pack: 'fas' },
    link: '/',
    home: true,
    hidden: true,
  },
  {
    title: 'Dashboard',
    icon: { icon: 'home', pack: 'fas' },
    link: '/dashboard',
  },
  {
    title: 'Checkin',
    icon: { icon: 'map-marker-alt', pack: 'fas' },
    link: '/checkin',
  },
  {
    title: 'Cadastros',
    icon: { icon: 'cog', pack: 'fas' },
    children: [
      {
        title: 'Aluno',
        icon: { icon: 'user', pack: 'fas' },
        link: '/pessoa/aluno',
      },
      {
        title: 'Turma',
        icon: { icon: 'th-list', pack: 'fas' },
        link: '/turma',
      },
    ],
  },
]
