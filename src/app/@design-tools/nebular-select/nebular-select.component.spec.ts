import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularSelectComponent } from './nebular-select.component';

describe('NebularSelectComponent', () => {
  let component: NebularSelectComponent;
  let fixture: ComponentFixture<NebularSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
