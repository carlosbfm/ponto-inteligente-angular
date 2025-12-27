import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpUtilService } from './http-util.service';

export const authGuard: CanActivateFn = (route, state) => {
  const httpUtilService = inject(HttpUtilService);
  const router = inject(Router);
  const snackBar = inject(MatSnackBar);

  if (httpUtilService.obterDadosUsuario()) {
    return true;
  }

  snackBar.open('Por favor, faça o login', 'Erro', {
    duration: 5000,
    verticalPosition: 'top',
    horizontalPosition: 'right'
  });

  router.navigate(['/login']);
  return false;
};