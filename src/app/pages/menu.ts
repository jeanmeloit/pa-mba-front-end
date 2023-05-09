import { Injectable } from '@angular/core'
import { NbMenuItem } from '@nebular/theme'

import { AccessLevelEnum } from '../auth/enums/access-level.enum'
import { LoginService } from '../auth/services/login.service'

@Injectable({ providedIn: 'root' })
export class MenuUtil {
  constructor(public loginService: LoginService) {}

  public get menuItems(): NbMenuItem[] {
    const { currentUserValue } = this.loginService

    return [
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
        hidden: currentUserValue.accessLevel === AccessLevelEnum.GUEST,
      },
      {
        title: 'Cadastros',
        icon: { icon: 'cog', pack: 'fas' },
        hidden: currentUserValue.accessLevel !== AccessLevelEnum.MANAGER,
        children: [
          {
            title: 'Usuários',
            icon: { icon: 'user', pack: 'fas' },
            link: '/usuario',
          },
          {
            title: 'Alunos',
            icon: { icon: 'user', pack: 'fas' },
            link: '/pessoa/aluno',
          },
          {
            title: 'Turmas',
            icon: { icon: 'th-list', pack: 'fas' },
            link: '/turma',
          },
        ],
      },
    ]
  }
}
