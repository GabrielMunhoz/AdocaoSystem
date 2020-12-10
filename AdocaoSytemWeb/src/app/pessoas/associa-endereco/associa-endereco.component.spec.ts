import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociaEnderecoComponent } from './associa-endereco.component';

describe('AssociaEnderecoComponent', () => {
  let component: AssociaEnderecoComponent;
  let fixture: ComponentFixture<AssociaEnderecoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociaEnderecoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociaEnderecoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
