import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Validators } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { SliderRepository } from 'src/app/shared/repos/slider.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {

 
  editar:boolean = false;
  uri = environment.image + 'sliders/';
  sliderForm!:FormGroup;
  image:any;
  identificador!:number;
  constructor(
    private fb:FormBuilder,
    private compress:CompressImageService,
    private sliderRepo:SliderRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController,
    private modalC:ModalController
  ) { }

  ngOnInit() {
    this.sliderForm = this.fb.group({
      texto:[null],
      uri:[null],
      button:[null]
    })
    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.identificador ?? 0) 
        return this.sliderRepo.slider$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const find = res.find((a:any) => a.id === this.identificador);
      this.sliderForm.setValue({
        texto:find.texto,
        uri:find.uri,
        button:find.button
      })
      this.image = this.uri + find.imagen;
      this.editar=true
     }
    })
  }

  async addImage(){
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

  async save(){
    if(this.editar){
      return this.edit();
    }
    const form = new FormData()
    if(this.image){
      form.append('imagen', this.compress.dataURItoBlob(this.image))
    }
    form.append('texto',this.sliderForm.controls['texto'].value);
    form.append('uri',this.sliderForm.controls['uri'].value);
    form.append('button',this.sliderForm.controls['button'].value);
    this.genericS.post('sliders',form).subscribe((res:any) => {
      this.toast.success('Slider Creado');
      this.sliderRepo.addSlider(res);
      this.image=null;
      this.sliderForm.reset();
    })
  }


  edit(){
    const form = new FormData()
    if(this.image.includes('data:')){
      form.append('imagen', this.compress.dataURItoBlob(this.image));
    }
    form.append('texto',this.sliderForm.controls['texto'].value);
    form.append('uri',this.sliderForm.controls['uri'].value);
    form.append('button',this.sliderForm.controls['button'].value);
    this.genericS.updateWhitImage('sliders',this.identificador,form).subscribe((res:any) => {
      this.toast.success('Slider Actualizado');
      this.sliderRepo.updateSlider(this.identificador,res);
      this.image=null;
      this.sliderForm.reset();
      this.nav.navigateBack('/dashboard/website/slider-ver')
    })
  }

}
