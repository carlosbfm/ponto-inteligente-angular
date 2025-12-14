import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SharedModule } from '../../shared/shared-module';


@Component({
  selector: 'app-cadastro-pj',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SharedModule
  ],
  
  styleUrl: './cadastro-pj.css',

  template: `
    <div class="container-pj">
      <h2 style="text-align: center;">Cadastro de Pessoa Jurídica</h2>
      <router-outlet></router-outlet>
    </div>
  `
})
export class CadastroPjComponent {

}
