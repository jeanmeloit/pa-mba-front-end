import { NbMenuItem } from '@nebular/theme'

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Boilerplate',
    icon: { icon: 'chart-pie', pack: 'fas' },
    link: '/',
    home: true,
    hidden: true,
  },
  {
    title: 'Boilerplate',
    icon: { icon: 'home', pack: 'fas' },
    link: '/dashboard',
  },
  {
    title: 'Examples',
    icon: { icon: 'cog', pack: 'fas' },
    children: [
      {
        title: 'Example for ANA',
        icon: { icon: 'user', pack: 'fas' },
        link: '/examples/ana',
      },
    ],
  },
]
