import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSelecaoComponent } from './lista-selecao.component';

describe('ListaSelecaoComponent', () => {
  let component: ListaSelecaoComponent;
  let fixture: ComponentFixture<ListaSelecaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaSelecaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSelecaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
