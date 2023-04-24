import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularButtonComponent } from './nebular-button.component';

describe('NebularButtonComponent', () => {
  let component: NebularButtonComponent;
  let fixture: ComponentFixture<NebularButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
