import { PhonePipe } from './phone.pipe'

describe('PhonePipe', () => {
  it('create an instance', () => {
    const pipe = new PhonePipe()
    expect(pipe).toBeTruthy()
  })

  it('should transform telefone 8 digits', () => {
    const pipe = new PhonePipe()
    const cpf = pipe.transform('00000000')
    expect(cpf).toBe('0000-0000')
  })

  it('should transform telefone 9 digits', () => {
    const pipe = new PhonePipe()
    const cpf = pipe.transform('000000000')
    expect(cpf).toBe('00000-0000')
  })

  it('should transform telefone 10 digits', () => {
    const pipe = new PhonePipe()
    const cpf = pipe.transform('0000000000')
    expect(cpf).toBe('(00) 0000-0000')
  })

  it('should transform telefone 11 digits', () => {
    const pipe = new PhonePipe()
    const cpf = pipe.transform('00000000000')
    expect(cpf).toBe('(00) 00000-0000')
  })
})
