import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { ToastrService } from '@commons/services/toastr/toastr.service'
import { DxColumnInterface } from '@design-tools/interfaces/column-interface'
import { NbDialogRef } from '@nebular/theme'
import { PreLoadService } from '@pages/pre-load.service'
import { DxDataGridComponent } from 'devextreme-angular'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'

import { PersonSearchService } from './person-search.service'

@Component({
  selector: 'pds-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.scss'],
})
export class PersonSearchComponent implements OnInit, OnDestroy {
  public loading: boolean = false
  // TODO ADD PERSON INTERFACE AND RETURN INTERFACE
  @Input()
  public dialogTitle: string = 'Pessoa | Busca'
  public gridData: any[] = []
  public columns: DxColumnInterface[] = []
  public selected: any[] = []

  private subscription: Subscription

  // FILTERS

  @Input() personType?: string

  @ViewChild(DxDataGridComponent, { static: false })
  public grid: DxDataGridComponent

  constructor(
    protected dialogRef: NbDialogRef<any>,
    private service: PersonSearchService,
    private preLoadService: PreLoadService,
    private toastr: ToastrService,
  ) {}

  public ngOnInit(): void {
    this.fetchGrid()
    this.columns = this.getColumns()
  }

  public ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe()
  }

  private fetchGrid(): void {
    this.loading = true
    this.subscription = this.service
      .get({ personType: this.personType })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        (data: any) => {
          this.gridData = data.dados
        },
        (err: any) => {
          this.toastr.send({
            error: true,
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
      },
      {
        caption: 'Código',
        dataField: 'dadoPessoal.codigo',
        width: 100,
      },
      {
        caption: 'Tipo',
        dataField: 'tipoPessoa',
        lookup: {
          dataSource: this.preLoadService.person?.tipoPessoa,
          valueExpr: 'chave',
          displayExpr: 'valor',
        },
      },
      {
        caption: 'Nome',
        dataField: 'dadoPessoal.nome',
      },
      {
        caption: 'Status',
        dataField: 'dadoPessoal.status',
        lookup: {
          dataSource: this.preLoadService.person?.statusPessoa,
          valueExpr: 'chave',
          displayExpr: 'valor',
        },
      },
    ]
    return template
  }

  public isSelected(uuid: any): boolean {
    if (this.grid.instance.getSelectedRowsData()[0]) {
      if (this.grid.instance.getSelectedRowsData()[0].uuid === uuid) return true
    } else false
  }

  public confirm(): void {
    const person = this.grid.instance.getSelectedRowsData()[0]
    this.dialogRef.close(person)
  }

  public dispose(): void {
    this.dialogRef.close(false)
  }
}
