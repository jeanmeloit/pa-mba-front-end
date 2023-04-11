import { Component, Input, OnInit, ViewChild } from '@angular/core'
import ColorPicker from '@commons/misc/color-picker'
import { DxChartComponent } from 'devextreme-angular'

@Component({
  selector: 'pds-dx-bar-chart',
  templateUrl: './dx-bar-chart.component.html',
  styleUrls: ['./dx-bar-chart.component.scss'],
})
export class DxBarChartComponent implements OnInit {
  @Input() public dataSource: any[]
  @Input() public chartId: string

  public colorScheme: any = ColorPicker.getPrimaryColorScheme()

  @ViewChild(DxChartComponent, { static: false })
  private chart: DxChartComponent

  constructor() {}

  public ngOnInit(): void {
    this.chart.instance.render()
  }
}
