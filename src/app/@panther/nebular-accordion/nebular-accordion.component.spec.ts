import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularAccordionComponent } from './nebular-accordion.component';

describe('NebularAccordionComponent', () => {
  let component: NebularAccordionComponent;
  let fixture: ComponentFixture<NebularAccordionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NebularAccordionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
