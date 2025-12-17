import { Component, OnInit, inject,  ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule, Router } from '@angular/router';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LoginService } from './autenticacao/login/services/login.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  private router = inject(Router);
  private loginService = inject(LoginService);
  private cdRef = inject(ChangeDetectorRef);

  
  estaLogado: boolean = false;

  ngOnInit(): void {
    this.loginService.usuarioLogado$.subscribe(logado => {
      
      this.estaLogado = logado;
      this.cdRef.detectChanges(); 

    });
  }

  autenticado(): boolean {
    return this.estaLogado;
  }

  sair() {
    this.loginService.deslogar();
    this.cdRef.detectChanges();
  }
}