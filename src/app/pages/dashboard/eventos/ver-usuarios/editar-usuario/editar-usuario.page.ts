import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController, NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { TipoPublico, TipoPublicoArray } from 'src/app/shared/enums/tipoPublico.enum';
import { Delegacion } from 'src/app/shared/interfaces/delegacion.interface';
import { Estado } from 'src/app/shared/interfaces/estado.interface';
import { Participante } from 'src/app/shared/interfaces/participante.interface';
import { Boletos, BoletosRepository } from 'src/app/shared/repos/boletos.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.page.html',
  styleUrls: ['./editar-usuario.page.scss'],
})
export class EditarUsuarioPage implements OnInit {
  delegaciones: Delegacion[] = [];
  estados: Estado[] = [];
  extranjero!: any;
  tipoPublico=TipoPublico;
  tipoPublicoArray = TipoPublicoArray;
  participante!:Participante;
  @Input() boleto!:Boletos;
  participanteForm!:FormGroup;
  constructor(
    private genericS:GenericService,
    private fb:FormBuilder,
    private compressService:CompressImageService,
    private alert:AlertService,
    private modalC:ModalController,
    private boletos:BoletosRepository,
    private nav:NavController,
    private load:LoadingService,
    private toast:ToastrService
  ) { }

  ngOnInit() {
    this.stripe();
    zip(
      this.genericS.getAll<Delegacion[]>('delegacion'),
      this.genericS.getAll<Estado[]>('estados')
    ).pipe(
      tap(res => {
        this.delegaciones = res[0].sort(function (a, b) {
          return a.ciudad.localeCompare(b.ciudad);
        });
        this.extranjero = res[1].find(e => e.id ==33) as any;
        this.estados = res[1].filter((e) => e.id !== 33).sort(function (a, b) {
          // Utiliza localeCompare para comparar las ciudades alfabéticamente
          return a.nombre.localeCompare(b.nombre);
        });
        this.participante = this.boleto.participante;
        const delegacion = res[0].find(del => del.ciudad === this.participante?.delegacion)?.id ?? null;
        this.participanteForm = this.fb.group({
          nombre:this.participante.nombre,
          numAfiliado:this.participante.numAfiliado,
          telefono:this.participante.telefono,
          email:this.participante.email,
          cargo:this.participante.cargo,
          empresa:this.participante.empresa,
          curp:this.participante.curp,
          rfc:this.participante.rfc,
          organizacion:this.participante.organizacion,
          estado:this.participante?.estado?.id ?? null,
          delegacion:delegacion,
          tipo:Number(this.participante.tipo) ?? 0
        })
      })
    ).subscribe();
  }
  evidencia: any
  async upload() {
    this.evidencia = await this.compressService.returnImageCompress()
  }

  async update(){
    this.load.setData({
      message:'Actualizando Usuario',
      animated:true,
      spinner:'dots'
    })
    await this.load.create();
    await this.load.show();
    if(this.participanteForm.controls['delegacion'].value){
      const del = this.delegaciones.find((dele) => dele.id === this.participanteForm.controls['delegacion'].value ) ?? null;
      this.participanteForm.controls['delegacion'].setValue(del?.ciudad ?? null);
    }
  
    this.genericS.update<Participante>('participante',this.participante.id,{...this.participanteForm.value}).subscribe(async (res) => {
      await this.modalC.dismiss();
      await this.load.hide();
      this.toast.success('Usuario Actualizado');
      this.boletos.updateEvento(this.boleto.id,{participante:res});
    })
  }

  updateBoleto(){
    this.genericS.update('boleto',this.boleto.id,this.boleto).subscribe((res:any) => {
      this.boletos.updateEvento(res.id,res);
    })
  }
  stripeCosto:number=0;
  stripe(){
    if(this.boleto.idPago){
      this.genericS.post('payments',{idPago:this.boleto.idPago}).subscribe((res:any) => {
        this.stripeCosto=res.amount
      })
    }
  
  }

  async pagar(){
    await this.alert.setData({
      animated:true,
      header:'Confirmar Pago',
      message:'Si confirma el pago se procedera con el proceso de entrega del QR',
      buttons:[
        {
          text:'Cancelar'
        },
        {
          text:'Confirmar',
          handler:async ()=> {
            this.genericS.update<Boletos>('boleto',this.boleto.id,{active:true}).pipe(
              switchMap((boleto) => {
              this.boletos.updateEvento(boleto.id,boleto)
               return  this.genericS.post('boleto/confirm/'+boleto.id,{})
              }),
              tap(_ => {
                this.toast.success('boleto activado');
                this.modalC.dismiss();
              })
            ).subscribe()
          }
        }
      ]
    })
  }

}
