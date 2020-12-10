import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacoesAdocaoComponent } from './informacoes-adocao.component';

describe('InformacoesAdocaoComponent', () => {
  let component: InformacoesAdocaoComponent;
  let fixture: ComponentFixture<InformacoesAdocaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacoesAdocaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacoesAdocaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
