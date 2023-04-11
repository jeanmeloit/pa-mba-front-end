import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from '@src/app/@commons/services/toastr/toastr.service'
import {
  DxColumnInterface,
  DxFormItemInterface,
} from '@src/app/@design-tools/interfaces/column-interface'
import { DxDataGridComponent } from 'devextreme-angular'
import { Subscription } from 'rxjs'

@Component({
  selector: 'pds-ana',
  templateUrl: './ana.component.html',
  styleUrls: ['./ana.component.scss'],
})
export class AnaComponent implements OnInit, OnDestroy {
  public loading: boolean = false
  public gridData: any[] = []
  public columns: DxColumnInterface[] = []
  public formItems: DxFormItemInterface[] = []
  public selected: any[]

  private subscription: Subscription

  @Input()
  public isDialog: boolean = false

  @ViewChild(DxDataGridComponent, { static: false })
  public grid: DxDataGridComponent

  constructor(private toastr: ToastrService) {}

  public ngOnInit(): void {
    this.columns = this.getColumns()
    this.formItems = this.getFormItems()
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  private getColumns(): DxColumnInterface[] {
    const template: DxColumnInterface[] = [
      {
        caption: 'Nome',
        dataField: 'nome',
        formItem: {
          isRequired: true,
        },
      },
      {
        caption: 'Apelido',
        dataField: 'apelido',
        formItem: {
          isRequired: true,
        },
      },
      {
        caption: 'Observações',
        dataField: 'observacoes',
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
            dataField: 'nome',
            isRequired: true,
            colSpan: 8,
            label: {
              visible: false,
            },
          },
          {
            dataField: 'apelido',
            isRequired: true,
            colSpan: 4,
            label: {
              visible: false,
            },
          },
          {
            dataField: 'observacoes',
            colSpan: 12,
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
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.text = 'Example'
    event.toolbarOptions.items[this.isDialog ? 0 : 1].options.hint =
      'New Example'

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
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.toastr.send({
        success: true,
        message: 'Exemplo de registro inserido com sucesso.',
      })
    }, 500)
  }

  public onRowInserted(event: any): void {
    //do nothing
  }

  public onRowUpdating(event: any): void {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.toastr.send({
        success: true,
        message:
          'Exemplo de registro ' + event.oldData.nome + ' foi atualizado.',
      })
    }, 500)
  }

  public onRowUpdated(event: any): void {
    //do nothing
  }

  public onRowRemoving(event: any): void {
    this.loading = true
    setTimeout(() => {
      this.loading = false
      this.toastr.send({
        success: true,
        message:
          'Exemplo de registro ' + event.data.nome + ' excluído com sucesso.',
      })
    }, 500)
  }

  public onRowRemoved(event: any): void {
    setTimeout(() => {
      ////do nothing
    }, 200)
  }

  public isSelected(uuid: any): boolean {
    if (this.grid.instance.getSelectedRowsData()[0]) {
      if (this.grid.instance.getSelectedRowsData()[0].uuid === uuid) return true
    } else false
  }
}
