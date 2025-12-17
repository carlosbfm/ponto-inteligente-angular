import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Login } from './models/login.model';
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

  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private loginService = inject(LoginService);

  form!: FormGroup;

  emailBloqueado = true;
  senhaBloqueada = true;

  ngOnInit(): void {
    this.gerarForm();
 
    setTimeout(() => {
      this.form.reset();
      this.form.markAsPristine();
      this.form.markAsUntouched();
    }, 500); 
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

    const login: Login = this.form.value;

    this.loginService.logar(login).subscribe({
      next: (data: any) => {
        const token = data.data?.token || data.token || data['data']['token'];
        
        if (!token) {
           this.snackBar.open("Erro: Servidor não retornou o token.", "Erro", { duration: 5000 });
           return;
        }

        localStorage.setItem('token', token);

       
        this.loginService.notificarLoginSucesso();
        

        try {
          const dadosUsuarioCodificados = token.split('.')[1];
          const dadosUsuarioJson = atob(dadosUsuarioCodificados);
          const usuarioData = JSON.parse(dadosUsuarioJson);

          this.snackBar.open("Login realizado com sucesso!", "OK", { duration: 3000 });

          if (usuarioData['role'] === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/funcionario']);
          }
        } catch (e) {
          this.router.navigate(['/funcionario']);
        }
      },
      error: (err) => {
        console.log('Erro detalhado:', err);
        let msg = "Erro ao logar. Tente novamente.";

        if (err.status === 0) {
          msg = "Servidor fora do ar ou bloqueio de conexão.";
        } else if (err.status === 401 || err.status === 403) {
          msg = "Email ou senha incorretos.";
        } else if (err.error && err.error.message) {
            msg = err.error.message;
        }

        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
    });
  }
}