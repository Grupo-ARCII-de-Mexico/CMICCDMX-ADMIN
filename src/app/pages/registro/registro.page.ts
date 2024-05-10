import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Auth } from 'src/app/shared/repos/auth.repository';
import { ErrorService } from 'src/app/shared/services/error.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastService } from 'src/app/shared/tools/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  registerForm!:FormGroup;

  constructor(
    private fb:FormBuilder,
    private loading:LoadingService,
    private toast:ToastService,
    private genericService:GenericService,
    private errorService:ErrorService,
    private navController:NavController
  ) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      names:[null,Validators.required],
      email:[null,Validators.required],
      password:[null,Validators.required]
    });
    this.loading.setData({
      animated:true,
      backdropDismiss:false,
      message:'Iniciando Sesión',
      spinner:'crescent'
    });
  }

  async register(){
    await this.loading.create();
    await this.loading.show();
    this.genericService.post<{user:Auth,jwt:string}>('user',this.registerForm.value).pipe(
      catchError(async (error) => {
        await this.errorService.catchError(error)
        return {user:{names:''},jwt:'undefined'}; 
      }),
      takeUntil(this.errorService.next),
      tap(async ({user,jwt}) => {
        this.toast.setData({
          message:'Bienvenido: ' + user.names,
          duration:3000,
          color:'success'
        });
        await this.loading.show();
        localStorage.setItem(environment.jwt,jwt);
        this.navController.navigateForward("/dashboard",{animated:true});
      }) 
    ).subscribe();

  }

}
