import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NebularSearchInputComponent } from './nebular-search-input.component';

describe('NebularSearchInputComponent', () => {
  let component: NebularSearchInputComponent;
  let fixture: ComponentFixture<NebularSearchInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NebularSearchInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NebularSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
