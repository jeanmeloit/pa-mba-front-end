import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseFilesComponent } from './choose-files.component';

describe('ChooseFilesComponent', () => {
  let component: ChooseFilesComponent;
  let fixture: ComponentFixture<ChooseFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
