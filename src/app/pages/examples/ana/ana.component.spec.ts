import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnaComponent } from './ana.component';

describe('AnaComponent', () => {
  let component: AnaComponent;
  let fixture: ComponentFixture<AnaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
