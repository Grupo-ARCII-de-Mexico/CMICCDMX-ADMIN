import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { zip } from 'rxjs';
import { tap } from 'rxjs/operators';
import { TipoPublico, TipoPublicoArray } from 'src/app/shared/enums/tipoPublico.enum';
import { Delegacion } from 'src/app/shared/interfaces/delegacion.interface';
import { Estado } from 'src/app/shared/interfaces/estado.interface';
import { Participante } from 'src/app/shared/interfaces/participante.interface';
import { Evento, EventoRepository } from 'src/app/shared/repos/evento.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.page.html',
  styleUrls: ['./registrar-usuario.page.scss'],
})
export class RegistrarUsuarioPage implements OnInit {
  evento:Evento[] = [];
  delegaciones: Delegacion[] = [];
  estados: Estado[] = [];
  extranjero!: any;
  usuarioForm!: FormGroup;
  tipoPublico=TipoPublico;
  tipoPublicoArray = TipoPublicoArray;
  boleto:any = {
    "costo":0,
    "privilegio":"Sesión Foro + Comida",
    "quieroFactura":false,
    "plataformaPago":1
  }
  constructor(
    private fb:FormBuilder,
    private genericService:GenericService,
    private eventos:EventoRepository,
    private load:LoadingService,
    private toast:ToastrService,
    private modalC:ModalController,
    private compressService:CompressImageService

  ) { }

  ngOnInit() {
    this.eventos.evento$.subscribe((res) => {
      this.evento = res;
    })
    zip(
      this.genericService.getAll<Delegacion[]>('delegacion'),
      this.genericService.getAll<Estado[]>('estados'),
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
      })
    )
    .subscribe()
    this.usuarioForm = this.fb.group({
      nombre: [null, Validators.required],
      telefono: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      rfc: [], // Eliminamos Validators.required para hacerlo opcional
      cargo: [], // Eliminamos Validators.required para hacerlo opcional
      delegacion: [], // Eliminamos Validators.required para hacerlo opcional
      curp: [], // Eliminamos Validators.required para hacerlo opcional
      evidencia: [], // Eliminamos Validators.required para hacerlo opcional
      organizacion: [], // Eliminamos Validators.required para hacerlo opcional
      empresa: [], // Eliminamos Validators.required para hacerlo opcional
      numAfiliado: [], // Eliminamos Validators.required para hacerlo opcional
      estado: [], // Eliminamos Validators.required para hacerlo opcional
      tipo: [TipoPublico.AFILIADOS],
      evento: [],
    })
  }

  async update(){
    this.load.setData({
      message:'Creando Usuario',
      animated:true,
      spinner:'dots'
    })
    await this.load.create();
    await this.load.show();
    if(this.usuarioForm.controls['delegacion'].value){
      const del = this.delegaciones.find((dele) => dele.id === this.usuarioForm.controls['delegacion'].value ) ?? null;
      this.usuarioForm.controls['delegacion'].setValue(del?.ciudad ?? null);
    }
  
    this.genericService.post<Participante>('participante',{...this.usuarioForm.value}).subscribe(async (res) => {
      await this.modalC.dismiss();
      await this.load.hide();
      this.toast.success('Usuario Actualizado');
    })
  }

  evidencia:any
  async upload() {
    this.evidencia = await this.compressService.returnImageCompress()
  }
}
