import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CadastrarPjService } from './cadastro-pj'; 

describe('CadastrarPjService', () => {
  let service: CadastrarPjService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule 
      ],
      providers: [
        CadastrarPjService
      ]
    });
    service = TestBed.inject(CadastrarPjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});