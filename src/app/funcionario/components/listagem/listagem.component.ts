import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { LancamentoService } from '../../../shared/services/lancamento.service';
import { Lancamento } from '../../../shared/models/lancamento.model';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TypePipe } from '../../../shared/pipes/type-pipe';

@Component({
  selector: 'app-listagem',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TypePipe
  ],
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.css']
})
export class ListagemComponent implements OnInit {

  dataSource: MatTableDataSource<Lancamento>;
  colunas: string[] = ['data', 'tipo', 'localizacao', 'acao'];


  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(
    private lancamentoService: LancamentoService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new MatTableDataSource<Lancamento>();
  }

  ngOnInit() {
    this.lancamentoService.listarTodosLancamentos()
      .subscribe({
        next: (data: any) => {
          const lancamentos = data.data?.content || data.data || data;
          this.dataSource.data = lancamentos as Lancamento[];
          
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        error: (err: any) => {
          const msg: string = "Erro obtendo lançamentos.";
          this.snackBar.open(msg, "Erro", { duration: 5000 });
        }
      });
  }

  alternarVisualizacao(lancamento: any) {
    lancamento.escondido = !lancamento.escondido;
    
    if (lancamento.escondido) {
      console.log('Escondeu o lançamento do dia:', lancamento.data);
    } else {
      console.log('Visualizando o lançamento do dia:', lancamento.data);
    }
  }
  
}