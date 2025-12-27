import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';
import { Sort, MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { LancamentoService } from '../../../shared/services/lancamento.service';
import { Lancamento } from '../../../shared/models/lancamento.model';
import { Funcionario } from '../../../shared/models/funcionario.model';
import { HttpUtilService } from '../../../shared/services/http-util.service';
import { FuncionarioService } from '../../../shared/services/funcionario.service';
import { TypePipe } from '../../../shared/pipes/type.pipe'; 

@Component({
  selector: 'confirmar-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  template: `
    <h1 mat-dialog-title>Deseja realmente remover o lançamento?</h1>
    <div mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="false">Não</button>
      <button mat-button color="warn" [mat-dialog-close]="true">Sim</button>
    </div>
  `,
})
export class ConfirmarDialog {
  constructor(public dialogRef: MatDialogRef<ConfirmarDialog>) {}
}

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatTooltipModule,
    TypePipe
  ]
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento> = new MatTableDataSource<Lancamento>();
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];
  funcionarioId!: string;
  totalLancamentos: number = 0;

  funcionarios: Funcionario[] = []; 
  form!: FormGroup;

  pagina: number = 0;
  qtdPorPagina: number = 5; 

  private ordem: string = 'data';
  private direcao: string = 'DESC';

  constructor(
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private funcionarioService: FuncionarioService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pagina = 0;
    this.ordemPadrao();
    this.gerarForm();
    this.obterFuncionarios();
  }

  gerarForm() {
    this.form = this.fb.group({
      funcs: ['', []]
    });
  }

  ordemPadrao() {
    this.ordem = 'data';
    this.direcao = 'DESC';
  }

  get funcId(): string {
    return sessionStorage['funcionarioId'] || '';
  }

  obterFuncionarios() {
    this.funcionarioService.listarFuncionariosPorEmpresa()
      .subscribe({
        next: (data) => {
          const usuarioId: string = this.httpUtil.obterIdUsuario();
          
          this.funcionarios = (data.data as Funcionario[])
            .filter(func => func.id != usuarioId);
          
          if (this.funcId) {
            this.form.get('funcs')?.setValue(parseInt(this.funcId, 10));
            this.exibirLancamentos();
          }
          
          this.cdr.detectChanges(); 
        },
        error: (err) => {
          const msg: string = "Erro obtendo funcionários.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

  exibirLancamentos() {
    if (this.form.get('funcs')?.value) {
      this.funcionarioId = this.form.get('funcs')?.value;
    } else if (this.funcId) {
      this.funcionarioId = this.funcId;
    } else {
      return;
    }

    sessionStorage['funcionarioId'] = this.funcionarioId;
    
    
    this.lancamentoService.listarLancamentosPorFuncionario(
        this.funcionarioId, 
        this.pagina, 
        this.qtdPorPagina,
        this.ordem, 
        this.direcao
      )
      .subscribe({
        next: (data) => {
          this.totalLancamentos = data['data'].totalElements;
          const lancamentos = data['data'].content as Lancamento[];
          this.dataSource.data = lancamentos;
          this.cdr.detectChanges();
        },
        error: (err) => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

  paginar(pageEvent: PageEvent) {
    this.pagina = pageEvent.pageIndex;
    this.qtdPorPagina = pageEvent.pageSize;
    this.exibirLancamentos();
  }

  ordenar(sort: Sort) {
    if (sort.direction == '') {
      this.ordemPadrao();
    } else {
      this.ordem = sort.active;
      this.direcao = sort.direction.toUpperCase();
    }
    this.exibirLancamentos();
  }

  removerDialog(lancamentoId: string) {  
    const dialogRef = this.dialog.open(ConfirmarDialog, {});

    dialogRef.afterClosed().subscribe(remover => {
      if (remover) {
        this.remover(lancamentoId);
      }
    });
  }

  remover(lancamentoId: string) {
    this.lancamentoService.remover(lancamentoId)
      .subscribe({
        next: (data) => {
          const msg: string = "Lançamento removido com sucesso!";
          this.snackBar.open(msg, "Sucesso", { duration: 5000 });
          this.exibirLancamentos();
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
}