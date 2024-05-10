import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarBolsaPage } from './editar-bolsa.page';

describe('EditarBolsaPage', () => {
  let component: EditarBolsaPage;
  let fixture: ComponentFixture<EditarBolsaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditarBolsaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
