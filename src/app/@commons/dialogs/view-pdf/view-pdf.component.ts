import { Component, Input, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'pds-view-pdf',
  templateUrl: './view-pdf.component.html',
  styleUrls: ['./view-pdf.component.scss'],
})
export class ViewPdfComponent implements OnInit {
  @Input()
  public dialogTitle: string = `Visualizar documento`

  @Input() public content?: string

  @Input() public disposeText?: string

  @Input() public confirmVisible?: boolean = false
  @Input() public confirmText?: string

  public loading: boolean = false

  constructor(protected dialogRef: NbDialogRef<any>) {}

  public ngOnInit(): void {}

  public confirm(): void {
    this.dialogRef.close(true)
  }

  public dispose(): void {
    this.dialogRef.close(false)
  }
}
