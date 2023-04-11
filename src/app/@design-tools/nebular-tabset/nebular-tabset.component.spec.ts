import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularTabsetComponent } from './nebular-tabset.component';

describe('NebularTabsetComponent', () => {
  let component: NebularTabsetComponent;
  let fixture: ComponentFixture<NebularTabsetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NebularTabsetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularTabsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
