import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CadastrarPfService } from './cadastrar-pf';

describe('CadastrarPjService', () => {
  let service: CadastrarPfService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ],
      providers: [
        CadastrarPfService
      ]
    });
    service = TestBed.inject(CadastrarPfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});