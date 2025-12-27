import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule 
  ],
  template: `
    <h2 style="text-align: center; font-size: 30px;">Controle de Ponto - Admin</h2>
    <router-outlet></router-outlet>
  `
})
export class AdminComponent {
}