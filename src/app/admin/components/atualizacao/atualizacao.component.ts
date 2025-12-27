import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { Lancamento } from '../../../shared/models/lancamento.model';
import { Type } from '../../../shared/models/type.enum';
import { LancamentoService } from '../../../shared/services/lancamento.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TypePipe } from '../../../shared/pipes/type.pipe';

@Component({
  selector: 'app-atualizacao',
  templateUrl: './atualizacao.component.html',
  styleUrls: ['./atualizacao.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TypePipe
  ]
})
export class AtualizacaoComponent implements OnInit {

  form!: FormGroup;
  horas: string[] = [];
  minutos: string[] = [];
  tipos: string[] = [];

  lancamentoId!: string;
  localizacao!: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.lancamentoId = this.route.snapshot.paramMap.get('lancamentoId') || '';
    
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    
    this.tipos = [
      Type.INICIO_TRABALHO, 
      Type.INICIO_ALMOCO,
      Type.TERMINO_ALMOCO,
      Type.TERMINO_TRABALHO
    ];

    this.gerarForm();
    this.obterDadosLancamento();
  }

  obterDadosLancamento() {
    this.lancamentoService.buscarPorId(this.lancamentoId)
      .subscribe({
        next: (dados) => {
          const data = dados.data.data; 
          this.form.patchValue({
             data: data.substr(0, 10),
             horas: data.substr(11, 2),
             minutos: data.substr(14, 2),
             tipo: dados.data.tipo
          });
          this.localizacao = dados.data.localizacao;
        },
        error: (err) => {
          const msg: string = "Erro obtendo lançamento";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
          this.router.navigate(['/admin']);
        }
      });
  }

  gerarListaNumeros(inicio: number, termino: number): string[] {
    const numeros: string[] = [];
    for (let i = inicio; i <= termino; i++) {
      let numero: string = i.toString();
      if (i < 10) {
        numero = "0" + numero;
      }
      numeros.push(numero);
    }
    return numeros;
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
    });
  }

  atualizar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    this.lancamentoService.atualizar(this.obterLancamento(dados))
      .subscribe({
        next: (data) => {
          const msg: string = "Lançamento atualizado com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.router.navigate(['/admin']);
        },
        error: (err) => {
          let msg: string = "Tente novamente em instantes.";
          if (err.status == 400) {
            msg = err.error.errors.join(' ');
          }
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

  obterLancamento(dados: any): Lancamento {
    const dataHora = `${dados.data} ${dados.horas}:${dados.minutos}:00`;
    
    return new Lancamento(
        dataHora, 
        dados.tipo, 
        this.localizacao,
        this.funcionarioId, 
        this.lancamentoId
      );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'] || '';
  }
}