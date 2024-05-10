import { Component, OnInit } from '@angular/core';
import { Evento, EventoRepository } from 'src/app/shared/repos/evento.repository';
import * as XLSX from 'xlsx';

import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { BoletosRepository } from 'src/app/shared/repos/boletos.repository';
import { NavController } from '@ionic/angular';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/generic-service';
import { TipoPublicoArray } from 'src/app/shared/enums/tipoPublico.enum';
@Component({
  selector: 'app-ver-evento',
  templateUrl: './ver-evento.page.html',
  styleUrls: ['./ver-evento.page.scss'],
})
export class VerEventoPage implements OnInit {
  uri: string = environment.image + 'eventos/'
  eventos:Evento[]=[];
  search!:string;
  constructor(
    private eventoRepo:EventoRepository,
    private boletosRepo:BoletosRepository,
    private nav:NavController,
    private alert:AlertService,
    private loading:LoadingService,
    private toast:ToastrService,
    private genericService:GenericService
  ) { }

  ngOnInit() {
    this.eventoRepo.evento$.subscribe((eventos) => {
        this.eventos=eventos.sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
        this.eventosSelected= eventos.slice(0,this.divisor)
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
    console.log(evento?.boletos);
    
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
          CURP: boleto?.participante?.curp ?? "",
          "Tipo de Registro" : TipoPublicoArray[boleto.participante.tipo] ?? 'N/A'
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

  async modalUser(id:number){
    const find = this.eventos.find( (e) => e.id === id);
    if(find){
      this.boletosRepo.setEventos(find.boletos)
      this.nav.navigateForward('dashboard/eventos/ver-usuarios',{queryParams:{id}})
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
            this.genericService.delete('evento',id).subscribe(async (_) => {
              await this.loading.hide();
              this.toast.success('Evento Eliminado');
              this.eventoRepo.deleteEvento(id);
            })
          }
        }
      ]
    });
  }


  async cerrarEvento(id:number){
   await  this.alert.setData({
      animated:true,
      header:'Cerrar Evento',
      message:'Está a punto de cerrar el evento una vez lo haga no podrá reabrilo ¿Desea Continuar?',
      inputs:[{
        name:'titulo',
        type:'text',
        placeholder:'Ingrese Titulo'
      },
      {
        name:'descripcion',
        type:'textarea',
        placeholder:'Ingrese texto '
      }
      ],
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Cerrar',
          handler: async (info) => {
            await this.loading.setData({
              animated:true,
              message:'Cerrando Evento...'
            })
            await this.loading.create();
            await this.loading.show();
            const modal = {
              titulo:info.titulo,
              descripcion:info.descripcion
            }

            this.genericService.update<Evento>('evento',id,{active: false,modal }).subscribe( async (res) => {
              this.eventos = this.eventos.map((e) => e.id === id ? res : e);
              await this.loading.hide();
               this.toast.success('Evento Cerrado','Correcto')
               this.eventos = this.eventos.map((e:any) => e.id === id ? {...e,active:false} : e)
            })
          } 
        }
      ]
    });
  }
  async reactivar(id:number){
    await  this.alert.setData({
       animated:true,
       header:'Reactivar Evento',
       message:'Está a punto de reactivar el evento le recomendamos editar el evento antes de hacerlo ¿Desea Continuar?',
       buttons:[
         {
           text:'Cancelar'
         },
         {
           text:'Reactivar',
           handler: async () => {
             await this.loading.setData({
               animated:true,
               message:'Cerrando Evento...'
             })
             await this.loading.create();
             await this.loading.show();
             this.genericService.update<Evento>('evento',id,{active: true,modal:null }).subscribe( async (res) => {
               this.eventos = this.eventos.map((e) => e.id === id ? res : e);
               await this.loading.hide();
                this.toast.success('Evento Reactivado','Correcto')
             })
           } 
         }
       ]
     });
   }
   eventosSelected:Evento[]=[]
   divisor = 10
   getPagina(pagina:number){
      this.eventosSelected= this.eventos.slice((pagina)*this.divisor,(pagina+1)*this.divisor)
   }
  
   async duplicate(evento:Evento){
      await this.alert.setData({
        animated:true,
        header:'Duplicar '+evento.titulo,
        message:'Ingrese un titulo distinto para duplicar el evento',
      
      inputs:[{
          name:'titulo',
          type:'text',
          placeholder:'Ingresar aquí'
        }],
        buttons:[
          {
            text:'Cancelar'
          },{
            text:'Duplicar',
            handler: async ({titulo}) => {
              if(!titulo || titulo.length ===0){
                  this.duplicate(evento);
                  return
              }
              await this.loading.setData({
                animated:true,
                message:'Duplicando Evento...'
              })
              await this.loading.create();
              await this.loading.show();
              evento.titulo = titulo;
              this.genericService.post<Evento>('evento/duplicate',{...evento, boletos:[], id:undefined}).subscribe( async (res) => {
                this.eventos.push(res)
                this.eventos=this.eventos.sort((a, b) => new Date(b.fechaInicio).getTime() - new Date(a.fechaInicio).getTime());
                await this.loading.hide();
                 this.toast.success('Evento duplicado','Correcto')
              })
            }
          }
        ]
      })
   }

}
