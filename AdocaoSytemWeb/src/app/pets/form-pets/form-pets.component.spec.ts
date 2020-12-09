import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPetsComponent } from './form-pets.component';

describe('FormPetsComponent', () => {
  let component: FormPetsComponent;
  let fixture: ComponentFixture<FormPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormPetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
