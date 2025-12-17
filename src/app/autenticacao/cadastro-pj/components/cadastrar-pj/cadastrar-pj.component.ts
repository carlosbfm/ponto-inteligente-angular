import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule } from '@angular/router';
import { CadastroPj } from '../../models';
import { SharedModule } from '../../../../shared/shared-module';
import { cpfValidator } from '../../../../shared/validators/cpf.validator';
import { cnpjValidator } from '../../../../shared/validators/cnpj.validator';
import { CadastrarPjService } from '../../services';

@Component({
  selector: 'app-cadastrar-pj',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatTooltipModule,
    MatIconModule,
    MatSnackBarModule,
    SharedModule,
  ],
  templateUrl: './cadastrar-pj.html',
  styleUrls: ['./cadastrar-pj.css'],
})
export class CadastrarPj implements OnInit {

  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private cadastraPjService : CadastrarPjService
  ) {}

  ngOnInit(): void {
    this.gerarForm();
  }

  gerarForm() {
    this.form = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      cpf: ['', [Validators.required, cpfValidator()]],
      razaoSocial: ['', [Validators.required, Validators.minLength(5)]],
      cnpj: ['', [Validators.required, cnpjValidator()]]
    });
  }

  cadastrarPj() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const cadastroPj: CadastroPj = this.form.value;

    this.cadastraPjService.cadastrar(cadastroPj).subscribe({
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