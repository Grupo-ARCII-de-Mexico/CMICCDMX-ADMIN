import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AutenticationGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'redes',
    loadChildren: () => import('./shared/components/redes/redes.module').then( m => m.RedesPageModule)
  },
  {
    path: 'whatsapp',
    loadChildren: () => import('./shared/components/whatsapp/whatsapp.module').then( m => m.WhatsappPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule),
    canActivate:[AutenticationGuard]
  },

  {
    path: 'header',
    loadChildren: () => import('./shared/components/header/header.module').then( m => m.HeaderPageModule)
  },
  {
    path: 'externos/ON/:identificador',
    loadChildren: () => import('./pages/view-externos/view-externos.module').then( m => m.ViewExternosPageModule)
  },


  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  },
 

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled', })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
