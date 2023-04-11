import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularDialogComponent } from './nebular-dialog.component';

describe('NebularDialogComponent', () => {
  let component: NebularDialogComponent;
  let fixture: ComponentFixture<NebularDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NebularDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
