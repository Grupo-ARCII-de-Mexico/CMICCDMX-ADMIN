import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';
import { OportunidadNegocio } from 'src/app/shared/interfaces/negocio.interface';
import { Negocio, NegocioRepository } from 'src/app/shared/repos/negocio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-ver-negocios',
  templateUrl: './ver-negocios.page.html',
  styleUrls: ['./ver-negocios.page.scss'],
})
export class VerNegociosPage implements OnInit {
  negocios:Negocio[]=[];
  uri: string = environment.image + 'oportunidades-logotipos/'
  constructor(
    private gService:GenericService,
    private negocioRepo:NegocioRepository,
    private toast:ToastrService,
    private alerts:AlertService,
    private loading:LoadingService
     ) { }

  ngOnInit() {
    this.gService.getAll<Negocio[]>('negocio').subscribe((res) => {
      this.negocioRepo.setNegocio(res);
    })
    this.negocioRepo.negocio$.pipe(
      tap( negocios => this.negocios=negocios)
    ).subscribe()
  }

  async vistaPrevia(id:number){
    const evento = this.negocios.find((e) => e.id === id );
    if(evento){
      window.open(environment.host+'oportunidad-negocio/'+evento.identificador,'_blank')
    }
  }

  async delete(id:number){
    await this.alerts.setData({
      animated:true,
      header:'Eliminar ON',
      message:'¿Desea Eliminar esta ON?',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Eliminar',
          handler: async () => {
            this.gService.delete('negocio',id).subscribe(async (res) => {
              this.negocios = this.negocios.filter((n) => n.id !== id );
              this.toast.success('ON eliminada','Eliminado');
            })
          } 
        }
      ]
    })
  
  }


  exportToExcel(nombre:string,oportunidadNegocio:OportunidadNegocio[]){
    let data = []
    for(let on of oportunidadNegocio){ 
      data.push(
        {
          "Empresa": on.empresa ?? '',
          "No. Afiliado": on.afiliado ?? '',
          "Calle": on.calle ?? '',
          "Colonia": on.colonia ?? '',
          "Alcaldía / Municipio": on.municipio ?? '',
          "Estado": on.estado ?? '',
          "Código Postal": on.cp ?? '',
          "Denominación": on.denominacion ?? '',
          "Sitio Web": on.web ?? '',
          "Nombre de Contacto": on.contacto.nombre ?? '',
          "Apellido Paterno Contacto": on.contacto.paterno ?? '',
          "Apellido Materno de Contacto": on.contacto.materno ?? '',
          "Telefono1 de Contacto": on.contacto.telefono ?? '',
          "Telefono 2 de Contacto": on.contacto.telefonoOficina ?? '',
          "Correo de Contacto": on.contacto.email ?? '',

        }
      );
  }
  if(data){
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, nombre+'.xlsx');
  }
}


async alerta(id:string){
  await this.loading.setData({
    animated:true,
    message:'Enviando...'
  });

  await this.alerts.setData({
    animated:true,
    header:'Enviar Acceso a la Empresa',
    message:'Agregue el correo a quien desea enviar el acceso (Si vuelve a mandar este correo el acceso anterior será eliminado)',
    backdropDismiss:false,
    inputs:[
      {
        type: 'email',
        name:'password',
        placeholder: 'Ingrese el correo',
      },
    ],
    buttons:[
      {
        text:'Enviar contraseña',
        handler: async (alertData) => {
          await this.loading.create();
          await this.loading.show();
          const resultado  = await this.gService.post('negocio/sendPassword/'+id ,{email:alertData.password}).toPromise().catch(async (a) => {
            
          })
          if(resultado){
            await this.loading.hide();
            return true
          }
          return false;
        }
      }
    ]
  })
}


search!:string;
negociosSelected:Negocio[]= []
divisor = 15;
pagina= 0 
 getPagina(pagina:number){
  this.pagina= pagina
    this.negocios= this.negocios.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
 }

}
