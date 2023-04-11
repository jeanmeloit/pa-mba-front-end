// prettier-ignore
export const CpfMask: any[] = [
    /\d/,/\d/,/\d/,'.',
    /\d/,/\d/,/\d/,'.',
    /\d/,/\d/,/\d/,'-',
    /\d/,/\d/,
  ]

// prettier-ignore
export const CnpjMask: any[] = [
      /\d/, /\d/, '.',
      /\d/, /\d/, /\d/, '.',
      /\d/, /\d/, /\d/, '/',
      /\d/, /\d/, /\d/, /\d/, '-',
      /\d/, /\d/,
    ]

// prettier-ignore
export const CepMask: any[] = [
  /\d/, /\d/, '.',
  /\d/, /\d/, /\d/, '-',
  /\d/, /\d/, /\d/,
]

// prettier-ignore
export const CellPhoneMask: any[] = [
    '(', /\d/, /\d/, ')',
    ' ', /\d/,
    ' ', /\d/, /\d/, /\d/, /\d/,
    '-', /\d/, /\d/, /\d/, /\d/,
  ]

// prettier-ignore
export const PhoneMask: any[] = [
  '(', /\d/, /\d/, ')',
  ' ', /\d/, /\d/, /\d/, /\d/,
  '-', /\d/, /\d/, /\d/, /\d/,
  ]
