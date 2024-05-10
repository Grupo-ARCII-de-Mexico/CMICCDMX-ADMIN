import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { ComentarioRepository } from 'src/app/shared/repos/comentarios.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {


 
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
  uri = environment.image + 'comentarios/';
  sliderForm!:FormGroup;
  image:any;
  identificador!:number;
  constructor(
    private fb:FormBuilder,
    private compress:CompressImageService,
    private sliderRepo:ComentarioRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController,
    private modalC:ModalController
  ) { }
  name!:string;
  ngOnInit() {
    this.editor = new Editor();
    this.sliderForm = this.fb.group({
      puntuacion:[null],
      persona:[null],
      empresa:[null],
      texto:[null],
    })
    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.identificador ?? 0) 
        return this.sliderRepo.comentario$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const find = res.find((a:any) => a.id === this.identificador);
      this.sliderForm.setValue({
       puntuacion:find.puntuacion,
        persona:find.persona,
        empresa:find.empresa,
        texto:find.texto,
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
    let html;
    if(typeof this.sliderForm.controls['texto'].value !== 'string'){
      html = toHTML( this.sliderForm.controls['texto'].value);
    }else{
      html = this.sliderForm.controls['texto'].value;
    }
    form.append('texto',html);
    form.append('puntuacion',this.sliderForm.controls['puntuacion'].value);
    form.append('persona',this.sliderForm.controls['persona'].value);
    form.append('empresa',this.sliderForm.controls['empresa'].value);
    this.genericS.post('comentarios',form).subscribe((res:any) => {
      this.toast.success('Comentario Creado');
      this.sliderRepo.addComentario(res);
      this.image=null;
      this.sliderForm.reset();
    })
  }


  edit(){
    const form = new FormData()
    if(this.image.includes('data:')){
      form.append('imagen', this.compress.dataURItoBlob(this.image));
    }
    let html;
    if(typeof this.sliderForm.controls['texto'].value !== 'string'){
      html = toHTML( this.sliderForm.controls['texto'].value);
    }else{
      html = this.sliderForm.controls['texto'].value;
    }
    form.append('texto',html);
    form.append('puntuacion',this.sliderForm.controls['puntuacion'].value);
    form.append('persona',this.sliderForm.controls['persona'].value);
    form.append('empresa',this.sliderForm.controls['empresa'].value);
    this.genericS.updateWhitImage('comentarios',this.identificador,form).subscribe((res:any) => {
      this.toast.success('Comentario Actualizado');
      this.sliderRepo.updateComentario(this.identificador,res);
      this.image=null;
      this.sliderForm.reset();
      this.nav.navigateBack('/dashboard/website/comentarios-ver')
    })
  }


  calificar(valor:number){
    this.sliderForm.controls['puntuacion'].setValue(valor)
  }
}
