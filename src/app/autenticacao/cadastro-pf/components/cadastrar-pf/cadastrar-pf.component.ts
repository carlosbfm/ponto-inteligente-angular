import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { SharedModule } from '../../../../shared/shared-module';
import { cpfValidator } from '../../../../shared/validators/cpf.validator';
import { CadastroPfComponent} from '../../cadastro-pf.component';
import { CadastroPf } from '../../models/cadastro-pf.models';
import { CadastrarPfService } from '../../services';

@Component({
  selector: 'app-cadastrar-pf',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule
  ],
  templateUrl: './cadastrar-pf.html',
  styleUrls: ['./cadastrar-pf.css'],
})
export class CadastrarPf implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastrarPfService:  CadastrarPfService
  ) {}

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, cpfValidator()]]
    });
  }

  cadastrarPf() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cadastroPf: CadastroPf = this.form.value;
    console.log(cadastroPf);

    this.cadastrarPfService.cadastrar(cadastroPf).subscribe({
      next: (data) => {
        console.log(JSON.stringify(data));
        const msg = "Realize o login para acessar o sistema.";
        this.snackBar.open(msg, "Sucesso", { duration: 5000 });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log(JSON.stringify(err));
        let msg = "Tente novamente em instantes.";

        if (err.status == 400) {
          msg = err.error.errors.join(' ');
        }

        this.snackBar.open(msg, "Erro", { duration: 5000 });
      }
      
      });
  }
}