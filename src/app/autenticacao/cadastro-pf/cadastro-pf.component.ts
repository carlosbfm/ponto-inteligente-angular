import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-cadastro-pf',
  standalone:true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  styleUrl: './cadastro-pf.css',

   template:
  `
    <div class="container-pf">
      <h2 style="text-align: center;">Cadastro de Pessoa Física</h2>
      <router-outlet></router-outlet>
    </div>
  `
})
export class CadastroPfComponent {

}
