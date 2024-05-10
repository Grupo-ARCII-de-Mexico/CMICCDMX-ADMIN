import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Apoyos } from 'src/app/shared/interfaces/apoyo.interface';
import { ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

moment.locale('es');
@Component({
  selector: 'app-apoyos',
  templateUrl: './apoyos.page.html',
  styleUrls: ['./apoyos.page.scss'],
})
export class ApoyosPage implements OnInit {

  uri: string = environment.image + 'apoyos-dn/'
  eventos:any[]=[];
  constructor(
    private nav:NavController,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericService:GenericService,
    private apoyos:ApoyosRepository
  ) { }

  ngOnInit() {
    this.apoyos.user$.subscribe((eventos:any) => {
        this.eventos=eventos;
        this.apoyos.setApoyos(eventos);
    })
  }

  mon(date:Date){
    return moment(date).locale('es').format('L') + ' ' + moment(new Date(date)).utc().format('LTS')
  }

  async vistaPrevia(id:number){
    const evento = this.eventos.find((e) => e.id === id );
    if(evento){
      window.open(environment.host+'evento/'+evento.identificador,'_blank')
    }
  }

  exportToExcel(id:number) { 
    const evento = this.eventos.find( e => e.id ===id);
    
    let data = []
    for(let boleto of evento?.boletos){ 
      data.push(
        {
          Folio : boleto.folio,
          Nombre : boleto.afiliado ? boleto?.afiliado?.nombre : (boleto?.participante?.nombre ?? ""),
          Cargo : boleto.afiliado ? boleto?.afiliado?.cargo : (boleto?.participante?.cargo ?? ""),
          Empresa : boleto.afiliado ? boleto?.afiliado?.empresa : (boleto?.participante?.empresa ?? ""),
          "Organización" : boleto.afiliado ? boleto?.afiliado?.organizacion : (boleto?.participante?.organizacion ?? ""),
          Correo: boleto.afiliado ? boleto?.afiliado?.email : (boleto?.participante?.email ?? ''),
          "Teléfono": boleto.afiliado ? boleto?.afiliado?.telefono : (boleto?.participante?.telefono ?? ''),
          "Tipo Asistencia": boleto.privilegio ?? 'N/A',
          "Forma de Pago": boleto.idPago ? 'Tarjeta de crédito' : 'Transferencia',
          "Boleto Pagado" : boleto.active ? "Si" : "No",
          "Necesita Factura" :  boleto.quieroFactura ? "Si" : "No",
          RFC: boleto.afiliado ? boleto?.afiliado?.rfc : (boleto?.participante?.rfc ?? ""),
          CURP: boleto?.participante?.curp ?? "" 
        }
      );
    }

    
    if(data){
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
      XLSX.writeFile(wb, evento?.titulo.toUpperCase()+'.xlsx');
    }
  }


  async deleteEvento(id:number){
    await this.alert.setData({
      animated:true,
      header:'Está a punto de eliminar este evento',
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
            this.genericService.delete('desastres',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Apoyo Eliminado');
            })
          }
        }
      ]
    })
  }


  async cerrarEvento(id:number){
   await  this.alert.setData({
      animated:true,
      header:'Cerrar Apoyo',
      message:'Está a punto de cerrar el apoyo una vez lo haga no podrá reabrilo ¿Desea Continuar?',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Cerrar',
          handler: async () => {
            this.genericService.update<any>('desastres',id,{active: false}).subscribe( res => {
              this.eventos = this.eventos.map((e) => e.id === id ? res : e);
              this.toast.success('Apoyo Cerrado');
            })
          } 
        }
      ]
    });
  }

}
