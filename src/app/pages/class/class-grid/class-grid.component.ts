import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import {
  DxColumnInterface,
  DxFormItemInterface,
} from '@panther/interfaces/column-interface'
import { DxDataGridComponent } from 'devextreme-angular'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { Class } from '../interfaces/class.interface'
import { ClassService } from './class.service'

@Component({
  selector: 'pds-class-grid',
  templateUrl: './class-grid.component.html',
  styleUrls: ['./class-grid.component.scss'],
})
export class ClassGridComponent implements OnInit, OnDestroy {
  public loading: boolean = false
  public gridData: Class[] = []
  public columns: DxColumnInterface[] = []
  public formItems: DxFormItemInterface[] = []
  public selected: any[]

  private subscription: Subscription

  @Input()
  public isDialog: boolean = false

  @ViewChild(DxDataGridComponent, { static: false })
  public grid: DxDataGridComponent

  constructor(private service: ClassService, private toastr: ToastrService) {}

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
        (data: Class[]) => {
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
        caption: 'Descrição',
        dataField: 'name',
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
        ],
      },
    ]
    return template
  }

  public onToolbarPreparing(event: any): void {
    event.toolbarOptions.items[this.isDialog ? 0 : 1].showText = 'ever'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.text = 'Turma'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.hint =
      'Nova Turma'

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
            message: 'Turma inserida com sucesso.',
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
            message: 'A Turma ' + event.oldData.name + ' foi atualizada.',
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
          message: 'Turma ' + event.data.name + ' excluída com sucesso.',
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
