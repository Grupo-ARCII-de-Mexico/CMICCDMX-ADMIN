import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OportunidadNegocio } from 'src/app/shared/interfaces/negocio.interface';
import { VisorPdfPage } from '../visor-pdf/visor-pdf.page';
import { GenericService } from 'src/app/shared/services/generic-service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { switchMap, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-solicitud',
  templateUrl: './ver-solicitud.page.html',
  styleUrls: ['./ver-solicitud.page.scss'],
})
export class VerSolicitudPage implements OnInit {
  @Input() negocio!:OportunidadNegocio
  @Input() oportunidad!:OportunidadNegocio
  @Input() ext:boolean=false;
  edit=false;
  documentosFaltantes:any = []
  constructor(
    public modalc:ModalController,
    private genericService:GenericService,
    private loading:LoadingService,
    private toast:ToastrService,
    private alertS:AlertService
  ) { }

  ngOnInit() {
  
    this.documentosFaltantes =  this.negocio.documentos.filter(obj1 => {
      return !this.oportunidad.documentos.some(obj2 => obj2?.documento === obj1.texto);
    });
    this.files = Array(30).fill({documento:null,uri:null});
  }

  async view(documento:any){
    const modalc = await this.modalc.create({
        component:VisorPdfPage,
        componentProps:{
          titulo:documento.documento,
          pdf:documento.uri
        },
        id:'aaa'
    });
    await modalc.present();
  }

  especialidades:any[]=[]
  setEspecialidad($event:any,especialidad:string){
    if($event.detail.checked){
      this.especialidades.push(especialidad);
      this.especialidades = Array.from(new Set(this.especialidades))
    }else{
      this.especialidades = this.especialidades.filter((a) => a !== especialidad)
    }
  }

  files:any[] = []
  onFileSelected(event: any,index:number): void {
    this.files[index] = {
      documento :  this.negocio.documentos[index].texto,
      uri :  event.target.files[0]
    }
    event.target.value = ''
  }

  click(id:any){
    const fileInput = document.getElementById(id) as HTMLInputElement;
    fileInput.click();
  }
  uri = environment.image+'oportunidades-documentos/'
  download(documento:any){
      const link = document.createElement('a');
      link.href =  this.uri + documento.uri;
      link.download = documento.documento;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

  }

  async editar(){
    for(const document of this.files){
      if(document.uri){
        const form = new FormData();
        form.append('documento',document.uri);
        const uri = await this.genericService.post<any>('negocio/documentos',form).toPromise();
        const existe = this.oportunidad.documentos.some(documento => 
          document.documento === documento.documento)
        if(existe){
          this.oportunidad.documentos = this.oportunidad.documentos.map(documento => 
            document.documento === documento.documento ? {documento:document.documento, uri :uri.file} : documento);
        }else{
        
          this.oportunidad.documentos.push({documento:document.documento, uri :uri.file})
        }
      }
    }
    this.loading.setData({
      animated:true,
      message:'Subiendo...',
      spinner:'dots'
    })
    await this.loading.create();
    await this.loading.show();

    this.genericService.update<any>('negocio/oportunidad',this.oportunidad.id,{...this.oportunidad, especialidades:this.especialidades}).pipe(
      switchMap( res => this.genericService.update('negocio/contacto',this.oportunidad.contacto.id,{...this.oportunidad.contacto})),
      tap( async (res:any) =>
       {
        await this.loading.hide();
        this.toast.success('Espere notificaciones por el correo del contacto','Registro Guardado');
        this.edit=false
        this.especialidades=[];
        this.files= Array(30).fill({documento:null,uri:null});
       }
      )
    ).subscribe()
  }


  async changeEdit (){
    this.edit=!this.edit
    if(this.edit){
 
      this.especialidades = this.oportunidad.especialidades;
    }else{
      await this.alertS.setData({
        animated:true,
        header:'Guardar Cambios',
        message:'Todos los cambios que haya realizado se guardaran una vez haya confirmado, ¿Desea continuar?',
        buttons:[
          {
            text:"Cancelar"
          },
          {
            text:'Guardar Cambios',
            handler: async () => {
              await this.editar()
            }
          }
        ]
      });
    }
  }

  findEspecialidad(especialidad:string){
    if(this.oportunidad.especialidades.some((esp) => esp == especialidad)){
      return true;
    }else{
      return false
    }
  }
}
