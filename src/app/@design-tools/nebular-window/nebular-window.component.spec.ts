import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularWindowComponent } from './nebular-window.component';

describe('NebularWindowComponent', () => {
  let component: NebularWindowComponent;
  let fixture: ComponentFixture<NebularWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularWindowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
