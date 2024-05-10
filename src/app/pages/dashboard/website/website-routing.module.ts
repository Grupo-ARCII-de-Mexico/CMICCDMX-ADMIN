import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WebsitePage } from './website.page';

const routes: Routes = [
  {
    path: '',
    component: WebsitePage,
    children:[
      {
        path: 'slider',
        loadChildren: () => import('./slider/slider.module').then( m => m.SliderPageModule)
      },
      {
        path: 'slider-ver',
        loadChildren: () => import('./slider-ver/slider-ver.module').then( m => m.SliderVerPageModule)
      },
      {
        path: 'slider/:identificador',
        loadChildren: () => import('./slider/slider.module').then( m => m.SliderPageModule)
      },
      {
        path: 'boletines-ver',
        loadChildren: () => import('./boletines-ver/boletines-ver.module').then( m => m.BoletinesVerPageModule)
      },
      {
        path: 'boletines',
        loadChildren: () => import('./boletines/boletines.module').then( m => m.BoletinesPageModule)
      },
      {
        path: 'boletines/:identificador',
        loadChildren: () => import('./boletines/boletines.module').then( m => m.BoletinesPageModule)
      },
      {
        path: 'cursos',
        loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
      },
      {
        path: 'cursos/:identificador',
        loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
      },
      {
        path: 'cursos-ver',
        loadChildren: () => import('./cursos-ver/cursos-ver.module').then( m => m.CursosVerPageModule)
      },
      {
        path: 'comentarios',
        loadChildren: () => import('./comentarios/comentarios.module').then( m => m.ComentariosPageModule)
      },
      {
        path: 'comentarios/:identificador',
        loadChildren: () => import('./comentarios/comentarios.module').then( m => m.ComentariosPageModule)
      },
      {
        path: 'comentarios-ver',
        loadChildren: () => import('./comentarios-ver/comentarios-ver.module').then( m => m.ComentariosVerPageModule)
      },
      {
        path: 'comisiones',
        loadChildren: () => import('./comisiones/comisiones.module').then( m => m.ComisionesPageModule)
      },
      {
        path: 'comisiones/:identificador',
        loadChildren: () => import('./comisiones/comisiones.module').then( m => m.ComisionesPageModule)
      },
      {
        path: 'comisiones-ver',
        loadChildren: () => import('./comisiones-ver/comisiones-ver.module').then( m => m.ComisionesVerPageModule)
      },
      {
        path: 'directorio',
        loadChildren: () => import('./directorio/directorio.module').then( m => m.DirectorioPageModule)
      },
      {
        path: 'calendarios',
        loadChildren: () => import('./calendarios/calendarios.module').then( m => m.CalendariosPageModule)
      },
    ]
  },
  {
    path: 'privacidad',
    loadChildren: () => import('./privacidad/privacidad.module').then( m => m.PrivacidadPageModule)
  },






];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WebsitePageRoutingModule {}
