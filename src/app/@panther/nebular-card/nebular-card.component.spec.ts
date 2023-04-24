import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularCardComponent } from './nebular-card.component';

describe('NebularCardComponent', () => {
  let component: NebularCardComponent;
  let fixture: ComponentFixture<NebularCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
