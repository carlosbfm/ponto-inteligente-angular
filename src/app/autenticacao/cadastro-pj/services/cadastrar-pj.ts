import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CadastroPj } from '../models';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastrarPjService {

  private readonly API_URL = `${environment.baseApiUrl}/cadastrar-pj`;

  constructor(private http: HttpClient) { }

  cadastrar(cadastroPj: CadastroPj): Observable<any> {
    return this.http.post(this.API_URL, cadastroPj);
  }
}