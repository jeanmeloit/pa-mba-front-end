import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  Output,
} from '@angular/core'
import { SanitizePipe } from '@pipes/sanitize/sanitize.pipe'

import { NebularSelect } from '../interfaces/nebular-select'

@Component({
  selector: 'pds-suggestion-box',
  templateUrl: './suggestion-box.component.html',
  styleUrls: ['./suggestion-box.component.scss'],
})
export class SuggestionBoxComponent {
  public keywrd: string
  public suggestions: NebularSelect[] = []

  @Input() isPopover: boolean = false

  @Input()
  public set keyword(content: string) {
    this.keywrd = content
  }

  @Input()
  public set model(content: NebularSelect[]) {
    if (content) {
      this.parseValues(content)
    }
  }

  @Input()
  public hideValue: boolean = false

  @Input()
  public boxWidth: number

  @Output()
  public update: EventEmitter<any> = new EventEmitter()

  @Input()
  private rawValue: boolean = false

  @Input()
  private maskFunction: (value: any) => any = value => value

  constructor(private eRef: ElementRef, private sanitize: SanitizePipe) {}

  @HostListener('document:click', ['$event'])
  public clickout(event): void {
    if (
      this.suggestions.length > 0 &&
      !this.eRef.nativeElement.contains(event.target)
    ) {
      this.suggestions = []
    }
  }

  public select(select: NebularSelect): void {
    if (this.suggestions.length === 1 && this.suggestions[0].valor === '') {
      select = { texto: '', valor: '' }
    }

    select.valor = this.sanitize.transform(select.valor)

    if (!this.rawValue) {
      select.texto = this.sanitize.transform(select.texto)
    } else {
      const regex = new RegExp(/<(\/?)b\b((?:[^>"']|"[^"]*"|'[^']*')*)>/, 'ig')
      select.texto = select.texto.replace(regex, '')
    }

    select.ignore = true

    this.update.emit(select)
    this.suggestions = []
  }

  private parseValues(content: NebularSelect[]): void {
    const reg = []
    this.keywrd.split('').forEach(el => reg.push(`${el}[-.\/]?`))

    const regex = new RegExp(reg.join(''), 'ig')

    content.forEach(cont => {
      cont.texto = cont.texto.replace(regex, match => `<b>${match}</b>`)
      cont.valor = this.maskFunction(cont.valor)
      cont.valor.replace(regex, match => `<b>${match}</b>`)
    })
    this.suggestions = content
  }
}
