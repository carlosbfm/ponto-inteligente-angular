import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPj } from './cadastrar-pj.component';

describe('CadastrarPj', () => {
  let component: CadastrarPj;
  let fixture: ComponentFixture<CadastrarPj>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarPj]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPj);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
