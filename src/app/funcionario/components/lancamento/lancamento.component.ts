import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatListModule } from '@angular/material/list';

import { Type } from '../../../shared/models/type.enum';
import { LancamentoService } from '../../../shared/services/lancamento.service';
import { HttpUtilService } from '../../../shared/services/http-util.service';
import { Lancamento } from '../../../shared/models/lancamento.model';

@Component({
  selector: 'app-lancamento',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    RouterModule,
    MatSnackBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule
  ],
  templateUrl: './lancamento.component.html',
  styleUrls: ['./lancamento.component.css']
})
export class LancamentoComponent implements OnInit {

  dataAtual: string = '';
  dataAtualEn: string = '';
  geoLocation: string = '';
  ultimoTipoLancado: string = '';
  Tipo = Type;

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private lancamentoService: LancamentoService,
    private httpUtil: HttpUtilService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.atualizarDataHora();
    this.obterGeoLocation();
    this.obterUltimoLancamento();
    
    setInterval(() => {
      this.atualizarDataHora();
      this.cdr.detectChanges();
    }, 1000);
  }

  obterUltimoLancamento() {
    this.lancamentoService.buscarUltimoTipoLancado()
      .subscribe({
        next: (data: any) => {
          const tipo = (data.data && data.data.tipo) ? data.data.tipo : data.tipo;
          this.ultimoTipoLancado = tipo || '';
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          this.ultimoTipoLancado = '';
          this.cdr.detectChanges();
        }
      });
  }

  atualizarDataHora() {
    const data = new Date();
    this.dataAtual = data.toLocaleString('pt-BR');

    const ano = data.getFullYear();
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const hora = data.getHours().toString().padStart(2, '0');
    const min = data.getMinutes().toString().padStart(2, '0');
    const seg = data.getSeconds().toString().padStart(2, '0');

    this.dataAtualEn = `${ano}-${mes}-${dia} ${hora}:${min}:${seg}`;
  }

  obterGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.geoLocation = `${position.coords.latitude},${position.coords.longitude}`;
        this.cdr.detectChanges();
      });
    }
  }

  iniciarTrabalho() { this.cadastrar(Type.INICIO_TRABALHO); }
  terminarTrabalho() { this.cadastrar(Type.TERMINO_TRABALHO); }
  iniciarAlmoco() { this.cadastrar(Type.INICIO_ALMOCO); }
  terminarAlmoco() { this.cadastrar(Type.TERMINO_ALMOCO); }

  cadastrar(tipo: Type) {
    const lancamento: Lancamento = new Lancamento(
      this.dataAtualEn,
      tipo,
      this.geoLocation,
      this.httpUtil.obterIdUsuario()
    );

    this.lancamentoService.cadastrar(lancamento).subscribe({
      next: (data: any) => {
        const textoTipo = tipo.replace(/_/g, ' ');
        this.snackBar.open(`Ponto ${textoTipo} registrado com sucesso!`, "Sucesso", { duration: 3000 });
        
        this.ultimoTipoLancado = tipo;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        let msg: string = "Tente novamente em instantes.";
        if (err.status == 400) {
          msg = err.error.errors.join(' ');
        }
        this.snackBar.open(msg, "Erro", { duration: 5000 });
        this.cdr.detectChanges();
      }
    });
  }

  obterUrlMapa(): string {
    return "https://www.google.com/maps/search/?api=1&query=" + this.geoLocation;
  }

  exibirInicioTrabalho(): boolean {
    return this.ultimoTipoLancado == '' || this.ultimoTipoLancado == Type.TERMINO_TRABALHO;
  }

  exibirTerminoTrabalho(): boolean {
    return this.ultimoTipoLancado == Type.INICIO_TRABALHO || this.ultimoTipoLancado == Type.TERMINO_ALMOCO;
  }

  exibirInicioAlmoco(): boolean {
    return this.ultimoTipoLancado == Type.INICIO_TRABALHO || this.ultimoTipoLancado == Type.TERMINO_ALMOCO;
  }

  exibirTerminoAlmoco(): boolean {
    return this.ultimoTipoLancado == Type.INICIO_ALMOCO;
  }
}