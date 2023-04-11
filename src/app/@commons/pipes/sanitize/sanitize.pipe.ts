import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'sanitize',
})
export class SanitizePipe implements PipeTransform {
  public transform(value: any, args?: any): any {
    if (value) {
      return value.replace(/<[^>]*>|[^A-Za-z0-9\s]/gi, '')
    }
  }

  public transformMoney(value: any): any {
    if (value) {
      const number = `${value}`.replace('R$ ', '').replace(/\./g, '').replace(',', '.')

      return parseFloat(number)
    }
  }

  public transformDouble(value: any): any {
    return `${value}`.replace(',', '.')
  }

  public transformNumber(value: any): any {
    return `${value}`.replace(/[a-zA-Z\s]/gi, '')
  }
}
