import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DxBarChartComponent } from './dx-bar-chart.component';

describe('DxBarChartComponent', () => {
  let component: DxBarChartComponent;
  let fixture: ComponentFixture<DxBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DxBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DxBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
