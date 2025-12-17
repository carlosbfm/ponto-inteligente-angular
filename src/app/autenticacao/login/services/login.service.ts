import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment as env} from '../../../../environments/environment';
import { Login } from '../models/login.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' 
})
export class LoginService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private readonly PATH: string = '/auth';


  private usuarioLogadoSubject = new BehaviorSubject<boolean>(this.temToken());

  constructor() { }

  get usuarioLogado$(): Observable<boolean> {
    return this.usuarioLogadoSubject.asObservable();
  }

  logar(login: Login): Observable<any> {
    return this.http.post(env.baseApiUrl + this.PATH, login);
  }

  notificarLoginSucesso() {
    this.usuarioLogadoSubject.next(true);
  }

  deslogar() {
    localStorage.clear();
    window.location.href = '/';
  }

  private temToken(): boolean {
    if (typeof localStorage !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }
}

export { Login };