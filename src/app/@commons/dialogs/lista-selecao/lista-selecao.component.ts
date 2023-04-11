import { Component, Input, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

export interface ModalListConfig {
  type: 'MULTI' | 'SINGLE'
  title: string
  idKey: string
  textKey: string
}

@Component({
  selector: 'pds-lista-selecao',
  templateUrl: './lista-selecao.component.html',
  styleUrls: ['./lista-selecao.component.scss'],
})
export class ListaSelecaoComponent implements OnInit {
  @Input() public config: ModalListConfig
  @Input() public dialogTitle: string
  @Input() public list: any[]
  @Input() public selectedList: any[]
  public loading: boolean = false

  constructor(protected dialogRef: NbDialogRef<any>) {}

  ngOnInit(): void {
    this.dialogTitle = this.config.title
    const _selectedList = [...this.selectedList]
    const renameConfig = {
      [this.config.idKey]: 'value',
      [this.config.textKey]: 'text',
    }

    this.list.forEach((el, i, arr) => {
      arr[i] = this.renameKeys(renameConfig, el)
      arr[i].$checked = false
    })

    if (_selectedList) {
      _selectedList.forEach(
        (el, i, arr) => (arr[i] = this.renameKeys(renameConfig, el)),
      )

      this.list.forEach(el => {
        if (_selectedList.some(l => l.value === el.value)) {
          el.$checked = true
        }
      })
    }
  }

  private renameKeys(keysMap, obj): any {
    return Object.keys(obj).reduce(
      (acc, key) => ({
        ...acc,
        ...{ [keysMap[key] || key]: obj[key] },
      }),
      {},
    )
  }

  public confirm(): void {
    const renameConfig = {
      value: this.config.idKey,
      text: this.config.textKey,
    }

    const data = this.list.filter(el => el.$checked)
    data.forEach((el, i, arr) => (arr[i] = this.renameKeys(renameConfig, el)))
    this.dialogRef.close(data)
  }

  public dispose(): void {
    this.dialogRef.close(false)
  }
}
