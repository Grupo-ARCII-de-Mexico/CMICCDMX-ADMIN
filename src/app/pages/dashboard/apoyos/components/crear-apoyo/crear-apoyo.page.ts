import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Editor, Toolbar, Validators, toHTML } from 'ngx-editor';
import { image } from 'ngx-editor/schema/nodes';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-apoyo',
  templateUrl: './crear-apoyo.page.html',
  styleUrls: ['./crear-apoyo.page.scss'],
})
export class CrearApoyoPage implements OnInit {
//identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
editor!:Editor
toolbar: Toolbar = [
  // default value
  [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
  ['bold', 'italic'],
  ['underline', 'strike'],
  ['ordered_list', 'bullet_list'],
  ['align_left', 'align_center', 'align_right', 'align_justify'],
  ['horizontal_rule', 'format_clear'],
  ['text_color', 'background_color'],
];

form!:FormGroup
imagen:any;
uri:string = environment.image+'apoyos-dn/'
  constructor(
    private gService:GenericService,
    private compress:CompressImageService,
    private fb:FormBuilder,
    private load:LoadingService,
    private toast:ToastrService,
    private params:ActivatedRoute,
    private apoyosR:ApoyosRepository,
    private nav:NavController,
    private modalC:ModalController
  ) { }
identificador!:number;
  ngOnInit() {
    this.form = this.fb.group({
        titulo:[null,Validators.required],
        descripcion:[null,Validators.required],
    });
    this.editor = new Editor();

    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.identificador ?? 0) 
        return this.apoyosR.user$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const find = res.find((a:any) => a.id === this.identificador);
      this.form.setValue({
        titulo:find.titulo,
        descripcion:find.descripcion
      })
      this.imagen = this.uri + find.imagen;
      
     }
    })
  }

  async getImage(){
    this.imagen = await this.compress.returnImageCompress();
    const modal = await this.modalC.create({
      component:CropperPage,
      animated:true,
      componentProps:{
        imageUrl:this.imagen
      }
     })
     modal.onDidDismiss().then(({data}) => {
       this.imagen = data ?? null
     })
     await modal.present();
  }

  async save(){
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Creando Apoyo...'
    })
    await this.load.create();
    await this.load.show();
    let html;
    if(typeof this.form.controls['descripcion'].value !== 'string'){
      html = toHTML( this.form.controls['descripcion'].value);
    }else{
      html = this.form.controls['descripcion'].value;
    }
    this.form.controls['descripcion'].setValue(html);
    const formData = new FormData();
    for (const key in  this.form.value) {
      if (this.form.value.hasOwnProperty(key)) {
        if(key !== 'costos'){
          formData.append(key, this.form.value[key]);
        }
      }
    }
    if(this.imagen){
      formData.append('imagen', this.compress.dataURItoBlob(this.imagen));
    }
    const identificador = this.form.controls['titulo'].value.replace(/ /g, '-')
    formData.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    this.gService.post<any>('desastres',formData).subscribe(async (res) => {
     this.imagen = null;
     this.form.reset({

     })
     await this.load.hide();
     this.toast.success('Apoyo Guardado')
    })
    
  }

  async update(){
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Guardando Cambios...'
    })
    await this.load.create();
    await this.load.show();
    let html;
    if(typeof this.form.controls['descripcion'].value !== 'string'){
      html = toHTML( this.form.controls['descripcion'].value);
    }else{
      html = this.form.controls['descripcion'].value;
    }
    this.form.controls['descripcion'].setValue(html);
    const formData = new FormData();
    for (const key in  this.form.value) {
      if (this.form.value.hasOwnProperty(key)) {
        if(key !== 'imagen'){
          formData.append(key, this.form.value[key]);
        }
      }
    }
    
    if(this.imagen.includes('data:')){
      formData.append('imagen', this.compress.dataURItoBlob(this.imagen));
    }
    const identificador = this.form.controls['titulo'].value.replace(/ /g, '-')
    formData.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    this.gService.updateWhitImage<any>('desastres',this.identificador,formData).subscribe(async (res) => {
     this.imagen = null;
     this.form.reset({   
     })
     await this.load.hide();
     this.apoyosR.updateApoyo(this.identificador,res)
     this.toast.success('Apoyo Guardado')
     this.nav.navigateForward('/dashboard/apoyos')
    })
  }
}
