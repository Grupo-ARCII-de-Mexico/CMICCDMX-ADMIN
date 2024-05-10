import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Editor, Toolbar, toHTML } from 'ngx-editor';
import { ToastrService } from 'ngx-toastr';
import { Evento, EventoRepository, TipoEvento } from 'src/app/shared/repos/evento.repository';
import { ModalController, NavController } from '@ionic/angular';
import { TipoPublico } from 'src/app/shared/enums/tipoPublico.enum';
import { TipoPagos } from 'src/app/shared/enums/tipoPagos.enum';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { GenericService } from 'src/app/shared/services/generic-service';
import { Costo } from 'src/app/shared/interfaces/costos.interface';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';
import { MapPage } from '../components/map/map.page';
import { ActivatedRoute } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { CropperPage } from 'src/app/shared/components/cropper/cropper.page';

@Component({
  selector: 'app-crear-evento',
  templateUrl: './crear-evento.page.html',
  styleUrls: ['./crear-evento.page.scss'],
})
export class CrearEventoPage implements OnInit {

  editor!:Editor
  tipoPago = TipoPagos
  tipoPublico = TipoPublico
  eventForm!:FormGroup
  img: any = null;
  disabled=false;
  costos:any[]=[
  ];
  ponentes:any=[];
  agenda:any=[];
  edit:boolean=false;

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
  constructor(
    private fb:FormBuilder,
    private compressService:CompressImageService,
    private toast:ToastrService,
    private modalc:ModalController,
    private genericService:GenericService,
    private alert:AlertService,
    private load:LoadingService,
    private eventoRepo:EventoRepository,
    private activatedRoute:ActivatedRoute,
    private nav:NavController,
    private modalC:ModalController
  ) { 

  }

  ngOnInit() {
    this.eventForm = this.fb.group({
      fechaInicio:[null,Validators.required],
      fechaFin:[null,Validators.required],
      titulo:[null,Validators.required],
      detalles:[null,Validators.required],
      publicos:[undefined],
      pasarelasPago:[[]],
      lugar:[null],
      esGratis:[false],
      tieneCupoMaximo:[false],
      cupo:[0,],
      zoom:[],
      zoomPassword:[null],
      mapLat:[0.0],
      mapLong:[0.0],
      tipoEvento:[TipoEvento.PRESENCIAL],
      hayPrensa:[false]
    })
    this.activatedRoute.params.subscribe(({id}) => {
        if(id){
          this.configEdition(Number(id));
        }
    });
    this.editor = new Editor();
   
  }


  async upload() {
    this.img = await this.compressService.returnImageCompress();
    const modal = await this.modalC.create({
      component:CropperPage,
      animated:true,
      componentProps:{
        imageUrl:this.img
      }
     })
     modal.onDidDismiss().then(({data}) => {
       this.img = data ?? null
     })
     await modal.present();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }


  async verMapa(){
    const modal = await this.modalc.create({
      component:MapPage
    });
    modal.onDidDismiss().then(({data}) => {
      if(data){
        this.eventForm.controls['mapLat'].setValue(data.latitude);
        this.eventForm.controls['mapLong'].setValue(data.longitude);
        this.toast.success('Ubicación Guardada');
      }
    });
    modal.present();
  }


  async generateZoom(){
    this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Generando Liga de Zoom...'
    })
    await this.load.create();
    await this.alert.setData({
      header:'Esta a punto de generar una liga de zoom',
      message:'Elija una opción',
      buttons:[
        {
          text:'Crear sin contraseña',
          handler: async () => {
            await this.load.show()
            const zoom = this.genericService.post('evento/zoom',{password:0,date:this.eventForm.controls['fechaInicio'].value , title:  this.eventForm.controls['titulo'].value}).toPromise() as any;
            this.eventForm.controls['zoom'].setValue(zoom.join_url);
            this.toast.success('Liga Generada Exitosamente');
            await this.load.hide()
          }
        },
        {
          text:'Crear con contraseña',
          handler: async () => {
            await this.load.show()
            const zoom = await this.genericService.post('evento/zoom',{password:1,date:this.eventForm.controls['fechaInicio'].value, title:this.eventForm.controls['titulo'].value}).toPromise() as any;
          
            this.eventForm.controls['zoom'].setValue(zoom.join_url);
            this.eventForm.controls['zoomPassword'].setValue(zoom.password);
            this.disabled=true;
            this.toast.success('Liga Generada Exitosamente');
            await this.load.hide()
          }
        },
        {
          text:'Cancelar'
        },
      ]
    })
  }

  agregar(){
    this.costos.push({
      costo:null,
      nombre:null,
      publicos:null
    })
  }
  quitar(index:number){
    this.costos.splice(index,1);
  }
  agregarAgenda(){
    this.agenda.push({
      nombre:null,
      horas:null,
    })
  }
  quitarAgenda(index:number){
    this.agenda.splice(index,1);
  }

  agregarPonente(){
    this.ponentes.push({
      nombre:null,
      foto:null,
      cargo:null
    })
  }
  quitarPonente(index:number){
    this.ponentes.splice(index,1);
  }

  async subirFotoPonente(i:number)
{ 
    this.ponentes[i].foto = await this.compressService.returnImageCompress();
}  
  setTipo(evento:any,index:number,campo:string){
    this.costos[index][campo] = evento.detail.value
  }
  setTipoAgenda(evento:any,index:number,campo:string){
    this.agenda[index][campo] = evento.detail.value
  }
  setTipoPonente(evento:any,index:number,campo:string){
    this.ponentes[index][campo] = evento.detail.value
  }
  async save(){
    if(!this.validarForm()){
      return
    }
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Creando Evento...'
    })
    await this.load.create();
    await this.load.show();
    let html;
    if(typeof this.eventForm.controls['detalles'].value !== 'string'){
      html = toHTML( this.eventForm.controls['detalles'].value);
    }else{
      html = this.eventForm.controls['detalles'].value;
    }
    this.eventForm.controls['detalles'].setValue(html);
    const formData = new FormData();
    for (const key in  this.eventForm.value) {
      if (this.eventForm.value.hasOwnProperty(key)) {
        if(key !== 'costos'){
          formData.append(key, this.eventForm.value[key]);
        }
      }
    }
    if(this.img){
      formData.append('imagen', this.compressService.dataURItoBlob(this.img));
    }
    if(this.ponentes.length > 0){
      let i = 0;
      for(const pon of this.ponentes){
        if(pon.foto){
          const formpo = new FormData();
          formpo.append('imagen',this.compressService.dataURItoBlob(pon.foto))
          const res = await this.genericService.post<any>('evento/ponente',formpo).toPromise();
          this.ponentes[i].foto = res.file
        }
        i+=1;
      }
    }
    const identificador = this.eventForm.controls['titulo'].value.replace(/ /g, '-')
    formData.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    this.genericService.post<Evento>('evento',{...this.eventForm.value,agenda:this.agenda,costos:this.costos,ponentes:this.ponentes}).
    pipe(
      switchMap(res => {
        return this.genericService.update<Evento>('evento',res.id,formData)
      })
    )
    .subscribe(async (res) => {
      this.img = null;
      this.disabled=true;
      this.eventForm.reset({
       pasarelasPago:[[]],
       esGratis:[false],
       tieneCupoMaximo:[false],
       cupo:[0],
       mapLat:[0.0],
       publicos:[undefined],
       mapLong:[0.0],
       tipoEvento:[TipoEvento.PRESENCIAL]
      })
      this.costos=[];
      this.ponentes=[];
      this.agenda=[];
      this.eventoRepo.addEvento(res);
      this.nav.navigateForward('/dashboard/eventos')
      await this.load.hide();
      this.toast.success('Evento Guardado')
    })
    
  }

  idEdit!:number;
  configEdition(id:number){
    this.idEdit=id;
    this.edit=true;
    this.eventoRepo.evento$.pipe(
      map(eventos => eventos.find((evento) => evento.id === id)),
      tap( evento => {
        if(evento){
          console.log(evento.costos);
          
            if(typeof(evento?.costos) == 'string'){
              this.costos = JSON.parse(evento?.costos ?? '[]')
            }else{
              this.costos = evento.costos
            }
            this.agenda = evento?.agenda ?? [];
            this.ponentes = evento?.ponentes ?? [];
            
          this.eventForm.setValue({
            publicos:evento.publicos ?? undefined,
            fechaInicio:evento.fechaInicio ?? null,
            fechaFin:evento.fechaFin ?? null,
            titulo:evento.titulo ?? null,
            detalles:evento.detalles ?? null,
            pasarelasPago:evento.pasarelasPago ?? null,
            lugar:evento.lugar ?? null,
            esGratis:evento.esGratis ?? null,
            tieneCupoMaximo:evento.tieneCupoMaximo ?? null,
            cupo:evento.cupo ?? null,
            zoom:evento.zoom ?? null,
            zoomPassword:evento.zoomPassword ?? null,
            mapLat:evento.mapLat ?? null,
            mapLong:evento.mapLong ?? null,
            tipoEvento:evento.tipoEvento ?? null,
            hayPrensa:evento.hayPrensa ?? null,
          })
       
        }else{
          this.nav.navigateForward('/dashboard/eventos')
        }
      })
      ).subscribe()

      
  }

  async editar(){
    if(!this.validarForm()){
      return
    }
    await this.load.setData({
      animated:true,
      spinner: 'dots',
      translucent:true,
      message:'Editando Evento...'
    })
    let html;
    if(typeof this.eventForm.controls['detalles'].value !== 'string'){
      html = toHTML( this.eventForm.controls['detalles'].value);
    }else{
      html = this.eventForm.controls['detalles'].value;
    }
    this.eventForm.controls['detalles'].setValue(html);
    const formData = new FormData();
    if(this.img){
      formData.append('imagen', this.compressService.dataURItoBlob(this.img));
    }
    if(this.ponentes.length > 0){
      let i = 0;
      for(const pon of this.ponentes){
        if(pon.foto && pon.foto.includes('data:image/jpeg')){
          const formpo = new FormData();
          formpo.append('imagen',this.compressService.dataURItoBlob(pon.foto))
          const res = await this.genericService.post<any>('evento/ponente',formpo).toPromise();
          this.ponentes[i].foto = res.file
        }
        i+=1;
      }
    }
    let identificador = this.eventForm.controls['titulo'].value.replace(/ /g, '-')
    formData.append('identificador', identificador.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase())
    this.genericService.updateWhitImage<Evento>('evento',this.idEdit,{...this.eventForm.value,agenda:this.agenda,costos:this.costos,ponentes:this.ponentes}).
    pipe(
      switchMap(res => {
        return this.genericService.update<Evento>('evento',res.id,formData)
      })
    ).subscribe(async (res) => {
    
     this.eventoRepo.updateEvento(this.idEdit,res);
     await this.load.hide();
     this.nav.navigateForward('/dashboard/eventos')
     this.toast.success('Evento Editado')
    })
  }


  validarForm(){
    if(!this.eventForm.controls['esGratis'].value && this.costos.length==0 ){
      this.toast.warning('Debe agregar costos a cada tipo de público objetivo si el evento no es gratuito');
      return false
    }
    return true
  }
}
