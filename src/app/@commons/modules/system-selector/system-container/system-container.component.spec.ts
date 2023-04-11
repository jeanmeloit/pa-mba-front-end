import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemContainerComponent } from './system-container.component';

describe('SystemContainerComponent', () => {
  let component: SystemContainerComponent;
  let fixture: ComponentFixture<SystemContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SystemContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
