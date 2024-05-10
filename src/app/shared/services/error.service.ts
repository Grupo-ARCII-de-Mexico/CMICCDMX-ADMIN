import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from '../tools/toast.service';
import { HttpErrorResponse } from '@angular/common/http';
import { LoadingService } from '../tools/loading.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private unsubscribe$ = new Subject<void>();
  constructor(
    private toast:ToastService,
    private loading:LoadingService
  ) { }


  async catchError(error:HttpErrorResponse){
  this.toast.setData({
      animated:true,
      color:error.status===409  ? 'warning' :'danger',
      message: error.status===409 ? 'Revisa tus credenciales' : 'Sucedió un error intente más tarde',
      duration:3000
    });
    await this.toast.create();
    await this.toast.show();
    this.unsubscribe$.next(); 
  }

  get next(){
    return this.unsubscribe$
  }
}
