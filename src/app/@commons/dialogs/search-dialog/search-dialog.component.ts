import { Component, Input, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'
import { DxColumnInterface } from '@panther/interfaces/column-interface'

@Component({
  selector: 'pds-search-dialog',
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
})
export class SearchDialogComponent implements OnInit {
  loading = false

  @Input() dialogTitle: string = 'Título'
  @Input() searchText: string = 'Buscar'
  @Input() multiple: boolean = false
  @Input() selectedKeys: string[] = []
  @Input() dataGrid: any[] = []
  @Input() columnsTemplate: DxColumnInterface[] = []

  @Input() key: string = 'uuid'

  @Input() store: { [index: string]: any } = {}

  constructor(private dialogRef: NbDialogRef<SearchDialogComponent>) {}

  ngOnInit(): void {
    if (Object.keys(this.store).length == 0) this.storeData()
  }

  storeData() {
    this.dataGrid.forEach(item => {
      const index = item[this.key] as string
      if (!this.store[index]) this.store[index] = item
    })
  }

  onSelectionChanged(event: any) {
    this.selectedKeys = event.selectedRowKeys
  }

  confirm() {
    const data = this.selectedKeys.map(key => this.store[key])
    let res = data?.length > 0 ? (this.multiple ? data : data[0]) : null
    this.dialogRef.close(res)
  }

  dispose() {
    this.dialogRef.close()
  }
}
