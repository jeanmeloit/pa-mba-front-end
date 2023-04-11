import { Moment } from 'moment'
import moment from 'moment-es6'

export default class DateParser {
  public static getDateObject(date?: any): any {
    if (date && date !== '') {
      return new Date(date.year, date.month - 1, date.day)
    }

    return null
  }

  public static getMomentDate(date: any, format?: string): Moment {
    if (date) {
      const d = typeof date === 'string' ? date : this.getDateObject(date)

      return moment(d, format)
    }

    return moment()
  }

  public static getMomentFormatedDate(date: any, format: string): string {
    const struct = this.getDateStructFromDateObj(date)

    if (struct && format) {
      return this.getMomentDate(struct).format(format)
    }
  }

  public static getFormatedDate(date: any, format: string): string {
    if (date && format) {
      return this.getMomentDate(date).format(format)
    }

    return ''
  }

  public static getDateStructFromDateObj(date: Date): any {
    return {
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }
  }

  public static getDateStruct(date: string): any | null {
    if (date) {
      const momt = this.getMomentDate(date)

      return {
        day: momt.date(),
        month: momt.month() + 1,
        year: momt.year(),
      }
    }

    return null
  }

  public static isDateInvalid(
    dataInicio: any,
    dataTermino: any,
    submitted?: boolean,
  ): any {
    const initialDate = moment(this.getDateObject(dataInicio))
    const finalDate = moment(this.getDateObject(dataTermino))

    const valid = {
      invalid:
        initialDate.diff(finalDate) > 0 ||
        (((!initialDate.isValid() && dataInicio === null) ||
          (!finalDate.isValid() && dataTermino === null)) &&
          submitted),
    }

    // tem de se retornar um objeto, e mais especificamente uma
    // cópia de um objeto para que o angular detecte mudança dos
    // valores no decorator @Input e rode a validação personalizada
    // mesmo que o valor de validate continue o mesmo
    return Object.assign({}, valid)
  }

  public static getDateForFilters(date: {
    day: number
    month: number
    year: number
  }): string {
    return `${('0' + date.day).slice(-2)}-${('0' + date.month).slice(-2)}-${
      date.year
    }`
  }
}
