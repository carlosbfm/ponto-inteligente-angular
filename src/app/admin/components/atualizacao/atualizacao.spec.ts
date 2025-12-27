import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizacaoComponent } from './atualizacao.component';

describe('Atualizacao', () => {
  let component: AtualizacaoComponent;
  let fixture: ComponentFixture<AtualizacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizacaoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AtualizacaoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
