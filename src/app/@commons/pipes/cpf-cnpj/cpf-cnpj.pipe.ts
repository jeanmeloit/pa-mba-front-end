import { Pipe, PipeTransform } from '@angular/core'
import { conformToMask } from 'angular2-text-mask'

@Pipe({
  name: 'cpfCnpj',
})
export class CpfCnpjPipe implements PipeTransform {

  public transform(value: any): string {
    let mask: any[]

    if (value.length < 14) {
      mask = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    } else {
      mask = [/\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/]
    }

    return conformToMask(value, mask, { guide: false }).conformedValue
  }

}
