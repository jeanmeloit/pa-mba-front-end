import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WrappedDxGridComponent } from './wrapped-dx-grid.component';

describe('WrappedDxGridComponent', () => {
  let component: WrappedDxGridComponent;
  let fixture: ComponentFixture<WrappedDxGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WrappedDxGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WrappedDxGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
