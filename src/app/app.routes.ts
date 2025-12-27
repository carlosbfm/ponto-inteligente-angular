import { Routes } from '@angular/router';
import { adminGuard } from './admin/services/admin-guard';
import { authGuard } from './shared/services/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./autenticacao/login/login.component').then(m => m.LoginComponent) 
  },
  {
    path: 'cadastro-pj',
    loadComponent: () => import('./autenticacao/cadastro-pj/cadastro-pj.component').then(m => m.CadastroPjComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./autenticacao/cadastro-pj/components/cadastrar-pj/cadastrar-pj.component').then(m => m.CadastrarPj) 
      }
    ]
  },
  {
    path: 'cadastro-pf',
    loadComponent: () => import('./autenticacao/cadastro-pf/cadastro-pf.component').then(m => m.CadastroPfComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./autenticacao/cadastro-pf/components/cadastrar-pf/cadastrar-pf.component').then(m => m.CadastrarPf) 
      }
    ]
  },
  {
    path: 'funcionario',
    canActivate: [authGuard],
    loadComponent: () => import('./funcionario/funcionario.component').then(m => m.FuncionarioComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./funcionario/components/lancamento/lancamento.component').then(m => m.LancamentoComponent) 
      }, 
      { 
        path: 'listagem', 
        loadComponent: () => import('./funcionario/components/listagem/listagem.component').then(m => m.ListagemComponent) 
      },
      { 
        path: 'lancamento', 
        loadComponent: () => import('./funcionario/components/lancamento/lancamento.component').then(m => m.LancamentoComponent) 
      }
    ]
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    children: [
      { 
        path: '', 
        loadComponent: () => import('./admin/components/listagem/listagem.component').then(m => m.ListagemComponent) 
      },
      { 
        path: 'cadastro', 
        loadComponent: () => import('./admin/components/cadastro/cadastro.component').then(m => m.CadastroComponent) 
      },
      { 
        path: 'atualizacao/:lancamentoId', 
        loadComponent: () => import('./admin/components/atualizacao/atualizacao.component').then(m => m.AtualizacaoComponent) 
      }
    ]
  }
];