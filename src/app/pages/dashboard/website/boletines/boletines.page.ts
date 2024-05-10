import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { AuthRepository } from 'src/app/shared/repos/auth.repository';
import { BoletinRepository } from 'src/app/shared/repos/boletin.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-boletines',
  templateUrl: './boletines.page.html',
  styleUrls: ['./boletines.page.scss'],
})
export class BoletinesPage implements OnInit {

  html:any
  editor!:Editor
  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  
  editar:boolean = false;
  uri = environment.image + 'boletines/';
  sliderForm!:FormGroup;
  image:any[] = [];
  identificador!:number;
  constructor(
    private fb:FormBuilder,
    private compress:CompressImageService,
    private sliderRepo:BoletinRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController,
    private authRepo:AuthRepository,
    private modalC:ModalController
  ) { }
  name!:string;
  ngOnInit() {
    this.editor = new Editor();
    this.authRepo.user$.subscribe((res:any) => this.name=res[0].names)
    this.sliderForm = this.fb.group({
     titulo:[null],
    informacion:[null],
    fecha:[null]
    })
    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.identificador ?? 0) 
        return this.sliderRepo.boletin$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const find = res.find((a:any) => a.id === this.identificador);
      this.sliderForm.setValue({
        titulo:find.titulo,
        informacion:find.informacion,
        fecha:find.fecha
      })
     
      let array = []
      for(const img of find.imagenes){
          array.push( this.uri + img)
      }
      this.image = array
      if(array.length == 0){
        this.image = [this.uri + find.imagen]
      }
      this.editar=true
     }
    })
  }

  async addImage(){
    this.image = await this.compress.returnImageCompressMultiple();
 
  }

  async save(){
    if(this.editar){
      return this.edit();
    }
    const form = new FormData()
    if(this.image.length >0){
      for(const img of this.image){
        form.append('imagenes', this.compress.dataURItoBlob(img))
      }
    }
    let html;
    if(typeof this.sliderForm.controls['informacion'].value !== 'string'){
      html = toHTML( this.sliderForm.controls['informacion'].value);
    }else{
      html = this.sliderForm.controls['informacion'].value;
    }
    form.append('titulo',this.sliderForm.controls['titulo'].value);
    form.append('autor',this.name);
    form.append('informacion',html);
    const identificador = this.sliderForm.controls['titulo'].value.replace(/ /g, '-')
    form.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    this.genericS.post('boletines',form).subscribe((res:any) => {
      this.toast.success('Boletín Creado');
      this.sliderRepo.addBoletin(res);
      this.image=[];
      this.sliderForm.reset();
    })
  }


  edit(){
    const form = new FormData()
    if(this.image.length >0){
      for(const img of this.image){
        if(img.includes('data:')){
          form.append('imagenes', this.compress.dataURItoBlob(this.image));
        }
      }
    }
  
    form.append('titulo',this.sliderForm.controls['titulo'].value);
    form.append('autor',this.name);
    let html;
    if(typeof this.sliderForm.controls['informacion'].value !== 'string'){
      html = toHTML( this.sliderForm.controls['informacion'].value);
    }else{
      html = this.sliderForm.controls['informacion'].value;
    }
    const identificador = this.sliderForm.controls['titulo'].value.replace(/ /g, '-')
    form.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    form.append('informacion',html);
    this.genericS.updateWhitImage('boletines',this.identificador,form).subscribe((res:any) => {
      this.toast.success('Boletín Actualizado');
      this.sliderRepo.updateBoletin(this.identificador,res);
      this.image=[];
      this.sliderForm.reset();
      this.nav.navigateBack('/dashboard/website/boletines-ver')
    })
  }
  eliminarimagenes(imagenes: string) {
    const index = this.image.indexOf(imagenes);
    if (index !== -1) {
      this.image.splice(index, 1);
    }
  }

}
