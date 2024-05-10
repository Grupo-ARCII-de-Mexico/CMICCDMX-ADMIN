import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Negocio } from 'src/app/shared/repos/negocio.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { AlertService } from 'src/app/shared/tools/alert.service';
import { LoadingService } from 'src/app/shared/tools/loading.service';

@Component({
  selector: 'app-view-externos',
  templateUrl: './view-externos.page.html',
  styleUrls: ['./view-externos.page.scss'],
})
export class ViewExternosPage implements OnInit {
  negocio!:Negocio;
  password!:string;
  identificador!:string;
  constructor(
    private route:ActivatedRoute,
    private genericS:GenericService,
    private alert:AlertService,
    private toast:ToastrService,
    private loading:LoadingService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(async (params) => {
      this.identificador = params['identificador']; // Obtén el valor del identificador desde la URL

        if(!params['identificador']){
          window.location.replace('https://cmiccdmx.org');
        }else{
          await this.alerta();
        }
      });
  }

  async alerta(){
      await this.alert.setData({
        animated:true,
        backdropDismiss:false,
        header:'Ver Postulantes',
        message:'Ingrese su Contraseña de Acceso',
        inputs:[
          {
            type: 'password',
            name:'password',
            placeholder: 'Contraseña',
          },
        ],
        buttons:[
          {
            text:'Enviar contraseña',
            handler: async (alertData) => {
              await this.loading.setData({
                animated:true,
                message:'Entrando...'
              })
              await this.loading.create()
              await this.loading.show()
              const resultado  = await this.genericS.post<Negocio>('negocio/login/'+this.identificador,{password:alertData.password}).toPromise().catch(async (a) => {
                this.toast.warning('Credenciales Inválidas')
              })
              await this.loading.hide()
              if(resultado){
                this.negocio = resultado
                return true
              }else{
                return false
              }
            }
          }
        ]
      })
  }

}
