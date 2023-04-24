import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularCheckboxComponent } from './nebular-checkbox.component';

describe('NebularCheckboxComponent', () => {
  let component: NebularCheckboxComponent;
  let fixture: ComponentFixture<NebularCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
