import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-funcionario',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  template: `
  <h2 style="text-align: center; font-size: 30px;">Controle de Ponto</h2>
  <router-outlet></router-outlet>
`
})
export class FuncionarioComponent {}