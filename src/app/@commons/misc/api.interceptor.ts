import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Router } from '@angular/router'
import { environment } from '@environments/environment'
import { UserDataService } from '@guards/services/user-data.service'
import { LoadingService } from '@services/loading/loading.service'
import {
  ToastrMessageInterface,
} from '@services/toastr/interfaces/toastr-message'
import { ToastrService } from '@services/toastr/toastr.service'
import deepCleaner from 'deep-cleaner'
import { Observable, of, throwError } from 'rxjs'
import { catchError, tap } from 'rxjs/operators'

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  public BASE_URL: string

  constructor(
    private loadingService: LoadingService,
    private userService: UserDataService,
    private toastr: ToastrService,
    private router: Router,
  ) {
    this.BASE_URL = environment.url
  }

  public getBaseURL(): string {
    return this.BASE_URL
  }

  public getRequest(req: HttpRequest<any>): HttpRequest<any> {
    const userData = this.userService.userData
    let headers: any = {
      'x-permission': 'false',
      'x-encryption': 'false',
      'x-validate': 'false',
    }
    if (userData.token) {
      headers = {
        ...headers,
        authorization: userData.token,
      }
    }

    if (userData.entidadeUuid) {
      headers = {
        ...headers,
        'x-entity-uuid': userData.entidadeUuid,
      }
    } else {
      this.toastr.send({
        warning: true,
        message:
          'Suas informações de login expiraram, você será redirecionado para página de login dentro de 3 segundos!',
      })
      setTimeout(() => {
        this.userService.crossClientDel('userData')
        this.userService.crossClientDel('jwtToken')
        localStorage.removeItem('preLoad')
      }, 3000)
    }

    if (userData.exercicio) {
      headers = {
        ...headers,
        'x-exercise': userData.exercicio,
      }
    } else {
      this.toastr.send({
        warning: true,
        message:
          'Suas informações de login expiraram, você será redirecionado para página de login dentro de 3 segundos!',
      })
      setTimeout(() => {
        this.userService.crossClientDel('userData')
        this.userService.crossClientDel('jwtToken')
        localStorage.removeItem('preLoad')
      }, 3000)
    }

    if (req.body) {
      deepCleaner(req.body)
      deepCleaner(req.body)
    }

    return req.clone({
      url: `${this.BASE_URL}/${req.url}`,
      withCredentials: true,
      setHeaders: headers,
      params: this.handleParams(req.params),
    })
  }

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const apiReq = this.getRequest(req)

    this.loadingService.getLoadingSubject().next(true)

    return next.handle(apiReq).pipe(
      catchError(e => this.handleError(e)),
      tap(data => this.handleResponse(data)),
    )
  }

  private handleParams(params: HttpParams): HttpParams {
    let httpParam = new HttpParams()

    params.keys().forEach(key => {
      const value = params.get(key)

      if (value !== '' && value !== null && typeof value !== 'undefined') {
        httpParam = httpParam.append(key, value)
      }
    })

    return httpParam
  }

  private handleResponse(data: any): void {
    if (!data || !data.body) return
    const { esMensagens } = data.body

    if (esMensagens) {
      if (esMensagens.mensagens.length > 0) {
        this.toastr.bulkSend(esMensagens.mensagens)
      }
    } else {
      const { mensagens } = data.body
      if (mensagens) {
        if (mensagens.length > 0) {
          this.toastr.bulkSend(mensagens)
        }
      }
    }
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    const unreachable = 0
    const badRequest = 400 // https://httpstatuses.com/400
    const unauthorized = 401 // https://httpstatuses.com/401
    const forbidden = 403 // https://httpstatuses.com/403

    const esMensagens: ToastrMessageInterface[] = []

    const causes =
      err.error.causa instanceof Object ? err.error : JSON.parse(err.error)

    if (causes.causa) {
      esMensagens.push({
        error: true,
        message: causes.causa.descricao,
      })
    }

    if (err.status === unreachable) {
      esMensagens.push({ error: true, message: 'Servidor não encontrado' })
    }

    if (
      err.status === unreachable ||
      err.status === badRequest ||
      err.status === unauthorized ||
      err.status === forbidden
    ) {
      this.toastr.bulkSend(esMensagens)
      return of(err)
    }

    return throwError(err)
  }
}
