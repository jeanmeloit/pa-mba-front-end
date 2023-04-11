import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'phone',
})
export class PhonePipe implements PipeTransform {
  public transform(value: any, args?: any): string {
    if (!value) return ''

    let val = value
      .replace('(', '')
      .replace(')', '')
      .replace('-', '')
      .replace(' ', '')

    switch (val.length) {
      case 8:
        val = `${val.substring(0, 4)}-${val.substring(4, 8)}`
        break
      case 9:
        val = `${val.substring(0, 5)}-${val.substring(5, 9)}`
        break
      case 10:
        val = `(${val.substring(0, 2)}) ${val.substring(2, 6)}-${val.substring(
          6,
          10,
        )}`
        break
      case 11:
        val = `(${val.substring(0, 2)}) ${val.substring(2, 7)}-${val.substring(
          7,
          11,
        )}`
        break
      default:
        val = val
        break
    }

    return val
  }
}
