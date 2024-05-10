import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Editor, Toolbar, Validators, toHTML } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { BolsaTrabajo, BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-bolsa',
  templateUrl: './crear-bolsa.page.html',
  styleUrls: ['./crear-bolsa.page.scss'],
})
export class CrearBolsaPage implements OnInit {
  uri: string = environment.image + 'bolsa-trabajo-logos/'
  edit:boolean = false;
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
  constructor(
    private fb : FormBuilder,
    private toast:ToastrService,
    private load:LoadingService,
    private bolsaRepo:BolsaTrabajoRepository,
    private genericService:GenericService,
    private activeParams:ActivatedRoute,
    private nav:NavController,
    private compressService:CompressImageService,
    private modalC:ModalController
  ) { }
identificador!: string;
bolsaForm!:FormGroup;
imagen:any;
  ngOnInit() {
    this.editor = new Editor();
    this.bolsaForm = this.fb.group({
      descripcion:[null,Validators.required],
      titulo:[null,Validators.required],
      espacio:[null,Validators.required],
      tipoContratacion:[null,Validators.required],
      vigencia:[null,Validators.required],
      estado:[null,Validators.required],
      municipio:[null,Validators.required],
      delegacion:[null],
      mostrarSalario:[false,Validators.required],
      puestoDeseado:[null,Validators.required],
      escolaridad:[null,Validators.required],
      edad:[null,Validators.required],
      estadoCivil:[null,Validators.required],
      salario:[null,Validators.required],
      tareas:[null,Validators.required],
      prestaciones:[null,Validators.required],
    })
    this.activeParams.params.pipe(
      switchMap( (res:any) =>{
        this.identificador=res.identificador;
        if(res.identificador){
          this.edit=true
        }
        return this.bolsaRepo.BolsaTrabajo$
      }
      ),
      tap( bolsas => {
        if(this.edit){
          const find = bolsas.find((l) => l.id === Number(this.identificador))
          if(find){
            this.imagen = find.foto
            this.bolsaForm.setValue({
              descripcion:find.descripcion,
              titulo:find.titulo,
              espacio:find.espacio,
              tipoContratacion:find.tipoContratacion,
              vigencia:find.vigencia,
              estado:find.estado,
              municipio:find.municipio,
              delegacion:find.delegacion,
              mostrarSalario:find.mostrarSalario,
              puestoDeseado:find.puestoDeseado,
              escolaridad:find.escolaridad,
              edad:find.edad,
              estadoCivil:find.estadoCivil,
              salario:find.salario,
              tareas:find.tareas,
              prestaciones:find.prestaciones,
            })
          }
        }
      
      })
    ).subscribe();

  }


  async save(){
    if(this.edit){
      await this.update();
      return
    }
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Creando Empleo...'
    })
    await this.load.create();
    await this.load.show();
    const form = new FormData();
    if(this.img){
      form.append('foto',this.compressService.dataURItoBlob(this.img))
    }
    for (var clave in this.bolsaForm.value) {
      if (this.bolsaForm.value.hasOwnProperty(clave)) {
        var valor = this.bolsaForm.value[clave];
        // Agregar la clave y el valor al formulario
        if(clave !== 'descripcion'){
          form.append(clave, valor);
        }
      }
    }
    let html;
    if(typeof this.bolsaForm.controls['descripcion'].value !== 'string'){
      html = toHTML( this.bolsaForm.controls['descripcion'].value);
    }else{
      html = this.bolsaForm.controls['descripcion'].value;
    }
    form.append('descripcion',html)
    this.genericService.post<BolsaTrabajo>('bolsa-trabajo',form).subscribe(async (res) => {

     this.bolsaForm.reset()
      this.bolsaRepo.addBolsaTrabajo(res);
     await this.load.hide();
     this.toast.success('Empleo Guardado')
     this.nav.navigateForward('/dashboard/bolsa-trabajo')
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
  const form = new FormData();
  if(this.img){
    form.append('foto',this.compressService.dataURItoBlob(this.img))
  }
  for (var clave in this.bolsaForm.value) {
    if (this.bolsaForm.value.hasOwnProperty(clave)) {
      var valor = this.bolsaForm.value[clave];
      // Agregar la clave y el valor al formulario
      if(clave !== 'descripcion'){
        form.append(clave, valor);
      }
    }
  }
  let html;
  if(typeof this.bolsaForm.controls['descripcion'].value !== 'string'){
    html = toHTML( this.bolsaForm.controls['descripcion'].value);
  }else{
    html = this.bolsaForm.controls['descripcion'].value;
  }
  form.append('descripcion',html)
  this.genericService.update<BolsaTrabajo>('bolsa-trabajo',Number(this.identificador),form).subscribe(async (res) => {

   this.bolsaForm.reset()
    this.bolsaRepo.updateBolsaTrabajo(Number(this.identificador),res);
   await this.load.hide();
   this.toast.success('Empleo Actualizada')
   this.nav.navigateForward('/dashboard/bolsa-trabajo')
  })
}
img:any;
async upload() {
  this.img = await this.compressService.returnImageCompress();
  const modal = await this.modalC.create({
    component:CropperPage,
    animated:true,
    componentProps:{
      imageUrl:this.img
    }
   })
   modal.onDidDismiss().then(({data}) => {
     this.img = data ?? null
   })
   await modal.present();
}


}
