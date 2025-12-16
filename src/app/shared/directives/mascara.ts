import { Directive, HostListener, Input, ElementRef, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Directive({
  selector: '[mascara]',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MascaraDirective),
    multi: true
  }]
})
export class MascaraDirective implements ControlValueAccessor {

  @Input('mask') mascara: string = '';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(private el: ElementRef) { }

  writeValue(value: any) {
    if (value) {
      this.el.nativeElement.value = this.aplicarMascara(String(value));
    } else {
      this.el.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  @HostListener('input', ['$event'])
  onInput($event: any) {
    const input = $event.target;
    let valor = input.value.replace(/\D/g, '');
    const valorMascarado = this.aplicarMascara(valor);
    
    input.value = valorMascarado;
    this.onChange(valor);
  }

  @HostListener('blur', ['$event'])
  onBlur($event: any) {
    this.onTouched();
    
    const valor = $event.target.value.replace(/\D/g, '');
    const mascaraLimpa = this.mascara.replace(/\D/g, '');

    if (valor.length < mascaraLimpa.length && valor.length > 0) {
      this.onChange('');
      $event.target.value = '';
    }
  }

  aplicarMascara(valor: string): string {
    if (!valor) return '';
    
    valor = valor.replace(/\D/g, '');
    const pad = this.mascara.replace(/\D/g, '').replace(/9/g, '_');
    
    if (valor.length > pad.length) {
      valor = valor.substring(0, pad.length);
    }

    const valorMask = valor + pad.substring(0, pad.length - valor.length);
    let valorMaskPos = 0;
    let resultado = '';
    
    for (let i = 0; i < this.mascara.length; i++) {
      if (isNaN(parseInt(this.mascara.charAt(i), 10))) {
        resultado += this.mascara.charAt(i);
      } else {
        resultado += valorMask[valorMaskPos++];
      }
    }

    if (resultado.indexOf('_') > -1) {
      resultado = resultado.substring(0, resultado.indexOf('_'));
    }

    return resultado;
  }
}