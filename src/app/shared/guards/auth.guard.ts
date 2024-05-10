import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { GenericService } from '../services/generic-service';
import { environment } from 'src/environments/environment';
import { NavController } from '@ionic/angular';
import { Auth, AuthRepository } from '../repos/auth.repository';
import { AutenticarToken } from '../tools/autenticadorToken';
import { ErrorService } from '../services/error.service';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticationGuard implements CanActivate {
  private first: boolean = true;
  constructor(
    private userRepo: AuthRepository,
    private genericService:GenericService,
    private nav:NavController, 
    private errorService:ErrorService ) {}
  canActivate(route: ActivatedRouteSnapshot,): boolean {

    if(localStorage.getItem(environment.jwt)) {
       if(AutenticarToken(localStorage.getItem(environment.jwt) || '') && this.first){
        this.genericService.getAll<Auth>('user/me').pipe(
          catchError((error) => {
            this.errorService.catchError(error);
            return of(error)
          }),
          tap( (user:Auth) => {
            this.userRepo.setUser([user]);
          })
        ).subscribe()
        return true; 
       }
       return false;
     }
     this.nav.navigateForward('/website');
     return false;


  }



}