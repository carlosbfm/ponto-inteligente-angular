import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CadastroPf } from '../models/cadastro-pf.models';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CadastrarPfService {
  private readonly API_URL = `${environment.baseApiUrl}/cadastrar-pf`;
  
  constructor(private http : HttpClient){}

  cadastrar(cadastroPf : CadastroPf): Observable<any>{
    return this.http.post(this.API_URL, cadastroPf);
  }

}
