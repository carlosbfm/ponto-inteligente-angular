import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment as env} from '../../../../environments/environment';

import { Login } from '../models/login.model';

@Injectable({
  providedIn: 'root' 
})
export class LoginService {

  private http = inject(HttpClient); // Injeção de dependência moderna
  private readonly PATH: string = 'auth';

  constructor() { }

  logar(login: Login): Observable<any> {
    // Monta a URL: http://localhost:8080/api/auth
    return this.http.post(env.baseApiUrl + this.PATH, login);
  }
}

export { Login };
