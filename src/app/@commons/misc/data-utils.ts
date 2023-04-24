import { NebularSelect } from '@panther/interfaces/nebular-select'

export default class DataUtil {
  public static getMonthList(removeAll?: boolean): NebularSelect[] {
    const arr: NebularSelect[] = []

    if (!removeAll) {
      arr.push({ texto: 'Todos', valor: 'TODOS' })
    }

    arr.push(
      { texto: 'Janeiro', valor: '1' },
      { texto: 'Fevereiro', valor: '2' },
      { texto: 'Março', valor: '3' },
      { texto: 'Abril', valor: '4' },
      { texto: 'Maio', valor: '5' },
      { texto: 'Junho', valor: '6' },
      { texto: 'Julho', valor: '7' },
      { texto: 'Agosto', valor: '8' },
      { texto: 'Setembro', valor: '9' },
      { texto: 'Outubro', valor: '10' },
      { texto: 'Novembro', valor: '11' },
      { texto: 'Dezembro', valor: '12' },
    )

    return arr
  }

  public static getMonthEnum(): any {
    enum months {
      JANEIRO = 1,
      FEVEREIRO = 2,
      MARCO = 3,
      ABRIL = 4,
      MAIO = 5,
      JUNHO = 6,
      JULHO = 7,
      AGOSTO = 8,
      SETEMBRO = 9,
      OUTUBRO = 10,
      NOVEMBRO = 11,
      DEZEMBRO = 12,
    }

    return months
  }

  public static getExercicios(): NebularSelect[] {
    return [
      {
        valor: '2018',
        texto: '2018',
        valorComoInteger: 2018,
      },
      {
        valor: '2019',
        texto: '2019',
        valorComoInteger: 2019,
      },
    ]
  }

  public static range(start: number, end: number): any[] {
    return Array.from(Array(end - start + 1).keys()).map(i => i + start)
  }

  public static nameOfTheCurrentMonth(): string {
    return this.getMonthList(true).find(
      month => month.valor === `${new Date().getMonth() + 1}`,
    ).texto
  }

  public static getFirstDayOfCurrentMonth(): any {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth(), 1)
  }

  public static getLastDayOfCurrentMonth(): any {
    const today = new Date()
    return new Date(today.getFullYear(), today.getMonth() + 1, 0)
  }
}
