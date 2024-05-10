import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { switchMap, tap } from 'rxjs/operators';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';
import { NegocioRepository } from 'src/app/shared/repos/negocio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-oportunidad',
  templateUrl: './crear-oportunidad.page.html',
  styleUrls: ['./crear-oportunidad.page.scss'],
})
export class CrearOportunidadPage implements OnInit {
  empresa:string=''
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
  editor!:Editor
  edit:boolean=false;
  public oportunidadForm!:FormGroup
  constructor(
    private loading:LoadingService,
    private toast:ToastrService,
    private compressImage:CompressImageService,
    private genericService:GenericService,
    private active:ActivatedRoute,
    private negocio:NegocioRepository,
    private nav:NavController,
    private modalC:ModalController
  ) { }

  logotipo:any;
  documentos:any[] = [];
  especialidades:any[] = [];
  documentoOpcional:any
  identificador?:string;
  ngOnInit() {
    this.editor = new Editor();
    this.active.params.pipe(
      switchMap((res:any) => {
        if(res.identificador){
          this.edit=true
          this.identificador = res.identificador
        }
        return this.negocio.negocio$
      })
      ).subscribe((res) => {
        if(this.edit){
          const find = res.find((n) => n.id === Number(this.identificador))
          if(find){
            this.documentos = find.documentos;
            this.especialidades = find.especialidades;
            this.empresa=find.empresa;
            this.logotipo = find.logotipo ? this.uri+find.logotipo : null;
            this.documentoOpcional = find.documento ? this.uriDoc+find.documento  : null;
            this.convocatoria=find.convocatoria;
            
          }else{
            this.nav.navigateForward("/dashboard/negocios")
          }
        }
      })
  }
  uri = environment.image + 'oportunidades-logotipos/'

  uriDoc = environment.image +  'oportunidades-documentoInformativo/'
  async uploadImage(){
    this.logotipo = await this.compressImage.returnImageCompress()
    const modal = await this.modalC.create({
      component:CropperPage,
      animated:true,
      componentProps:{
        imageUrl:this.logotipo
      }
     })
     modal.onDidDismiss().then(({data}) => {
       this.logotipo = data ?? null
     })
     await modal.present();
  }

  especialidad:string='';
  agregarEspecialidad(){
    this.especialidades.push(this.especialidad);
    this.especialidad=''
  }
  eliminar(index:number){
    this.especialidades.splice(index,1);
  }
  document:any=
  {
    texto:'',
    descripcion:''
  }
  agregarDocumentos(){
    this.documentos.push(this.document);
    this.document=  {
      texto:'',
      descripcion:''
    };
  }
  eliminarDocumentos(index:number){
    this.documentos.splice(index,1);
  }

  async save(){
    if(this.edit){
      await this.editNegocio();
      return
    }
    this.loading.setData({
      animated:true,
      message:'Subiendo...',
      spinner:'dots'
    })
    await this.loading.create();
    await this.loading.show();
    const form = new FormData()
    form.append('logotipo',this.compressImage.dataURItoBlob(this.logotipo))
    this.genericService.post<any>('negocio',form).pipe(
      switchMap( async (res) => {
        let html;
        if(typeof this.convocatoria !== 'string'){
          html = toHTML( this.convocatoria);
        }else{
          html = this.convocatoria;
        }
        if(this.documentoOpcional){
          const form = new FormData()
        form.append('documento',this.documentoOpcional)
        await this.genericService.updateWhitImage('negocio',res.id,form).toPromise()
        }
        return this.genericService.update('negocio',res.id,{especialidades:this.especialidades,documentos:this.documentos,empresa:this.empresa, convocatoria:html}).toPromise()
      }),
      tap(async (res) => {
        this.empresa = '';
        this.logotipo= null;
        this.especialidad = '';
        this.especialidades=[];
        this.documentos=[];
        this.document=  {
          texto:'',
          descripcion:''
        }
        this.convocatoria=''
        this.documentoOpcional=null
        await this.loading.hide()
        this.toast.success('Nueva Oportunidad de Negocio','Creada')
      })
    ).subscribe()
  }

  convocatoria:any = ''
  onFileSelected(event: any): void {
   
    this.documentoOpcional = event.target.files[0]
    event.target.value = ''

  }

  click(){
    const fileInput = document.getElementById('opcional') as HTMLInputElement;
    fileInput.click();
  }


  async editNegocio(){
    this.loading.setData({
      animated:true,
      message:'Actualizando...',
      spinner:'dots'
    })
    await this.loading.create();
    await this.loading.show();
    const form = new FormData()
    if(this.logotipo &&  !this.logotipo?.includes(this.uri)){
      form.append('logotipo',this.compressImage.dataURItoBlob(this.logotipo))
    }
    this.genericService.update<any>('negocio',Number(this.identificador),form).pipe(
      switchMap( async (res) => {
        let html;
        if(typeof this.convocatoria !== 'string'){
          html = toHTML( this.convocatoria);
        }else{
          html = this.convocatoria;
        }
        if(this.documentoOpcional && typeof(this.documentoOpcional) !== 'string'){
          const form = new FormData()
        form.append('documento',this.documentoOpcional)
        await this.genericService.updateWhitImage('negocio',res.id,form).toPromise()
        }
        return this.genericService.update('negocio',res.id,{especialidades:this.especialidades,documentos:this.documentos,empresa:this.empresa, convocatoria:html}).toPromise()
      }),
      tap(async (res:any) => {
        
        this.empresa = '';
        this.logotipo= null;
        this.especialidad = '';
        this.especialidades=[];
        this.documentos=[];
        this.document=  {
          texto:'',
          descripcion:''
        }
        this.convocatoria=''
        this.documentoOpcional=null
        await this.loading.hide()
        this.toast.success('Oportunidad de Negocio','Actualizada')
        this.negocio.updateNegocio(res.id,res)
        this.nav.navigateForward("/dashboard/negocios")
      })
    ).subscribe()
  }

  download(documento:any){
    const link = document.createElement('a');
    link.href =  documento;
    link.download = documento;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


}

valid(){

  if(typeof(this.documentoOpcional) === 'string'){
    return this.edit && this.documentoOpcional?.includes(this.uriDoc)
  }else return false;
 
}
}
