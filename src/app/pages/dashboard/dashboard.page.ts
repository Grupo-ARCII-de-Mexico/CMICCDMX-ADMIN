import { Component, OnInit } from '@angular/core';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { TypeItem } from 'src/app/shared/enums/type.item.enum';
import { Menu } from 'src/app/shared/interfaces/menu.interface';
import { Auth, AuthRepository } from 'src/app/shared/repos/auth.repository';
import { Evento, EventoRepository } from 'src/app/shared/repos/evento.repository';
import { GenericService } from 'src/app/shared/services/generic-service';
import { environment } from 'src/environments/environment';
import { MD5 } from 'crypto-js';
import { Apoyos, ApoyosRepository } from 'src/app/shared/repos/apoyo.repository';
import { OportunidadNegocio } from 'src/app/shared/interfaces/negocio.interface';
import { Negocio, NegocioRepository } from 'src/app/shared/repos/negocio.repository';
import { Afiliado, AfiliadoRepository } from 'src/app/shared/repos/afiliado.repository';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  uri = environment.image+'users/';
  
  menu:Menu[] =[
    {
      icon:'home-outline',
      label:'Dashboard',
      url:'/dashboard',
      type:TypeItem.ITEM
    },
    {
      icon:'bar-chart-outline',
      label:'Estadisticas',
      url:'/dashboard/estadisticas',
      type:TypeItem.ITEM
    },
    {
      icon:'albums-outline',
      label:'Afiliados',
      url:'dashboard/afiliados',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Afiliados',
          url:'/dashboard/afiliados',
        },
        {
          icon:'albums-outline',
          label:'Crear Afiliado',
          url:'/dashboard/afiliados/crear',
        },
   
      ]
    },
    {
      icon:'albums-outline',
      label:'Eventos',
      url:'/dashboard/eventos',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Eventos',
          url:'/dashboard/eventos',
        },
        {
          icon:'albums-outline',
          label:'Crear Eventos',
          url:'/dashboard/eventos/crear-evento',
        },
   
        {
          icon:'people-outline',
          label:'Registrar Usuarios',
          url:'/dashboard/eventos/registrar-usuario',
        },
      ]
    },
    {
      icon:'albums-outline',
      label:'Apoyos',
      url:'dashboard/apoyos',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Apoyos',
          url:'/dashboard/apoyos',
        },
        {
          icon:'albums-outline',
          label:'Crear Apoyo',
          url:'/dashboard/apoyos/crear-apoyos',
        },
   
      ]
    },
    {
      icon:'business-outline',
      label:'Oportunidad Negocios',
      url:'dashboard/negocios',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Oportunidades',
          url:'/dashboard/negocios',
        },
        {
          icon:'business-outline',
          label:'Crear Oportunidad',
          url:'/dashboard/negocios/crear-oportunidad',
        },
   
  
      ]
    },
    {
      icon:'business-outline',
      label:'Licitaciones',
      url:'dashboard/licitaciones',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Licitaciones',
          url:'/dashboard/licitaciones',
        },
        {
          icon:'business-outline',
          label:'Crear Licitación',
          url:'/dashboard/licitaciones/crear-licitaciones',
        },
   

      ]
    },
    {
      icon:'business-outline',
      label:'Bolsa de Trabajo',
      url:'dashboard/bolsa-trabajo',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Empleo',
          url:'/dashboard/bolsa-trabajo',
        },
        {
          icon:'business-outline',
          label:'Crear Empleo',
          url:'/dashboard/bolsa-trabajo/crear-bolsa-trabajo',
        },
   

      ]
    },
    
    {
      icon:'globe-outline',
      label:'Sitio Web',
      url:'/dashboard/website',
      type:TypeItem.ACCORDION,
      accordionItems:[
        {
          icon:'eye-outline',
          label:'Ver Slider',
          url:'/dashboard/website/slider-ver',
        },
        {
          icon:'albums-outline',
          label:'Crear Slider',
          url:'/dashboard/website/slider',
        },
        {
          icon:'eye-outline',
          label:'Ver Boletines',
          url:'/dashboard/website/boletines-ver',
        },
        {
          icon:'albums-outline',
          label:'Crear Boletines',
          url:'/dashboard/website/boletines',
        },
        {
          icon:'albums-outline',
          label:'Crear Cursos',
          url:'/dashboard/website/cursos',
        },
        {
          icon:'eye-outline',
          label:'Ver Cursos',
          url:'/dashboard/website/cursos-ver',
        },
        {
          icon:'albums-outline',
          label:'Crear Comisiones',
          url:'/dashboard/website/comisiones',
        },
        {
          icon:'eye-outline',
          label:'Ver Comisiones',
          url:'/dashboard/website/comisiones-ver',
        },
        {
          icon:'albums-outline',
          label:'Crear Comentarios',
          url:'/dashboard/website/comentarios',
        },
        {
          icon:'eye-outline',
          label:'Ver Comentarios',
          url:'/dashboard/website/comentarios-ver',
        },
    
        {
          icon:'albums-outline',
          label:'Crear Directorio',
          url:'/dashboard/website/directorio/crear',
        },
        {
          icon:'eye-outline',
          label:'Ver Directorio',
          url:'/dashboard/website/directorio',
        },

        {
          icon:'albums-outline',
          label:'Crear Calendario Instituciones',
          url:'/dashboard/website/calendarios/crear',
        },
        {
          icon:'eye-outline',
          label:'Ver Calendario Instituciones',
          url:'/dashboard/website/calendarios',
        },

      ]
    }

] 

menuAvatar:Menu[]=[
  {
    icon:'person-circle-outline',
    label:'Mi cuenta',
    url:'dashboard/user',
    type:TypeItem.ITEM
  }
  ,
  {
    icon:'log-out-outline',
    label:'Cerrar Sesión',
    url:'',
    type:TypeItem.ITEM
  }
]

eventos:Evento[]=[];
apoyos:Apoyos[]=[];
oportunidadNegocio:Negocio[]=[];
afiliados:Afiliado[]=[];
  constructor(
    private auth:AuthRepository,
    private evento:EventoRepository,
    private apoyoRepo:ApoyosRepository,
    private oportunidadRepo:NegocioRepository,
    private afiliadosRepo:AfiliadoRepository,
    private genericService:GenericService
  ) { }
  user!:Auth;
  ngOnInit() {
    this.genericService.getAll<Evento[]>('evento').pipe(
      switchMap( (eventos: Evento[]) => {
      this.evento.setEventos(eventos)
      this.eventos = eventos;
      return this.auth.user$
      }),
      map( users => users[0]),
      filter(user => !!user),
      tap(user => {
        this.user=user;
        if(!localStorage.getItem('gravatar')){
          this.gravatar(user.email ?? '');
        }
      }),
    ).subscribe((res:any) => {
    }, err => {
      console.log(err,'ERROR');
      
    });

    this.genericService.getAll<Apoyos[]>('desastres').pipe(
      tap( res => {
        this.apoyoRepo.setApoyos(res)
          this.apoyos = res;
      } )
    ).subscribe()

    this.genericService.getAll<Negocio[]>('negocio').pipe(
      tap( res => {
        this.oportunidadRepo.setNegocio(res);
          this.oportunidadNegocio = res;        
      } )
    ).subscribe()

    this.genericService.getAll<Afiliado[]>('afiliados').pipe(
      tap( res => {
        this.afiliadosRepo.setAfiliado(res);
          this.afiliados = res;        
      } )
    ).subscribe()
   
  }


  gravatar(mail: string){
    this.genericService.gravatar(MD5(mail.trim().toLowerCase()).toString()).subscribe(async (res) => {
      const user = await this.genericService.updateToken('user',{gravatar:true,foto:res.url}).toPromise() as Auth;
      this.auth.updateUser(user.id,user);
      localStorage.setItem('gravatar','true')
    }, async (err) => {
      localStorage.setItem('gravatar','true')
    })
  }



}
