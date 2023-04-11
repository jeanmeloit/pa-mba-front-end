import { Component, Input, OnInit } from '@angular/core'
import { NbDialogRef } from '@nebular/theme'

@Component({
  selector: 'pds-modal-instancia',
  templateUrl: './modal-instancia.component.html',
  styleUrls: ['./modal-instancia.component.scss'],
})
export class ModalInstanciaComponent implements OnInit {
  @Input() public dados: any[]

  constructor(protected ref: NbDialogRef<ModalInstanciaComponent>) {}

  public ngOnInit(): void {}

  public dismiss(url: string, idCliente: string, idSistema: string): void {
    this.ref.close({ url, idCliente, idSistema })
  }
}
