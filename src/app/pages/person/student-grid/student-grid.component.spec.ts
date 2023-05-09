import { ComponentFixture, TestBed } from '../../../../../types/@angular/core/testing';

import { StudentGridComponent } from './student-grid.component';

describe('StudentGridComponent', () => {
  let component: StudentGridComponent;
  let fixture: ComponentFixture<StudentGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
