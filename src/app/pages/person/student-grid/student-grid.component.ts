import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import {
  DxColumnInterface,
  DxFormItemInterface,
} from '@panther/interfaces/column-interface'
import { DxDataGridComponent } from 'devextreme-angular'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Student } from '../interfaces/student.interface'
import { StudentService } from './student.service'

@Component({
  selector: 'pds-student-grid',
  templateUrl: './student-grid.component.html',
  styleUrls: ['./student-grid.component.scss'],
})
export class StudentGridComponent implements OnInit, OnDestroy {
  public loading: boolean = false
  public gridData: Student[] = []
  public columns: DxColumnInterface[] = []
  public formItems: DxFormItemInterface[] = []
  public selected: any[]

  private subscription: Subscription

  @Input()
  public isDialog: boolean = false

  @ViewChild(DxDataGridComponent, { static: false })
  public grid: DxDataGridComponent

  constructor(private service: StudentService, private toastr: ToastrService) {}

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
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: Student[]) => {
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
            colSpan: 8,
            isRequired: true,
            editorOptions: { maxLength: '100', inputAttr: { id: 'name' } },
            label: {
              visible: false,
            },
          },
          {
            dataField: 'phone',
            isRequired: true,
            colSpan: 4,
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
            colSpan: 4,
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
            colSpan: 8,
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
        ],
      },
    ]
    return template
  }

  public onToolbarPreparing(event: any): void {
    event.toolbarOptions.items[this.isDialog ? 0 : 1].showText = 'ever'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.text = 'Aluno'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.hint =
      'Novo Aluno'

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
            message: 'Aluno inserido com sucesso.',
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
    this.subscription = this.service
      .put({ uuid: event.key, ...event.newData })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => {
          this.toastr.send({
            type: 'success',
            message: 'O aluno ' + event.oldData.name + ' foi atualizado.',
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
          message: 'Aluno ' + event.data.name + ' excluído com sucesso.',
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
