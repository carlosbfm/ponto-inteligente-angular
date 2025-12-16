import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) return null;

    const cnpj = value.toString().replace(/\D/g, '');

    if (cnpj.length !== 14 || /^(\d)\1+$/.test(cnpj)) {
      return { cnpjInvalido: true };
    }

    const validarDigito = (tamanho: number) => {
      const slice = cnpj.slice(0, tamanho);
      let fator = tamanho - 7;
      let soma = 0;

      for (let i = tamanho; i >= 1; i--) {
        const digito = slice[tamanho - i];
        soma += parseInt(digito) * fator--;
        if (fator < 2) fator = 9;
      }

      const resultado = 11 - (soma % 11);
      return resultado > 9 ? 0 : resultado;
    };

    const digito1 = validarDigito(12);
    const digito2 = validarDigito(13);

    if (digito1 !== parseInt(cnpj.charAt(12)) || digito2 !== parseInt(cnpj.charAt(13))) {
      return { cnpjInvalido: true };
    }

    return null;
  };
}