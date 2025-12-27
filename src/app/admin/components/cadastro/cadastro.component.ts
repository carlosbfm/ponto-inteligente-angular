import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importante para *ngIf, *ngFor
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Importante para formGroup
import { ActivatedRoute, Router, RouterModule } from '@angular/router'; // Importante para routerLink

// --- IMPORTS DO MATERIAL (Tudo que você usa no HTML) ---
import { MatFormFieldModule } from '@angular/material/form-field'; // Resolve o mat-error
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { Lancamento } from '../../../shared/models/lancamento.model';
import { Type } from '../../../shared/models/type.enum';
import { LancamentoService } from '../../../shared/services/lancamento.service';
import { TypePipe } from '../../../shared/pipes/type.pipe'; 

@Component({
  selector: 'app-cadastro',
  standalone: true, 
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSnackBarModule,
    TypePipe 
  ],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  form!: FormGroup;
  horas!: string[];
  minutos!: string[];
  tipos!: string[];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService
  ) { }

  ngOnInit() {
    this.gerarForm();
    this.horas = this.gerarListaNumeros(0, 23);
    this.minutos = this.gerarListaNumeros(0, 59);
    
    this.tipos = [
      Type.INICIO_TRABALHO, 
      Type.INICIO_ALMOCO,
      Type.TERMINO_ALMOCO,
      Type.TERMINO_TRABALHO
    ];
  }

  gerarForm() {
    this.form = this.fb.group({
      data: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      horas: ['', [Validators.required]],
      minutos: ['', [Validators.required]]
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

  cadastrar() {
    if (this.form.invalid) return;

    const dados = this.form.value;
    
    this.lancamentoService.cadastrar(this.obterLancamento(dados))
      .subscribe({
        next: () => {
          const msg: string = "Lançamento cadastrado com sucesso!";
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
    const data = new Date(dados.data);
    data.setHours(parseInt(dados.horas), parseInt(dados.minutos), 0, 0);

    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const hora = data.getHours().toString().padStart(2, '0');
    const minuto = data.getMinutes().toString().padStart(2, '0');
    const segundo = '00';

    const dataFormatada = `${ano}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
    
    return new Lancamento(
        dataFormatada, 
        dados.tipo, 
        '',
        this.funcionarioId
      );
  }

  get funcionarioId(): string {
    return sessionStorage['funcionarioId'];
  }
}