import { TestBed } from '@angular/core/testing'

import { LoadingService } from './loading.service'

describe('LoadingService', () => {
  let service: LoadingService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    })

    service = TestBed.get(LoadingService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should get loading subject', () => {
    expect(typeof service.getLoadingSubject()).toBe('object')
  })
})
