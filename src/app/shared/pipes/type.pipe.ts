import { Pipe, PipeTransform } from '@angular/core';
import { Type } from '../models/type.enum'; 

@Pipe({
  name: 'type', 
  standalone: true 
})
export class TypePipe implements PipeTransform {

  transform(tipo: Type | string): string {
    switch (tipo) {
      case 'INICIO_TRABALHO':
      case Type.INICIO_TRABALHO:
        return 'Início do trabalho';
        
      case 'INICIO_ALMOCO':
      case Type.INICIO_ALMOCO:
        return 'Início do almoço';
        
      case 'TERMINO_ALMOCO':
      case Type.TERMINO_ALMOCO:
        return 'Término do almoço';
        
      case 'TERMINO_TRABALHO':
      case Type.TERMINO_TRABALHO:
        return 'Término do trabalho';
        
      default:
        return tipo as string;
    }
  }
}