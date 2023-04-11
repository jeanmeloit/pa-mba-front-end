import { Component, Input, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'pds-info-dialog',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() public dialogTitle: string = 'Informativo'

  @Input() public dialogContent: any

  @Input() public gridData: any = []
  @Input() public gridColumns: any = []

  public loading: boolean = false

  constructor(protected dialogRef: NbDialogRef<any>) {}

  public ngOnInit(): void {}

  public dispose(): void {
    this.dialogRef.close(false)
  }
}
