import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MascaraDirective } from './directives/mascara';

@NgModule({
  imports: [
    CommonModule,
    MascaraDirective
  ],
  exports: [
    MascaraDirective
  ]
})
export class SharedModule { }