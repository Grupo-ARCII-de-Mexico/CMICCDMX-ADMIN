import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { BolsaTrabajo, BolsaTrabajoRepository } from 'src/app/shared/repos/bolsaTrabajo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ver-bolsa',
  templateUrl: './ver-bolsa.page.html',
  styleUrls: ['./ver-bolsa.page.scss'],
})
export class VerBolsaPage implements OnInit {
  uri: string = environment.image + 'bolsa-trabajo-logos/'
  uri2: string = environment.image + 'bolsa-trabajo-curriculum/'
  licitacionModal!:BolsaTrabajo;
  openModal: boolean = false;
  constructor(
    private bolsaTrabajo:BolsaTrabajoRepository,
    private genericService:GenericService,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private sanitizer: DomSanitizer,
  ) { }
  bolsa:BolsaTrabajo[] = []

  ngOnInit() {
    this.bolsaTrabajo.BolsaTrabajo$.subscribe((res) => {
      this.bolsa = res;
      this.bolsaSelected = res.slice(0,this.divisor)
    })
  }

  search!:string;
  bolsaSelected:BolsaTrabajo[]= []
  divisor = 15;
  pagina= 0 
   getPagina(pagina:number){
    this.pagina= pagina
      this.bolsaSelected = this.bolsa.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
   }
   async deleteEvento(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar esta Oferta de Trabajo',
      message:'Si lo elimina se perderán todos los datos relacionados. \n ¿Desea continuar?',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Confirmar',
          handler:async ()=> {
            this.loading.setData({
              animated:true,
              message:'Eliminando',
              spinner:'dots'
            });
            await this.loading.create();
            await this.loading.show();
            this.genericService.update('bolsa-trabajo',id,{active:false}).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Oferta de Trabajo Eliminada');
              this.bolsaTrabajo.deleteBolsaTrabajo(id);
            })
          }
        }
      ]
    });
  }

  toHtml(data:string){
   return  this.sanitizer.bypassSecurityTrustHtml(data)
  }

  openModalPostulante=false;
  postulantes: any = [];

  download(documento:any){
    console.log(documento);
   
    const link = document.createElement('a');
    link.href =  this.uri2 + documento;
    link.download = 'curriculum.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

}

}
