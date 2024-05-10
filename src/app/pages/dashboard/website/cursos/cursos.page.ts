import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { AuthRepository } from 'src/app/shared/repos/auth.repository';
import { CursoRepository } from 'src/app/shared/repos/curso.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  html:any
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
  editar:boolean = false;
  uri = environment.image + 'boletines/';
  sliderForm!:FormGroup;
  image:any;
  identificador!:number;
  constructor(
    private fb:FormBuilder,
    private compress:CompressImageService,
    private sliderRepo:CursoRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController,
    private modalC:ModalController,
    private loading:LoadingService
  ) { }
  name!:string;
  ngOnInit() {
    this.editor = new Editor();
    this.sliderForm = this.fb.group({
     titulo:[undefined],
    informacion:[undefined],
    precio:[undefined],
    tipo:[undefined],
    url:[undefined]
    })
    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.identificador ?? 0) 
        return this.sliderRepo.curso$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const find = res.find((a:any) => a.id === this.identificador);
      this.sliderForm.setValue({
        titulo:find.titulo,
        informacion:find.informacion,
        precio:find.precio,
        tipo:find.tipo,
        url:find.url
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
    await this.loading.setData({
      animated:true,
      message:'Guardando...'
    })
    await this.loading.create();
    await this.loading.show()
    if(this.editar){
      return this.edit();
    }
  
    const form = new FormData()
    if(this.image){
      form.append('imagen', this.compress.dataURItoBlob(this.image))
    }
    let html = '';
 
   if(this.sliderForm.controls['informacion'].value){
    if(typeof this.sliderForm.controls['informacion'].value !== 'string'){
      html = toHTML( this.sliderForm.controls['informacion'].value);
    }else{
      html = this.sliderForm.controls['informacion'].value;
    }
   }

    form.append('titulo',this.sliderForm.controls['titulo'].value);
    if(html){
      form.append('informacion',html);
    }
    form.append('precio',this.sliderForm.controls['precio'].value);
    form.append('tipo',this.sliderForm.controls['tipo'].value);
    form.append('url',this.sliderForm.controls['url'].value);
    const identificador = this.sliderForm.controls['titulo'].value.replace(/ /g, '-')
    form.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    this.genericS.post('cursos',form).subscribe(async (res:any) => {
      this.toast.success('Curso Creado');
      this.sliderRepo.addCurso(res);
      this.image=null;
      this.sliderForm.reset();
      await this.loading.hide()
    })
  }


  async edit(){
    const form = new FormData()
    if(this.image.includes('data:')){
      form.append('imagen', this.compress.dataURItoBlob(this.image));
    }
    form.append('titulo',this.sliderForm.controls['titulo'].value);
    let html;
 
   if(this.sliderForm.controls['informacion'].value){
    if(typeof this.sliderForm.controls['informacion'].value !== 'string'){
      html = toHTML( this.sliderForm.controls['informacion'].value);
    }else{
      html = this.sliderForm.controls['informacion'].value;
    }
   }
    const identificador = this.sliderForm.controls['titulo'].value.replace(/ /g, '-')
    form.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    
    if(html){
      form.append('informacion',html);
    }
    form.append('precio',this.sliderForm.controls['precio'].value);
    form.append('tipo',this.sliderForm.controls['tipo'].value);
    form.append('url',this.sliderForm.controls['url'].value);
    this.genericS.updateWhitImage('cursos',this.identificador,form).subscribe(async (res:any) => {
      this.toast.success('Curso Actualizado');
      this.sliderRepo.updateCurso(this.identificador,res);
      this.image=null;
      this.sliderForm.reset();
      this.nav.navigateBack('/dashboard/website/cursos-ver')
      await this.loading.show()
    })
  }

}
