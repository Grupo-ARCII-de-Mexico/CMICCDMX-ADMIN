import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { catchError, takeUntil, tap } from 'rxjs/operators';
import { Auth } from 'src/app/shared/repos/auth.repository';
import { ErrorService } from 'src/app/shared/services/error.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AutenticarToken } from 'src/app/shared/tools/autenticadorToken';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastService } from 'src/app/shared/tools/toast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!:FormGroup;
  viewPassword:boolean = false;
  constructor(
    private fb:FormBuilder,
    private loading:LoadingService,
    private toast:ToastService,
    private genericService:GenericService,
    private errorService:ErrorService,
    private navController:NavController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email:[null,Validators.required],
      password:[null,Validators.required]
    });
    this.loading.setData({
      animated:true,
      backdropDismiss:false,
      message:'Iniciando Sesión',
      spinner:'crescent'
    });
    if(localStorage.getItem(environment.jwt) ){
      if(AutenticarToken(localStorage.getItem(environment.jwt) || '' )){
        this.navController.navigateForward('/dashboard')
      }
      
    }
  }

  async login(){
    await this.loading.create();
    await this.loading.show();
    this.genericService.post<{user:Auth,jwt:string}>('user/login',this.loginForm.value).pipe(
      catchError(async (error) => {
        await this.errorService.catchError(error)
        await this.loading.hide();
        return {user:{names:''},jwt:'undefined'}; 
      }),
      takeUntil(this.errorService.next),
      tap(async ({user,jwt}) => {
        this.toast.setData({
          message:'Bienvenido: ' + user.names,
          duration:3000,
          color:'success'
        });
        await this.loading.hide();
        await this.toast.create();
        await this.toast.show();
        localStorage.setItem(environment.jwt,jwt);
        this.navController.navigateForward("/dashboard",{animated:true});
      }) 
    ).subscribe();

  }

}
