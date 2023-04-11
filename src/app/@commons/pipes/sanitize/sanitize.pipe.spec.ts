import { SanitizePipe } from './sanitize.pipe'

describe('SanitizePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitizePipe()
    expect(pipe).toBeTruthy()
  })

  it('apply pipe', () => {
    const pipe = new SanitizePipe()
    const result = pipe.transform('test_-12@34567890()*&¨%$#@!"`~^]}[{/?:.>,<|')
    expect(result).toBe('test1234567890')
  })
})
