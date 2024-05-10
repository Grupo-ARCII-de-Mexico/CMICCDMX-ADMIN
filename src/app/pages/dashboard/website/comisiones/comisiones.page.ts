import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { ComisionesRepository } from 'src/app/shared/repos/comisiones.repo';
import { GenericService } from 'src/app/shared/services/generic-service';
import { CompressImageService } from 'src/app/shared/tools/compress-image.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-comisiones',
  templateUrl: './comisiones.page.html',
  styleUrls: ['./comisiones.page.scss'],
})
export class ComisionesPage implements OnInit {

  
  editar:boolean = false;
  uri = environment.image + 'comisiones/';
  sliderForm!:FormGroup;
  image:any;
  identificador!:number;
  constructor(
    private fb:FormBuilder,
    private compress:CompressImageService,
    private sliderRepo:ComisionesRepository,
    private toast:ToastrService,
    private genericS:GenericService,
    private params:ActivatedRoute,
    private nav:NavController
  ) { }

  ngOnInit() {
    this.sliderForm = this.fb.group({
      texto:[null],
      url:[null],
    })
    this.params.params.pipe(
      switchMap( (res:any) => {
        this.identificador = Number(res?.identificador ?? 0) 
        return this.sliderRepo.comisiones$
      }),
    ).subscribe(async (res:any) => {
     if(this.identificador !== 0 ){
      const find = res.find((a:any) => a.id === this.identificador);
      this.sliderForm.setValue({
        texto:find.texto,
        url:find.url,
      })
      this.image = this.uri + find.imagen;
      this.editar=true
     }
    })
  }

  async addImage(){
    this.image = await this.compress.returnImageCompress();
  }

  async save(){
    if(this.editar){
      return this.edit();
    }
    const form = new FormData()
    if(this.image){
      form.append('imagen', this.compress.dataURItoBlob(this.image))
    }
    form.append('texto',this.sliderForm.controls['texto'].value);
    form.append('url',this.sliderForm.controls['url'].value);
    this.genericS.post('comisiones',form).subscribe((res:any) => {
      this.toast.success('Comisión Creado');
      this.sliderRepo.addComisiones(res);
      this.image=null;
      this.sliderForm.reset();
    })
  }


  edit(){
    const form = new FormData()
    if(this.image.includes('data:')){
      form.append('imagen', this.compress.dataURItoBlob(this.image));
    }
    form.append('texto',this.sliderForm.controls['texto'].value);
    form.append('url',this.sliderForm.controls['url'].value);
    this.genericS.updateWhitImage('comisiones',this.identificador,form).subscribe((res:any) => {
      this.toast.success('Comisión Actualizado');
      this.sliderRepo.updateComisiones(this.identificador,res);
      this.image=null;
      this.sliderForm.reset();
      this.nav.navigateBack('/dashboard/website/comisiones-ver')
    })
  }


  calificar(valor:number){
    this.sliderForm.controls['puntuacion'].setValue(valor)
  }
}
