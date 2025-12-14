import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPf } from './cadastrar-pf.component';

describe('CadastrarPf', () => {
  let component: CadastrarPf;
  let fixture: ComponentFixture<CadastrarPf>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarPf]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPf);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
