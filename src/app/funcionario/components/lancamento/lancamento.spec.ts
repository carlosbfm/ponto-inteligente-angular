import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LancamentoComponent } from './lancamento.component';

describe('Lancamento', () => {
  let component: LancamentoComponent;
  let fixture: ComponentFixture<LancamentoComponent
  >;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LancamentoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LancamentoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
