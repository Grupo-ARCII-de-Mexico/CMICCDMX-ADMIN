import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { Auth, AuthRepository } from 'src/app/shared/repos/auth.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
})
export class UserPage implements OnInit {
  user!:Auth;
  uri=environment.image + 'users/';
  password!:string;
  password2!:string;
  nombre!:string;
  edit:boolean = false;
  constructor(
    private authRepo:AuthRepository,
    private gService:GenericService,
    private compress:CompressImageService,
    private load:LoadingService,
    private toast:ToastrService,
    private modalC:ModalController
  ) { }

  ngOnInit() {
    this.authRepo.user$.pipe(
      map( users => users[0]),
      filter(user => !!user),
      tap((user) => {
        this.user=user;
        this.nombre = user.names
      }),
    ).subscribe();
   
  }

  image:any;
  async img(){
    this.image = await this.compress.returnImageCompress();
    const modal = await this.modalC.create({
      component:CropperPage,
      animated:true,
      componentProps:{
        imageUrl:this.image
      }
     })
     modal.onDidDismiss().then(({data}) => {
       this.image = data ?? null
     })
     await modal.present();
  }

  async update(){
    if(this.password !== this.password2){
      this.toast.warning('Las contraseñas no coindicen');
      return
    }
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Actualizando...'
    })
    await this.load.create();
    await this.load.show();
    const formData = new FormData();
    if(this.password){
      formData.append('password', this.password);
    }
    if(this.nombre){
      formData.append('names', this.nombre);
    }
    if(this.image){
      formData.append('foto', this.compress.dataURItoBlob(this.image));
    }
    this.gService.updateToken('user',formData).subscribe(async (user:any) => {
      await this.load.hide();
      this.authRepo.updateUser(user.id,user);
      this.toast.success('Usuario actualizado')
      this.edit = false;
    })
  }

}
