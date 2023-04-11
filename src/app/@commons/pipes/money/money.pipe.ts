import { Pipe, PipeTransform } from '@angular/core'
import { conformToMask } from 'angular2-text-mask'
import { createNumberMask } from 'text-mask-addons'

@Pipe({
  name: 'money',
})
export class MoneyPipe implements PipeTransform {

  public transform(value: any): string {
    const invalidValues = [undefined, null, '']
    if (invalidValues.includes(value)) {
      return ''
    }

    const mask = createNumberMask({
      prefix: 'R$ ',
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '.',
    })

    return conformToMask(`${value}`.replace('.', ','), mask, { guide: false }).conformedValue
  }

  public transformDecimal(value: any): string {

    const mask = createNumberMask({
      prefix: '',
      allowDecimal: true,
      decimalSymbol: ',',
      thousandsSeparatorSymbol: '',
    })

    return conformToMask(`${value}`.replace('.', ','), mask, { guide: false }).conformedValue
  }

  public transformNumber(value: any): string {

    const mask = createNumberMask({
      prefix: '',
      allowDecimal: false,
      decimalSymbol: '',
      thousandsSeparatorSymbol: '',
    })

    return conformToMask(`${value}`, mask, { guide: false }).conformedValue
  }
}
