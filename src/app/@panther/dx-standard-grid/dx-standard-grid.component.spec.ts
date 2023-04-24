import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DxStandardGridComponent } from './dx-standard-grid.component';

describe('DxStandardGridComponent', () => {
  let component: DxStandardGridComponent;
  let fixture: ComponentFixture<DxStandardGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxStandardGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxStandardGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
