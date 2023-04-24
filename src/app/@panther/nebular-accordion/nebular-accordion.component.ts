import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup } from '@angular/forms'
import { NbAccordionComponent } from '@nebular/theme'
import { NebularAccordionInterface } from '@panther/interfaces/nebular-accordion'

@Component({
  selector: 'pds-nebular-accordion',
  templateUrl: './nebular-accordion.component.html',
  styleUrls: ['./nebular-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NebularAccordionComponent implements OnInit {
  @Input() public openedControlLabel: string = 'Manter seções'
  @Input() public openedControlOnValue: string = 'Abertas'
  @Input() public openedControlOffValue: string = 'Fechadas'

  @Input() public isMultiple: boolean = false
  @Input() public showOpenedControl: boolean = false

  @Input() public templates: any

  @Input() public items: NebularAccordionInterface[]

  public model: FormGroup

  @ViewChild('accordion', { static: false }) accordion: NbAccordionComponent

  constructor() {}

  public ngOnInit(): void {
    this.model = this.getNewModel()
  }

  private getNewModel(): FormGroup {
    return new FormGroup({
      opened: new FormControl(),
    })
  }

  public sectionController($event: any): void {
    if ($event) this.accordion.openAll()
    else this.accordion.closeAll()
  }
}
