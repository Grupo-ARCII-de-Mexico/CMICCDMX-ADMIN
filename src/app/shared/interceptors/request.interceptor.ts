import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { GenericService } from '../services/generic-service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    private Autorization:string = 'Authorization';
    private Bearer:string='Bearer '

    constructor(private auth:GenericService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.url.includes('www.gravatar.com') ||req.url.includes('google') ){
            return next.handle(req)
        }
        if(req.url.includes('https://bolsadetrabajo.cmicservicios.com/') ){
            return next.handle(req)
        }

      
        if(!localStorage.getItem(environment.jwt)){
            return next.handle(req)
        }
        req= req.clone({headers: req.headers.set(this.Autorization,this.Bearer+localStorage.getItem(environment.jwt))});
        return next.handle(req).pipe( catchError( (err:HttpErrorResponse) => {

            if(err.status == 401){
                return this.auth.post('user/refresh',localStorage.getItem(environment.jwt) || "").pipe( concatMap ( (data:any) => {
                    localStorage.setItem(environment.jwt,data.refreshToken)
                    req= req.clone({headers: req.headers.set(this.Autorization,this.Bearer+localStorage.getItem(environment.jwt))});
                    return next.handle(req);
                }) )
            }else{
                return throwError(err);
            }

        } ) )
    }
}