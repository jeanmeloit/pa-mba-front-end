import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import {
  DxColumnInterface,
  DxFormItemInterface,
} from '@panther/interfaces/column-interface'
import { DxDataGridComponent } from 'devextreme-angular'
import { Subscription } from 'rxjs'
import { finalize, map } from 'rxjs/operators'

import { AccessLevelEnum } from '../../../auth/enums/access-level.enum'
import { User } from '../../../auth/interfaces/user.interface'
import { UserService } from '../services/user.service'

@Component({
  selector: 'pds-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss'],
})
export class UserGridComponent implements OnInit, OnDestroy {
  public loading: boolean = false
  public gridData: User[] = []
  public columns: DxColumnInterface[] = []
  public formItems: DxFormItemInterface[] = []
  public selected: any[]

  private subscription: Subscription

  @Input()
  public isDialog: boolean = false

  @ViewChild(DxDataGridComponent, { static: false })
  public grid: DxDataGridComponent

  constructor(private service: UserService, private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.fetchGrid()
    this.columns = this.getColumns()
    this.formItems = this.getFormItems()
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  public fetchGrid(): void {
    this.loading = true
    this.subscription = this.service
      .get()
      .pipe(
        finalize(() => (this.loading = false)),
        map((users: User[]) => users.map(this.handleUser.bind(this))),
      )

      .subscribe(
        (data: User[]) => {
          this.gridData = data
        },
        (err: any) => {
          this.toastr.send({
            type: 'danger',
            message: err.error?.causa?.descricao || err?.error?.causa?.message,
          })
        },
      )
  }

  private handleUser(user): User {
    user.canAcessTill = new Date(user.canAcessTill)
    return user
  }

  private getColumns(): DxColumnInterface[] {
    const template: DxColumnInterface[] = [
      {
        caption: '',
        dataField: 'uuid',
        width: 70,
        cellTemplate: 'checkedTemplate',
        visible: this.isDialog,
        allowHiding: false,
        allowFiltering: false,
        allowHeaderFiltering: false,
        formItem: {
          visible: false,
        },
      },
      {
        caption: 'Nome',
        dataField: 'name',
        allowSorting: true,
        allowHeaderFiltering: true,
      },
      {
        caption: 'Telefone',
        dataField: 'phone',
        cellTemplate: 'phoneTemplate',
      },
      {
        caption: 'Idade',
        dataField: 'age',
      },
      {
        caption: 'E-mail',
        dataField: 'email',
        allowSorting: true,
        allowHeaderFiltering: true,
      },
      {
        caption: 'Senha',
        dataField: 'password',
        allowSorting: false,
        allowHeaderFiltering: false,
        customizeText: function () {
          return '********'
        },
      },
      {
        caption: 'Nível de acesso',
        dataField: 'accessLevel',
        formItem: {
          isRequired: true,
        },
        lookup: {
          dataSource: [
            {
              key: AccessLevelEnum.MANAGER,
              value: 'Gestor',
            },
            {
              key: AccessLevelEnum.STUDENT,
              value: 'Aluno',
            },
            {
              key: AccessLevelEnum.GUEST,
              value: 'Visitante',
            },
          ],
          displayExpr: 'value',
          valueExpr: 'key',
        },
      },
      {
        caption: 'Pode acessar até?',
        dataField: 'canAccessTill',
        dataType: 'datetime',
      },
      {
        caption: 'Ações',
        type: 'buttons',
        allowHiding: false,
        buttons: [
          {
            name: 'edit',
            icon: 'fas fa-edit',
          },
          {
            name: 'delete',
            icon: 'fas fa-trash-alt',
          },
        ],
      },
    ]
    return template
  }

  private getFormItems(): DxFormItemInterface[] {
    const template: DxFormItemInterface[] = [
      {
        itemType: 'group',
        colCount: 12,
        children: [
          {
            dataField: 'name',
            colSpan: 6,
            isRequired: true,
            editorOptions: { maxLength: '100', inputAttr: { id: 'name' } },
            label: {
              visible: false,
            },
          },
          {
            dataField: 'phone',
            isRequired: true,
            colSpan: 3,
            editorOptions: {
              mask: '(00) 9 0000-0000',
              showMaskMode: 'onFocus',
              inputAttr: { id: 'phone' },
            },
            label: {
              visible: false,
            },
          },
          {
            dataField: 'age',
            colSpan: 3,
            editorOptions: {
              inputAttr: { id: 'age' },
              max: 150,
            },
            editorType: 'dxNumberBox',
            label: {
              visible: false,
            },
          },
          {
            dataField: 'email',
            colSpan: 6,
            isRequired: true,
            editorOptions: { maxLength: '100', inputAttr: { id: 'email' } },
            validationRules: [
              {
                type: 'pattern',
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
                message: 'O e-mail informado não é válido',
              },
              {
                type: 'required',
                message: 'É obrigatório preencher o campo e-mail',
              },
            ],
            label: {
              visible: false,
            },
          },
          {
            dataField: 'password',
            colSpan: 3,
            isRequired: true,
            editorOptions: {
              mode: 'password',
              maxLength: '100',
              inputAttr: { id: 'password' },
            },
            label: {
              visible: false,
            },
          },
          {
            dataField: 'accessLevel',
            isRequired: true,
            colSpan: 3,
            label: {
              visible: false,
            },
          },
          {
            dataField: 'canAccessTill',
            isRequired: true,
            colSpan: 3,
            label: {
              visible: false,
            },
          },
        ],
      },
    ]
    return template
  }

  public onToolbarPreparing(event: any): void {
    event.toolbarOptions.items[this.isDialog ? 0 : 1].showText = 'ever'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.text = 'Usuário'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.hint =
      'Novo Usuário'

    event.toolbarOptions.items.forEach((item: any, index) => {
      if (item.options) {
        item.options.elementAttr = {
          id: 'action' + index,
        }
      } else {
        item['options'] = {
          elementAttr: {
            id: 'action' + index,
          },
        }
      }
    })
  }

  public onEditorPreparing(event: any): void {
    if (event.parentType === 'dataRow') {
      event.editorOptions = {
        ...event.editorOptions,
        stylingMode: 'outlined',
        labelMode: 'floating',
      }
    }
  }

  public onRowInserting(event: any): void {
    this.subscription = this.service
      .post(event.data)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.toastr.send({
            type: 'success',
            message: 'Usuário inserido com sucesso.',
          })
        },
        (err: any) => {
          this.toastr.send({
            type: 'danger',
            message: err.error?.causa?.descricao || err?.error?.causa?.message,
          })
        },
      )
  }

  public onRowInserted(event: any): void {
    setTimeout(() => {
      this.fetchGrid()
    }, 200)
  }

  public onRowUpdating(event: any): void {
    console.log(event)
    this.subscription = this.service
      .put({ uuid: event.key, ...event.newData })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.toastr.send({
            type: 'success',
            message: 'O usuário ' + event.oldData.name + ' foi atualizado.',
          })
        },
        (err: any) => {
          this.toastr.send({
            type: 'danger',
            message: err.error?.causa?.descricao || err?.error?.causa?.message,
          })
        },
      )
  }

  public onRowUpdated(event: any): void {
    setTimeout(() => {
      this.fetchGrid()
    }, 200)
  }

  public onRowRemoving(event: any): void {
    this.subscription = this.service.delete(event.data.uuid).subscribe(
      () => {
        this.toastr.send({
          type: 'success',
          message: 'Usuário ' + event.data.name + ' excluído com sucesso.',
        })
      },
      (resp: any) => this.toastr.bulkSend(resp.mensagens),
    )
  }

  public onRowRemoved(event: any): void {
    setTimeout(() => {
      this.fetchGrid()
    }, 200)
  }

  public isSelected(uuid: any): boolean {
    if (this.grid.instance.getSelectedRowsData()[0]) {
      if (this.grid.instance.getSelectedRowsData()[0].uuid === uuid) return true
    } else false
  }
}
