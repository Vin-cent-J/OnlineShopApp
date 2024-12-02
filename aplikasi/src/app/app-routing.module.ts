import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [

  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'katalog',
    loadChildren: () => import('./katalog/katalog.module').then( m => m.KatalogPageModule)
  },
  {
    path: 'katalog/:halaman',
    loadChildren: () => import('./katalog/katalog.module').then( m => m.KatalogPageModule)
  },
  {
    path: 'keranjang',
    canActivate: [authGuard],
    loadChildren: () => import('./keranjang/keranjang.module').then( m => m.KeranjangPageModule)
  },
  {
    path: 'profil',
    canActivate: [authGuard],
    loadChildren: () => import('./profil/profil.module').then( m => m.ProfilPageModule)
  },
  {
    path: 'transaksi',
    canActivate: [authGuard],
    loadChildren: () => import('./transaksi/transaksi.module').then( m => m.TransaksiPageModule)
  },
  {
    path: 'detailtransaksi/:id',
    canActivate: [authGuard],
    loadChildren: () => import('./detailtransaksi/detailtransaksi.module').then( m => m.DetailtransaksiPageModule)
  },
  {
    path: 'detailbarang/:id',
    loadChildren: () => import('./detailbarang/detailbarang.module').then( m => m.DetailbarangPageModule)
  },
  { 
    path: '**', 
    redirectTo: 'home' 
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
