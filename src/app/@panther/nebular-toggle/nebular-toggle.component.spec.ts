import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularToggleComponent } from './nebular-toggle.component';

describe('NebularToggleComponent', () => {
  let component: NebularToggleComponent;
  let fixture: ComponentFixture<NebularToggleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularToggleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
