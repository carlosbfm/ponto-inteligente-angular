import { Routes } from '@angular/router';
import { LoginComponent } from './autenticacao/login/login.component';
import { CadastroPjComponent } from './autenticacao/cadastro-pj/cadastro-pj.component';
import { CadastroPfComponent } from './autenticacao/cadastro-pf/cadastro-pf.component';
import { CadastrarPj } from './autenticacao/cadastro-pj/components/cadastrar-pj/cadastrar-pj.component';
import { CadastrarPf } from './autenticacao/cadastro-pf/components/cadastrar-pf/cadastrar-pf.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'cadastro-pj',
    component: CadastroPjComponent,
    children: [
      { path: '', component: CadastrarPj }
    ]
  },
  {
    path: 'cadastro-pf',
    component: CadastroPfComponent,
    children: [
      { path: '', component: CadastrarPf }
    ]
  }
];