import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

// Imports do Material
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; // Importante para as mensagens

import { Login } from './models/login.model'; // Importando modelo
import { LoginService } from './services/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatFormFieldModule, 
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Injeção de dependência moderna
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private loginService = inject(LoginService);

  form!: FormGroup; // O '!' diz que vamos inicializar isso depois (no ngOnInit)

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  logar() {
    if (this.form.invalid) {
      this.snackBar.open("Dados inválidos", "Erro", { duration: 5000 });
      return;
    }

    const login:Login = this.form.value;// adiciona os dados do form na class login

    this.loginService.logar(login).subscribe({
     next: (data) => {
        const token = data['data']['token'];
        localStorage.setItem('token', token);

        const dadosUsuarioCodificados = token.split('.')[1];
        const dadosUsuarioJson = atob(dadosUsuarioCodificados);
        const usuarioData = JSON.parse(dadosUsuarioJson);

        this.snackBar.open("Login realizado com sucesso!", "OK", { duration: 3000 });

        if (usuarioData['role'] === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/funcionario']);
        }
      },
      error: (err) => {
        console.log('Erro:', err);
        this.snackBar.open("Erro ao logar. Tente novamente.", "Erro", { duration: 5000 });
      }
    });
  }
}




