import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { TipoPublicoArray } from 'src/app/shared/enums/tipoPublico.enum';
import { EditarUsuarioPage } from './editar-usuario/editar-usuario.page';
import { Boletos, BoletosRepository } from 'src/app/shared/repos/boletos.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { EventoRepository } from 'src/app/shared/repos/evento.repository';

@Component({
  selector: 'app-ver-usuarios',
  templateUrl: './ver-usuarios.page.html',
  styleUrls: ['./ver-usuarios.page.scss'],
})
export class VerUsuariosPage implements OnInit {
  search!:string;
  boletos:Boletos[]=[]
  idEvento!:number;
  tipoPubico = TipoPublicoArray;
  constructor(
    private modalC:ModalController,
    private boletoRepo:BoletosRepository,
    private eventoRepo:EventoRepository,
    private nav:NavController,
    private genericS:GenericService,
    private alert:AlertService,
    private toast:ToastrService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params:any) => {
      this.idEvento = Number(params.id)
    })
   this.boletoRepo.evento$.subscribe((res) => {
    this.boletos = res.sort((a, b) => {
      return moment(b.createdAt).diff(moment(a.createdAt));
    });
    this.boletosSelected= res.slice(0,this.divisor)
    if(this.boletos.length === 0){
      this.nav.navigateForward('dashboard/eventos')
    }
   })
      
  }

  
  mon(date:Date){
    moment().locale('es')
    return moment(date).format('L')
  }

  async edit (idBoleto:any){
    const modal = await this.modalC.create({
      component:EditarUsuarioPage,
   
      componentProps:{
        boleto:idBoleto,
        evento:this.idEvento
      } 
    })

    await modal.present();
  }

  async delete(id:number){
    await this.alert.setData({
      animated:true,
      header:'Eliminar usuario',
      message:'¿Desea eliminarlo Permanentemente?',
      buttons:[
        {
          text:'cancelar'
        },
        {
          text:'Confirmar',
          handler:() => {
            this.genericS.delete('boleto',id).subscribe(res=> {
              this.boletos = this.boletos.filter((bol:any) => bol.id !== id);
              this.toast.success('Usuario Eliminado Correctamente');
              this.eventoRepo.updateEvento(this.idEvento,{boletos:this.boletos})
            });
          }
        }
      ]
    })
  }

  boletosSelected:Boletos[] = []
  divisor = 10
  getPagina(pagina:number){
     this.boletosSelected= this.boletos.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
  }

}
