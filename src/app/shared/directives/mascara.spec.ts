import { ElementRef } from '@angular/core';
import { MascaraDirective } from './mascara';

describe('MascaraDirective', () => {
  it('should create an instance', () => {
    const inputMock = document.createElement('input');
    const elRefMock = new ElementRef(inputMock);
    
    const directive = new MascaraDirective(elRefMock);
    
    expect(directive).toBeTruthy();
  });
});