import { Injectable } from '@angular/core'
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router'
import { Observable } from 'rxjs'

import { AccessLevelEnum } from '../auth/enums/access-level.enum'
import { LoginService } from '../auth/services/login.service'

export const ACCESS = {
  dashboard: [
    AccessLevelEnum.MANAGER,
    AccessLevelEnum.STUDENT,
    AccessLevelEnum.GUEST,
  ],
  checkin: [AccessLevelEnum.MANAGER, AccessLevelEnum.STUDENT],
  usuario: [AccessLevelEnum.MANAGER],
  pessoa: [AccessLevelEnum.MANAGER],
  turma: [AccessLevelEnum.MANAGER],
}

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate, CanActivateChild {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const next = state.url.split('/')[1]
    return this.checkProfile(next)
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const route = state.url.split('/')[1]
    return this.checkProfile(route)
  }

  checkProfile(route: string): boolean {
    const { currentUserValue } = this.loginService
    if (ACCESS[route].some(profile => profile === currentUserValue.accessLevel))
      return true

    this.router.navigate(['/inicio'])
    return false
  }
}
