import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { HttpUtilService } from '../../shared/services/http-util.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const httpUtilService = inject(HttpUtilService);
  const router = inject(Router);

  if (httpUtilService.obterPerfil() === 'ROLE_ADMIN') {
    return true;
  }

  router.navigate(['/funcionario']);
  return false;
};