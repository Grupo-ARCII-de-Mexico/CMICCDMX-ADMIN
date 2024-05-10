import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ModalController, NavController } from '@ionic/angular';
import { zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Negocio, NegocioRepository } from 'src/app/shared/repos/negocio.repository';
import { VerSolicitudPage } from '../modal/ver-solicitud/ver-solicitud.page';
import { OportunidadNegocio } from 'src/app/shared/interfaces/negocio.interface';
import { GenericService } from 'src/app/shared/services/generic-service';
import { ToastrService } from 'ngx-toastr';
import { AlertService } from 'src/app/shared/tools/alert.service';

@Component({
  selector: 'inscripciones',
  templateUrl: './ver-inscripciones.page.html',
  styleUrls: ['./ver-inscripciones.page.scss'],
})
export class VerInscripcionesPage implements OnInit {
  @Input() negocio!:Negocio;
  @Input() ext:boolean = false
  search!:string;
  constructor(
    private activeRoute:ActivatedRoute,
    private negocioRepo:NegocioRepository,
    private nav:NavController,
    private modalc:ModalController,
    private genericS:GenericService,
    private toast:ToastrService,
    private alert:AlertService
  ) { }

  ngOnInit() {
    if(!this.ext){
      zip(
        this.negocioRepo.negocio$,
        this.activeRoute.params
      ).pipe(
        tap(
          (res:any) => {
            this.negocio = res[0].find((n:Negocio) => n.identificador === res[1].identificador)
            if(!this.negocio){
              this.nav.navigateForward('/dashboard/negocios')
            }
          }
        )
      ).subscribe()
    }else{
 
    }
  }



  async view(oportunidad:OportunidadNegocio){
    const modala = await this.modalc.create({
        component:VerSolicitudPage,
        componentProps:{
          oportunidad,
          negocio:this.negocio,
          ext:this.ext
        },
        backdropDismiss:false
    });
    await modala.present();
  }


  async eliminar(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar un registro',
      message:'Si lo hace este elemento será borrado permanentemente',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Eliminar',
          handler: () => {
            this.genericS.delete('negocio/oportunidad',id).subscribe(() => {
              this.negocio.oportunidadNegocio = this.negocio.oportunidadNegocio.filter((ON:any) => ON.id !== id)
              this.negocioRepo.updateNegocio(this.negocio.id,{oportunidadNegocio:this.negocio.oportunidadNegocio})
              this.toast.success('Registro eliminado','Correcto')
            })
          }
        }
      ]
    })
  }
}
