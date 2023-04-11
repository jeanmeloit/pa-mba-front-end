import moment, { Moment } from 'moment'

export function getParsedDate(date: any): string {
  const parsedDate = date.format('YYYY-MM-DD')
  return parsedDate
}

export function getMomentDate(date: string): Moment {
  const momentDate = moment(date)
  return momentDate
}
