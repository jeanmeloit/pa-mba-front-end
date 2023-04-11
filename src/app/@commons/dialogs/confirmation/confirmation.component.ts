import { Component, Input, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'pds-confirmation-dialog',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  @Input() public dialogTitle: string = 'Confirmação'

  @Input() public confirmationContent: any

  public loading: boolean = false

  constructor(protected dialogRef: NbDialogRef<any>) {}

  public ngOnInit(): void {}

  public dispose(): void {
    this.dialogRef.close(false)
  }

  public confirm(): void {
    this.dialogRef.close(true)
  }
}
