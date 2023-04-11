import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularAutoCompleteComponent } from './nebular-auto-complete.component';

describe('NebularAutoCompleteComponent', () => {
  let component: NebularAutoCompleteComponent;
  let fixture: ComponentFixture<NebularAutoCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NebularAutoCompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularAutoCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
