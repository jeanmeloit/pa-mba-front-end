import { Component, ViewChild } from '@angular/core'
import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { CadastroDto } from './../../../interfaces/dtos/cadastro-dto'
import TestUtils from './.@common/misc/TestUtils'
import { SuggestionBoxComponent } from './suggestion-box.component'

// tslint:disable:no-use-before-declare
describe('SuggestionBoxComponent', () => {
  let component: SuggestionBoxComponent
  let fixture: ComponentFixture<SuggestionBoxComponent>
  let hostComponent: TestHostComponent
  let hostFixture: ComponentFixture<TestHostComponent>

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SuggestionBoxComponent, TestHostComponent],
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionBoxComponent)
    component = fixture.componentInstance
    hostFixture = TestBed.createComponent(TestHostComponent)
    hostComponent = hostFixture.componentInstance
    fixture.detectChanges()
    hostFixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should click a suggestion item', () => {
    spyOn(component, 'select')

    component.suggestions = TestUtils.mockCadastroDto()
    hostFixture.detectChanges()
    fixture.detectChanges()

    TestUtils.click('li.suggestion:nth-of-type(1)', fixture)
    hostFixture.detectChanges()
    fixture.detectChanges()

    expect(component.select).toHaveBeenCalledTimes(1)
  })

  @Component({
    selector: 'app-host-component',
    template: '<app-suggestion-box [model]="model"></app-suggestion-box>',
  })
  class TestHostComponent {
    @ViewChild(SuggestionBoxComponent, { static: false })
    public childComponent: SuggestionBoxComponent

    public model: CadastroDto[]
  }
})
// tslint:enable:no-use-before-declare
